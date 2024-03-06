/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

module.exports = {
	name: "join",
	owners: true,
	run: async(p) => {
		try {
			const invite = p.args.join(' ');
			if(!invite) return p.reply("Mohon berikan link invite yang valid!");
			try {
        await p.client.acceptInvite(inviteCode);
        p.reply(`Berhasil bergabung ke grup melalui link yang Anda berikan`);
      } catch (e) {
        p.reply(`Kode undangan itu tampaknya tidak valid.\nError: *_${e.message}_*`);
      }
		} catch (e) {
			console.error(e);
		}
	}
}