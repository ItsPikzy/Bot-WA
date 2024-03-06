/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

const qrcode = require('qrcode-terminal');

module.exports = (client, clientId,  qr) => {
	console.log(`Client ID ${clientId} : Scan QR code pada WhatsAppnya ya!`);
	qrcode.generate(qr, {
    small: true
  });
}