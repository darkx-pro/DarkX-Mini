"use strict";

const config = require('./settings/config');
const fs = require('fs');
const path = require('path');
const { Buffer } = require('buffer');
process.on("uncaughtException", console.error);

let makeWASocket, Browsers, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, jidDecode, delay, makeCacheableSignalKeyStore;

const loadBaileys = async () => {
    const baileys = await import('@whiskeysockets/baileys');
    makeWASocket = baileys.default;
    Browsers = baileys.Browsers;
    useMultiFileAuthState = baileys.useMultiFileAuthState;
    DisconnectReason = baileys.DisconnectReason;
    fetchLatestBaileysVersion = baileys.fetchLatestBaileysVersion;
    jidDecode = baileys.jidDecode;
    delay = baileys.delay;
    makeCacheableSignalKeyStore = baileys.makeCacheableSignalKeyStore;
};

const pino = require('pino');
const readline = require("readline");
const chalk = require("chalk");
const { smsg } = require('./library/serialize');

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
    
    const sessionName = config.sessionName || 'session';
    const sessionPath = path.join(__dirname, sessionName);

    // --- 1. DOWNLOAD SESSION ID (Kama imewekwa kwenye Heroku/Config) ---
    const sessId = process.env.SESSION_ID || config.SESSION_ID;
    if (sessId && sessId.startsWith("DarkX-Ultra~") && !fs.existsSync(path.join(sessionPath, 'creds.json'))) {
        console.log(chalk.blue("🚀 Session ID imegundulika. Inatengeneza folder la session..."));
        if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath);
        try {
            const base64Data = sessId.split("DarkX-Ultra~")[1];
            fs.writeFileSync(path.join(sessionPath, 'creds.json'), Buffer.from(base64Data, 'base64').toString('utf-8'));
        } catch (e) {
            console.log(chalk.red("❌ Session ID imeharibika!"));
        }
    }

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version } = await fetchLatestBaileysVersion();
    
    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false, 
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })),
        },
        version: version,
        // Browser version ya kisasa ili kuepuka "Couldn't link device"
        browser: ["Ubuntu", "Chrome", "121.0.6167.160"]
    });

    // --- 2. MFUMO WA PAIRING CODE (Kama folder ni jipya kabisa) ---
    if (!sock.authState.creds.registered) {
        console.log(chalk.cyan(`\n--- ${config.botName} Pairing System ---`));
        
        setTimeout(async () => {
            const phoneNumber = await question('Ingiza namba ya simu (mfano: 2557XXXXXXXX):\n> ');
            if (phoneNumber) {
                try {
                    await delay(3000); 
                    let code = await sock.requestPairingCode(phoneNumber.trim());
                    code = code?.match(/.{1,4}/g)?.join("-") || code;
                    console.log(chalk.white('\nPairing Code Yako Ni: ') + chalk.bold.green(code));
                    console.log(chalk.gray("Ingiza kodi hii kwenye WhatsApp yako sasa hivi.\n"));
                } catch (error) {
                    console.log(chalk.red('Imeshindwa kupata kodi:'), error.message);
                }
            }
        }, 3000);
    }

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
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
            
            if (shouldReconnect) {
                console.log(chalk.red('❌ Connection closed. Reconnecting...'));
                setTimeout(clientstart, 5000);
            } else {
                console.log(chalk.red('🚫 Logged out. Futa folder la ' + sessionName + ' na uanze upya.'));
                process.exit(1);
            }
        }
    });

    sock.ev.on('messages.upsert', async chatUpdate => {
        try {
            const mek = chatUpdate.messages[0];
            if (!mek.message) return;
            
            mek.message = Object.keys(mek.message)[0] === 'ephemeralMessage' 
                ? mek.message.ephemeralMessage.message 
                : mek.message;
            
            const m = smsg(sock, mek);
            require("./message")(sock, m, chatUpdate); 
        } catch (err) {
            console.log(err);
        }
    });

    return sock;
};

clientstart();
