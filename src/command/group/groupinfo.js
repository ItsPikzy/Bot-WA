/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

module.exports = {
	name: "groupinfo",
	isGroup: true,
	run: async(p) => {
		try {
			let chat = await p.msg.getChat();

			p.reply(`*Detail Grup*\n - Nama : *${chat.name}*`
				+ `\n - Deskripsi : *${chat.description}*`
				+ `\n - Dibuat pada : *${chat.createdAt.toString()}*`
				+ `\n - Dibuat oleh : *${chat.owner.user}*`
				+ `\n - Jumlah peserta : *${toFancyNum(chat.participants.length)}*`
            );
		} catch (e) {
			console.error(e);
		}
	}
}