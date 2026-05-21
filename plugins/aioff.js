module.exports = {
    command: ['aioff'],
    isOwner: true,
    execute: async (sock, m, { reply }) => {
        global.db.settings.autoAi = false;
        await reply("📴 *DarkX AI:* Auto-Reply sasa iko OFF!");
    }
};
