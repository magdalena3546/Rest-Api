const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller')

router.get('/seats', SeatController.getAll);

router.post('/seats', SeatController.add);

router.put('/seats/:id', SeatController.update);

router.delete('/seats/:id', SeatController.delete);

router.get('/seats/:id', SeatController.getOne);

module.exports = router;