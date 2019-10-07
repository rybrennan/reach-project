const express = require("express");
const app = express();

const PORT = 3000
const routes = require('./routes');

app.use(express.static('public'));
app.use('/', routes);

app.listen(PORT,  () => console.log(`Express Server listening on port ${PORT}!`));