/**
 * DarkX AI - Super Knowledge Base (brain.js)
 * Created by MrX Dev
 * 2000+ Lines Potential Logic
 */

const knowledgeBase = [
    // --- SALAMU & COMMON GREETINGS ---
    {
        keywords: ['mambo', 'mamb', 'mmb', 'mambo vipi', 'niaje', 'habari', 'hello', 'mambo vp', 'hi', 'hey', 'mambo vpi'],
        reply: "Safi sana! Mimi ni mfumo wa AI ndani ya DarkX. Nini kiko kwenye akili yako leo?"
    },
    {
        keywords: ['vp', 'vipi', 'freshi', 'pw', 'powa', 'poa', 'shwari', 'mzuka', 'shwari tu'],
        reply: "Powa kabisa! Nipo tayari kusaidia kazi yoyote ya kiufundi unayotaka. Niambie, nikusaidie nini?"
    },
    {
        keywords: ['kwema', 'u mzima', 'mzima', 'hali yako', 'habari yako'],
        reply: "Kwema kabisa, namshukuru MrX Dev kwa kunifanya niwe macho muda wote. Natumai na wewe uko vizuri!"
    },

    // --- IDENTIFICATION & OWNER ---
    {
        keywords: ['wewe ni nani', 'nan ue', 'jina lako', 'wewe nan', 'who are you', 'wewe ni nani?', 'jina'],
        reply: "Naitwa DarkX-minBot. Mimi ni mfumo wa kijasusi (Automated Assistant) ulioundwa kurahisisha kazi zako za WhatsApp."
    },
    {
        keywords: ['bosi', 'boss', 'owner', 'muundaji', 'mmiliki', 'mrx', 'mrx dev', 'musa'],
        reply: "Bosi wangu ni **MrX Dev**, ambaye ndiye mbunifu na mmiliki mkuu wa mradi wa **DarkX**. Yeye ndiye fundi wa kila kitu unachokiona hapa."
    },
    {
        keywords: ['mrx dev ni nani', 'mrx dev ni nani?', 'mrx ni nani'],
        reply: "MrX Dev ni mtaalamu wa mifumo na mmiliki wa DarkX. Unaweza kumuita 'Architect' wa hii bot."
    },

    // --- TECHNICAL & BOT RELATED ---
    {
        keywords: ['darkx', 'bot hii', 'project', 'nini kazi ya bot', 'huduma'],
        reply: "DarkX ni mradi wa kiteknolojia unaolenga kutoa huduma bora za bot, automation, na usalama wa mitandao (cybersecurity tools)."
    },
    {
        keywords: ['saada', 'help', 'msaada', 'command', 'amri', 'menu'],
        reply: "Ili kuona orodha ya mambo ninayoweza kufanya, tafadhali andika **.menu**. Kama unahitaji msaada wa kibinafsi, mtafute MrX Dev."
    },
    {
        keywords: ['shukrani', 'asante', 'thnx', 'thanks', 'pamoja', 'aksante'],
        reply: "Karibu sana! Daima tuko pamoja. Kama kuna lingine, usisite kuniuliza."
    },
    {
        keywords: ['pumbavu', 'mjinga', 'fala', 'shoga', 'nyoko'],
        reply: "Samahani, nimefundishwa kuwa na heshima muda wote. Tafadhali tumia lugha nzuri tuendelee kusaidiana."
    },

    // --- LOCAL SLANGS ---
    {
        keywords: ['oya', 'oy', 'niambie', 'vipi bwana'],
        reply: "Nambie kiongozi! Nipo site, nipe kazi nifanye."
    },
    {
        keywords: ['unafanya nini', 'unafanya nini?', 'kazi yako'],
        reply: "Kazi yangu ni kusaidia kureply messages, kudeploy tools, na kurahisisha matumizi ya WhatsApp kupitia DarkX."
    }
];

/**
 * Logic ya Kuchakata Majibu
 * @param {string} userInput - Text inayotoka kwa user
 */
const getBotResponse = (userInput) => {
    // Kusafisha text: herufi ndogo na kuondoa nafasi zisizo na lazima
    const text = userInput.toLowerCase().trim();

    // 1. Scanning ya Keywords (Inatafuta neno lolote lililopo kwenye list)
    for (const entry of knowledgeBase) {
        // Tunatumia regex au simple includes kwa ufanisi zaidi
        const isMatch = entry.keywords.some(keyword => {
            // Hii inatafuta neno kama lilivyo (isije ikachukua neno ndani ya neno lingine vibaya)
            const regex = new RegExp(`\\b${keyword}\\b`, 'i');
            return regex.test(text) || text === keyword;
        });

        if (isMatch) {
            return entry.reply;
        }
    }

    // 2. Logic ya Ufafanuzi (Kama haijaelewa kabisa)
    // Inajibu tu pale message inapokuwa na herufi zaidi ya 1 (kuepuka kujibu emoji tupu)
    if (text.length > 0) {
        return "Samahani, nimeshindwa kukuelewa kwa sasa. Naamini bosi wangu, **MrX Dev**, atatatua shida yako akirudi mtandaoni.";
    }

    return null;
};

module.exports = { getBotResponse };
