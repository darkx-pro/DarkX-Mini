const config = require("./settings/config");
const fs = require("fs");
const path = require("path");

module.exports = async (sock, m, chatUpdate) => {
    try {
        const { type, fromMe, chat, sender, body } = m;
        
        // Kuzuia bot isijibu kama hakuna maandishi
        if (!body) return;
        
        const isCmd = body.startsWith(config.prefix);
        const command = isCmd ? body.slice(config.prefix.length).trim().split(/ +/).shift().toLowerCase() : "";
        const args = body.trim().split(/ +/).slice(1);
        const text = args.join(" ");
        const q = text; // Mbadala wa text kwa baadhi ya plugins

        // Kutengeneza 'reply' function ili kuzuia error kwenye plugins
        const reply = (teks) => {
            return sock.sendMessage(m.chat, { text: teks }, { quoted: m });
        };

        if (isCmd) {
            const pluginFolder = path.join(__dirname, "plugins");
            
            // Hakikisha folder la plugins lipo
            if (!fs.existsSync(pluginFolder)) {
                fs.mkdirSync(pluginFolder);
            }

            const pluginFiles = fs.readdirSync(pluginFolder).filter(file => file.endsWith(".js"));

            for (const file of pluginFiles) {
                try {
                    const plugin = require(path.join(pluginFolder, file));
                    
                    // Kuangalia kama amri iliyoandikwa inafanana na plugin iliyopo
                    if (plugin.command && (Array.isArray(plugin.command) ? plugin.command.includes(command) : plugin.command === command)) {
                        
                        // Tunapitisha data zote muhimu kwenda kwenye plugin
                        await plugin.execute(sock, m, args, { 
                            text, 
                            q, 
                            reply, 
                            config, 
                            chatUpdate 
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
