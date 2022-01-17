/* eslint-disable no-console */

const mongoose = require('mongoose');

// Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const { spec } = require('./docs/swagger');

// MongoDB connection
const { mongoUri } = require('./src/config/db.config');

mongoose.connect(mongoUri);

// Http server
const { app } = require('./src/server');

app.use('/docs/api/v1', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(spec)));

const PORT = process.env.NODE_DOCKER_PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running http://localhost:${PORT}`);
});
