const express = require('express')

//swagger
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const { spec } = require('./docs/swagger.spec')

//express settings
const app = express()
const PORT = 3000

//middlewares
app.use(express.json())
app.use('/docs/api/v1', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(spec)))

//routes
const Router = require('./src/Router');

app.get('/ping', (_, res) => {
    return res.json({
        'message': 'pong'
    })
})

app.use('/api/v1/users', Router)

app.listen(PORT, () => {
    console.log(`App running http://localhost:${PORT}`)
});