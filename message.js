const config = require("./settings/config");
const fs = require("fs");
const path = require("path");

module.exports = async (sock, m, chatUpdate) => {
    try {
        const { type, fromMe, chat, sender, body } = m;
        
        if (!body) return;
        
        const isCmd = body.startsWith(config.prefix);
        const command = isCmd ? body.slice(config.prefix.length).trim().split(/ +/).shift().toLowerCase() : "";
        const args = body.trim().split(/ +/).slice(1);
        const text = args.join(" ");
        const q = text;

        // --- 1. DHANA ZA GROUP (KUZUIA ERROR KWENYE PLUGINS) ---
        const isGroup = m.chat.endsWith('@g.us');
        const groupMetadata = isGroup ? await sock.groupMetadata(m.chat).catch(e => {}) : '';
        const groupName = isGroup ? groupMetadata.subject : '';
        const participants = isGroup ? await groupMetadata.participants : '';
        const groupAdmins = isGroup ? participants.filter(v => v.admin !== null).map(v => v.id) : [];
        
        const isAdmin = isGroup ? groupAdmins.includes(m.sender) : false;
        const isBotAdmin = isGroup ? groupAdmins.includes(sock.user.id.split(':')[0] + '@s.whatsapp.net') : false;
        const isOwner = [config.ownerNumber + '@s.whatsapp.net', sock.user.id].includes(m.sender);

        const reply = (teks) => {
            return sock.sendMessage(m.chat, { text: teks }, { quoted: m });
        };

        if (isCmd) {
            const pluginFolder = path.join(__dirname, "plugins");
            if (!fs.existsSync(pluginFolder)) fs.mkdirSync(pluginFolder);

            const pluginFiles = fs.readdirSync(pluginFolder).filter(file => file.endsWith(".js"));

            for (const file of pluginFiles) {
                try {
                    // Muhimu: Tunatumia cache-clearing ili ukibadili kodi ya plugin isihitaji kurestart bot
                    delete require.cache[require.resolve(path.join(pluginFolder, file))];
                    const plugin = require(path.join(pluginFolder, file));
                    
                    if (plugin.command && (Array.isArray(plugin.command) ? plugin.command.includes(command) : plugin.command === command)) {
                        
                        // --- 2. ULINZI WA PLUGINS (PRE-EXECUTION CHECKS) ---
                        if (plugin.isGroup && !isGroup) return reply("Amri hii ni kwa ajili ya magroup pekee!");
                        if (plugin.isAdmin && !isAdmin) return reply("Wewe siyo admin!");
                        if (plugin.isBotAdmin && !isBotAdmin) return reply("Nifanye niwe admin kwanza!");
                        if (plugin.isOwner && !isOwner) return reply("Hii ni kwa ajili ya mmiliki wangu pekee!");

                        await plugin.execute(sock, m, { 
                            args, 
                            text, 
                            q, 
                            reply, 
                            config, 
                            chatUpdate,
                            isGroup,
                            isAdmin,
                            isBotAdmin,
                            isOwner,
                            participants,
                            groupMetadata
                        });
                    }
                } catch (err) {
                    console.error(`Error kwenye plugin ${file}:`, err);
                }
            }
        }
    } catch (err) {
        console.error("Error kubwa ndani ya message.js:", err);
    }
};
