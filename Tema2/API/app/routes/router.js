const cityController = require('../controllers/city.controller');
const attractionController = require('../controllers/attraction.controller');

module.exports = {
    handle: (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

        let parsedUrl = req.url.split('/');
        parsedUrl.splice(0, 2);

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
            switch (req.method) {
                case 'GET':
                    if (parsedUrl[0] === 'cities' && parsedUrl.length === 1) {
                        cityController.getAll(req, res);
                        return;
                    }

                    if (parsedUrl[0] === 'cities' && parsedUrl.length === 2) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.id = parseInt(parsedUrl[1]);
                        }
                        cityController.getById(req, res);
                        return;
                    }

                    if (parsedUrl[0] === 'cities' && parsedUrl[2] === 'attractions' && parsedUrl.length === 3) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.cityId = parseInt(parsedUrl[1]);
                        }
                        attractionController.getAll(req, res);
                        return;
                    }

                    if (parsedUrl[0] === 'cities' && parsedUrl[2] === 'attractions' && parsedUrl.length === 4) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.cityId = parseInt(parsedUrl[1]);
                            if (!parsedUrl[3].match(numberRegex)) {
                                res.writeHead(400);
                                res.end();
                                return;
                            } else {
                                req.attractionId = parseInt(parsedUrl[3]);
                            }
                        }
                        attractionController.getById(req, res);
                        return;
                    }

                    break;
                case 'POST':
                    if (req.headers['content-type'] !== 'application/json') {
                        res.writeHead(400);
                        res.end('Invalid data!');
                        return;
                    }

                    if (parsedUrl[0] === 'cities' && parsedUrl.length === 1) {
                        cityController.create(req, res);
                        return;
                    }

                    if (parsedUrl[0] === 'cities' && parsedUrl.length === 2) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        }
                        res.writeHead(404);
                        res.end();
                        return;
                    }

                    if (parsedUrl[0] === 'cities' && parsedUrl[2] === 'attractions' && parsedUrl.length === 3) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.cityId = parseInt(parsedUrl[1]);
                        }
                        attractionController.create(req, res);
                        return;
                    }

                    break;
                case 'DELETE':
                    if (parsedUrl[0] === 'cities' && parsedUrl.length === 2) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.id = parseInt(parsedUrl[1]);
                        }
                        cityController.delete(req, res);
                        return;
                    }

                    if (parsedUrl[0] === 'cities' && parsedUrl.length === 1) {
                        res.writeHead(405);
                        res.end();
                        return;
                    }

                    if (parsedUrl[0] === 'cities' && parsedUrl[2] === 'attractions' && parsedUrl.length === 4) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.cityId = parseInt(parsedUrl[1]);
                            if (!parsedUrl[3].match(numberRegex)) {
                                res.writeHead(400);
                                res.end();
                                return;
                            } else {
                                req.attractionId = parseInt(parsedUrl[3]);
                            }
                        }
                        attractionController.delete(req, res);
                        return;
                    }

                    break;

                case 'PUT':
                    if (req.headers['content-type'] !== 'application/json') {
                        res.writeHead(400);
                        res.end('Invalid data!');
                        return;
                    }

                    if (parsedUrl[0] === 'cities' && parsedUrl.length === 2) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.id = parseInt(parsedUrl[1]);
                        }
                        cityController.update(req, res);
                        return;
                    }

                    if (parsedUrl[0] === 'cities' && parsedUrl.length === 1) {
                        res.writeHead(405);
                        res.end();
                        return;
                    }

                    if (parsedUrl[0] === 'cities' && parsedUrl[2] === 'attractions' && parsedUrl.length === 4) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.cityId = parseInt(parsedUrl[1]);
                            if (!parsedUrl[3].match(numberRegex)) {
                                res.writeHead(400);
                                res.end();
                                return;
                            } else {
                                req.attractionId = parseInt(parsedUrl[3]);
                            }
                        }
                        attractionController.update(req, res);
                        return;
                    }

                    break;
            }
            res.writeHead(404);
            res.end();
        });
    }
}