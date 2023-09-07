/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzyy
 */

module.exports = async(call) => {
    console.log('Call received, rejecting. GOTO Line 261 to disable', call);
    if(call.fromMe) {
    	await call.reject();
    	await client.sendMessage(call.from, `[Outgoing] Phone call from ${call.from}, type ${call.isGroup ? 'group' : ''} ${call.isVideo ? 'video' : 'audio'} call. This call was automatically rejected by the script.`);
	} else if(!call.fromMe) {
		await call.reject();
		await client.sendMessage(call.from, `[Incoming] Phone call from ${call.from}, type ${call.isGroup ? 'group' : ''} ${call.isVideo ? 'video' : 'audio'} call. This call was automatically rejected by the script.`);
	}
}