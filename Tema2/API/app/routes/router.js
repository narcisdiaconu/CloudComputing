const url = require('url');
const authorController = require('../controllers/author.controller');
const bookController = require('../controllers/book.controller');

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
                    if (parsedUrl[0] === 'authors' && parsedUrl.length === 1) {
                        authorController.getAll(req, res);
                        return;
                    }

                    if (parsedUrl[0] === 'authors' && parsedUrl.length === 2) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.id = parseInt(parsedUrl[1]);
                        }
                        authorController.getById(req, res);
                        return;
                    }

                    if (parsedUrl[0] === 'authors' && parsedUrl[2] === 'books' && parsedUrl.length === 3) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.authorId = parseInt(parsedUrl[1]);
                        }
                        bookController.getAll(req, res);
                        return;
                    }

                    if (parsedUrl[0] === 'authors' && parsedUrl[2] === 'books' && parsedUrl.length === 4) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.authorId = parseInt(parsedUrl[1]);
                            if (!parsedUrl[3].match(numberRegex)) {
                                res.writeHead(400);
                                res.end();
                                return;
                            } else {
                                req.bookId = parseInt(parsedUrl[3]);
                            }
                        }
                        bookController.getById(req, res);
                        return;
                    }

                    res.writeHead(404);
                    res.end();
                    break;
                case 'POST':
                    if (req.headers['content-type'] !== 'application/json') {
                        res.writeHead(400);
                        res.end('Invalid data!');
                        return;
                    }

                    if (parsedUrl[0] === 'authors' && parsedUrl.length === 1) {
                        authorController.create(req, res);
                        return;
                    }

                    if (parsedUrl[0] === 'authors' && parsedUrl.length === 2) {
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

                    if (parsedUrl[0] === 'authors' && parsedUrl[2] === 'books' && parsedUrl.length === 3) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.authorId = parseInt(parsedUrl[1]);
                        }
                        bookController.create(req, res);
                        return;
                    }

                    res.writeHead(404);
                    res.end();
                    break;
                case 'DELETE':
                    if (parsedUrl[0] === 'authors' && parsedUrl.length === 2) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.id = parseInt(parsedUrl[1]);
                        }
                        authorController.delete(req, res);
                        return;
                    }

                    if (parsedUrl[0] === 'authors' && parsedUrl.length === 1) {
                        res.writeHead(405);
                        res.end();
                        return;
                    }

                    if (parsedUrl[0] === 'authors' && parsedUrl[2] === 'books' && parsedUrl.length === 4) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.authorId = parseInt(parsedUrl[1]);
                            if (!parsedUrl[3].match(numberRegex)) {
                                res.writeHead(400);
                                res.end();
                                return;
                            } else {
                                req.bookId = parseInt(parsedUrl[3]);
                            }
                        }
                        bookController.delete(req, res);
                        return;
                    }

                    res.writeHead(404);
                    res.end();
                    break;

                case 'PUT':
                    if (req.headers['content-type'] !== 'application/json') {
                        res.writeHead(400);
                        res.end('Invalid data!');
                        return;
                    }

                    if (parsedUrl[0] === 'authors' && parsedUrl.length === 2) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.id = parseInt(parsedUrl[1]);
                        }
                        authorController.update(req, res);
                        return;
                    }

                    if (parsedUrl[0] === 'authors' && parsedUrl.length === 1) {
                        res.writeHead(405);
                        res.end();
                        return;
                    }

                    if (parsedUrl[0] === 'authors' && parsedUrl[2] === 'books' && parsedUrl.length === 4) {
                        let numberRegex = '[0-9]+';
                        if (!parsedUrl[1].match(numberRegex)) {
                            res.writeHead(400);
                            res.end();
                            return;
                        } else {
                            req.authorId = parseInt(parsedUrl[1]);
                            if (!parsedUrl[3].match(numberRegex)) {
                                res.writeHead(400);
                                res.end();
                                return;
                            } else {
                                req.bookId = parseInt(parsedUrl[3]);
                            }
                        }
                        bookController.update(req, res);
                        return;
                    }

                    res.writeHead(404);
                    res.end();
                    break;
                default:
                    res.writeHead(404);
                    res.end();
                    break;
            }
        });
    }
}