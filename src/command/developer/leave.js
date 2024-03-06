/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

module.exports = {
	name: "leave",
	owners: true,
	isGroup: true,
	run: async(p) => {
		try {
			let chat = await p.msg.getChat();

	    chat.leave();
		} catch (e) {
			console.error(e);
		}
	}
}