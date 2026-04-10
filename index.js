"use strict";

const config = require('./settings/config');
process.on("uncaughtException", console.error);

let makeWASocket, Browsers, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, jidDecode, delay;

const loadBaileys = async () => {
    const baileys = await import('@whiskeysockets/baileys');
    makeWASocket = baileys.default;
    Browsers = baileys.Browsers;
    useMultiFileAuthState = baileys.useMultiFileAuthState;
    DisconnectReason = baileys.DisconnectReason;
    fetchLatestBaileysVersion = baileys.fetchLatestBaileysVersion;
    jidDecode = baileys.jidDecode;
    delay = baileys.delay;
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
    
    // Mpangilio wa session (folder lako la session)
    const { state, saveCreds } = await useMultiFileAuthState(`./${config.sessionName || 'session'}`);
    const { version } = await fetchLatestBaileysVersion();
    
    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false, // Tunazima QR ili kutumia pairing code
        auth: state,
        version: version,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });

    // MFUMO WA PAIRING CODE
    if (!sock.authState.creds.registered) {
        console.log(chalk.cyan(`\n--- ${config.botName} Pairing System ---`));
        
        // Tunampa muda kidogo server kuanza handshake
        setTimeout(async () => {
            const phoneNumber = await question('Ingiza namba ya simu (mfano: 2557XXXXXXXX):\n> ');
            try {
                await delay(5000); 
                let code = await sock.requestPairingCode(phoneNumber.trim());
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(chalk.white('Pairing Code Yako Ni: ') + chalk.bold.green(code));
            } catch (error) {
                console.log(chalk.red('Imeshindwa kupata kodi:'), error.message);
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
                console.log(chalk.red('🚫 Logged out. Tafadhali futa session folder na uanze upya.'));
            }
        }
    });

    sock.ev.on('messages.upsert', async chatUpdate => {
        try {
            const mek = chatUpdate.messages[0];
            if (!mek.message) return;
            
            // Ephemeral message handling
            mek.message = Object.keys(mek.message)[0] === 'ephemeralMessage' 
                ? mek.message.ephemeralMessage.message 
                : mek.message;
            
            const m = smsg(sock, mek); // Inahitaji serialize.js yako kwenye library
            require("./message")(sock, m, chatUpdate); 
        } catch (err) {
            console.log(err);
        }
    });

    return sock;
};

clientstart();
