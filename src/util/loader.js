/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

const { readdirSync } = require('fs');

module.exports = (client, clientId = 0) => {
  for (const cat of readdirSync('./src/event/')) {
    if(cat == "util") continue;
    for (const file of readdirSync(`./src/event/${cat}/`).filter((file) => file.endsWith('.js'))) {
      const event = require(`@src/event/${cat}/${file}`);
      client.on(file.split('.')[0], event.bind(null, client, clientId));
      delete require.cache[require.resolve(`@src/event/${cat}/${file}`)];
    }
  }

  for(const cat of readdirSync('./src/command/')) {
    for (const file of readdirSync(`./src/command/${cat}`).filter((file) => file.endsWith('.js'))) {
      let props = require(`@src/command/${cat}/${file}`);
      props.cd = (props.cd || thisConfig.cd_command) * 1000;
      props.path = cat;

      if(props.name) {
        if(!client.cooldowns.has(props.name)) {
          client.cooldowns.set(props.name, new Map());
          props.cooldowns = client.cooldowns.get(props.name);
        }

        if(props.run) {
          client.commands.set(props.name, props)
        }
      }
      delete require.cache[require.resolve(`@src/command/${cat}/${file}`)];
    }
  }
}