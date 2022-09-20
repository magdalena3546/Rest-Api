const express = require('express');
const router = express.Router();
const db = require('./../db');
const {
    v4: uuidv4
} = require('uuid');


router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    const elm = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
    res.json(elm);
});

router.route('/testimonials').post((req, res) => {
    const elm = {
        id: uuidv4(),
        author: req.body.author,
        text: req.body.text,
    };
    db.testimonials.push(elm);
    res.json({
        message: 'OK'
    });
});

router.route('/testimonials/:id').put((req, res) => {
    const idItem = req.params.id;
    const elm = db.testimonials.find(item => item.id == idItem);
    const {
        author,
        text
    } = req.body;
    if (author && text) {
        elm.author = author;
        elm.text = text;
        res.json({
            message: 'OK',
        });
    } else {
        res.json({
            message: 'error',
        });
    }
});

router.route('/testimonials/:id').delete((req, res) => {
    const idItem = req.params.id;
    const elmIndex = db.testimonials.findIndex(item => item.id == idItem);
    db.testimonials.splice(elmIndex, 1);
    res.json({
        message: 'OK',
    });
});

router.route('/testimonials/:id').get((req, res) => {
    const id = req.params.id;
    const elm = db.testimonials.find(item => item.id == id);
    res.json(elm);
});

module.exports = router;