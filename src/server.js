const express = require('express');

// express settings
const app = express();

app.use(express.json());

// routes
const Router = require('./routes/Router');

app.get('/ping', (_, res) => res.json({ message: 'pong' }));

app.use('/api/v1/users', Router);

module.exports = {
    app,
};
