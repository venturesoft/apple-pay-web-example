var debug = require('debug')('apple-pay');
var request = require('request');
var fs = require('fs');
var path = require('path');
var certFilePath = path.resolve(__dirname, './resources/merchant.pem');
var cert = fs.readFileSync(certFilePath, 'utf8');

exports.validate = validate;

function validate (req, res) {
	if (!req.body.url) {
		return res.status(400).send('Missing validation URL.');
	}

	request.post({
		url: req.body.url,
		json: true,
		body: {
			merchantIdentifier: "merchant.com.loopbackdomain",
			displayName: "Development",
			domainName: "loopbackdomain.com"
		},
		cert: cert,
		key: cert
	}, function (err, resp, body) {
		if (err) {
			debug(err);
			res.sendStatus(500);
			return;
		}
		if (body.statusCode === '400' || body.statusCode === '500') {
			debug(body);
			res.status(400).json(body);
			return;
		}
		debug('Session validation received.');
		res.json(body);
	});
}
