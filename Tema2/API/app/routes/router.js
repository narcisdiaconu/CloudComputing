const cityController = require('../controllers/city.controller');
const attractionController = require('../controllers/attraction.controller');

module.exports = {
    handle: (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

        let parsedUrl = req.url.split('/');
        parsedUrl.splice(0, 2);

        let citiesBaseUrl = '/api/cities';
        let citiesIdUrl = '/api/cities/([0-9]+)';
        let attractionBaseUrl = '/api/cities/([0-9]+)/attractions';
        let attractionIdUrl = '/api/cities/([0-9]+)/attractions/([0-9]+)';

        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            if (body != '') {
                try {
                    req.body = JSON.parse(body);
                } catch (err) {
                    res.writeHead(400);
                    res.end();
                    return;
                }
            }
            let match = [];
            switch (req.method) {
                case 'GET':
                    match = req.url.match(citiesBaseUrl);

                    if (match) {
                        if (match[0] === req.url) {
                            cityController.getAll(req, res);
                            return;
                        }
                    }

                    match = req.url.match(citiesIdUrl);

                    if (match) {
                        if (match[0] === req.url) {
                            req.id = parseInt(match[1]);
                            cityController.getById(req, res);
                            return;
                        }
                    }

                    match = req.url.match(attractionBaseUrl);

                    if (match) {
                        if (match[0] === req.url) {
                            req.cityId = parseInt(match[1]);
                            attractionController.getAll(req, res);
                            return;
                        }

                    }

                    match = req.url.match(attractionIdUrl);

                    if (match) {
                        if (match[0] === req.url) {
                            req.cityId = parseInt(match[1]);
                            req.attractionId = parseInt(match[2]);
                            attractionController.getById(req, res);
                            return;
                        }
                    }

                    break;
                case 'POST':
                    if (req.headers['content-type'] !== 'application/json') {
                        res.writeHead(400);
                        res.end('Invalid data!');
                        return;
                    }

                    match = req.url.match(citiesBaseUrl);

                    if (match) {
                        if (match[0] === req.url) {
                            cityController.create(req, res);
                            return;
                        }
                    }

                    match = req.url.match(citiesIdUrl);

                    if (match) {
                        if (match[0] === req.url) {
                            res.writeHead(404);
                            res.end();
                            return;
                        }
                    }

                    match = req.url.match(attractionBaseUrl);

                    if (match) {
                        if (match[0] === req.url) {
                            req.cityId = parseInt(match[1]);
                            attractionController.create(req, res);
                            return;
                        }
                    }

                    break;
                case 'DELETE':
                    match = req.url.match(citiesIdUrl);

                    if (match) {
                        if (match[0] === req.url) {
                            req.id = parseInt(match[1]);
                            cityController.delete(req, res);
                            return;
                        }
                    }

                    match = req.url.match(citiesBaseUrl);

                    if (match) {
                        if (match[0] === req.url) {
                            res.writeHead(405);
                            res.end();
                            return;
                        }
                    }

                    match = req.url.match(attractionBaseUrl);

                    if (match) {
                        if (match[0] === req.url) {
                            res.writeHead(405);
                            res.end();
                            return;
                        }
                    }

                    match = req.url.match(attractionIdUrl);

                    if (match) {
                        if (match[0] === req.url) {
                            req.cityId = parseInt(match[1]);
                            req.attractionId = parseInt(match[2]);
                            attractionController.delete(req, res);
                            return;
                        }
                    }

                    break;

                case 'PUT':
                    if (req.headers['content-type'] !== 'application/json') {
                        res.writeHead(400);
                        res.end('Invalid data!');
                        return;
                    }

                    match = req.url.match(citiesIdUrl);

                    if (match) {
                        if (match[0] === req.url) {
                            req.id = parseInt(match[1]);
                            cityController.update(req, res);
                            return;
                        }
                    }

                    match = req.url.match(citiesBaseUrl);

                    if (match) {
                        if (match[0] === req.url) {
                            res.writeHead(405);
                            res.end();
                            return;
                        }
                    }

                    match = req.url.match(attractionBaseUrl);

                    if (match) {
                        if (match[0] === req.url) {
                            res.writeHead(405);
                            res.end();
                            return;
                        }
                    }


                    match = req.url.match(attractionIdUrl);

                    if (match) {
                        if (match[0] === req.url) {
                            req.cityId = parseInt(match[1]);
                            req.attractionId = parseInt(match[2]);
                            attractionController.update(req, res);
                            return;
                        }
                    }


                    break;
            }
            res.writeHead(404);
            res.end();
        });
    }
}