module.exports = {
    command: ['aion'],
    isOwner: true,
    execute: async (sock, m, { reply }) => {
        global.db.settings.autoAi = true;
        await reply("✅ *DarkX AI:* Auto-Reply sasa iko ON!");
    }
};
