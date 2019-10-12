const express = require("express");
const bodyParser = require('body-parser');
const routes = require('./routes');
const PORT = 3000


const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.use('/', routes);

app.listen(PORT,  () => console.log(`Express Server listening on port ${PORT}!`));