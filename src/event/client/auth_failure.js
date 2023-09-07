/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzyy
 */

module.exports = async(session) => {
	console.log('Auth failure, restarting...', session);
  client.destroy();
  client.initialize();
}