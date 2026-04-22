"use strict";

/**
 * Project: DarkX Ultra
 * Owner: MrX Dev
 * Engineer: Senior Node.js WhatsApp Bot Engineer
 * Optimized index.js for performance, stability, and memory safety.
 * [AI Auto-Reply system removed as requested]
 */

const config = require('./settings/config');
const fs = require('fs');
const path = require('path');
const { Buffer } = require('buffer');
const pino = require('pino');
const readline = require("readline");
const chalk = require("chalk");
const { smsg } = require('./library/serialize');

// Process optimization
process.on("uncaughtException", (err) => {
    console.error(chalk.red("CRITICAL ERROR (Uncaught Exception):"), err);
});
process.on("unhandledRejection", (reason) => {
    console.error(chalk.red("CRITICAL ERROR (Unhandled Rejection):"), reason);
});

// Dynamic Baileys Imports
let makeWASocket, Browsers, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, jidDecode, delay, makeCacheableSignalKeyStore;

const loadBaileys = async () => {
    try {
        const baileys = await import('@whiskeysockets/baileys');
        makeWASocket = baileys.default;
        Browsers = baileys.Browsers;
        useMultiFileAuthState = baileys.useMultiFileAuthState;
        DisconnectReason = baileys.DisconnectReason;
        fetchLatestBaileysVersion = baileys.fetchLatestBaileysVersion;
        jidDecode = baileys.jidDecode;
        delay = baileys.delay;
        makeCacheableSignalKeyStore = baileys.makeCacheableSignalKeyStore;
    } catch (e) {
        console.error(chalk.red("Failed to load Baileys library:"), e);
        process.exit(1);
    }
};

const sessionName = config.sessionName || 'session';
const sessionPath = path.join(__dirname, sessionName);

const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(chalk.yellow(text), (answer) => {
            resolve(answer);
            rl.close();
        });
    });
};

const clientstart = async () => {
    await loadBaileys();

    // 1. SESSION ID MANAGEMENT
    const sessId = process.env.SESSION_ID || config.SESSION_ID;
    if (sessId && sessId.startsWith("DarkX-Ultra~") && !fs.existsSync(path.join(sessionPath, 'creds.json'))) {
        console.log(chalk.blue("🚀 Session ID detected. Initializing session folder..."));
        if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath, { recursive: true });
        try {
            const base64Data = sessId.split("DarkX-Ultra~")[1];
            fs.writeFileSync(path.join(sessionPath, 'creds.json'), Buffer.from(base64Data, 'base64').toString('utf-8'));
        } catch (e) {
            console.log(chalk.red("❌ Session ID is corrupt!"));
        }
    }

    // 2. AUTH STATE & VERSIONING
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(chalk.gray(`WhatsApp Web Version: ${version.join('.')} (Latest: ${isLatest})`));

    // 3. SOCKET INITIALIZATION
    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })),
        },
        version,
        browser: Browsers.ubuntu("Chrome"),
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        getMessage: async (key) => { return { conversation: 'DarkX-Ultra-Internal-Cache' } }
    });

    // 4. PAIRING CODE LOGIC
    if (!sock.authState.creds.registered) {
        console.log(chalk.cyan(`\n--- ${config.botName} Pairing System ---`));
        let phoneNumber = await question('Ingiza namba ya simu (mfano: 2557XXXXXXXX):\n> ');
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

        if (phoneNumber) {
            try {
                await delay(3000);
                const code = await sock.requestPairingCode(phoneNumber);
                const formattedCode = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(chalk.white('\nPairing Code Yako Ni: ') + chalk.bold.green(formattedCode));
                console.log(chalk.gray("Ingiza kodi hii kwenye WhatsApp yako sasa hivi.\n"));
            } catch (error) {
                console.error(chalk.red('Failed to request pairing code:'), error.message);
            }
        }
    }

    // 5. EVENT LISTENERS
    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'connecting') {
            console.log(chalk.yellow('🔄 Connecting to WhatsApp...'));
        }

        if (connection === 'open') {
            console.log(chalk.green(`✅ ${config.botName} Imeunganishwa kikamilifu!`));
            console.log(chalk.cyan(`👤 Owner: ${config.ownerName}`));
        }

        if (connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const reason = new Error(lastDisconnect?.error)?.message;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

            console.log(chalk.red(`❌ Connection closed. Reason: ${reason || statusCode}`));

            if (shouldReconnect) {
                console.log(chalk.yellow('🔄 Attempting to reconnect in 5 seconds...'));
                setTimeout(clientstart, 5000);
            } else {
                console.log(chalk.red('🚫 Session Logged Out. Please clear session folder and restart.'));
                process.exit(1);
            }
        }
    });

    sock.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            if (chatUpdate.type !== 'notify') return;
            const mek = chatUpdate.messages[0];
            if (!mek.message) return;

            // Handle Ephemeral and ViewOnce
            const msgType = Object.keys(mek.message)[0];
            if (msgType === 'ephemeralMessage' || msgType === 'viewOnceMessage' || msgType === 'viewOnceMessageV2') {
                mek.message = mek.message[msgType].message;
            }

            const m = smsg(sock, mek);
            
            // Pass to Main Handler (AI removed)
            require("./message")(sock, m, chatUpdate);

        } catch (err) {
            console.error(chalk.red("Error in message event loop: "), err);
        }
    });

    // Contacts/Identity logic
    sock.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    return sock;
};

// Start Boot Process
clientstart().catch(err => console.error("Startup Failure:", err));
