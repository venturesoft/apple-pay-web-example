# Apple Pay on the Web example

## Pre Requisites

A server running Docker

An Apple Pay enabled device, see <https://support.apple.com/en-gb/KM207105>

A Sandbox test account, see <https://developer.apple.com/support/apple-pay-sandbox/>

## Set up

1. Create an Apple Developer Account (at <https://developer.apple.com>)
2. Create a Merchant ID (see [Configuring Your Environment](https://developer.apple.com/library/ios/ApplePay_Guide/Configuration.html))
3. In the "Apple Pay on the Web" section, "Add Domain" under "Merchant Domains" and follow the instruction to verify your domain ownership
4. Under "Apple Pay Merchant Identity", click on "Create Certificate".
5. In order to create the Certificate Signing Request(CSR), run the following command (make sure you have `openssl` installed).

	```sh
	openssl req -sha256 -nodes -newkey rsa:2048 -keyout applepaytls.key -out applepaytls.csr
	```
6. Upload the `applepaytls.csr` file to the File Upload in the Apple Developer portal.
7. Store the `applepaytls.key` file to the `backend/resources` directory.
8. With the `merchant_id.cer` file received from Apple, run the following command to generate a `.pem` file.

	```sh
	openssl x509 -inform der -in merchant_id.cer -out applepaytls.pem
	```
9. Store the `applepaytls.pem` file to the `backend/resources` directory.
10. Start the application

	```sh
git clone https://github.com/venturesoft/apple-pay-web-example && cd apple-pay-web-example
printf 'PRIVATE_DIR=%s\n' /home/user/private > .env && printf 'HTTP_PORT=%s\n' 80 >> .env && printf 'HTTPS_PORT=%s\n' 443 >> .env
docker-compose build && docker-compose up
	```

TODO
Incorporate <https://github.com/tomdale/apple-pay-merchant-session-server>
Need to import cert to login keychain (not system) to be able to export as p12
openssl pkcs12 -in loopbackdomain.com.merchant_id.p12 -out loopbackdomain.com.merchant_id.pem -nodes -clcerts
