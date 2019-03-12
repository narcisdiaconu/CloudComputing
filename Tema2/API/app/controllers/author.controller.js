const Author = require('../models/author.model');

function checkParametres(body) {
    let checkParams = {};
    checkParams.error = false;
    if (body.firstName === undefined) {
        checkParams.firstName = 'required';
        checkParams.error = true;
    }
    if (body.lastName === undefined) {
        checkParams.lastName = 'required';
        checkParams.error = true;
    }
    return checkParams;
}

module.exports = {
    getAll: (req, res) => {
        Author.find()
            .then(authors => {
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(authors));
            })
            .catch(err => {
                res.writeHead(500, { 'Content-type': 'text/plain' });
                res.end(err.message);
            });
    },
    getById: (req, res) => {
        Author.findById(req.id)
            .then(author => {
                if (!author) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`Author with id ${req.id} not found.`);
                    return;
                }
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(author));
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`Author with id ${req.id} not found.`);
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
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        author.save()
            .then(data => {
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(data));
            })
            .catch(err => {
                res.writeHead(500, { 'Content-type': 'text/plain' });
                res.end(err.message);
            });
    },
    delete: (req, res) => {
        Author.findByIdAndRemove(req.id)
            .then(author => {
                if (!author) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`Author with id ${req.id} not found!`);
                    return;
                }
                res.writeHead(200, { 'Content-type': 'text/plain' });
                res.end('Author deleted succesfully!');
                return;
            })
            .catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`Author with id ${req.id} not found!`);
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
        Author.findByIdAndUpdate(req.id, {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }, { new: true })
            .then(author => {
                if (!author) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`Author with id ${req.id} not found!`);
                    return;
                }
                res.writeHead(204);
                res.end();
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`Author with id ${req.id} not found!`);
                    return;
                }
                res.writeHead(500, { 'Content-type': 'text/plain' });
                res.end(err.message);
            });
    }
};