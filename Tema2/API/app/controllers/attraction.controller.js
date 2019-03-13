const Attraction = require('../models/attraction.model');
const City = require('../models/city.model');

module.exports = {
    getAll: (req, res) => {
        City.findById(req.cityId)
            .then(city => {
                if (!city) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.cityId} not found.`);
                    return;
                }
                Attraction.find({ city: req.cityId })
                    .then(attractions => {
                        res.writeHead(200, { 'Content-type': 'application/json' });
                        res.end(JSON.stringify(attractions));
                    })
                    .catch(err => {
                        res.writeHead(500, { 'Content-type': 'text/plain' });
                        res.end(err.message);
                    });
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.cityId} not found.`);
                    return;
                }
                res.writeHead(500);
                res.end(err.message);
            });
    },

    getById: (req, res) => {
        City.findById(req.cityId)
            .then(city => {
                if (!city) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.cityId} not found.`);
                    return;
                }
                Attraction.findOne({ _id: req.attractionId, city: req.cityId })
                    .then(attraction => {
                        if (!attraction) {
                            res.writeHead(404, { 'Content-type': 'text/plain' });
                            res.end(`Attraction with id ${req.attractionId} for City with id ${req.cityId} not found.`);
                            return;
                        }
                        res.writeHead(200, { 'Content-type': 'application/json' });
                        res.end(JSON.stringify(attraction));
                    })
                    .catch(err => {
                        if (err.kind === 'ObjectId') {
                            res.writeHead(404, { 'Content-type': 'text/plain' });
                            res.end(`Attraction with id ${req.attractionId} for City with id ${req.cityId} not found.`);
                            return;
                        }
                        res.writeHead(500);
                        res.end(err.message);
                    });
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.cityId} not found.`);
                    return;
                }
                res.writeHead(500);
                res.end(err.message);
            });
    },

    create: (req, res) => {
        City.findById(req.cityId)
            .then(city => {
                if (!city) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.cityId} not found.`);
                    return;
                }
                const attraction = new Attraction({
                    name: req.body.name,
                    description: req.body.description,
                    address: req.body.address,
                    city: req.cityId
                });

                attraction.save()
                    .then(data => {
                        city.attractions.push(parseInt(data._id));
                        city.save();
                        let location = `http://${req.headers.host}${req.url}/${data._id}`;
                        res.writeHead(201, { 'Content-type': 'application/json', 'Location': location });
                        res.end(JSON.stringify(data));
                    })
                    .catch(err => {
                        res.writeHead(500, { 'Content-type': 'text/plain' });
                        res.end(err.message);
                    });
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.cityId} not found.`);
                    return;
                }
                res.writeHead(500);
                res.end(err.message);
            });
    },

    update: (req, res) => {
        City.findById(req.cityId)
            .then(city => {
                if (!city) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.cityId} not found.`);
                    return;
                }
                Attraction.findByIdAndUpdate(req.attractionId, {
                        name: req.body.name,
                        description: req.body.description,
                        address: req.body.address,
                        city: req.cityId
                    }, { new: true })
                    .then(attraction => {
                        if (!attraction) {
                            res.writeHead(404, { 'Content-type': 'text/plain' });
                            res.end(`Attraction with id ${req.attractionId} not found!`);
                            return;
                        }
                        res.writeHead(204);
                        res.end();
                    })
                    .catch(err => {
                        if (err.kind === 'ObjectId') {
                            res.writeHead(404, { 'Content-type': 'text/plain' });
                            res.end(`Attraction with id ${req.attractionId} not found!`);
                            return;
                        }
                        res.writeHead(500, { 'Content-type': 'text/plain' });
                        res.end(err.message);
                    });
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.cityId} not found.`);
                    return;
                }
                res.writeHead(500);
                res.end(err.message);
            });
    },

    delete: (req, res) => {
        City.findById(req.cityId)
            .then(city => {
                if (!city) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.cityId} not found.`);
                    return;
                }
                Attraction.findByIdAndRemove(req.attractionId)
                    .then(attraction => {
                        if (!attraction) {
                            res.writeHead(404, { 'Content-type': 'text/plain' });
                            res.end(`Attraction with id ${req.attractionId} not found!`);
                            return;
                        }
                        city.attractions.splice(city.attractions.indexOf(attraction._id), 1);
                        city.save();
                        res.writeHead(200, { 'Content-type': 'text/plain' });
                        res.end('Attraction deleted succesfully!');
                        return;
                    })
                    .catch(err => {
                        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                            res.writeHead(404, { 'Content-type': 'text/plain' });
                            res.end(`Attraction with id ${req.attractionId} not found!`);
                            return;
                        }
                        res.writeHead(500, { 'Content-type': 'text/plain' });
                        res.end(err.message);
                    });
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.cityId} not found.`);
                    return;
                }
                res.writeHead(500);
                res.end(err.message);
            });
    }
}