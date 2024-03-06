/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

module.exports = {
	name: "ping",
	run: async(p) => {
		try {
			let time = Date.now();
			await p.msg.getChat();
			p.reply(`Pong 🏓\n${Date.now() - time}ms`);
		} catch (e) {
			console.error(e);
		}
	}
}