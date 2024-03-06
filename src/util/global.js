/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

const { readdirSync } = require('fs');

for (const file of readdirSync(`./src/util/global/`).filter((file) => file.endsWith('.js'))) {
  const files = require(`@util/global/${file}`);
  if(getType(files) == "Object") {
    Object.assign(global, files)
    //console.log(`Loaded global ${file}, is Object! (${Object.keys(files).length} object)`)
  } else console.log(`Unloaded global ${file}, is not Object!`)
  delete require.cache[require.resolve(`@util/global/${file}`)];
}

function getType(obj){
  return Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1];
}