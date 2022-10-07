const express = require('express');
const router = express.Router();
const TestimonialsController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialsController.getAll);

router.get('/testimonials/random', TestimonialsController.getRandom);

router.post('/testimonials', TestimonialsController.add);

router.put('/testimonials/:id', TestimonialsController.update);

router.delete('/testimonials/:id', TestimonialsController.delete);

router.get('/testimonials/:id', TestimonialsController.getOne);

module.exports = router;