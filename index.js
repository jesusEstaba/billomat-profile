const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

app.get('/ping', (_, res) => {
    return res.json({
        'message': 'pong'
    })
})

app.listen(PORT, () => {
    console.log(`App running http://localhost:${PORT}`)
});