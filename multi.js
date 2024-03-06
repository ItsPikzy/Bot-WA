/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

require('dotenv').config();
require('module-alias/register');

global.thisConfig = require('@src/config.js');

require('@util/global');
require('@util/util');

const { version } = require('@root/package.json');
const { Client, LocalAuth } = require('whatsapp-web.js');
const eventLoad = require('@util/loader.js');

// FFmpeg
const ffmpeg = require("fluent-ffmpeg");
const ffprobe = require("@ffprobe-installer/ffprobe");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffmpegs = require("ffmpeg-static");
ffmpeg.setFfprobePath(ffprobe.path);
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const CLIENT_SIZE = 2;
const clientWA = [];

for(let clientId = 0; clientId < CLIENT_SIZE; clientId++) {
  console.log(`Client ID ${clientId} : Sedang membuat client.....`);
  class BotWhatsApp extends Client {
    constructor() {
      super({
        restartOnAuthFail: true,
        puppeteer: {
          headless: true,
          args: /*[ '--no-sandbox', '--disable-setuid-sandbox' ], */ [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't works in Windows
            '--disable-gpu'
          ],
          ignoreDefaultArgs: ['--disable-extensions'],
          executablePath: '/usr/bin/chromium-browser', // sesuain sama hosting, make linux apa windows
          //executablePath: '/usr/bin/google-chrome',
        },
        //ffmpeg: '/root/ffmpeg.exe',
        ffmpegPath: ffmpegs,
        authStrategy: new LocalAuth({
          clientId: `client-${clientId}`
        })
      });

      this.name = 'Chloe Xaviera';
      this.version = version;
      this.readyTimestamp = null;

      this.wait = require('util').promisify(setTimeout);

      const conf = this;
      this.on('ready', () => {
        conf.readyTimestamp = Date.now();
      });

      this.on('disconnected', () => {
        conf.restart();
      });

      this.cooldowns = new Map();
      this.commands = new Map();
      this.ffmpeg = ffmpeg;
    }

    get readyAt() {
      return this.readyTimestamp && new Date(this.readyTimestamp);
    }

    get uptime() {
      return this.readyTimestamp && Date.now() - this.readyTimestamp;
    }

    get readyToRestart() {
      return this.readyTimestamp && Date.now() - this.readyTimestamp >= 21600000;
    }

    async restart() {
      if(this.readyAt) {
        console.log(`Client ID ${clientId} : Restarting.......`);
        this.readyTimestamp = null;
        await this.destroy();
        await this.wait(20000); // waktu tunggu 20 detik
        await this.initialize();
        return true;
      } else return false;
    }
  }

  global.client = new BotWhatsApp();
  client.initialize();
  clientWA.push(client); // push multi client
  eventLoad(client, clientId);
}

global.thisConfig = require('./src/config.js');