const path = require('path');

const spec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Billomat Profile',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: [`${path.join(__dirname, '../src/routes/Router.js')}`],
};

module.exports = {
    spec,
};
