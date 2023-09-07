/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzyy
 */

let lock = {};

exports.msgUtil = msgUtil;
async function msgUtil(msg, contact) {
	try {
		if(!msg.body || !msg.body.toLowerCase) return;

    const contact = await msg.getContact();
    contact.number = contact.number != undefined ? contact.number : contact.id.user;

		if(!msg.body.toLowerCase().startsWith(thisConfig.prefix.toLowerCase())) return;

    const args = msg.body.slice(thisConfig.prefix.toLowerCase().length).trim().split(/ +/gu);
    const cmd = args.shift().toLowerCase();
    if(!cmd.length) return;
    let cmds = client.cmd.get(cmd);
    if(!cmds) cmds = client.cmd.find((cmdc) => cmdc.alias && cmdc.alias.includes(cmd));
    if(cmds) {
    	const param = msgInitParam(msg, args, cmds, contact);
    	//console.log(`${param.userContact.number} - ${param.userContact.name || param.userContact.pushname} : use commands ${cmds.name}`);

    	if(cmds.owners) {
    		if(!thisConfig.ownersWA.includes(param.userContact.number)) return;
    	}
    	if(param.command.cooldowns.has(param.userContact.number)) {
    		const now = Date.now();
        const Time = param.command.cooldowns.get(param.userContact.number);
        let time = Time - now;
        if(time > 20000) time = 20000;
        else if(time < 1000) time = 1000;

        if(Time > now) {
          if(!lock[param.cooldown_key]) {
            lock[param.cooldown_key] = true;
            param.reply(`Hi @${param.userContact.number}! slow down and try the command again in *${prettyMs(Time - now, { verbose: true, })}*.`, { mentions: [contact]});
          }
          return;
        }
        param.deleteCooldown();
	    } else {
        param.deleteCooldown();
        param.setCooldown();
	    }
      if(cmds.isGroup) {
        const groupChat = await msg.getChat();
        if(groupChat.isGroup) {
          if(cmds.botAdmin) {
            const botChatObj = groupChat.participants.find(chatObj => chatObj.id.user === WhatsApp.info.wid.user);
            if(!botChatObj.isAdmin) return param.reply("Saya tidak dapat menjalankan perintah dikarenakan saya bukan admin grup!");
          } else if(cmds.userAdmin) {
            const userChatObj = groupChat.participants.find(chatObj => chatObj.id.user === msg.author);
            if(!userChatObj.isAdmin) return param.reply("Saya tidak dapat menjalankan perintah dikarenakan Anda bukan admin grup!");
          }
        } else {
          return param.reply("Perintah ini hanya dapat digunakan dalam grup!")
        }
      }
    	try {
        cmds.run(param);
    	} catch (e) {
    		console.error(e);
    	}
    }
	} catch (e) {
		console.error(e);
	}
}

exports.msgInitParam = msgInitParam;
function msgInitParam(message, args, cmds, contact) {
	const param = {
    msg: message,
    args: args,
    command: cmds,
    userContact: contact,
    user: message.author || message.from,
    fromMe: message.fromMe,
    mentions: message.mentionedIds,
    reply: replyMessage(message),
    send: sendMessage(message)
	}
	

	const key = 'cd_' + param.command.name + '_' + param.userContact.number;
	param.cooldown_key = key;

	param.setCooldown = setCooldown(param);
	param.deleteCooldown = deleteCooldown(param, key)
	return param;
}

const replyMessage = function(message) {
	return function(msg, options = {}) {
		const chatid = message._getChatId();
		return message.reply(msg, chatid, options);
	}
}

const sendMessage = function(message) {
	return function(msg, options = {}) {
		if(message.fromMe) return WhatsApp.sendMessage(message.to, msg, options);
		else return WhatsApp.sendMessage(message.from, msg, options);
	}
}

const setCooldown = function(param) {
  return function(cd = 0) {
    if(isInt(cd) && parseInt(cd) > 0) {
      param.command.cooldowns.set(param.userContact.number, Date.now() + (parseInt(cd) * 1000));
      setTimeout(() => param.deleteCooldown(), parseInt(cd) * 1000);
    } else {
      param.command.cooldowns.set(param.userContact.number, Date.now() + param.command.cd);
      setTimeout(() => param.deleteCooldown(), param.command.cd);
    }
  }
}
  
const deleteCooldown = function(param, key) {
  return function() {
    if(param.command.cooldowns.has(param.userContact.number)) {
      param.command.cooldowns.delete(param.userContact.number);
    }
    if(lock[key]) {
      delete lock[key];
    }
  }
}