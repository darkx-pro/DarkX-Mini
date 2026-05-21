const config = require("../settings/config");
const fs = require("fs");
const path = require("path");

module.exports = {
    command: ["menu", "help", "mainmenu", "hali"],
    category: "main",
    execute: async (sock, m, { args, reply }) => {
        try {
            const pluginFolder = path.join(__dirname, "../plugins");
            const pluginFiles = fs.readdirSync(pluginFolder).filter(file => file.endsWith(".js"));
            
            // Runtime Calculation
            const runtime = process.uptime();
            const hours = Math.floor(runtime / 3600);
            const minutes = Math.floor((runtime % 3600) / 60);
            const seconds = Math.floor(runtime % 60);

            const inviteLink = "https://chat.whatsapp.com/HsWMMyTxvi35AooYo4Qz1U";
            const imagePath = path.resolve(__dirname, "../media/repo.jpg");
            const audioPath = path.resolve(__dirname, "../media/repo.mp3");

            // --- FANCY MENU HEADER ---
            let menuHeader = `┏━━━━━━━◥◣◆◢◤━━━━━━━┓\n`;
            menuHeader += `     *DΛЯKX ЦᄂƬЯΛ V6.0*\n`;
            menuHeader += `┗━━━━━━━◥◣◆◢◤━━━━━━━┛\n\n`;
            menuHeader += `*〔 👤 Oᴡɴᴇʀ 〕:* ${config.ownerName}\n`;
            menuHeader += `*〔 📅 Dᴀᴛᴇ 〕:* ${new Date().toLocaleDateString()}\n`;
            menuHeader += `*〔 ⏳ Rᴜɴᴛɪᴍᴇ 〕:* ${hours}h ${minutes}m ${seconds}s\n`;
            menuHeader += `*〔 📂 Cᴍᴅs 〕:* ${pluginFiles.length}\n`;
            menuHeader += `*〔 📶 Sᴛᴀᴛᴜs 〕:* *Oɴʟɪɴᴇ*\n\n`;

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
                } catch (err) { continue; }
            }

            let commandsList = "";
            for (const cat in categories) {
                commandsList += `*╭┈┈┄❂ ${cat} ❂┄┄┄◈*\n`;
                for (const cmd of categories[cat]) {
                    commandsList += `*┋⬡ ${config.prefix}${cmd}*\n`;
                }
                commandsList += `*╰┄┄┄┄┄┈┈┈┈┄┄┄◈*\n\n`;
            }
            
            commandsList += `> _"Mwana wa Mzee King Project"_\n`;
            commandsList += `_Type .list for Business Services_`;

            // Picha ya kutumia (Repo.jpg ikikosekana tumia URL)
            const displayImg = fs.existsSync(imagePath) ? fs.readFileSync(imagePath) : { url: "https://files.catbox.moe/pc5uec.png" };

            // Tuma Menu
            await sock.sendMessage(m.chat, { 
                image: displayImg, 
                caption: menuHeader + commandsList,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    externalAdReply: {
                        title: "DARKX-ULTRA SYSTEM",
                        body: "Multi-Device WhatsApp Solution",
                        mediaType: 1,
                        thumbnail: fs.existsSync(imagePath) ? fs.readFileSync(imagePath) : { url: "https://files.catbox.moe/pc5uec.png" },
                        sourceUrl: inviteLink,
                        renderLargerThumbnail: true,
                        showAdAttribution: true
                    }
                }
            }, { quoted: m });

            // Tuma Audio ya Menu (Optional - ili iwe detailed zaidi)
            if (fs.existsSync(audioPath)) {
                await sock.sendMessage(m.chat, { 
                    audio: fs.readFileSync(audioPath), 
                    mimetype: 'audio/mpeg',
                    fileName: 'DarkX_Menu.mp3'
                }, { quoted: m });
            }

        } catch (globalErr) {
            console.error("Menu Crash Protection:", globalErr);
            reply("❌ System Error: Menu failed to load.");
        }
    }
};
