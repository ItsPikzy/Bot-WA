/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

module.exports = {
  name: "sticker",
  cd: 10,
  run: async(p) => {
    try {
      const quotedMsg = await p.msg.getQuotedMessage(); 
      if(!(p.msg.hasQuotedMsg && quotedMsg.hasMedia)) return p.reply('Anda harus membalas gambar dahulu.');

      p.reply('*[⏳]* Sedang membuat sticker.');
      try {
        const media = await quotedMsg.downloadMedia();
        p.send(media, {
          sendMediaAsSticker: true,
          stickerName: 'Pikzy',
          stickerAuthor: 'Pikzy'
        }).then(() => {
          p.send('*[✅]* Berhasil membuat sticker.');
        })
      } catch {
        console.error(e);
        p.send('*[❎]* Gagal membuat sticker.');
      }
    } catch (e) {
      console.error(e);
    }
  }
}