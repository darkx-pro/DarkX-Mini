const axios = require('axios');

module.exports = {
    command: ["ai", "gpt"],
    execute: async (sock, m, args) => {
        const text = args.join(' ');
        if (!text) return sock.sendMessage(m.chat, { text: "Nulize chochote!\nMfano: .ai mambo vipi?" });

        try {
            await sock.sendMessage(m.chat, { react: { text: "🧠", key: m.key } });
            const res = await axios.get(`https://api.giftedtech.my.id/api/ai/gpt4?apikey=gifted&q=${encodeURIComponent(text)}`);
            
            await sock.sendMessage(m.chat, { text: res.data.result }, { quoted: m });
        } catch (e) {
            await sock.sendMessage(m.chat, { text: "❌ AI kwa sasa haipatikani." });
        }
    }
};
