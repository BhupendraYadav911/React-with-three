const express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const app = express();
const cors = require('cors');
var config = require('./config');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
app.use(fileUpload());
swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./docs/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//var FileStore = require('session-file-store')(session);
//var passport = require('passport');
//var authenticate = require('./authenticate');

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useNewUrlParser: true
});

connect.then((db) => {
  console.log('Connected correctly to server');
}, (err) => { console.log(err); });

// create new express app and save it as "app"

app.options('*', cors())
// server configuration
const PORT = 3000;
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// create a route for the app
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use(express.static('public'));
app.use('/auth', routes.user);
app.use('/setting', routes.setting);
app.use('/roadmap', routes.roadmap);
app.use('/feature', routes.feature);
app.use('/template', routes.template);
app.use('/share', routes.share);
app.use('/plan', routes.plan);
app.use('/job', routes.job);
// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

