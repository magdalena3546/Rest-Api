const express = require('express');
const router = express.Router();
const db = require('./../db');
const {
    v4: uuidv4
} = require('uuid');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts').post((req, res) => {
    const elm = {
        id: uuidv4(),
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
    };
    db.concerts.push(elm);
    res.json({
        message: 'OK'
    });
});

router.route('/concerts/:id').put((req, res) => {
    const idItem = req.params.id;
    const elm = db.concerts.find(item => item.id == idItem);
    const {
        genre,
        price,
        day
    } = req.body;

    elm.genre = genre;
    elm.price = price;
    elm.day = day;
    res.json({
        message: 'OK',
    });

});

router.route('/concerts/:id').delete((req, res) => {
    const idItem = req.params.id;
    const elmIndex = db.concerts.findIndex(item => item.id == idItem);
    db.concerts.splice(elmIndex, 1);
    res.json({
        message: 'OK',
    });
});

router.route('/concerts/:id').get((req, res) => {
    const id = req.params.id;
    const elm = db.concerts.find(item => item.id == id);
    res.json(elm);
});

module.exports = router;