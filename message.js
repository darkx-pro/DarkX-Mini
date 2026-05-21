"use strict";

const config = require("./settings/config");
const fs = require("fs");
const path = require("path");
const chalkImport = require("chalk");
const chalk = chalkImport.default || chalkImport;
const { synchronizeData } = require("./library/database");

module.exports = async (sock, m, chatUpdate) => {
    try {
        const { fromMe, chat, sender, body, pushName } = m;

        if (!body && !m.message) return;

        const prefix = config.prefix || ".";
        const isCmd = body?.startsWith(prefix);
        const command = isCmd
            ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
            : "";

        const args = body?.trim().split(/ +/).slice(1) || [];
        const text = args.join(" ");
        const q = text;

        if (fromMe && !isCmd) return;

        if (global.db) synchronizeData(m, sock);

        const isGroup = chat?.endsWith("@g.us");
        const botId = sock.user.id.split(":")[0] + "@s.whatsapp.net";

        let groupMetadata = null;
        let participants = [];
        let groupAdmins = [];
        let isAdmin = false;
        let isBotAdmin = false;

        if (isGroup) {
            groupMetadata = await sock.groupMetadata(chat).catch(() => null);

            if (groupMetadata) {
                participants = groupMetadata.participants || [];

                groupAdmins = participants
                    .filter(v => v.admin)
                    .map(v => v.id);

                isAdmin = groupAdmins.includes(sender);

                isBotAdmin = groupAdmins.includes(botId) ||
                    participants.find(p => p.id === botId)?.admin !== null;
            }
        }

        const ownerJid =
            config.ownerNumber.replace(/[^0-9]/g, "") +
            "@s.whatsapp.net";

        const isOwner =
            fromMe ||
            sender === ownerJid ||
            sender === botId;

        const reply = teks =>
            sock.sendMessage(
                chat,
                { text: teks },
                { quoted: m }
            );

        const pluginFolder = path.join(__dirname, "plugins");

        if (!fs.existsSync(pluginFolder)) return;

        const pluginFiles = fs
            .readdirSync(pluginFolder)
            .filter(file => file.endsWith(".js"));

        for (const file of pluginFiles) {
            try {
                const filePath = path.join(pluginFolder, file);

                delete require.cache[
                    require.resolve(filePath)
                ];

                const plugin = require(filePath);

                if (typeof plugin.handle === "function") {
                    await plugin.handle(
                        sock,
                        m,
                        chatUpdate
                    );
                }
            } catch (err) {
                console.log(
                    chalk.red(
                        `[HANDLER ERROR] ${file}`
                    ),
                    err.message
                );
            }
        }

        if (!isCmd || !command) return;

        for (const file of pluginFiles) {
            try {
                const filePath = path.join(
                    pluginFolder,
                    file
                );

                delete require.cache[
                    require.resolve(filePath)
                ];

                const plugin = require(filePath);

                const cmdMatch = Array.isArray(
                    plugin.command
                )
                    ? plugin.command.some(
                          c =>
                              c.toLowerCase() ===
                              command
                      )
                    : plugin.command?.toLowerCase() ===
                      command;

                if (!cmdMatch) continue;

                if (plugin.isOwner && !isOwner)
                    return reply(
                        config.msg?.owner ||
                            "Owner Only!"
                    );

                if (plugin.isGroup && !isGroup)
                    return reply(
                        config.msg?.group ||
                            "Group Only!"
                    );

                if (plugin.isAdmin && !isAdmin)
                    return reply(
                        config.msg?.admin ||
                            "Admin Only!"
                    );

                if (
                    plugin.isBotAdmin &&
                    !isBotAdmin
                )
                    return reply(
                        config.msg?.botAdmin ||
                            "Make me Admin!"
                    );

                await plugin.execute(sock, m, {
                    args,
                    text,
                    q,
                    reply,
                    config,
                    chatUpdate,
                    isGroup,
                    isAdmin,
                    isBotAdmin,
                    isOwner,
                    participants,
                    groupMetadata,
                    pushName,
                    command
                });

                return;
            } catch (err) {
                console.log(
                    chalk.red(
                        `[PLUGIN ERROR] ${file}`
                    ),
                    err.message
                );
            }
        }
    } catch (err) {
        console.log(
            chalk.red(
                "CRITICAL ERROR in message.js:"
            ),
            err
        );
    }
};