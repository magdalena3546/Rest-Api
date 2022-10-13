const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

exports.add = async (req, res) => {
    try {
        const {
            day,
            seat,
            client,
            email
        } = req.body;
        const newSeat = new Seat({
            day: day,
            seat: seat,
            client: client,
            email: email
        });
        await newSeat.save();
        // req.io.emit('seatsUpdated', db.seats);
        res.json({
            message: 'OK'
        });

    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

exports.update = async (req, res) => {
    const {
        day,
        seat,
        client,
        email
    } = req.body;
    try {
        await Seat.updateOne({
            _id: req.params.id
        }, {
            $set: {
                day: day,
                seat: seat,
                client: client,
                email: email
            }
        });
        res.json({
            message: 'OK'
        });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const s = await Seat.findById(req.params.id);
        if (s) {
            await Seat.deleteOne({
                _id: req.params.id
            });
            res.json({
                message: 'OK'
            });
        } else res.status(404).json({
            message: 'Not found...'
        });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

exports.getOne = async (req, res) => {
    try {
        const s = await Seat.findById(req.params.id);
        if (!s) res.status(404).json({
            message: 'Not found'
        });
        else res.json(s);
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};