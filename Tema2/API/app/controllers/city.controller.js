const City = require('../models/city.model');

function checkParametres(body) {
    let checkParams = {};
    checkParams.error = false;
    if (body.name === undefined) {
        checkParams.name = 'required';
        checkParams.error = true;
    }
    if (body.country === undefined) {
        checkParams.country = 'required';
        checkParams.error = true;
    }
    if (body.latitude === undefined) {
        checkParams.latitude = 'required';
        checkParams.error = true;
    }
    if (body.longitude === undefined) {
        checkParams.longitude = 'required';
        checkParams.error = true;
    }
    return checkParams;
}

module.exports = {
    getAll: (req, res) => {
        City.find()
            .then(cities => {
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(cities));
            })
            .catch(err => {
                res.writeHead(500, { 'Content-type': 'text/plain' });
                res.end(err.message);
            });
    },
    getById: (req, res) => {
        City.findById(req.id)
            .then(city => {
                if (!city) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.id} not found.`);
                    return;
                }
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(city));
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.id} not found.`);
                    return;
                }
                res.writeHead(500);
                res.end(err.message);
            });
    },
    create: (req, res) => {
        let checkParams = checkParametres(req.body)
        if (checkParams.error) {
            checkParams.error = undefined;
            res.writeHead(400, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(checkParams));
            return;
        }
        const city = new City({
            name: req.body.name,
            country: req.body.country,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        });

        city.save()
            .then(data => {
                let location = `http://${req.headers.host}${req.url}/${data._id}`;
                res.writeHead(201, { 'Content-type': 'application/json', 'Location': location });
                res.end(JSON.stringify(data));
            })
            .catch(err => {
                res.writeHead(500, { 'Content-type': 'text/plain' });
                res.end(err.message);
            });
    },
    delete: (req, res) => {
        City.findByIdAndRemove(req.id)
            .then(city => {
                if (!city) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.id} not found!`);
                    return;
                }
                res.writeHead(200, { 'Content-type': 'text/plain' });
                res.end('City deleted succesfully!');
                return;
            })
            .catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.id} not found!`);
                    return;
                }
                res.writeHead(500, { 'Content-type': 'text/plain' });
                res.end(err.message);
            });
    },
    update: (req, res) => {
        let checkParams = checkParametres(req.body);
        if (checkParams.error) {
            checkParams.error = undefined;
            res.writeHead(400, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(checkParams));
            return;
        }
        City.findByIdAndUpdate(req.id, {
                name: req.body.name,
                country: req.body.country,
                latitude: req.body.latitude,
                longitude: req.body.longitude
            }, { new: true })
            .then(city => {
                if (!city) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.id} not found!`);
                    return;
                }
                res.writeHead(204);
                res.end();
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`City with id ${req.id} not found!`);
                    return;
                }
                res.writeHead(500, { 'Content-type': 'text/plain' });
                res.end(err.message);
            });
    }
};