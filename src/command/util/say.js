/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

module.exports = {
	name: "say",
	run: async(p) => {
		try {
			let text = p.args.join(' ');
			if(!text) return p.reply("Mohon berikan teks untuk di balas kembali oleh bot!");
			if(text.length > 300) return p.reply('Bot hanya bisa menerima 300 karakter saja!');

			if(!p.mentions.length) return p.send(`${text}\n\n_Made by @${p.userContact.number}_`, { mentions: [p.userContact] });

			const mentions = await p.msg.getMentions();
			p.send(`${text}\n\n_Made by @${p.userContact.number}_`, { mentions: [p.userContact, ...mentions] });
		} catch (e) {
			console.error(e);
		}
	}
}