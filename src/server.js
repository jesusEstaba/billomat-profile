const express = require('express');
const expressValidator = require('express-validator');

// express settings
const app = express();

app.use(express.json());
app.use(expressValidator());

// routes
const UserRouter = require('./routes/UserRouter');
const StatisticRouter = require('./routes/StatisticRouter');

app.get('/ping', (_, res) => res.json({ message: 'pong' }));

const PREFIX = '/api/v1';

app.use(`${PREFIX}/users`, UserRouter);
app.use(`${PREFIX}/statistics`, StatisticRouter);

module.exports = {
    app,
};
