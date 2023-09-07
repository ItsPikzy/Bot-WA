/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzyy
 */

const { readdirSync } = require('fs');

module.exports = {
	name: "help",
	alias: ["h", "command"],
	cd: 60,
	run:async(p) => {
		try {
			if(!p.args.length) {
				const help = [];
        for(let category of readdirSync('./src/command/')) {
        	if(category == "developer" && !thisConfig.ownersWA.includes(p.userContact.number)) return;

          const helpCommands = [];
          for(let file of readdirSync(`./src/command/${category}`).filter(file => file.endsWith('.js'))) {
            const data = require(`@src/command/${cat}/${file}`);
            if(data.name && data.run) {
              helpCommands.push(data.name);
            }
            delete require.cache[require.resolve(`@src/command/${cat}/${file}`)];
          }

          const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
          help.push(`➡ *${categoryName} (${commandsFile.length})*\n${helpCommands.join(', ')}`);
        }
      	p.reply(`My Commands List\n\n${help.join('\n').toString()}`);
			} else {
		    let cmds = client.cmd.get(p.args[0]);
		    if(!cmds) cmds = client.cmd.find((cmdc) => cmdc.alias && cmdc.alias.includes(cmd));
        if (!cmds) p.reply(`Command tidak ditemukan`);

        p.reply(`Nama perintah : *${cmds.name}*\nAlias : *${(Array.isArray(cmds.alias)) ? cmds.alias.join(', ') : 'Alias tidak ada'}*`
          + `\nDeskripsi : *${cmds.deskripsi ? cmds.deskripsi : 'Tidak ada deskripsi'}*`
          + `\nUsage : *${cmds.usage ? cmds.usage : 'Tidak ada cara penggunaan'}*`)
			}
		} catch (e) {
			console.error(e);
		}
	}
}