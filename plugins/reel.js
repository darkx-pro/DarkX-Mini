const axios = require('axios');

module.exports = {
    command: 'reel',
    description: 'Download short video/reel from TikTok, Instagram, YouTube Shorts',
    category: 'downloader',
    execute: async (sock, m, { text, prefix, reply }) => {
        if (!text) return await reply(`🎥 Usage: ${prefix}reel <URL au search>\nMfano: ${prefix}reel https://www.tiktok.com/@user/video/123456`);

        try {
            await sock.sendMessage(m.chat, { react: { text: "📱", key: m.key } });

            const query = text.trim();
            // Tumia cobalt.tools au similar API inayosaidia TikTok/Instagram
            // Mfano call: post to cobalt API with url

            // ... (logic sawa na clip, lakini optimize kwa short videos - chagua low quality kwanza ili iwe haraka)

            // Send as video au document kulingana na size
        } catch (error) {
            await reply("❌ Reel download imeshindwa.");
        }
    }
};