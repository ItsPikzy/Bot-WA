/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

module.exports = {
	name: "setdescription",
	alias: ["setdesc", "setdesk", "setdeskripsi"],
	isGroup: true,
	botAdmin: true,
	userAdmin: true,
	run: async(p) => {
		try {
			let chat = await p.msg.getChat();
			let desk = p.args.join(' ');
  		if(!desk) return p.reply("Mohon berikan deskripsi baru yang ingin diatur!");
  		if(desk.length > 2048) return p.reply("Deskripsi hanya bisa menampung 2048 karakter!");

			const success = await chat.setDescription(desk);
			if(success) p.reply("Berhasil mengganti deskripsi grup!");
			else p.reply("Tidak dapat mengganti deskripsi grup!");
		} catch (e) {
			console.error(e);
		}
	}
}