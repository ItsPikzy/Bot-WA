/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

exports.cooldowns = new Map();
exports.prettyMs = require('pretty-ms');

exports.isInt = isInt;
function isInt(value) {
	return (
    !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value,10))
  )
}

exports.toFancyNum = toFancyNum;
function toFancyNum(num, options = {}) {
  let split = ".", format = ",";
  if(options.split) split = options.split;
  if(options.format) format = options.format;
  
  var parts = num.toString().split(split);
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, format);
	return parts.join('.');
}

exports.isValidURL = isValidURL;
function isValidURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res != null)
}

exports.trimString = trimString;
function trimString(arr, maxLen = '128', v) {
  if (arr.length > maxLen) {
    const len = arr.length - maxLen;
    const len2 = v ? '...' : `(${toFancyNum(len)} more text...)`;
    return (`${arr.substring(0, (len2.length > maxLen ? (maxLen > 10 ? maxLen - 1 : maxLen) : maxLen - len2.length - 1))} ${len2}`).toString();
  } else return arr.toString();
}

exports.RandomStr = RandomStr;
function RandomStr(length = 5) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for(var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}