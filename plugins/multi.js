const axios = require('axios');

module.exports = {
    command: 'multi',
    description: 'Search porn across multiple sites (Eporner, XNXX, Pornhub)',
    category: 'downloader',
    execute: async (sock, m, { text, prefix, reply }) => {
        if (!text) return reply(`🔥 Usage: ${prefix}multi <search>\nEx: ${prefix}multi ebony creampie | 2`);

        const parts = text.split('|').map(p => p.trim());
        const query = parts[0];
        const choice = parts[1] ? parseInt(parts[1]) : null;

        await sock.sendMessage(m.chat, { react: { text: "🔍", key: m.key } });

        // Jaribu Eporner first (fastest direct links)
        try {
            const epornerRes = await axios.get(`https://www.eporner.com/api/v2/video/search/?query=${encodeURIComponent(query)}&per_page=5&thumbsize=big`);
            const videos = epornerRes.data?.videos || [];

            if (videos.length > 0) {
                if (!choice) {
                    let msg = `🔥 *Multi Search Results (Eporner)* for: ${query}\n\nChagua: ${prefix}multi ${query} | <namba>\n\n`;
                    videos.forEach((v, i) => msg += `${i+1}. \( {v.title} ( \){v.length_min} min)\n`);
                    return await sock.sendMessage(m.chat, { text: msg }, { quoted: m });
                }

                const selected = videos[choice-1];
                if (selected) {
                    const detail = await axios.get(`https://www.eporner.com/api/v2/video/search/?id=${selected.id}`);
                    const link = detail.data?.videos?.[0]?.mp4_720 || detail.data?.videos?.[0]?.mp4_480;
                    if (link) {
                        await sock.sendMessage(m.chat, { video: { url: link }, mimetype: 'video/mp4', fileName: `${selected.title}.mp4`, caption: `🔥 ${selected.title} - Eporner` }, { quoted: m });
                        return await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
                    }
                }
            }
        } catch (e) { console.log("Eporner failed"); }

        // Fallback kwa XNXX au Pornhub (tumia code ya xnxx uliyonayo au pornhub scraper)
        await reply("Eporner haikupata, inajaribu XNXX/Pornhub...");
        // Unaweza ku-paste logic ya xnxx hapa au @justalk/pornhub-api
        await reply("❌ Multi search imeshindwa kwa sasa. Jaribu !xnxx au !eporner");
    }
};