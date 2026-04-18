module.exports = {
    command: ['antilink'],
    isGroup: true,
    isAdmin: true,
    execute: async (sock, m, { args, reply, isBotAdmin }) => {
        if (!isBotAdmin) return reply("Nifanye niwe admin kwanza ili nitumie Anti-Link!");
        if (!args[0]) return reply("Tumia hivi: .antilink on/off");

        if (args[0] === 'on') {
            global.db.groups[m.chat].antilink = true;
            await reply("✅ Anti-Link imewashwa kwenye group hili.");
        } else if (args[0] === 'off') {
            global.db.groups[m.chat].antilink = false;
            await reply("✅ Anti-Link imezimwa.");
        } else {
            await reply("Chaguo batili. Tumia 'on' au 'off'.");
        }
    }
};
