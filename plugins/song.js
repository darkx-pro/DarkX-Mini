const axios = require('axios');
const yts = require('yt-search');

module.exports = {
    command: ['song', 'play'],
    category: 'downloader',
    execute: async (sock, m, { args, reply, text }) => { // <--- LAZIMA iwe hivi
        try {
            if (!text) return reply("❌ Tafadhali weka jina la wimbo!");
            
            await sock.sendMessage(m.chat, { react: { text: "📥", key: m.key } });
            
            const search = await yts(text);
            const video = search.videos[0];
            if (!video) return reply("⚠️ Wimbo haujapatikana.");

            const apiUrl = `https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(video.url)}`;
            const res = await axios.get(apiUrl);
            
            if (res.data.status === 200) {
                await sock.sendMessage(m.chat, {
                    audio: { url: res.data.result.downloadUrl },
                    mimetype: 'audio/mpeg',
                    fileName: `${video.title}.mp3`
                }, { quoted: m });
            }
        } catch (e) {
            console.error(e);
            reply("🚨 Mfumo wa download umefeli.");
        }
    }
};
