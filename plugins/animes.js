const axios = require('axios');

const supportedAnimes = [
    'akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chiho', 'chitoge',
    'deidara', 'erza', 'elaina', 'eba', 'emilia', 'hestia', 'hinata', 'inori',
    'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kaori', 'keneki', 'kotori',
    'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'nezuko', 'sagiri',
    'sasuke', 'sakura'
];

module.exports = {
    command: ["animes", "animeimg"],
    execute: async (sock, m, args, { reply }) => {
        const input = args[0]?.toLowerCase();
        
        if (!input || !supportedAnimes.includes(input)) {
            let menu = `🎀 *D A R K X  -  A N I M E S* 🎀\n\n`;
            menu += supportedAnimes.map(a => `• ${a}`).join('\n');
            menu += `\n\n📌 *Matumizi:* .animes naruto`;
            return reply(menu);
        }

        try {
            await sock.sendMessage(m.chat, { react: { text: "🖼️", key: m.key } });
            
            const apiUrl = `https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/anime-${input}.json`;
            const res = await axios.get(apiUrl);
            const images = res.data;

            if (!Array.isArray(images) || images.length === 0) return reply("❌ Sijapata picha.");

            // Pick 1 random image (Safe for RAM/Hosting)
            const randomImg = images[Math.floor(Math.random() * images.length)];

            await sock.sendMessage(m.chat, { 
                image: { url: randomImg }, 
                caption: `✨ Anime: *${input}*` 
            }, { quoted: m });

        } catch (err) {
            console.error(err);
            reply("❌ Hitilafu imetokea, jaribu tena.");
        }
    }
};
