/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

module.exports = {
	name: "stats",
	alias: ["botinfo"],
	cd: 30,
	run: async(p) => {
		try {
			const chats = await p.client.getChats();
			let info = p.client.info;

      let text = `*Connection info*`;
      text += `\n - User name: *${info.pushname}*`;
      text += `\n - My number: *${info.wid.user}*`;
      text += `\n - Platform: *${info.platform}*`;

      text += `\n\n*Information*`;
      text += `\n - Created by : *Pikzy*`;
      text += `\n - Chat Open : *${chats.length}*`;
      text += `\n - Bot CPU Usage : *${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%*`;
      text += `\n - Bot Memory Usage : *${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB*`;
      text += `\n - Node CPU Usage : *${(process.cpuUsage().user / 1024 / 1024).toFixed(2)}%*`;
      text += `\n - Uptime Bot : *${prettyMs(process.uptime() * 1000, { secondsDecimalDigits: 0, verbose: true })}*`;

      p.reply(text);
		} catch (e) {
			console.error(e);
		}
	}
}