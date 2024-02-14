/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

module.exports = {
  name: "steal",
  cd: 10,
  run: async(p) => {
    try {
      const quotedMsg = await p.msg.getQuotedMessage(); 
      if(!(p.msg.hasQuotedMsg && quotedMsg.hasMedia)) return p.reply('Anda harus membalas gambar dahulu.');

      try {
        const media = await quotedMsg.downloadMedia();
        p.reply(media, {
          caption: quotedMsg.body.length >= 0 ? quotedMsg.body : 'Gada caption'
        });
      } catch {
        console.error(e);
        p.reply('*[❎]* Gagal memuat gambar.');
      }
    } catch (e) {
      console.error(e);
    }
  }
}