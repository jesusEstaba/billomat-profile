/* eslint-disable no-console */
const { app, PORT } = require('./src/server');

app.listen(PORT, () => {
    console.log(`App running http://localhost:${PORT}`);
});
