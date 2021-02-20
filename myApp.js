const express = require('express');
const helmet = require("helmet");
const app = express();
const ninetyDaysInSeconds = 90*24*60*60;
const timeInSeconds = ninetyDaysInSeconds;

app.use(helmet.hidePoweredBy());

app.use(helmet.frameguard({action: 'deny'}));

app.use(helmet.xssFilter());

app.use(helmet.noSniff());

app.use(helmet.ieNoOpen());

app.use(helmet.hsts({maxAge: timeInSeconds, force: true}));

app.use(helmet.dnsPrefetchControl());















































module.exports = app;
var api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
