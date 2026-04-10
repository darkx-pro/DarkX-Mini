const axios = require('axios');
const yts = require('yt-search');
const config = require("../settings/config");

module.exports = {
    command: ["song", "play"],
    execute: async (sock, m, args) => {
        const from = m.chat;
        const text = args.join(' ');
        if (!text) return sock.sendMessage(from, { text: `Weka jina la wimbo!\nMfano: *${config.prefix}song* Calm Down` }, { quoted: m });

        try {
            await sock.sendMessage(from, { react: { text: "⏳", key: m.key } });
            const { videos } = await yts(text);
            if (!videos || videos.length === 0) return sock.sendMessage(from, { text: "⚠️ Wimbo haujapatikana!" });

            const videoUrl = videos[0].url;
            const apiUrl = `https://yt-dl.officialhectormanuel.workers.dev/?url=${encodeURIComponent(videoUrl)}`;
            const response = await axios.get(apiUrl);

            if (response.data.status) {
                await sock.sendMessage(from, { 
                    audio: { url: response.data.mp3 }, 
                    mimetype: 'audio/mpeg' 
                }, { quoted: m });
                await sock.sendMessage(from, { react: { text: "✅", key: m.key } });
            }
        } catch (e) {
            console.error(e);
            await sock.sendMessage(from, { text: "❌ Imefeli kupata wimbo." });
        }
    }
};
