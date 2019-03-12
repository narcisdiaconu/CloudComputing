const Book = require('../models/book.model');
const Author = require('../models/author.model');
const mongoose = require('mongoose');

module.exports = {
    getAll: (req, res) => {
        Author.findById(req.authorId)
            .then(author => {
                if (!author) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`Author with id ${req.id} not found.`);
                    return;
                }
                Book.find({ author: req.authorId })
                    .then(books => {
                        res.writeHead(200, { 'Content-type': 'application/json' });
                        res.end(JSON.stringify(books));
                    })
                    .catch(err => {
                        res.writeHead(500, { 'Content-type': 'text/plain' });
                        res.end(err.message);
                    });
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
    getById: (req, res) => {
        Author.findById(req.authorId)
            .then(author => {
                if (!author) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`Author with id ${req.id} not found.`);
                    return;
                }
                Book.findOne({ _id: req.bookId, author: req.authorId })
                    .then(book => {
                        if (!book) {
                            res.writeHead(404, { 'Content-type': 'text/plain' });
                            res.end(`Book with id ${req.bookId} for author with id ${req.authorId} not found.`);
                            return;
                        }
                        res.writeHead(200, { 'Content-type': 'application/json' });
                        res.end(JSON.stringify(book));
                    })
                    .catch(err => {
                        if (err.kind === 'ObjectId') {
                            res.writeHead(404, { 'Content-type': 'text/plain' });
                            res.end(`Book with id ${req.bookId} for author with id ${req.authorId} not found.`);
                            return;
                        }
                        res.writeHead(500);
                        res.end(err.message);
                    });
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
        Author.findById(req.authorId)
            .then(author => {
                if (!author) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`Author with id ${req.authorId} not found.`);
                    return;
                }
                const book = new Book({
                    title: req.body.title,
                    author: req.authorId
                });

                book.save()
                    .then(data => {
                        res.writeHead(200, { 'Content-type': 'application/json' });
                        res.end(JSON.stringify(data));
                    })
                    .catch(err => {
                        res.writeHead(500, { 'Content-type': 'text/plain' });
                        res.end(err.message);
                    });
                author.books.push(book._id);
                author.save();
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`Author with id ${req.authorId} not found.`);
                    return;
                }
                res.writeHead(500);
                res.end(err.message);
            });
    },
    update: (req, res) => {
        Author.findById(req.authorId)
            .then(author => {
                if (!author) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`Author with id ${req.id} not found.`);
                    return;
                }
                Book.findByIdAndUpdate(req.bookId, {
                        title: req.body.title
                    }, { new: true })
                    .then(book => {
                        if (!book) {
                            res.writeHead(404, { 'Content-type': 'text/plain' });
                            res.end(`Book with id ${req.bookId} not found!`);
                            return;
                        }
                        res.writeHead(204);
                        res.end();
                    })
                    .catch(err => {
                        if (err.kind === 'ObjectId') {
                            res.writeHead(404, { 'Content-type': 'text/plain' });
                            res.end(`Book with id ${req.bookId} not found!`);
                            return;
                        }
                        res.writeHead(500, { 'Content-type': 'text/plain' });
                        res.end(err.message);
                    });
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
    delete: (req, res) => {
        Author.findById(req.authorId)
            .then(author => {
                if (!author) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(`Author with id ${req.id} not found.`);
                    return;
                }
                Book.findByIdAndRemove(req.bookId)
                    .then(book => {
                        if (!book) {
                            res.writeHead(404, { 'Content-type': 'text/plain' });
                            res.end(`Book with id ${req.bookId} not found!`);
                            return;
                        }
                        res.writeHead(200, { 'Content-type': 'text/plain' });
                        res.end('Book deleted succesfully!');
                        return;
                    })
                    .catch(err => {
                        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                            res.writeHead(404, { 'Content-type': 'text/plain' });
                            res.end(`Book with id ${req.bookId} not found!`);
                            return;
                        }
                        res.writeHead(500, { 'Content-type': 'text/plain' });
                        res.end(err.message);
                    });
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
    }
}