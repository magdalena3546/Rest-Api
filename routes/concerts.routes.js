const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);

router.post('/concerts', ConcertController.add);

router.put('/concerts/:id', ConcertController.update);

router.delete('/concerts/:id', ConcertController.delete);

router.get('/concerts/:id', ConcertController.getOne);

module.exports = router;