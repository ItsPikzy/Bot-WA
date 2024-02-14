/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

require('dotenv').config();
require('module-alias/register');

const { Client, LocalAuth, RemoteAuth } = require('whatsapp-web.js');/*
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const store = new MongoStore({ mongoose: mongoose });*/

class BotWhatsApp extends Client {
  constructor() {
    super({
      restartOnAuthFail: true,
      puppeteer: {
        headless: true,
        args: [ '--no-sandbox', '--disable-setuid-sandbox' ], /*[
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process', // <- this one doesn't works in Windows
          '--disable-gpu'
        ],*/
        //ignoreDefaultArgs: ['--disable-extensions'],
        //executablePath: '/usr/bin/chromium-browser',
        //executablePath: '/usr/bin/google-chrome',
      },
      ffmpeg: './ffmpeg.exe',
      authStrategy: new LocalAuth() /*new RemoteAuth({
        store: store,
        backupSyncIntervalMs: 1000000,
      })*/
    });

    this.name = 'Chloe Xaviera';
    this.version = '0.1.3';
    this.readyTimestamp = null;

    const conf = this;
    this.on('ready', () => {
      conf.readyTimestamp = Date.now();
    });

    this.on('disconnected', () => {
      conf.readyTimestamp = null;
    });

    this.cooldowns = new Map();
    this.commands = new Map();
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

  restart() {
    if(this.readyAt) {
      this.readyTimestamp = null;
      this.destroy();
      this.initialize();
      return true;
    } else return false;
  }
}

global.client = new BotWhatsApp();
global.thisConfig = require('./src/config.js');
client.initialize();

require('@util/global.js');