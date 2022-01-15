/* eslint-disable no-console */
// MongoDB connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test_database');

// Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const { spec } = require('./docs/swagger');

// Http server
const { app, PORT } = require('./src/server');

app.use('/docs/api/v1', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(spec)));

app.listen(PORT, () => {
    console.log(`App running http://localhost:${PORT}`);
});
