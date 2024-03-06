/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

let lock = {};

exports.msgUtil = msgUtil;
async function msgUtil(client, clientId, msg) {
	try {
		if(!msg.body || !msg.body.toLowerCase) return;
		if(!msg.body.toLowerCase().startsWith(thisConfig.prefix.toLowerCase())) return;

    const args = msg.body.slice(thisConfig.prefix.toLowerCase().length).trim().split(/ +/gu);
    const cmd = args.shift().toLowerCase();
    if(!cmd.length) return;
    let cmds = client.commands.get(cmd);
    if(!cmds) cmds = client.commands.find((cmdc) => cmdc.alias && cmdc.alias.includes(cmd));
    if(cmds) {
      const contact = await msg.getContact();
      contact.number = contact.number != undefined ? contact.number : contact.id.user;

    	const param = msgInitParam(client, clientId, msg, args, cmds, contact);
    	//console.log(`${param.userContact.number} - ${param.userContact.name || param.userContact.pushname} : use commands ${cmds.name}`);

    	if(cmds.owners) {
    		if(!thisConfig.ownersWA.includes(param.userContact.number)) return;
    	}

    	if(param.command.cooldowns.has(param.userContact.number) && !thisConfig.ownersWA.includes(param.userContact.number)) {
    		const now = Date.now();
        const Time = param.command.cooldowns.get(param.userContact.number);
        let time = Time - now;
        if(time > 20000) time = 20000;
        else if(time < 1000) time = 1000;

        if(Time > now) {
          if(!lock[param.cooldown_key]) {
            lock[param.cooldown_key] = true;
            param.reply(`Hi @${param.userContact.number}! Pelan-pelan dan coba perintah itu lagi dalam *${prettyMs(Time - now)}*.`, { mentions: [contact]});
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
            const botChatObj = groupChat.participants.find(chatObj => chatObj.id.user === client.info.wid.user);
            if(!botChatObj.isAdmin) return param.reply("Saya tidak dapat menjalankan perintah dikarenakan saya bukan admin grup!");
          } else if(cmds.userAdmin) {
            const userChatObj = groupChat.participants.find(chatObj => chatObj.id.user === msg.author);
            if(!userChatObj.isAdmin) return param.reply("Saya tidak dapat menjalankan perintah dikarenakan Anda bukan admin grup!");
          }
        } else {
          return param.reply("Perintah ini hanya dapat digunakan dalam grup!")
        }
      }

      cmds.run(param);
    }
	} catch (e) {
		console.error(e);
	}
}

exports.msgInitParam = msgInitParam;
function msgInitParam(client, clientId, message, args, cmds, contact) {
	const param = {
    client, clientId,
    msg: message,
    args: args,
    command: cmds,
    userContact: contact,
    user: message.author || message.from,
    fromMe: message.fromMe,
    mentions: message.mentionedIds,
    reply: replyMessage(message),
    send: sendMessage(client, message)
	}
	

	const key = 'cd_' + param.command.name + '_' + param.userContact.number;
	param.cooldown_key = key;

	param.setCooldown = setCooldown(param);
	param.deleteCooldown = deleteCooldown(param, key)
	return param;
}

const replyMessage = function(message) {
	return function(msg, options = {}) {
    return new Promise(function(resolve, reject) {
  		const chatid = message._getChatId();
  		message.reply(msg, chatid, options).then(resolve, reject);
    });
  }
}

const sendMessage = function(client, message) {
	return function(msg, options = {}) {
    return new Promise(function(resolve, reject) {
  		if(message.fromMe) {
        client.sendMessage(message.to, msg, options).then(resolve, reject);
  		} else {
        client.sendMessage(message.from, msg, options).then(resolve, reject);
      }
    });
	}
}

const setCooldown = function(param) {
  return function(cd = 0) {
    if(isInt(cd) && parseInt(cd) > 0) {
      param.command.cooldowns.set(param.userContact.number, Date.now() + (parseInt(cd) * 1000));
    } else {
      param.command.cooldowns.set(param.userContact.number, Date.now() + param.command.cd);
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