const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io')
const db = require("./db");

const app = express();
app.use(cors());
const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server, {
    cors: {
        origin: '*'
    },
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

//import routes 
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use('/api', seatsRoutes);
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
});

io.on('connection', (socket) => {
    console.log('New client', socket.id);
    socket.emit('seatsUpdated', db.seats);
});