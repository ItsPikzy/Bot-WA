/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

module.exports = {
	name: "hidetag",
	owners: true,
  isGroup: true,
	run: async(p) => {
		try {
			const text = p.args.join(' ');
			if(!text) return p.reply("Mohon berikan teks untuk di balas kembali oleh bot!");
			if(text.length > 300) return p.reply('Bot hanya bisa menerima 300 karakter saja!');

			const chat = await p.msg.getChat();
      let members = [];
    	let mentions = [];

      for(let participant of chat.participants) {
        const contact = await p.client.getContactById(participant.id._serialized);

        mentions.push(contact);
        if(participant.id.user != p.userContact.number) members.push(`• @${participant.id.user}`);
      }

      p.reply(`${text}\n\n_Made by @${p.userContact.number}_`, { mentions });
		} catch (e) {
			console.error(e);
		}
	}
}