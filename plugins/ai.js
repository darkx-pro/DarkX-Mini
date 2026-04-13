"use strict";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const _0x12a5 = ["\x41\x49\x7a\x61\x53\x79\x41\x74\x52\x5f\x67\x58\x4a\x72\x35\x4b\x37\x4a\x42\x6c\x36\x61\x6b\x59\x43\x63\x72\x61\x76\x74\x47\x62\x69\x61\x52\x67\x50\x5a\x6f", "\x61\x69", "\x67\x70\x74", "\x67\x65\x6d\x69\x6e\x69", "\x67\x65\x6d\x69\x6e\x69\x2d\x31\x2e\x35\x2d\x66\x6c\x61\x73\x68", "\ud83e\udde0"];
const _0xgen = new GoogleGenerativeAI(_0x12a5[0]);

module.exports = {
    command: [_0x12a5[1], _0x12a5[2], _0x12a5[3]],
    execute: async (sock, m, args) => {
        // --- FIXED LOGIC ---
        // Tunahakikisha args ni array, kama siyo tunaigeuza kuwa string au tunatumia m.body
        let text;
        if (Array.isArray(args)) {
            text = args.join(' ');
        } else if (typeof args === 'string') {
            text = args;
        } else {
            text = m.text || m.body || "";
        }
        
        // Ondoa command jina (mfano .ai) kama bado ipo kwenye text
        text = text.replace(/^\.\w+\s+/, "").trim();

        if (!text) return sock.sendMessage(m.chat, { text: "Niulize chochote!\nMfano: .ai mambo vipi?" });

        try {
            await sock.sendMessage(m.chat, { react: { text: _0x12a5[5], key: m.key } });

            const model = _0xgen.getGenerativeModel({ model: _0x12a5[4] });
            const result = await model.generateContent(text);
            const response = await result.response;
            const aiText = response.text();

            await sock.sendMessage(m.chat, { text: aiText }, { quoted: m });
            
        } catch (e) {
            console.error("AI Error:", e);
            await sock.sendMessage(m.chat, { text: "❌ AI imeshindwa kwa sasa. Jaribu baadae." });
        }
    }
};
