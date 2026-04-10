module.exports = {
    command: ["kick", "remove", "fire"],
    execute: async (sock, m, args, { reply }) => {
        try {
            if (!m.isGroup) return reply("❌ Amri hii ni kwa ajili ya magroup pekee!");

            // 1. Angalia kama Bot ni Admin
            const groupMetadata = await sock.groupMetadata(m.chat);
            const participants = groupMetadata.participants;
            const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            const isBotAdmin = participants.find(p => p.id === botId)?.admin !== null;

            if (!isBotAdmin) return reply("❌ Tafadhali nifanye niwe *Admin* kwanza ili niweze kuwatoa watu.");

            // 2. Tafuta nani wa kutolewa (Mention au Reply)
            let usersToKick = [];
            if (m.msg.contextInfo && m.msg.contextInfo.mentionedJid) {
                usersToKick = m.msg.contextInfo.mentionedJid;
            } else if (m.msg.contextInfo && m.msg.contextInfo.participant) {
                usersToKick = [m.msg.contextInfo.participant];
            }

            if (usersToKick.length === 0) {
                return reply("❌ Mtag mtu au reply meseji yake ukitumia *.kick*");
            }

            // 3. Zuia Bot isijitoe yenyewe
            if (usersToKick.includes(botId)) {
                return reply("❌ Siwezi kujitoa mwenyewe, bro! 😂");
            }

            // 4. Tekeleza Kazi
            await sock.sendMessage(m.chat, { react: { text: "🚫", key: m.key } });
            await sock.groupParticipantsUpdate(m.chat, usersToKick, "remove");

            const mentionTags = usersToKick.map(jid => `@${jid.split('@')[0]}`);
            await sock.sendMessage(m.chat, {
                text: `🚫 *USER KICKED*\n\n${mentionTags.join(', ')} ametolewa kwenye group!`,
                mentions: usersToKick
            }, { quoted: m });

        } catch (err) {
            console.error(err);
            reply("❌ Imeshindwa kumtoa mtumiaji. Hakikisha nina u-admin.");
        }
    }
};
