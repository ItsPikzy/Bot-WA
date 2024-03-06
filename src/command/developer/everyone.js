/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

module.exports = {
	name: "everyone",
	owners: true,
  isGroup: true,
	run: async(p) => {
		try {
			const chat = await p.msg.getChat();
      let members = [];
    	let mentions = [];

      for(let participant of chat.participants) {
        const contact = await p.client.getContactById(participant.id._serialized);

        mentions.push(contact);
        if(participant.id.user != p.userContact.number) members.push(`• @${participant.id.user}`);
      }

      p.reply(`Hi @${p.userContact.number}, berhasil di tag sebanyak *${members.length}* peserta\n\n${members.join("\n")}`, { mentions });
		} catch (e) {
			console.error(e);
		}
	}
}