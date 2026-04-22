const axios = require('axios');
const config = require("../settings/config");

module.exports = {
    command: ["audio", "play", "song", "wimbo"],
    description: "Download and play any music MP3 from global sources.",
    category: "downloader",
    execute: async (sock, m, { text, prefix, reply }) => {
        try {
            if (!text) return await reply(`*⚠️ Usage:* ${prefix}audio <artist - title>\n*Example:* ${prefix}audio Diamond Platnumz Shu`);

            // Reaction kuanza mchakato
            await sock.sendMessage(m.chat, { react: { text: "🎧", key: m.key } });

            const query = encodeURIComponent(text.trim());
            
            // Hapa tumia API ya uhakika (Mfano: API zinazotumia yt-dlp backend)
            // Kumbuka: Hakikisha API URL ni sahihi kulingana na provider wako
            const apiUrl = `https://api.dreaded.site/api/ytdl/video?url=${query}`; 

            let audioData;
            try {
                const res = await axios.get(apiUrl);
                audioData = res.data.result; // Badilisha kulingana na response ya API yako
            } catch (e) {
                return await reply("❌ 𝖲𝗒𝗌𝗍𝖾𝗆 𝖡𝗎𝗌𝗒: 𝖲𝗁𝗂𝗇𝖽𝗐𝗈 𝗄𝗎𝗉𝖺𝗍𝖺 𝗐𝗂𝗆𝗏𝗈 𝗄𝗐𝖺 𝗌𝖺𝗌𝖺.");
            }

            const musicCaption = `
┏━━━━━━━◥◣◆◢◤━━━━━━━┓
     *DΛЯKX MЦSIC PᄂΛYΣЯ*
┗━━━━━━━◥◣◆◢◤━━━━━━━┛

*〔 🎵 Tɪᴛʟᴇ 〕:* ${text.toUpperCase()}
*〔 📂 Fᴏʀᴍᴀᴛ 〕:* 𝖬𝖯𝟥 𝖠𝗎𝖽𝗂𝗈
*〔 🚀 Sᴘᴇᴇᴅ 〕:* 𝖧𝗂𝗀𝗁 𝖲𝗉𝖾𝖾𝖽

> _“Music is the shorthand of emotion.”_
_Powered by DarkX Ultra v6.0.0_`;

            // 1. Tuma ujumbe wa maelezo kwanza ukiwa na picha/thumbnail
            await sock.sendMessage(m.chat, {
                text: musicCaption,
                contextInfo: {
                    externalAdReply: {
                        title: "NOW DOWNLOADING...",
                        body: `Request: ${text}`,
                        mediaType: 1,
                        thumbnailUrl: "https://files.catbox.moe/pc5uec.png", // Picha yako ya hacker
                        sourceUrl: "https://chat.whatsapp.com/HsWMMyTxvi35AooYo4Qz1U",
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
            }, { quoted: m });

            // 2. Tuma faili la Audio lenyewe
            await sock.sendMessage(m.chat, {
                audio: { url: audioData.download_url || audioData.link },
                mimetype: 'audio/mpeg',
                fileName: `${text}.mp3`
            }, { quoted: m });

            // Success reaction
            await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

        } catch (error) {
            console.error('Audio Plugin Error:', error);
            await reply("❌ 𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 𝗂𝗆𝖾𝗌𝗁𝗂𝗇𝖽𝗐𝖺. 𝖧𝖺𝗄𝗂𝗄𝗂𝗌𝗁𝖺 𝗂𝗇𝗍𝖾𝗋𝗇𝖾𝗍 𝗂𝗄𝗈 𝗌𝖺𝗐𝖺.");
        }
    }
};
