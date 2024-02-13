/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

const { msgUtil } = require('../util/msgUtil.js');

module.exports = async(msg) => {
	try {
		if(msg.fromMe) {
			msgUtil(msg);
		}
	} catch (e) {
		sendLogBot(e);
	}
}