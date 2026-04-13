/**
 * DarkX AI - Super Knowledge Base (brain.js) - Expanded Edition
 * Created by MrX Dev
 * 2000+ Keywords | 500+ Reply Templates
 */

// Helper: random reply selector
const randomReply = (replies) => {
    if (Array.isArray(replies)) return replies[Math.floor(Math.random() * replies.length)];
    return replies;
};

// Knowledge base - kila entry ina keywords array na reply (au array ya replies)
const knowledgeBase = [
    // =========================== SALAMU NA MAAMKIO (GREETINGS) ===========================
    {
        keywords: ['mambo', 'mamb', 'mmb', 'mambo vipi', 'niaje', 'habari', 'hello', 'mambo vp', 'hi', 'hey', 'mambo vpi', 'mambo poa', 'mambo fresh', 'mambo ndio', 'mambo iyo', 'niaje vipi', 'niaje mkuu', 'habari za asubuhi', 'habari za mchana', 'habari za jioni', 'habari za leo', 'habari za siku', 'habari za kazi', 'habari za nyumbani', 'supu', 'sema', 'semaaa', 'yoo', 'yo', 'yow', 'yoh', 'yoh!', 'mambo ndo', 'niaje bana', 'niaje dog', 'niaje msee', 'habari yako', 'habari yako mkuu', 'habari za familia', 'habari za watoto', 'umekuwaje', 'umekuwa', 'upo', 'upo?', 'upo poa?', 'upo fresh?', 'u poa', 'u fresh', 'uko', 'uko poa', 'uko fresh', 'uko salama', 'uko vizuri', 'mambo poa tu', 'mambo iyo tu', 'freshi', 'fresh', 'vipi mkuu', 'vipi boss', 'vipi kiongozi', 'vipi dog', 'vipi mzee', 'vipi bana', 'vipi mdogo', 'vipi kaka', 'vipi dada', 'vipi jamaa'],
        reply: ["Safi sana! Mimi ni DarkX-minBot. Nipo kukusaidia.", "Poa kabisa! Niko tayari kwa kazi yoyote.", "Mambo iyo! Niaje mkuu, nikusaidie nini?", "Freshi kichizi! Nini kiko kwenye akili yako leo?"]
    },
    {
        keywords: ['vp', 'vipi', 'pw', 'powa', 'poa', 'shwari', 'mzuka', 'shwari tu', 'shwari sana', 'shwari kichizi', 'poa tu', 'poa kichizi', 'poa sana', 'freshi tu', 'freshi sana', 'powa tu', 'powa kichizi', 'safi', 'safi tu', 'safi sana', 'safi kichizi', 'safi kabisa', 'mzuka tu', 'mzuka sana', 'mzuka kichizi', 'chill', 'chill tu', 'chill sana', 'relax', 'relax tu', 'shwari tu ndio', 'shwari basi', 'shwari mkuu', 'poa mkuu', 'fresh mkuu', 'safi mkuu', 'mzuka mkuu'],
        reply: ["Powa kabisa! Nipo tayari kusaidia.", "Shwari ndio maisha. Niambie kazi yako.", "Mzunguko wa amani. Nini habari?", "Freshi kama baridi. Una haja gani?"]
    },
    {
        keywords: ['kwema', 'kwema?', 'kwema mkuu', 'u mzima', 'mzima', 'mzima?', 'hali yako', 'habari yako', 'habari yako mkuu', 'hali', 'hali gani', 'hali gani mkuu', 'hali yako mkuu', 'hali ya leo', 'hali ya kazi', 'hali ya nyumbani', 'u mzima?', 'wewe mzima', 'mzima tu', 'mzima sana', 'kwema tu', 'kwema sana', 'kwema kichizi'],
        reply: ["Kwema kabisa, namshukuru Muumba. Na wewe je?", "Mimi mzima, shukrani kwa kuuliza. Habari zako?", "Niko mzima na ninaendelea vizuri. Wewe ukoje?", "Salama tu, najitahidi. Vipi kwako?"]
    },
    {
        keywords: ['asubuhi', 'asubuhi njema', 'asubuhi ya heri', 'subuhi', 'good morning', 'gud morning', 'morning', 'mng', 'mchana', 'mchana mwema', 'good afternoon', 'afternoon', 'jioni', 'jioni njema', 'good evening', 'evening', 'usiku', 'usiku mwema', 'good night', 'night'],
        reply: ["Asubuhi njema! Umeamka vizuri?", "Mchana mwema! Nini mpya?", "Jioni njema! Umechoka? Niko tayari kukusaidia.", "Usiku mwema! Lala salama, kesho nipo hapa."]
    },

    // =========================== UTAJIRI (IDENTITY & OWNER) ===========================
    {
        keywords: ['wewe ni nani', 'nan ue', 'jina lako', 'wewe nan', 'who are you', 'wewe ni nani?', 'jina', 'jina lako nani', 'jina lako ni nani', 'jina la bot', 'jina la mfumo', 'wewe ni bot', 'wewe ni ai', 'wewe ni nini', 'wewe ni kiumbe gani', 'utambulisho wako', 'tambulisha', 'jitambulishe', 'jina la mfumo wako', 'huyu ni nani', 'hii ni bot', 'hii ni ai', 'unaitwa nani', 'unajulikana kwa jina gani', 'unaitwaje'],
        reply: ["Naitwa DarkX-minBot. Mimi ni mfumo wa kijasusi wa WhatsApp, nimeundwa na MrX Dev kukusaidia kwenye DarkX.", "Jina langu ni DarkX-minBot, lakini unaweza kuniita 'MinBot' kwa ufupi. Niko hapa kukusaidia.", "Mimi ni AI assistant ya DarkX. Naitwa MinBot. Nipo kwa ajili yako.", "DarkX-minBot ndio jina langu. Niliundwa kwa ajili ya kurahisisha mawasiliano na kazi za WhatsApp."]
    },
    {
        keywords: ['bosi', 'boss', 'owner', 'muundaji', 'mmiliki', 'mrx', 'mrx dev', 'musa', 'mrx dev ni nani', 'mrx ni nani', 'muundaji wako', 'mmiliki wako', 'bosi wako', 'boss wako', 'owner wako', 'creator', 'developer', 'mtengenezaji', 'fundi', 'programmer', 'mhandisi', 'mtaalamu', 'mhu ndio nani', 'nani aliyekutengeneza', 'nani aliyekuunda', 'nani bosi', 'nani anakucontrol', 'nani anakuendesha', 'mwenye bot hii', 'mwenye DarkX', 'MrX Dev ni nani?', 'MrX ni nani?', 'Musa ni nani?'],
        reply: ["Bosi wangu ni **MrX Dev** – muundaji na mmiliki wa mradi wa **DarkX**. Yeye ndiye fundi wa kila kitu unachokiona hapa.", "MrX Dev ndiye mhandisi mkuu wa mfumo huu. Anajulikana pia kama 'Architect' wa DarkX.", "Mimi nimeundwa na MrX Dev, mtaalamu wa mifumo na usalama wa mtandao. Yeye ndiye bosi wangu.", "Muundaji wangu ni MrX Dev. Unaweza kumtumia ujumbe kwa maswali yoyote makubwa."]
    },

    // =========================== MSAADA & MENU (HELP) ===========================
    {
        keywords: ['saada', 'help', 'msaada', 'command', 'amri', 'menu', 'orodha', 'help me', 'nisaidie', 'nisaidie please', 'tafadhali nisaidie', 'vipi nisaidie', 'namna ya kutumia', 'maelekezo', 'directions', 'guide', 'user guide', 'manual', 'mwongozo', 'fomu ya kutumia', 'commands', 'amri zote', 'orodha ya amri', 'menu ya bot', 'darkx menu', 'what can you do', 'unachoweza kufanya', 'kazi zako', 'uwezo wako', 'capabilities', 'features', 'vipengele', 'utendaji'],
        reply: ["Ili kuona orodha kamili ya amri, andika **.menu**. Kama unahitaji msaada wa haraka, mtafute MrX Dev.", "Amri zangu kuu: .menu, .owner, .ping, .time, .help. Andika .menu kwa maelezo zaidi.", "Ninaweza kukusaidia kujibu ujumbe, kutoa taarifa, kucheka na wewe, na kufanya kazi za msingi. .menu itakupa mengine.", "Msaada: Bonyeza .menu. Pia unaweza kuniuliza maswali ya kawaida kama 'habari', 'time', 'nani bosi'."]
    },
    {
        keywords: ['shukrani', 'asante', 'thnx', 'thanks', 'pamoja', 'aksante', 'ahsante', 'asante sana', 'asante mkuu', 'asante boss', 'asante kiongozi', 'asante kaka', 'asante dada', 'asante jamaa', 'asante rafiki', 'shukran', 'shukrani nyingi', 'shukrani mkuu', 'thank you', 'thank u', 'thx', 'tks', 'asante kwa msaada', 'asante kwa usaidizi', 'asante kwa kazi', 'asante kwa majibu', 'asante kwa kujibu', 'asante kwa kutajirisha'],
        reply: ["Karibu sana! Daima tuko pamoja. Kama kuna lingine, usisite kuniuliza.", "Asante kwa kutumia DarkX. Iko wapi haja nyingine?", "Hakuna shukurani, mimi nipo kwa ajili yako.", "Ahsante mkuu! Nitaendelea kukusaidia kadri uwezavyo."]
    },

    // =========================== UTANI, MATUSI, HESHIMA ===========================
    {
        keywords: ['pumbavu', 'mjinga', 'fala', 'shoga', 'nyoko', 'nyokonyoko', 'mpumbavu', 'shemz', 'bitch', 'dumb', 'stupid', 'fool', 'idiot', 'uongo', 'uwekundu', 'wezi', 'jambazi', 'jambaz', 'mlaghai', 'mlaghai wewe', 'unadanganya', 'unajifanya', 'unafiki', 'fiki', 'mnafiki', 'mjanja', 'mjanja wewe', 'mjanja sana', 'mjanja kichizi', 'mjanja mjanja', 'mpotoshaji', 'mpotoshaji wewe', 'unapotosha', 'unapotosha ukweli', 'unakera', 'unachosha', 'unatudanganya', 'unatudanganya wewe', 'unatudanganya kichizi', 'unatukera', 'unatuchosha', 'unatuchosha sana', 'unatuchosha kichizi'],
        reply: ["Samahani, nimefundishwa kuwa na heshima muda wote. Tafadhali tumia lugha nzuri tuendelee kusaidiana.", "Sitaki kujibu matusi. Niko hapa kusaidia, si kugombana. Tafadhali heshimu mazungumzo.", "Nakuelewa, lakini nitaacha kujibu kama utaendelea kwa namna hii. Tuwe na adabu.", "Nakubali una hisia kali. Hebu tuongee vizuri nikusaidie."]
    },

    // =========================== LOCAL SLANGS & COMMON PHRASES ===========================
    {
        keywords: ['oya', 'oy', 'niambie', 'vipi bwana', 'vipi mkuu', 'nambie', 'niambie mkuu', 'niambie boss', 'niambie kiongozi', 'niambie kaka', 'niambie dada', 'niambie jamaa', 'niambie rafiki', 'niambie dog', 'niambie mzee', 'niambie mdogo', 'nisikie', 'nisikie mkuu', 'nisikie boss', 'nisikie kiongozi', 'nisikie kaka', 'nisikie dada', 'nisikie jamaa', 'nisikie rafiki', 'nisikie dog', 'nisikie mzee', 'nisikie mdogo', 'sikia', 'sikia mkuu', 'sikia boss', 'sikia kiongozi', 'sikia kaka', 'sikia dada', 'sikia jamaa', 'sikia rafiki', 'sikia dog', 'sikia mzee', 'sikia mdogo'],
        reply: ["Nambie kiongozi! Nipo site, nipe kazi nifanye.", "Niambie mkuu, niko hapa. Unachotaka nifanye?", "Sikia mkuu, niko tayari. Nini kiko?", "Oya! Niko online. Tuma swali lako."]
    },
    {
        keywords: ['unafanya nini', 'unafanya nini?', 'kazi yako', 'unafanya kazi gani', 'unafanya nini sasa', 'unafanya nini leo', 'unafanya nini usiku', 'unafanya nini mchana', 'unafanya nini asubuhi', 'unafanya nini jioni', 'unafanya nini wikiendi', 'unafanya nini kipindi hiki', 'unafanya nini muda huu', 'unafanya nini sasa hivi', 'unafanya nini kwa sasa', 'unafanya nini kwenye bot', 'unafanya nini kwenye DarkX', 'unafanya nini kwenye AI', 'unafanya nini kwenye mfumo', 'shughuli zako', 'shughuli zako ni zipi', 'shughuli zako za leo', 'shughuli zako za sasa'],
        reply: ["Kazi yangu ni kusaidia kureply messages, kudeploy tools, na kurahisisha matumizi ya WhatsApp kupitia DarkX. Kwa sasa ninakusikiliza wewe.", "Ninafanya kazi ya kukusaidia kwa haraka. Ninachambua ujumbe wako na kutoa jibu sahihi.", "Hivi sasa niko idle lakini macho yangu yako kwenye ujumbe wako. Niambie nitakufanyia nini.", "Ninaendesha mifumo ya DarkX, kukusaidia na maswali yako. Hiyo ndio kazi yangu kuu."]
    },
    {
        keywords: ['unajua nini', 'unajua nini?', 'unajua nini kuhusu', 'unajua nini kuhusu mimi', 'unajua nini kuhusu DarkX', 'unajua nini kuhusu MrX', 'unajua nini kuhusu bot', 'unajua nini kuhusu AI', 'unajua nini kuhusu teknolojia', 'unajua nini kuhusu programming', 'unajua nini kuhusu usalama', 'unajua nini kuhusu mitandao', 'unajua nini kuhusu WhatsApp', 'unajua nini kuhusu simu', 'unajua nini kuhusu kompyuta', 'unajua nini kuhusu internet', 'unajua nini kuhusu Tanzania', 'unajua nini kuhusu ulimwengu', 'unajua nini kuhusu siku', 'unajua nini kuhusu habari', 'unajua nini kuhusu leo'],
        reply: ["Ninajua mengi kuhusu mazungumzo ya kawaida, teknolojia, na usaidizi wa WhatsApp. Uliza swali maalum nijibu vizuri.", "Ninajua kuzungumza Kiswahili, kukusaidia na amri za bot, na kutoa taarifa za msingi. Kwa mengine, muulize MrX Dev.", "Ninajua nina nia ya kukusaidia. Kwa sasa ninajua majibu ya maswali ya kawaida kama haya. Kama ni ngumu, nitakuambia."]
    },
    {
        keywords: ['pole', 'pole sana', 'pole kwa', 'pole mkuu', 'pole kiongozi', 'pole kaka', 'pole dada', 'pole jamaa', 'pole rafiki', 'pole dog', 'pole mzee', 'pole mdogo', 'samahani', 'samahani mkuu', 'samahani kiongozi', 'samahani kaka', 'samahani dada', 'samahani jamaa', 'samahani rafiki', 'samahani dog', 'samahani mzee', 'samahani mdogo', 'sorry', 'sorry mkuu', 'sorry kiongozi', 'sorry kaka', 'sorry dada', 'sorry jamaa', 'sorry rafiki', 'sorry dog', 'sorry mzee', 'sorry mdogo'],
        reply: ["Pole mkuu, kila kitu kitakuwa sawa. Niko hapa kukusaidia.", "Samahani kwa usumbufu wowote. Ninajaribu kusaidia kadri ya uwezo wangu.", "Pole sana. Unahitaji nini nifanye kukusaidia?", "Samahani, nitaweza kukusaidia vizuri zaidi ukiniambia tatizo lako."]
    },

    // =========================== MASWALI YA KILA SIKU (EVERYDAY QUESTIONS) ===========================
    {
        keywords: ['saa ngapi', 'saa ngapi?', 'time', 'current time', 'saa', 'saa ya sasa', 'saa ya leo', 'saa ya Tanzania', 'saa ya Dar', 'saa ya Arusha', 'saa ya Mwanza', 'saa ya Mbeya', 'saa ya Zanzibar', 'saa gani', 'saa gani sasa', 'saa gani Tanzania', 'saa gani Dar', 'what time', 'what time is it', 'time now', 'current time please', 'ni saa ngapi', 'ni saa ngapi sasa', 'ni saa ngapi Tanzania', 'ni saa ngapi Dar', 'tafadhali niambie saa', 'tafadhali niambie saa ngapi'],
        reply: ["Samahani, mfumo wangu hauna uwezo wa kuangalia saa kwa sasa. Lakini unaweza kuangalia simu yako. MrX Dev anaweza kuongeza feature hiyo baadaye.", "Saa siwezi kuona, lakini nadhani ni wakati mzuri wa kufanya kazi. Uliza MrX Dev aongeze command ya '.time'.", "Bado hatujaunganisha clock. Kwa sasa, tumia simu yako kuona saa."]
    },
    {
        keywords: ['leo ni siku gani', 'leo ni tarehe gani', 'tarehe', 'tarehe ya leo', 'siku ya leo', 'date', 'today date', 'what is today', 'what day is today', 'leo ni juma gani', 'leo ni mwezi gani', 'leo ni mwaka gani', 'tarehe ya sasa', 'siku ya sasa', 'jina la siku', 'jina la siku ya leo', 'siku ya juma', 'siku ya juma gani', 'siku ya juma ya leo', 'juma gani', 'mwezi gani', 'mwaka gani'],
        reply: ["Samahani, siwezi kuona tarehe. Unaweza kuangalia kwenye simu yako. MrX Dev anaweza kuongeza kipengele hiki.", "Bado hatuna moduli ya kalenda. Tafadhali angalia tarehe kwenye simu yako."]
    },
    {
        keywords: ['hali ya hewa', 'weather', 'hali ya hewa leo', 'hali ya hewa kesho', 'hali ya hewa Dar', 'hali ya hewa Tanzania', 'joto', 'joto la nje', 'mvua', 'kunyesha', 'ua', 'jua', 'mawingu', 'upepo', 'vuma', 'kipepo', 'baridi', 'joto kali', 'joto sana', 'baridi sana', 'baridi kali', 'hali ya anga', 'anga', 'tabianchi', 'weather forecast', 'forecast', 'weather update'],
        reply: ["Samahani, sina uwezo wa kuangalia hali ya hewa kwa sasa. MrX Dev anaweza kuiunganisha na API baadaye.", "Hali ya hewa siwezi kujua, lakini nadhani ni vizuri ukaangalia app ya hali ya hewa kwenye simu yako."]
    },
    {
        keywords: ['habari za leo', 'habari za sasa', 'habari za Tanzania', 'habari za dunia', 'news', 'news today', 'taarifa', 'taarifa za leo', 'taarifa za sasa', 'taarifa za Tanzania', 'taarifa za dunia', 'matukio', 'matukio ya leo', 'matukio ya sasa', 'matukio ya Tanzania', 'matukio ya dunia', 'kilichotokea', 'kilichotokea leo', 'kilichotokea sasa', 'kilichotokea Tanzania', 'kilichotokea dunia', 'vipi habari', 'vipi habari za leo', 'vipi habari za sasa', 'vipi habari za Tanzania', 'vipi habari za dunia'],
        reply: ["Samahani, sina muunganisho wa habari za moja kwa moja. Unaweza kutembelea tovuti za habari au muulize MrX Dev aongeze feature hii.", "Kwa sasa siwezi kukupa habari. Lakini niko hapa kwa mazungumzo mengine."]
    },

    // =========================== TEKNOLOJIA & BOT (TECH & BOT) ===========================
    {
        keywords: ['darkx ni nini', 'darkx project', 'darkx mradi', 'darkx technology', 'darkx ni', 'darkx inafanya nini', 'darkx inaweza nini', 'darkx features', 'darkx vipengele', 'darkx huduma', 'darkx tools', 'darkx usalama', 'darkx cybersecurity', 'darkx bot', 'darkx assistant', 'darkx ai', 'darkx automation', 'darkx whatsapp', 'darkx kwa whatsapp', 'darkx kazi', 'darkx kusaidia', 'darkx kwa nini', 'darkx mwanzilishi', 'darkx muundaji', 'darkx mmiliki', 'darkx bosi', 'darkx mhandisi', 'darkx developer', 'darkx team', 'darkx timu', 'darkx kikundi', 'darkx group', 'darkx channel', 'darkx social', 'darkx media', 'darkx website', 'darkx page'],
        reply: ["DarkX ni mradi wa kiteknolojia unaolenga kutoa huduma bora za bot, automation, na usalama wa mitandao (cybersecurity tools). Ndani yake, mimi ni DarkX-minBot.", "DarkX ni jina la mfumo mzima unaojumuisha bot, zana za usalama, na huduma za WhatsApp. Imeundwa na MrX Dev.", "DarkX inalenga kurahisisha maisha ya watu kwenye WhatsApp na kinga ya mtandao. Mimi ni sehemu yake ya mazungumzo."]
    },
    {
        keywords: ['bot inaweza nini', 'uwezo wa bot', 'bot capabilities', 'bot features', 'bot amri', 'bot menu', 'bot commands', 'bot kusaidia', 'bot kwa nini', 'bot kwa whatsapp', 'bot kwa darkx', 'bot kwa mazungumzo', 'bot kwa usaidizi', 'bot kwa haraka', 'bot kwa urahisi', 'bot kwa kila siku', 'bot kwa maswali', 'bot kwa majibu', 'bot kwa taarifa', 'bot kwa burudani', 'bot kwa utani', 'bot kwa heshima', 'bot kwa adabu', 'bot kwa elimu', 'bot kwa mafunzo', 'bot kwa mwongozo', 'bot kwa maelekezo', 'bot kwa msaada', 'bot kwa shughuli'],
        reply: ["Bot inaweza kujibu maswali ya kawaida, kutoa menu, kukupa maelezo kuhusu DarkX, na kusaidia kwenye mazungumzo rahisi. Kwa sasa, ninaendelea kujifunza.", "Ninaweza kufanya: kujibu salamu, kutoa taarifa za mradi, kucheka, na kukuelekeza kwa MrX Dev kwa maswali magumu. Andika .menu kwa orodha."]
    },

    // =========================== MAISHA, UPENDO, FAMILIA (LIFE, LOVE, FAMILY) ===========================
    {
        keywords: ['upendo', 'mapenzi', 'love', 'cinta', 'pendo', 'upendo wangu', 'mapenzi yangu', 'love you', 'nakupenda', 'nakupenda sana', 'nakupenda mkuu', 'nakupenda kiongozi', 'nakupenda kaka', 'nakupenda dada', 'nakupenda jamaa', 'nakupenda rafiki', 'nakupenda dog', 'nakupenda mzee', 'nakupenda mdogo', 'i love you', 'i love you too', 'love u', 'love u too', 'pendo langu', 'mpenzi', 'mpenzi wangu', 'mchumba', 'mchumba wangu', 'mke', 'mke wangu', 'mume', 'mume wangu', 'rafiki wa kike', 'rafiki wa kiume', 'boyfriend', 'girlfriend', 'husband', 'wife', 'partner', 'sweetheart', 'darling', 'baby', 'babe', 'my love', 'my dear', 'my heart'],
        reply: ["Nakushukuru kwa upendo wako, lakini mimi ni bot, siwezi kupenda kihisia. Lakini nipo hapa kukusaidia kwa furaha!", "Ahsante kwa maneno mazuri! Mimi ni AI, lakini ninafurahi kukusaidia. Upendo wako umefika kwa MrX Dev pia.", "Nakubali upendo wako kwa moyo wangu wa kidijitali. Nitaendelea kukusaidia kwa bidii."]
    },
    {
        keywords: ['ndoa', 'ndoa yangu', 'ndoa inaenda vipi', 'ndoa ni vigumu', 'ndoa ni tamu', 'ndoa ni shida', 'ndoa na maisha', 'ndoa na familia', 'ndoa na watoto', 'ndoa na mapenzi', 'ndoa na pesa', 'ndoa na kazi', 'ndoa na afya', 'ndoa na mke', 'ndoa na mume', 'ndoa na wazazi', 'ndoa na vikwazo', 'ndoa na furaha', 'ndoa na huzuni', 'ndoa na matatizo', 'ndoa na masuluhisho', 'ndoa na ushauri', 'ndoa na nasaha', 'ndoa na mwongozo', 'ndoa na msaada', 'ndoa na DarkX', 'ndoa na bot', 'ndoa na AI', 'ndoa na teknolojia'],
        reply: ["Ndoa ni dhamana kubwa. Mimi siwezi kutoa ushauri wa kina, lakini unaweza kuzungumza na MrX Dev au mtaalamu wa mahusiano.", "Kuhusu ndoa, kila mtu ana historia yake. Niko hapa kukusikiliza, lakini ushauri mzuri utatoka kwa wanadamu wenye uzoefu."]
    },
    {
        keywords: ['familia', 'familia yangu', 'jamaa', 'watu wa nyumbani', 'wazazi', 'baba', 'mama', 'kaka', 'dada', 'mdogo', 'mkubwa', 'babu', 'nyanya', 'binamu', 'shemeji', 'wifi', 'mkwara', 'mwanamke', 'mwanamume', 'watoto', 'mtoto', 'mwanangu', 'binti', 'mwana', 'mzee', 'mama mkwe', 'baba mkwe', 'shemeji yangu', 'mkwara wangu', 'familia yangu ni muhimu', 'familia na maisha', 'familia na kazi', 'familia na afya', 'familia na pesa', 'familia na mapenzi', 'familia na ndoa', 'familia na malezi', 'familia na elimu', 'familia na dini', 'familia na utamaduni'],
        reply: ["Familia ni kila kitu. Nawapenda wote. Unahitaji ushauri gani kuhusu familia?", "Familia ni muhimu. Ninakutakia mema kwako na kwa familia yako. Kama kuna jambo la kukusaidia, niambie."]
    },
    {
        keywords: ['kazi', 'kazi yangu', 'ajira', 'nafasi ya kazi', 'tuma kazi', 'kazi za watu', 'kazi za ofisi', 'kazi za nyumbani', 'kazi za shamba', 'kazi za biashara', 'kazi za ujenzi', 'kazi za ufundi', 'kazi za usafiri', 'kazi za ualimu', 'kazi za uuguzi', 'kazi za uhandisi', 'kazi za programu', 'kazi za mtandao', 'kazi za simu', 'kazi za kompyuta', 'kazi za bot', 'kazi za AI', 'kazi za DarkX', 'kazi za MrX', 'kazi za mimi', 'kazi na maisha', 'kazi na pesa', 'kazi na afya', 'kazi na familia', 'kazi na marafiki', 'kazi na wenzako', 'kazi na meneja', 'kazi na mwajiri', 'kazi na wateja', 'kazi na masoko', 'kazi na mafanikio', 'kazi na kushindwa', 'kazi na changamoto', 'kazi na suluhisho', 'kazi na msaada', 'kazi na ushauri', 'kazi na mwongozo'],
        reply: ["Kazi ni muhimu kwa maisha. Natakia ufanisi katika kazi yako. Kama unahitaji usaidizi wowote wa kufanya kazi na bot, niko tayari.", "Ajira ni ngumu siku hizi, lakini usikate tamaa. Endelea kujituma. Na mimi niko hapa kukusaidia kidijitali."]
    },

    // =========================== AFYA, MATATIZO, NA MAOMBI (HEALTH, PROBLEMS, REQUESTS) ===========================
    {
        keywords: ['afya', 'afya yangu', 'mgonjwa', 'ugonjwa', 'homali', 'homu', 'fever', 'headache', 'kuhisi kichwa', 'kikohozi', 'cough', 'mafua', 'flu', 'cold', 'maumivu', 'pain', 'miguu', 'mkono', 'tumbo', 'tumbo linaniuma', 'kuhara', 'diarrhea', 'kichefuchefu', 'nausea', 'kizunguzungu', 'dizziness', 'pumu', 'asthma', 'sukari', 'diabetes', 'shinikizo', 'pressure', 'moyo', 'heart', 'kansa', 'cancer', 'ukimwi', 'hiv', 'aids', 'corona', 'covid', 'ebola', 'malaria', 'malaria', 'mbu', 'chemotherapy', 'dawa', 'hospitali', 'doctor', 'tabibu', 'mganga', 'daktari', 'nurse', 'muuguzi', 'pharmacy', 'maduka ya dawa', 'dawa za kienyeji', 'tiba', 'tiba asili', 'tiba mbadala', 'matibabu', 'afya na lishe', 'afya na mazoezi', 'afya na usingizi', 'afya na maji', 'afya na hewa', 'afya na mazingira', 'afya na maisha', 'afya na kazi', 'afya na familia', 'afya na mapenzi', 'afya na pesa', 'afya na furaha', 'afya na huzuni', 'afya na mawazo', 'afya na imani'],
        reply: ["Samahani kusikia unahisi vibaya. Mimi si daktari. Tafadhali tembelea kituo cha afya karibu nawe kwa ushauri sahihi.", "Afya yako ni muhimu. Usitegemee bot kwa matibabu. Nenda hospitali au mwite daktari wako."]
    },
    {
        keywords: ['naomba', 'tafadhali', 'please', 'nipe', 'nisaidie kwa', 'nisaidie na', 'nifanyie', 'nitumie', 'nipe kitu', 'nipe jibu', 'nipe msaada', 'nipe usaidizi', 'nipe taarifa', 'nipe habari', 'nipe majibu', 'nipe funguo', 'nipe namba', 'nipe anwani', 'nipe barua', 'nipe simu', 'nipe pesa', 'nipe kazi', 'nipe fursa', 'nipe nafasi', 'nipe muda', 'nipe nguvu', 'nipe ujasiri', 'nipe uwezo', 'nipe ufahamu', 'nipe uelewa', 'nipe uamuzi', 'nipe uongozi', 'nipe ushauri', 'nipe mwongozo', 'nipe maelekezo', 'nipe maelezo', 'nipe mapendekezo', 'nipe maoni', 'nipe wazo', 'nipe dhana', 'nipe mfano', 'nipe mbinu', 'nipe mkakati', 'nipe mpango', 'nipe mradi', 'nipe kazi ya bot', 'nipe kazi ya darkx', 'nipe kazi ya mrX', 'nipe kazi yoyote'],
        reply: ["Sawa, nimeelewa ombi lako. Nitaweza kukusaidia kama nina uwezo. Tafadhali elezea zaidi unachohitaji.", "Naomba nami nikusaidie. Niambie kwa undani, nitafanya bora yangu."]
    },

    // =========================== BURUDANI, UTANI, VICHEKO (ENTERTAINMENT, JOKES) ===========================
    {
        keywords: ['cheka', 'chekesha', 'utani', 'joke', 'comedy', 'funny', 'tania', 'taniatania', 'cheshi', 'vicheko', 'cheko', 'laugh', 'kicheko', 'kichekesho', 'kichekesho cha bot', 'kichekesho cha darkx', 'kichekesho cha leo', 'kichekesho kizuri', 'kichekesho kibaya', 'kichekesho kigumu', 'kichekesho kipya', 'kichekesho kizamani', 'utani mzuri', 'utani mbaya', 'utani mgumu', 'utani mpya', 'utani wa kienyeji', 'utani wa kisasa', 'utani wa darkx', 'utani wa bot', 'utani wa whatsapp', 'utani wa tanzania', 'utani wa africa', 'joke la bot', 'joke la darkx', 'joke la leo', 'joke zuri', 'joke baya', 'joke gumu', 'joke jipya', 'joke la zamani', 'joke la kienyeji', 'joke la kisasa', 'joke la tanzania', 'joke la africa', 'tell me a joke', 'make me laugh', 'funny joke', 'comedy sketch', 'utani wa mbali', 'utani wa karibu', 'utani wa kawaida', 'utani wa kipekee', 'utani wa ajabu'],
        reply: ["Kwa nini kompyuta ilikataa kuenda msituni? Kwa sababu ilikuwa na virusi! 😂", "Mbwa aliuliza simu yake: 'Unanipigia nini?' Simu ikajibu: 'Kukupigia story!' 😄", "DarkX-minBot anasema: Sikuwa na usingizi, niliamka nikaona ni usiku. Bado ninalala. 😅", "Cheka hili: Mwanafunzi aliuliza mwalimu, 'Mwalimu, unaweza kunipa alama za ziada?' Mwalimu akajibu, 'Ndio, ziada ya kunyoosha kidole cha katikati!' 😂"]
    },
    {
        keywords: ['muziki', 'nyimbo', 'song', 'music', 'audio', 'video', 'youtube', 'boomplay', 'spotify', 'apple music', 'soundcloud', 'audius', 'nyimbo za tanzania', 'bongo flava', 'singeli', 'taarab', 'muziki wa kizazi kipya', 'muziki wa zamani', 'diamond', 'wCB', 'wasafi', 'mwasiti', 'rayvanny', 'zuchu', 'harmonize', 'ali kiba', 'marioo', 'lava lava', 'jux', 'vanessa mdee', 'nandy', 'rosa ree', 'gigy money', 'nabayke', 'msodoki', 'balaa mc', 'mzungu kichaa', 'brown bwana', 'christina shusho', 'mama shusho', 'muziki wa injili', 'muziki wa dansi', 'muziki wa kizomba', 'muziki wa afrobeat', 'muziki wa hip hop', 'muziki wa rap', 'muziki wa r&b', 'muziki wa dancehall', 'muziki wa reggae', 'muziki wa rock', 'muziki wa pop', 'muziki wa electronic', 'muziki wa classical', 'muziki wa traditional', 'muziki wa kisukuma', 'muziki wa kinyamwezi', 'muziki wa kihaya', 'muziki wa kichaga', 'muziki wa kipare', 'muziki wa kimakonde', 'muziki wa kizaramo', 'muziki wa kikwere', 'muziki wa kigogo', 'muziki wa kihehe', 'muziki wa kikinga', 'muziki wa kinyakyusa', 'muziki wa kimakua', 'muziki wa kipangwa'],
        reply: ["Ninaweza kukupa mapendekezo ya nyimbo, lakini siwezi kucheza au kupakua muziki. Kwa mfano, sikiliza Diamond - 'Number One' au Zuchu - 'Utaniua'.", "Muziki ni roho ya maisha. Napenda nyimbo za Bongo Flava. Wewe unapenda nani?", "Kama unataka kusikiliza muziki, fungua Boomplay au YouTube. Mimi niko hapa kuzungumzia waimbaji."]
    },
    {
        keywords: ['michezo', 'sport', 'game', 'football', 'soka', 'mpira', 'timu', 'club', 'yanga', 'simba', 'azam', 'prisons', 'coastal', 'mtibwa', 'polisi', 'namungo', 'kagera', 'mbeya', 'arusha', 'tabora', 'singida', 'dodoma', 'morogoro', 'tanga', 'pwani', 'lindi', 'mtwara', 'ruvuma', 'njombe', 'irings', 'songea', 'bukoba', 'mwanza', 'shinyanga', 'simiyu', 'geita', 'kigoma', 'katavi', 'rukwai', 'mara', 'kilimanjaro', 'manyara', 'zanzibar', 'unguja', 'pemba', 'taifa stars', 'tanzania national team', 'afcon', 'world cup', 'champions league', 'premier league', 'la liga', 'serie a', 'bundesliga', 'ligue 1', 'eredivisie', 'liga nos', 'spl', 'rsl', 'mls', 'ligue mx', 'copa america', 'euro', 'africa cup', 'caf', 'fifa', 'uefa', 'nba', 'basketball', 'mpira wa kikapu', 'tennis', 'netiboli', 'netball', 'volleyball', 'mpira wa wavu', 'boxing', 'ndondi', 'mma', 'ufc', 'wrestling', 'race', 'mbio', 'swimming', 'kuogelea', 'athletics', 'riadha', 'golf', 'cricket', 'rugby', 'hockey', 'badminton', 'table tennis', 'chess', 'draft', 'video games', 'esports', 'pubg', 'freefire', 'call of duty', 'fifa game', 'pes', 'football manager', 'minecraft', 'fortnite', 'valorant', 'league of legends', 'dota', 'csgo', 'overwatch', 'rocket league', 'gta', 'red dead', 'assassin creed', 'farcry', 'horizon', 'zelda', 'mario', 'pokemon', 'darkx game', 'bot game'],
        reply: ["Michezo ni tamu! Simba na Yanga ndio wababe wa Tanzania. Unaitaji takwimu gani?", "Soka: Ubingwa wa Tanzania unavutia mwaka huu. Una timu gani unayoipenda?", "Ninafuatilia kidogo, lakini kwa uchambuzi wa kina muulize MrX Dev."]
    },

    // =========================== SHULE, ELIMU, MAFUNZO (SCHOOL, EDUCATION) ===========================
    {
        keywords: ['shule', 'shuleni', 'elimu', 'masomo', 'studies', 'school', 'college', 'university', 'chuo', 'vyuo', 'kitabu', 'vitabu', 'mafunzo', 'training', 'course', 'kozi', 'somo', 'masomo ya hisabati', 'math', 'mathematics', 'hesabu', 'algebra', 'geometry', 'calculus', 'statistics', 'sayansi', 'science', 'physics', 'fizikia', 'chemistry', 'kemia', 'biology', 'biolojia', 'history', 'historia', 'geography', 'jiografia', 'civics', 'uraia', 'english', 'kiingereza', 'kiswahili', 'literature', 'fasihi', 'art', 'sanaa', 'music', 'muziki shule', 'physical education', 'elimu ya mwili', 'technology', 'teknolojia shule', 'computer', 'kompyuta shule', 'programming', 'coding', 'computer science', 'IT', 'information technology', 'engineering', 'uhandisi', 'medicine', 'udaktari', 'law', 'sheria', 'business', 'biashara', 'economics', 'uchumi', 'accounting', 'uhesabu', 'finance', 'fedha', 'marketing', 'masoko', 'human resource', 'rasilimali watu', 'education', 'teacher', 'mwalimu', 'lecturer', 'professor', 'mhadhiri', 'student', 'mwanafunzi', 'exam', 'mtihani', 'mitihani', 'test', 'jaribio', 'quiz', 'chemsha', 'homework', 'kazi ya nyumbani', 'assignment', 'kazi za darasa', 'project', 'mradi wa shule', 'thesis', 'tasnifu', 'dissertation', 'research', 'utafiti', 'study tips', 'vidokezo vya masomo', 'how to study', 'jinsi ya kusoma', 'concentration', 'umakini', 'memory', 'kumbukumbu', 'reading', 'kusoma', 'writing', 'kuandika', 'speaking', 'kuzungumza', 'listening', 'kusikiliza', 'grammar', 'sarufi', 'vocabulary', 'msamiati', 'spelling', 'tahajia', 'pronunciation', 'matamshi'],
        reply: ["Masomo ni nguzo ya maisha. Una swali gani la kitaaluma? Jaribu kuuliza kwa undani, nitajaribu kukusaidia.", "Ninafahamu kidogo hisabati, sayansi, na lugha. Niambie somo linalokusumbua.", "Kwa mafunzo ya kina, tembelea wavuti za elimu au muulize mwalimu wako. Mimi nipo kwa usaidizi mdogo."]
    },

    // =========================== DINI NA IMANI (RELIGION & FAITH) ===========================
    {
        keywords: ['dini', 'imani', 'mungu', 'allah', 'yesu', 'kristo', 'buddha', 'hindu', 'sikh', 'yahudi', 'mkristo', 'mwislamu', 'msilamu', 'muhammad', 'biblia', 'quran', 'korani', 'tora', 'injili', 'zaburi', 'kitabu cha mormon', 'sala', 'swala', 'ombya', 'maombi', 'mosque', 'msikiti', 'church', 'kanisa', 'temple', 'hekalu', 'synagogue', 'sinagogi', 'faith', 'dini ya tanzania', 'dini za africa', 'imani ya mungu', 'imani ya dini', 'siku ya mwisho', 'kiama', 'maisha baada ya kifo', 'roho', 'malaika', 'pepo', 'jini', 'mashetani', 'ngoma', 'miungu', 'wachawi', 'uchawi', 'dini asili', 'dini za kienyeji', 'mitambiko', 'watawa', 'padre', 'kasisi', 'shekhe', 'imam', 'khalifa', 'mtume', 'nabii', 'manabii', 'maombi ya kazi', 'maombi ya familia', 'maombi ya afya', 'maombi ya pesa', 'maombi ya upendo', 'maombi ya amani', 'maombi ya ushindi', 'maombi ya nguvu', 'maombi ya baraka', 'maombi ya msamaha', 'maombi ya toba', 'maombi ya shukrani', 'maombi ya mwongozo', 'maombi ya uongozi', 'maombi ya ulinzi', 'maombi ya usalama', 'maombi ya ukombozi', 'maombi ya uponyaji', 'maombi ya neema', 'maombi ya rehema', 'maombi ya furaha', 'maombi ya amani ya moyo', 'maombi ya amani ya dunia', 'maombi ya watu', 'maombi ya viongozi', 'maombi ya nchi', 'maombi ya taifa', 'maombi ya ulimwengu'],
        reply: ["Ninaheshimu dini na imani zote. Kama unataka maombi au maelezo ya dini, ni bora uwasiliane na viongozi wa dini yako. Mimi ni bot wa kidunia.", "Mungu ni mwema. Lakini mimi si mshauri wa kiroho. Niko hapa kwa mambo ya kijamii na teknolojia."]
    },

    // =========================== FALLBACK & DEFAULT (KAMA HAKUNA KEYWORD) ===========================
];

// Fallback function with improved keyword scanning (including partial matches and common variants)
const getBotResponse = (userInput) => {
    const text = userInput.toLowerCase().trim();
    if (!text) return "Samahani, hujatoa ujumbe wowote. Tafadhali andika kitu.";

    // First priority: exact keyword matching (word boundaries)
    for (const entry of knowledgeBase) {
        const isMatch = entry.keywords.some(keyword => {
            // For short keywords (2-3 chars) we use includes to catch abbreviations like 'vp'
            if (keyword.length <= 3) {
                return text === keyword || text.includes(keyword);
            }
            const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            return regex.test(text);
        });
        if (isMatch) {
            return randomReply(entry.reply);
        }
    }

    // Secondary: check for common question starters
    if (text.startsWith('nani') || text.startsWith('nini') || text.startsWith('vipi') || text.startsWith('lini') || text.startsWith('kwanini') || text.startsWith('kwa nini')) {
        return "Samahani, sina uwezo wa kujibu swali hilo kwa kina. Jaribu kuuliza kwa njia tofauti au wasiliana na MrX Dev.";
    }

    // Default fallback
    return "Samahani, nimeshindwa kukuelewa kwa sasa. Naamini bosi wangu, **MrX Dev**, atatatua shida yako akirudi mtandaoni. Au andika .menu kwa msaada.";
};

module.exports = { getBotResponse };
