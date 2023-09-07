/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzyy
 */

module.exports = async(reason) => {
	console.log('Whatsapp is disconnected!');
	console.log('Reason disconnect: ', reason);
	client.destroy();
	client.initialize();
}