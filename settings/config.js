"use strict";

/**
 * Project: DarkX Ultra
 * Owner: MrX Dev
 * Engineer: Senior Node.js WhatsApp Bot Engineer
 * Configuration File with Session ID Support
 */

module.exports = {

    // =========================
    // BASIC BOT INFO
    // =========================
    botName: "DarkX Ultra",

    ownerName: "MrX Dev",

    ownerNumber: [
        "255775710774"
    ],

    prefix: ".",

    // =========================
    // SESSION MANAGEMENT
    // =========================
    SESSION_ID:
        process.env.SESSION_ID ||
        "DarkX-Ultra~WEKA_ID_YAKO_HAPA",

    sessionName: "session",

    // =========================
    // BOT MODES
    // =========================
    public: true,

    publicMode: true,

    worktype: "public",

    // =========================
    // AUTO FEATURES
    // =========================
    autoRead: true,

    autoTyping: true,

    autoRecording: false,

    autoReact: true,

    autoStatusView: true,

    online: true,

    // =========================
    // SECURITY & LIMITS
    // =========================
    limitCount: 20,

    adminOnly: false,

    // =========================
    // VERSION
    // =========================
    version: "6.0.0",

    // =========================
    // FOOTER
    // =========================
    footer:
        "© 2026 DarkX Ultra - Developed by MrX Dev",

    // =========================
    // THUMBNAIL
    // =========================
    thumb:
        "https://telegra.ph/file/a0f3d45e45c71b6d05494.jpg",

    // =========================
    // SYSTEM MESSAGES
    // =========================
    msg: {

        owner:
            "🚫 Amri hii ni kwa ajili ya *MrX Dev* pekee!",

        group:
            "👥 Samahani, hii amri inafanya kazi kwenye Magroup tu.",

        admin:
            "👮 Amri hii inahitaji uwe *Admin* wa group.",

        botAdmin:
            "🤖 Tafadhali nifanye niwe *Admin* kwanza ili nitekeleze hili.",

        wait:
            "⏳ *DarkX Ultra inashughulikia...* Tafadhali subiri.",

        error:
            "❌ *Error!* Kuna hitilafu imetokea kwenye mfumo."
    }
};