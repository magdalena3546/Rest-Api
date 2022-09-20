const express = require('express');
const router = express.Router();
const db = require('./../db');
const {
    v4: uuidv4
} = require('uuid');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats').post((req, res) => {
    const elm = {
        id: uuidv4(),
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,
    };
    db.seats.push(elm);
    res.json({
        message: 'OK'
    });
});

router.route('/seats/:id').put((req, res) => {
    const idItem = req.params.id;
    const elm = db.seats.find(item => item.id == idItem);
    const {
        day,
        seat,
        client,
        email
    } = req.body;
    elm.day = day;
    elm.seat = seat;
    elm.client = client;
    elm.email = email;

    res.json({
        message: 'OK',
    });
});

router.route('/seats/:id').delete((req, res) => {
    const idItem = req.params.id;
    const elmIndex = db.seats.findIndex(item => item.id == idItem);
    db.seats.splice(elmIndex, 1);
    res.json({
        message: 'OK',
    });
});

router.route('/seats/:id').get((req, res) => {
    const id = req.params.id;
    const elm = db.seats.find(item => item.id == id);
    res.json(elm);
});

module.exports = router;