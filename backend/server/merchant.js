var debug = require('debug')('apple-pay');
var request = require('request');
var fs = require('fs');
var path = require('path');
var certFilePath = path.resolve(__dirname, './resources/applepaytls.pem');
var keyFilePath = path.resolve(__dirname, './resources/applepaytls.key');

exports.validate = validate;

function validate (req, res) {
	if (!req.body.validationURL) {
		return res.status(400).send('Missing validation URL.');
	}
	request.post({
		url: req.body.validationURL,
		json: true,
		body: {
			merchantIdentifier: "merchant.com.loopbackdomain", //"AD06E6FADA16444C1DF1DD63A69AE7B7963C1A31C8212412A412FA231A94DFF8", //"merchant.com.loopbackdomain",
			displayName: "Development",
			domainName: "loopbackdomain.com"
		},
		cert: fs.readFileSync(certFilePath),
		key: fs.readFileSync(keyFilePath)
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
		// Apple returns a payload with `displayName`, but passing this
		// to `completeMerchantValidation` causes it to error.
		//delete body.displayName;
		res.json(body);
	});
}
