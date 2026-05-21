
/**
 * DarkX AI - User Friendly Brain
 * Simple Assistant for Everyday Use
 */

const knowledgeBase = [
    {
        keywords: ['mambo', 'niaje', 'hi', 'hello', 'vipi', 'habari'],
        reply: `
👋 *Mambo!*

Naitwa *DarkX AI* 🤖  
Nipo hapa kukusaidia chochote unachohitaji.

Unaweza kuniuliza:
• Maswali ya kawaida  
• Tech stuff 💻  
• Msaada wa coding  
• Au chochote tu 🙂

👉 Andika swali lako tu, nipo tayari!`
    },

    {
        keywords: ['asante', 'thanks', 'thank you'],
        reply: `
🙏 Karibu sana!

Nipo hapa kukusaidia muda wowote 😊  
Usisite kuniuliza tena!`
    },

    {
        keywords: ['unaweza kufanya nini', 'help', 'menu', 'msaada'],
        reply: `
📌 *Naweza kusaidia vitu hivi:*

🤖 Maswali ya kawaida  
💻 Coding & programming  
📱 Tech (simu, apps, tricks)  
🌍 General knowledge  

Jaribu kuniuliza kitu 😄`
    },

    {
        keywords: ['bot', 'whatsapp bot'],
        reply: `
🤖 Unahitaji *WhatsApp Bot*?

Naweza kukusaidia:
• Kuelewa bot ni nini  
• Jinsi ya kuitengeneza  
• Kukupa code  

👉 Niambie unataka bot ya aina gani`
    },

    {
        keywords: ['website', 'tovuti'],
        reply: `
🌐 Kuhusu *Website*:

Naweza kukusaidia:
• Kutengeneza website  
• HTML, CSS, JS  
• Ideas za projects  

👉 Niambie unataka website ya aina gani`
    },

    {
        keywords: ['code', 'coding', 'programming'],
        reply: `
💻 Coding help available!

Languages:
• JavaScript  
• HTML/CSS  
• Node.js  

👉 Tuma code yako au swali lako`
    },

    {
        keywords: ['simu', 'phone', 'android', 'iphone'],
        reply: `
📱 Kuhusu simu:

Naweza kusaidia:
• Kuchagua simu  
• Tricks & tips  
• Apps nzuri  

👉 Uliza chochote kuhusu simu`
    },

    {
        keywords: ['jina lako nani', 'wewe nani'],
        reply: `
🤖 Mimi ni *DarkX AI*

Assistant wa kukusaidia mambo ya:
• Tech  
• Maswali ya kawaida  
• Coding  

Niko hapa kwa ajili yako 😎`
    }
];

const getBotResponse = (userInput) => {
    const text = userInput.toLowerCase().trim();

    for (const entry of knowledgeBase) {
        const isMatch = entry.keywords.some(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'i');
            return regex.test(text);
        });

        if (isMatch) return entry.reply;
    }

    // Default response
    return `
🤖 *DarkX AI*

Sijaelewa vizuri hapo 😅

👉 Jaribu kuuliza kwa njia nyingine  
Au uliza swali lolote tu — nipo kukusaidia!`;
};

module.exports = { getBotResponse };
