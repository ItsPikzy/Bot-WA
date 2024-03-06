/*
 * RMT Bot for Discord
 * Copyright (C) 2023 Pikzyy
 */

const util = require("util");

module.exports = {
  name:"eval",
  alias: ["e", "ev"],
  deskripsi: "Evaled some code",
  usage: ["eval <code>"],
  owners: true,
  cd: 1,
  
  run: async(p) => {
    try {
      const { args, flags } = parseQuery(p.args);
      try {
        if (!args.length) throw new TypeError(`!eval <code>`);
        let code = args.join(" ");
        let depth = 0;
        if (flags.includes("async")) code = `(async() => { ${code} })()`;
        if (flags.some(x => x.includes("depth"))) {
          depth = flags.find(x => x.includes("depth")).split("=")[1];
          depth = parseInt(depth, 10);
        }
        let { evaled, type } = await parseEval(eval(code));
        if (flags.includes("silent")) return;
        if (typeof evaled !== "string") evaled = util.inspect(evaled, { depth });
        evaled = evaled.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);

        p.reply(evaled);
      } catch (e) {
      	p.reply(`${e}`);
      }
    } catch (e) {
		  logErrorBot(e);
    }
  }
}

async function parseEval(input) {
  const isPromise = input instanceof Promise && typeof input.then === "function" && typeof input.catch === "function";
  if (isPromise) {
    input = await input;
    return { evaled: input, type: `Promise<${parseType(input)}>` }
  }
  return { evaled: input, type: parseType(input) }
}

function parseType(input) {
  if (input instanceof Buffer) {
    let length = Math.round(input.length / 1024 / 1024);
    let ic = "MB";
    if (!length) {
      length = Math.round(input.length / 1024);
      ic = "KB";
    }
    if (!length) {
      length = Math.round(input.length);
      ic = "Bytes";
    }
    return `Buffer (${length} ${ic})`;
  }
  return input === null || input === undefined ? "Void" : input.constructor.name;
}

function parseQuery(queries) {
  const args = [], flags = [];
  for (const query of queries) {
    if (query.startsWith("--")) flags.push(query.slice(2).toLowerCase())
    else args.push(query)
  }
  return { args, flags }
}