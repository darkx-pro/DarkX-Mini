const config = require("./settings/config");
const fs = require("fs");
const path = require("path");

module.exports = async (sock, m, chatUpdate) => {
    try {
        const { type, fromMe, chat, sender, body } = m;
        const isCmd = body.startsWith(config.prefix);
        const command = isCmd ? body.slice(config.prefix.length).trim().split(/ +/).shift().toLowerCase() : "";
        const args = body.trim().split(/ +/).slice(1);

        // Basic Command Example
        if (command === "ping") {
            await sock.sendMessage(chat, { text: "DarkX-minBot Speed: 0.22ms" });
        }

        // Plugin Loader Logic
        const pluginFolder = path.join(__dirname, "plugins");
        const pluginFiles = fs.readdirSync(pluginFolder).filter(file => file.endsWith(".js"));

        for (const file of pluginFiles) {
            const plugin = require(path.join(pluginFolder, file));
            if (plugin.command && plugin.command.includes(command)) {
                await plugin.execute(sock, m, args);
            }
        }
    } catch (err) {
        console.error("Error in message.js:", err);
    }
};
