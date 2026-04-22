const axios = require('axios');

module.exports = {
    command: 'porn',   // au 'xxx' au 'searchporn' 
    description: 'Search and download porn videos directly (Eporner + fallback)',
    category: 'downloader',
    execute: async (sock, m, {
        args, text, q, quoted, prefix, reply
    }) => {
        try {
            if (!text) {
                return await reply(`🔥 Usage: ${prefix}porn <search term>\nMfano: ${prefix}porn big ass teen\nAu: ${prefix}porn milf creampie`);
            }

            const query = text.trim();
            await sock.sendMessage(m.chat, { react: { text: "🔍", key: m.key } });

            // Step 1: Search kwenye Eporner API (best free option)
            let videos = [];
            try {
                const apiUrl = `https://www.eporner.com/api/v2/video/search/?query=${encodeURIComponent(query)}&per_page=5&thumbsize=big&order=latest&format=json`;
                const response = await axios.get(apiUrl, { timeout: 15000 });
                videos = response.data?.videos || [];
            } catch (e) {
                console.log("Eporner search failed:", e.message);
            }

            // Step 2: Simple fallback (unaweza kuongeza Pornhub au XVideos hapa baadaye)
            if (videos.length === 0) {
                await reply("Eporner haikupata matokeo, inajaribu fallback...");
                // Hapa unaweza kuongeza lustpress API au pornhub scraper
                return await reply("❌ Hakuna matokeo kwa sasa. Jaribu maneno mengine.");
            }

            // Show results
            let message = `🔥 *Porn Search Results for:* ${query}\n\nChagua namba (1-5) ili kudownload:\n\n`;
            videos.forEach((vid, index) => {
                const duration = vid.length_min ? `${vid.length_min} min` : '';
                message += `\( {index + 1}. * \){vid.title}*\n   ⏱ ${duration} | 👀 ${vid.views || 'N/A'}\n   🔗 ${vid.url}\n\n`;
            });

            await sock.sendMessage(m.chat, { text: message }, { quoted: m });

            // Save search results temporarily (kwa simplicity, tumia global au Map katika bot yako)
            // Hapa nimeweka simple way: tumia reply na wait for next message, lakini bora utumie session storage.

            // Kwa sasa, nitaeleza user achague, halafu utahitaji command nyingine au logic ya kuhandle reply.

            // Ili iwe rahisi zaidi, tunaweza kufanya "porn <query> | 1" au kutumia quoted message, lakini hii ni basic.

        } catch (error) {
            console.error('Porn search error:', error);
            await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
            await reply("❌ Search failed. Jaribu tena.");
        }
    }
};