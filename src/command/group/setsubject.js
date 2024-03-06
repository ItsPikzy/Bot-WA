/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

module.exports = {
	name: "setsubject",
	alias: ["setjudul"],
	isGroup: true,
	botAdmin: true,
	userAdmin: true,
	run: async(p) => {
		try {
			let chat = await p.msg.getChat();
			let subject = p.args.join(' ');
  		if(!subject) return p.reply("Mohon berikan judul grup baru yang ingin diatur!");
  		if(subject.length > 100) return p.reply("Judul grup hanya bisa menampung 100 karakter!");

			const success = await chat.setSubject(subject);
			if(success) p.reply("Berhasil mengganti judul grup!");
			else p.reply("Tidak dapat mengganti judulgrup!");
		} catch (e) {
			console.error(e);
		}
	}
}