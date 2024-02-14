/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

module.exports = {
	name: "uptime",
	alias: ["up"],
	deskripsi: 'Shows bot uptime.',

	run: (p) => {
		try {
			p.reply(`Uptime : *${prettyMs(process.uptime() * 1000, { secondsDecimalDigits: 0, verbose: true })}*`)
		} catch (e) {
			console.error(e);
		}
	}
}