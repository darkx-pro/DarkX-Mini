"use strict";

const config = require('./settings/config');
const fs = require('fs');
const path = require('path');
const pino = require('pino');
const readline = require("readline");
const chalk = require("chalk");
const express = require("express");

const { smsg } = require('./library/serialize');

// =========================
// EXPRESS APP (NEW)
// =========================
const app = express();
app.use(express.json());
app.use(express.static("public"));

// GLOBAL SOCKET HOLDER
let sockGlobal;

// =========================
// ERROR HANDLERS
// =========================
process.on("uncaughtException", (err) => {
    console.error(chalk.red("ERROR:"), err);
});

process.on("unhandledRejection", (err) => {
    console.error(chalk.red("ERROR:"), err);
});

// =========================
// BAILEYS IMPORTS
// =========================
let makeWASocket, Browsers, useMultiFileAuthState,
DisconnectReason, fetchLatestBaileysVersion,
jidDecode, delay, makeCacheableSignalKeyStore;

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

const sessionPath = path.join(__dirname, "session");

const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(chalk.yellow(text), (ans) => {
            rl.close();
            resolve(ans);
        });
    });
};

// =========================
// BOT START
// =========================
const clientstart = async () => {

    await loadBaileys();

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
        },
        version,
        browser: Browsers.ubuntu("Chrome"),
        printQRInTerminal: false
    });

    // SAVE GLOBAL SOCKET
    sockGlobal = sock;

    // SAVE CREDS
    sock.ev.on("creds.update", saveCreds);

    // CONNECTION
    sock.ev.on("connection.update", (update) => {
        const { connection } = update;

        if (connection === "open") {
            console.log(chalk.green("✅ Bot Connected"));
        }

        if (connection === "close") {
            console.log(chalk.red("❌ Connection closed"));
            setTimeout(clientstart, 5000);
        }
    });

    // MESSAGE HANDLER
    sock.ev.on("messages.upsert", async (chatUpdate) => {
        try {
            const m = chatUpdate.messages[0];
            if (!m.message) return;

            require("./message")(sock, smsg(sock, m), chatUpdate);

        } catch (e) {
            console.log(e);
        }
    });

    // PAIRING (CLI MODE OPTIONAL)
    if (!sock.authState.creds.registered) {
        let number = await question("Enter number: ");
        number = number.replace(/[^0-9]/g, "");

        const code = await sock.requestPairingCode(number);
        console.log(chalk.green("PAIRING CODE:"), code);
    }
};

// =========================
// API ROUTE (CONNECT)
// =========================
app.post("/connect", async (req, res) => {
    try {
        const number = req.body.number;

        if (!sockGlobal) {
            return res.json({ error: "Bot haijaanza bado" });
        }

        const code = await sockGlobal.requestPairingCode(number);

        res.json({ code });
    } catch (err) {
        res.json({ error: err.message });
    }
});

// =========================
// START EVERYTHING
// =========================
clientstart().catch(console.error);

app.listen(3000, () => {
    console.log("🌐 Server running: http://localhost:3000");
});
