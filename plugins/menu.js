const config = require("../settings/config");
const fs = require("fs");
const path = require("path");

module.exports = {
    command: ["menu", "help", "mainmenu"],
    execute: async (sock, m, args, { reply }) => {
        try {
            const pluginFolder = path.join(__dirname, "../plugins");
            if (!fs.existsSync(pluginFolder)) return reply("❌ Plugins folder not found!");
            
            const pluginFiles = fs.readdirSync(pluginFolder).filter(file => file.endsWith(".js"));
            
            // Runtime Calculation
            const runtime = process.uptime();
            const hours = Math.floor(runtime / 3600);
            const minutes = Math.floor((runtime % 3600) / 60);
            const seconds = Math.floor(runtime % 60);

            // Group Link na ID yako
            const inviteLink = "https://chat.whatsapp.com/HsWMMyTxvi35AooYo4Qz1U";
            const groupJid = "120363425077689217@g.us";

            let menuHeader = `*╭┄┄✪ DARKX-MINI ✪┄┄⊷*\n`;
            menuHeader += `*┃❂┬┄✯✯✯✯✯✯✯✯*\n`;
            menuHeader += `*┃❂┊ Owner:* ${config.ownerName}\n`;
            menuHeader += `*┃❂┊ Baileys:* Mᴜʟᴛɪ Dᴇᴠɪᴄᴇ\n`;
            menuHeader += `*┃❂┊ Date:* ${new Date().toLocaleDateString()}\n`;
            menuHeader += `*┃❂┊ Runtime:* ${hours}h ${minutes}m ${seconds}s\n`;
            menuHeader += `*┃❂┊ Prefix:* ${config.prefix}\n`;
            menuHeader += `*┃❂┊ Commands:* ${pluginFiles.length}\n`;
            menuHeader += `*┃❂┊ Status:* *Oɴʟɪɴᴇ*\n`;
            menuHeader += `*┃❂┴┄✯✯✯✯✯✯✯✯*\n`;
            menuHeader += `*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊷*\n\n`;

            let commandsList = `*╭┈┈┄❂ ALL COMMANDS ❂┄┄┄◈*\n`;
            
            // Safe loop kusoma commands
            for (const file of pluginFiles) {
                try {
                    const plugin = require(path.join(pluginFolder, file));
                    if (plugin.command) {
                        const cmdName = Array.isArray(plugin.command) ? plugin.command[0] : plugin.command;
                        commandsList += `*┋⬡ ${config.prefix}${cmdName}*\n`;
                    }
                } catch (err) {
                    // Skip errors katika plugin moja ili bot isife
                    continue;
                }
            }
            
            commandsList += `*╰┄┄┄┄┄┈┈┈┈┄┄┄◈*\n\n`;
            commandsList += `> _"Mwana wa Mzee King Project"_`;

            const hackerImage = "https://wallpapercave.com/wp/wp4503323.jpg";

            await sock.sendMessage(m.chat, { 
                image: { url: hackerImage }, 
                caption: menuHeader + commandsList,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    externalAdReply: {
                        title: "JOIN AI TIPS.. HQ",
                        body: "Build music videos for free with us!",
                        mediaType: 1,
                        thumbnailUrl: hackerImage,
                        sourceUrl: inviteLink,
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
            }, { quoted: m });

        } catch (globalErr) {
            console.error("Menu Crash Protection:", globalErr);
            reply("❌ Error opening menu. Check console.");
        }
    }
};
