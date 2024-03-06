/*
 * Bot RMT for Discord
 * Copyright (C) 2023 Pikzy
 */

const { MessageMedia } = require('whatsapp-web.js');
const mime = require('mime-types');
const fs = require('fs');

const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const unlinkAsync = util.promisify(fs.unlink);

const cachePath = `${process.cwd()}/.cache`;

module.exports = {
  name: 'steal',
  cd: 10,
  run: async(p) => {
    try {
      const message = await p.msg.getQuotedMessage();
      if(!message || !message.hasMedia || message._data.isViewOnce !== true) return p.reply('Anda harus membalas pesan 1x lihat terlebih dahulu.');

      const media = await message.downloadMedia();
      if(['video'].includes(message.type)) {
        await mediaToMp4(p.client, media.data, media.mimetype);

        const output = MessageMedia.fromFilePath(cachePath + '/output.mp4');
        p.reply(output, {
          caption: message.body ? `${message.body}` : null,
        });
        fs.unlinkSync(cachePath + '/output.mp4');
      } else {
        p.reply(media, {
          caption: message.body ? `${message.body}` : null,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
}

async function mediaToMp4(client, base64, mimeType) {
  try {
    const buffer = Buffer.from(base64, 'base64');
    const extension = mime.extension(mimeType) || 'unknown';
    const inputFileName = cachePath + `/input.${extension}`;
    const outputFileName = cachePath + `/output.mp4`;

    await writeFileAsync(inputFileName, buffer);

    await new Promise((resolve, reject) => {
      client.ffmpeg()
        .input(inputFileName)
        .outputOptions([
          "-pix_fmt yuv420p",
          "-c:v libx264",
          "-movflags +faststart",
          "-filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2'",
        ])
        .output(outputFileName)
        .on('end', () => {
          resolve();
        })
        .on('error', (err) => {
          console.error(err);
          reject(err);
        })
        .run();
    });

    await unlinkAsync(inputFileName);
  } catch (error) {
    console.error(error);
    throw error;
  }
}