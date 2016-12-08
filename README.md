# Apple Pay on the Web example

## Pre Requisites

Mac OS Siera

Docker for Mac

An Apple Pay enabled device, see <https://support.apple.com/en-gb/KM207105>

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
7. Store the `applepaytls.key` file to the `server/resources` directory.
8. With the `merchant_id.cer` file received from Apple, run the following command to generate a `.pem` file.

	```sh
	openssl x509 -inform der -in merchant_id.cer -out applepaytls.pem
	```
9. Store the `applepaytls.pem` file to the `server/resources` directory.
10. Start the application

	```sh
docker-compose build && docker-compose up
	```
