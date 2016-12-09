var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var debug = require('debug')('apple-pay');
var merchant = require('./merchant');
var payment = require('./payment');

app.use(bodyParser.json());
app.post('/merchant-validate', merchant.validate);
app.post('/payment-authorize', payment.authorize);

app.use(express.static('public'));

app.listen(process.env.PORT || 3000, function () {
	debug('Express is listening.');
});
