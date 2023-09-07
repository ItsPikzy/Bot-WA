/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzyy
 */

const qrcode = require('qrcode-terminal');

module.exports = async(qr) => {
	console.log("Scan QR code pada WhatsAppnya ya!");
	qrcode.generate(qr, {small: true});
}