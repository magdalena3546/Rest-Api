const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
};

exports.add = async (req, res) => {
    try {
        const {
            performer,
            genre,
            price,
            day,
            image
        } = req.body;
        const newConcert = new Concert({
            performer: performer,
            genre: genre,
            price: price,
            day: day,
            image: image
        });
        await newConcert.save();
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
        genre,
        price,
        day
    } = req.body;
    try {
        await Concert.updateOne({
            _id: req.params.id
        }, {
            $set: {
                genre: genre,
                price: price,
                day: day
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
        const con = await Concert.findById(req.params.id);
        if (con) {
            await Concert.deleteOne({
                _id: req.params.id
            })
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
        const con = await Concert.findById(req.params.id);
        if (!con) res.status(404).json({
            message: 'Not found'
        });
        else res.json(con);
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

/* Search engine */

exports.getPerformer = async (req, res) => {
    try {
        const con = await Concert.find({
            performer: req.params.performer
        });
        if (!con) res.status(404).json({
            message: 'Not found'
        });
        else res.json(con);
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

exports.getGenre = async (req, res) => {
    try {
        const con = await Concert.find({
            genre: req.params.genre
        });
        if (!con) res.status(404).json({
            message: 'Not found'
        })
        else res.json(con);
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

exports.getPrice = async (req, res) => {
    try {
        const con = await Concert.find({
            $and: [{
                    price: {
                        $gt: req.params.price_min
                    }
                },
                {
                    price: {
                        $lt: req.params.price_max
                    }
                }
            ]
        });
        if (!con) res.status(404).json({
            message: 'Not found'
        })
        else res.json(con);
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

exports.getDay = async (req, res) => {
    try {
        const con = await Concert.find({
            day: req.params.day
        });
        if (!con) res.status(404).json({
            message: 'Not found'
        })
        else res.json(con);
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};