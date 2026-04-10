const config = require("../settings/config");

module.exports = {
    command: ["menu", "help"],
    execute: async (sock, msg, args) => {
        const from = msg.key.remoteJid;
        const txt = `乂  *D A R K X  -  M I N I* 乂\n\n` +
                    `┌  Owner: ${config.ownerName}\n` +
                    `│  Prefix: ${config.prefix}\n` +
                    `└  Status: Online\n\n` +
                    `*COMMAND LIST*\n` +
                    `> .ping\n` +
                    `> .menu\n` +
                    `> .owner`;
        await sock.sendMessage(from, { text: txt });
    }
};
