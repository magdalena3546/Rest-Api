const express = require('express');
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//import routes 
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');


app.use('/api', seatsRoutes);
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);


app.use((req, res) => {
    res.status(404).send('404 not found...');
});


app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});