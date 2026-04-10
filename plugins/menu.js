const config = require("../settings/config");
const fs = require("fs");
const path = require("path");

module.exports = {
    command: ["menu", "help"],
    execute: async (sock, m, args, { reply }) => {
        const pluginFolder = path.join(__dirname, "../plugins");
        const pluginFiles = fs.readdirSync(pluginFolder).filter(file => file.endsWith(".js"));
        
        let menuText = `乂  *D A R K X  -  M I N I* 乂\n\n`;
        menuText += `┌  Owner: ${config.ownerName}\n`;
        menuText += `│  Prefix: ${config.prefix}\n`;
        menuText += `└  Status: Online\n\n`;
        menuText += `*COMMAND LIST*\n`;

        // Hapa inasoma kila faili kwenye plugins na kuweka kwenye menu kiotomatiki
        pluginFiles.forEach(file => {
            const plugin = require(path.join(pluginFolder, file));
            if (plugin.command) {
                const cmdName = Array.isArray(plugin.command) ? plugin.command[0] : plugin.command;
                menuText += `> ${config.prefix}${cmdName}\n`;
            }
        });

        menuText += `\n_Sleep is for bugs, I kill them._`;

        // Nimetumia link ya picha ya kweli ya Cyberpunk hapa
        const liveImage = "https://wallpapercave.com/wp/wp4503323.jpg";

        await sock.sendMessage(m.chat, { 
            image: { url: liveImage }, 
            caption: menuText 
        }, { quoted: m });
    }
};
