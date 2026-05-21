"use strict";

const config = require("../settings/config");

const store = {};

module.exports = {
    command: "antidelete",
    execute: async () => {}
};

// Store all messages
module.exports.handle = async (sock, m, chatUpdate) => {

    try {

        if (m.message) {
            store[m.key.id] = {
                message: m.message,
                body: m.body,
                sender: m.sender,
                key: m.key
            };
        }

        const msg = chatUpdate.messages?.[0];

        if (!msg) return;

        // Detect deleted message
        if (msg.message?.protocolMessage?.type === 0) {

            const key = msg.message.protocolMessage.key.id;

            const deleted = store[key];

            if (!deleted) return;

            const ownerNumbers = [
                config.ownerNumber.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
            ];

            // Skip owner deleted messages
            if (ownerNumbers.includes(deleted.sender)) return;

            const header =
`🤣 MESSAGE DELETED 🤣

👤 @${deleted.sender.split('@')[0]}
`;

            // TEXT
            if (deleted.body) {

                await sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        text: header + "\n" + deleted.body,
                        mentions: [deleted.sender]
                    }
                );
            }

            // IMAGE
            else if (deleted.message.imageMessage) {

                const media = await sock.downloadMediaMessage({
                    message: deleted.message,
                    key: deleted.key
                });

                await sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        image: media,
                        caption: header + "\n📸 Deleted image 😹",
                        mentions: [deleted.sender]
                    }
                );
            }

            // VIDEO
            else if (deleted.message.videoMessage) {

                const media = await sock.downloadMediaMessage({
                    message: deleted.message,
                    key: deleted.key
                });

                await sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        video: media,
                        caption: header + "\n🎥 Deleted video 😹",
                        mentions: [deleted.sender]
                    }
                );
            }

            // AUDIO
            else if (deleted.message.audioMessage) {

                const media = await sock.downloadMediaMessage({
                    message: deleted.message,
                    key: deleted.key
                });

                await sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        audio: media,
                        mimetype: 'audio/mp4'
                    }
                );

                await sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        text: header + "\n🎵 Deleted audio 😹",
                        mentions: [deleted.sender]
                    }
                );
            }

        }

    } catch (err) {
        console.log("AntiDelete Error:", err);
    }
};