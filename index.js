/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzyy
 */

require("module-alias/register");
require("dotenv").config();
const wa = require('whatsapp-web.js');

global.client = new wa.Client({
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: [
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
    //takeoverOnConflict: true,
    //takeoverTimeoutMs: 0,
    //executablePath: '/usr/bin/chromium-browser',
    //executablePath: '/usr/bin/google-chrome',
  },
  authStrategy: new wa.LocalAuth()
});
global.thisConfig = require('@src/config.js');

require('@util/global.js');

client.initialize();

global.WhatsAppUptime = Date.now();
global.WhatsAppOnline = false;

global.WhatsAppOfflineCheck = WhatsAppOfflineCheck;
function WhatsAppOfflineCheck() {
  if(WhatsAppOnline) return (Date.now() - WhatsAppUptime) >= 21530000;
  else return true;
}

setInterval(restartWhatsApp, 60000);

function restartWhatsApp() {
  if((Date.now() - WhatsAppUptime) >= 21600000) {
    WhatsAppUptime = Date.now();
    if(WhatsAppOnline) {
      WhatsAppOnline = false;
      console.log("Restarting bot!");
      client.destroy();
      client.initialize();
    }
  }
}