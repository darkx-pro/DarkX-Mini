module.exports = {
    // --- BASIC BOT INFO ---
    botName: "DarkX-minBot",
    ownerName: "MrX Dev",
    ownerNumber: "255775710774", // Namba yako ya simu
    prefix: ".", // Alama ya kuanzia amri
    
    // --- SESSION MANAGEMENT ---
    // Hapa ndipo Session ID itawekwa kwa ajili ya Heroku
    SESSION_ID: process.env.SESSION_ID || "", 
    sessionName: "session", // Jina la folder la session
    
    // --- BOT MODES ---
    status: {
        terminal: true, // Weka true ili pairing code itokee kwenye console
        public: true,   // 'true' kwa kila mtu, 'false' kwa ajili yako tu (Self)
        autoread: false // Weka true kama unataka bot isome meseji zenyewe
    },

    // --- OTHER SETTINGS ---
    version: "6.0.0",
    worktype: "public", // Inasaidia baadhi ya plugins kujua mode ya bot
    footer: "© 2026 DarkX-minBot - Created by MrX Dev",
};
