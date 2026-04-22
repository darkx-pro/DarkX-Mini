const axios = require('axios');

module.exports = {
    command: 'beat',
    description: 'Download royalty-free / free music beats & tracks',
    category: 'downloader',
    execute: async (sock, m, { text, prefix, reply }) => {
        if (!text) return await reply(`🎵 Usage: ${prefix}beat <genre au title>\nMfano: ${prefix}beat chill lo-fi`);

        try {
            await sock.sendMessage(m.chat, { react: { text: "🥁", key: m.key } });

            // Jaribu Jamendo au Free Music Archive API (public)
            const query = encodeURIComponent(text);
            // Mfano API call (badilisha na halisi)
            const res = await axios.get(`https://api.jamendo.com/v3.0/tracks/?client_id=your-free-key&search=${query}&limit=1`);
            const track = res.data?.results?.[0];

            if (track && track.audio) {
                await sock.sendMessage(m.chat, {
                    audio: { url: track.audio },
                    mimetype: 'audio/mpeg',
                    fileName: `${track.name}.mp3`,
                    caption: `🥁 ${track.name} - ${track.artist_name}\nRoyalty-Free Music`
                }, { quoted: m });
            } else {
                await reply("❌ Hakuna beat iliyopatikana. Jaribu genre kama: lo-fi, hiphop, chill");
            }
        } catch (e) {
            await reply("❌ Beat download imeshindwa.");
        }
    }
};