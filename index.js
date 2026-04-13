"use strict";

/**
 * DarkX Core - DM Focused & Protected
 * Optimized by MrX Dev
 */

const _0x5a12 = ["\x2e\x2f\x73\x65\x74\x74\x69\x6e\x67\x73\x2f\x63\x6f\x6e\x66\x69\x67", "\x66\x73", "\x70\x61\x74\x68", "\x62\x75\x66\x66\x65\x72", "\x2e\x2f\x6c\x69\x62\x72\x61\x72\x79\x2f\x62\x72\x61\x69\x6e", "\x44\x61\x72\x6b\x58\x2d\x55\x6c\x74\x72\x61\x7e", "\x63\x72\x65\x64\x73\x2e\x6a\x73\x6f\x6e", "\x55\x62\x75\x6e\x74\x75", "\x43\x68\x72\x6f\x6d\x65", "\x31\x32\x31\x2e\x30\x2e\x36\x31\x36\x37\x2e\x31\x36\x30", "\x2e\x2f\x6c\x69\x62\x72\x61\x72\x79\x2f\x73\x65\x72\x69\x61\x6c\x69\x7a\x65", "\x2e\x2f\x6d\x65\x73\x73\x61\x67\x65"];
const config = require(_0x5a12[0]);
const fs = require(_0x5a12[1]);
const path = require(_0x5a12[2]);
const { Buffer } = require(_0x5a12[3]);
const { getBotResponse: _0xai } = require(_0x5a12[4]);

process.on("\x75\x6e\x63\x61\x75\x67\x68\x74\x45\x78\x63\x65\x70\x74\x69\x6f\x6e", console.error);

let _0xwa, _0xbr, _0xau, _0xdi, _0xfe, _0xji, _0xde, _0xma;

const _0xload = async () => {
    const _0xlib = await import('\x40\x77\x68\x69\x73\x6b\x65\x79\x73\x6f\x63\x6b\x65\x74\x73\x2f\x62\x61\x69\x6c\x65\x79\x73');
    _0xwa = _0xlib.default;
    _0xbr = _0xlib.Browsers;
    _0xau = _0xlib.useMultiFileAuthState;
    _0xdi = _0xlib.DisconnectReason;
    _0xfe = _0xlib.fetchLatestBaileysVersion;
    _0xji = _0xlib.jidDecode;
    _0xde = _0xlib.delay;
    _0xma = _0xlib.makeCacheableSignalKeyStore;
};

const pino = require("\x70\x69\x6e\x6f");
const readline = require("\x72\x65\x61\x64\x6c\x69\x6e\x65");
const chalk = require("\x63\x68\x61\x6c\x6b");
const { smsg: _0xsm } = require(_0x5a12[10]);

const _0xask = (t) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((r) => { rl.question(chalk.yellow(t), (a) => { r(a); rl.close(); }); });
};

const clientstart = async () => {
    await _0xload();
    const _0xsn = config.sessionName || "\x73\x65\x73\x73\x69\x6f\x6e";
    const _0xsp = path.join(__dirname, _0xsn);
    const _0xid = process.env.SESSION_ID || config.SESSION_ID;

    if (_0xid && _0xid.startsWith(_0x5a12[5]) && !fs.existsSync(path.join(_0xsp, _0x5a12[6]))) {
        if (!fs.existsSync(_0xsp)) fs.mkdirSync(_0xsp);
        try {
            const _0xb64 = _0xid.split(_0x5a12[5])[1];
            fs.writeFileSync(path.join(_0xsp, _0x5a12[6]), Buffer.from(_0xb64, "\x62\x61\x73\x65\x36\x34").toString("\x75\x74\x66\x2d\x38"));
        } catch (e) { console.log(chalk.red("\x53\x65\x73\x73\x69\x6f\x6e\x20\x45\x72\x72\x6f\x72")); }
    }

    const { state, saveCreds } = await _0xau(_0xsp);
    const { version } = await _0xfe();
    
    const sock = _0xwa({
        logger: pino({ level: "\x73\x69\x6c\x65\x6e\x74" }),
        printQRInTerminal: false, 
        auth: { creds: state.creds, keys: _0xma(state.keys, pino({ level: "\x73\x69\x6c\x65\x6e\x74" })) },
        version: version,
        browser: [_0x5a12[7], _0x5a12[8], _0x5a12[9]]
    });

    if (!sock.authState.creds.registered) {
        setTimeout(async () => {
            const _0xph = await _0xask("\x49\x6e\x67\x69\x7a\x61\x20\x6e\x61\x6d\x62\x61\x20\x79\x61\x20\x73\x69\x6d\x75\x3a\x20");
            if (_0xph) {
                try {
                    await _0xde(3000); 
                    let _0xco = await sock.requestPairingCode(_0xph.trim());
                    _0xco = _0xco?.match(/.{1,4}/g)?.join("\x2d") || _0xco;
                    console.log(chalk.white("\x50\x61\x69\x72\x69\x6e\x67\x20\x43\x6f\x64\x65\x3a\x20") + chalk.bold.green(_0xco));
                } catch (err) { console.log(chalk.red("\x46\x61\x69\x6c\x65\x64")); }
            }
        }, 3000);
    }

    sock.ev.on("\x63\x72\x65\x64\x73\x2e\x75\x70\x64\x61\x74\x65", saveCreds);

    sock.ev.on("\x63\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e\x2e\x75\x70\x64\x61\x74\x65", (_0xup) => {
        const { connection: _0xcn, lastDisconnect: _0xld } = _0xup;
        if (_0xcn === "\x6f\x70\x65\x6e") {
            console.log(chalk.green(`\u2705 ${config.botName} Online!`));
        }
        if (_0xcn === "\x63\x6c\x6f\x73\x65") {
            const _0xst = _0xld?.error?.output?.statusCode;
            if (_0xst !== _0xdi.loggedOut) { clientstart(); } else { process.exit(1); }
        }
    });

    sock.ev.on("\x6d\x65\x73\x73\x61\x67\x65\x73\x2e\x75\x70\x73\x65\x72\x74", async _0xupd => {
        try {
            const _0xmk = _0xupd.messages[0];
            if (!_0xmk.message) return;
            const m = _0xsm(sock, _0xmk);
            const _0xbd = m.body || ""; 
            
            // SECURITY CHECK: Private Chat Only + No Self-Replies
            if (_0xbd && !m.key.fromMe && !m.isGroup) {
                const _0xres = _0xai(_0xbd);
                if (_0xres) await sock.sendMessage(m.chat, { text: _0xres }, { quoted: m });
            }
            require(_0x5a12[11])(sock, m, _0xupd); 
        } catch (e) { console.log(e); }
    });

    return sock;
};

clientstart();
