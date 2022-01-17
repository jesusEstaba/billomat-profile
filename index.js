/* eslint-disable no-console */
// MongoDB connection
const { mongo_uri } = require('./src/config/db.config')
const mongoose = require('mongoose');

mongoose.connect(mongo_uri);

// Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const { spec } = require('./docs/swagger');

// Http server
const { app } = require('./src/server');

app.use('/docs/api/v1', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(spec)));

const PORT = process.env.NODE_DOCKER_PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running http://localhost:${PORT}`);
});
