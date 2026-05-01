const config = require("../settings/config");
const fs = require("fs");
const path = require("path");

module.exports = {
    command: ["menu", "help", "mainmenu"],
    execute: async (sock, m, { args, reply }) => { // <--- FIXED: Destructuring corrected
        try {
            const pluginFolder = path.join(__dirname, "../plugins");
            if (!fs.existsSync(pluginFolder)) return reply("❌ Plugins folder not found!");
            
            const pluginFiles = fs.readdirSync(pluginFolder).filter(file => file.endsWith(".js"));
            
            // Runtime Calculation
            const runtime = process.uptime();
            const hours = Math.floor(runtime / 3600);
            const minutes = Math.floor((runtime % 3600) / 60);
            const seconds = Math.floor(runtime % 60);

            const inviteLink = "https://chat.whatsapp.com/HsWMMyTxvi35AooYo4Qz1U";

            let menuHeader = `*╭┄┄✪ DARKX-MINI ✪┄┄⊷*\n`;
            menuHeader += `*┃❂┬┄✯✯✯✯✯✯✯✯*\n`;
            menuHeader += `*┃❂┊ Owner:* ${config.ownerName}\n`;
            menuHeader += `*┃❂┊ Date:* ${new Date().toLocaleDateString()}\n`;
            menuHeader += `*┃❂┊ Runtime:* ${hours}h ${minutes}m ${seconds}s\n`;
            menuHeader += `*┃❂┊ Prefix:* ${config.prefix}\n`;
            menuHeader += `*┃❂┊ Commands:* ${pluginFiles.length}\n`;
            menuHeader += `*┃❂┊ Status:* *Oɴʟɪɴᴇ*\n`;
            menuHeader += `*┃❂┴┄✯✯✯✯✯✯✯✯*\n`;
            menuHeader += `*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊷*\n\n`;

            // Kutenganisha Commands kwa Category
            let categories = {};
            
            for (const file of pluginFiles) {
                try {
                    const plugin = require(path.join(pluginFolder, file));
                    if (plugin.command) {
                        const cmdName = Array.isArray(plugin.command) ? plugin.command[0] : plugin.command;
                        const cat = plugin.category ? plugin.category.toUpperCase() : "OTHER";
                        
                        if (!categories[cat]) categories[cat] = [];
                        categories[cat].push(cmdName);
                    }
                } catch (err) {
                    continue;
                }
            }

            let commandsList = "";
            for (const cat in categories) {
                commandsList += `*╭┈┈┄❂ ${cat} ❂┄┄┄◈*\n`;
                for (const cmd of categories[cat]) {
                    commandsList += `*┋⬡ ${config.prefix}${cmd}*\n`;
                }
                commandsList += `*╰┄┄┄┄┄┈┈┈┈┄┄┄◈*\n\n`;
            }
            
            commandsList += `> _"Mwana wa Mzee King Project"_`;

            // Picha ya Hacker (Cyberpunk Style)
            const hackerImage = "https://files.catbox.moe/pc5uec.png"; 

            await sock.sendMessage(m.chat, { 
                image: { url: hackerImage }, 
                caption: menuHeader + commandsList,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    externalAdReply: {
                        title: "DARKX-MINI SYSTEM",
                        body: "Mwana wa Mzee King Project",
                        mediaType: 1,
                        thumbnailUrl: hackerImage,
                        sourceUrl: inviteLink,
                        renderLargerThumbnail: true, // Nimeiweka TRUE ili picha iwe kubwa na ivutie
                        showAdAttribution: true
                    }
                }
            }, { quoted: m });

        } catch (globalErr) {
            console.error("Menu Crash Protection:", globalErr);
            // Ikishindikana kabisa, tumia reply ya kawaida
            sock.sendMessage(m.chat, { text: "❌ Error opening menu. Check console." }, { quoted: m });
        }
    }
};
