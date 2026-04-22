const axios = require('axios');

module.exports = {
    command: 'movie',
    description: 'Search and download full movie MP4 from free sources (YTS style + fallback)',
    category: 'downloader',
    execute: async (sock, m, { text, prefix, reply }) => {
        if (!text) {
            return await reply(`🎬 Usage: ${prefix}movie <movie name>\nMfano: ${prefix}movie inception\nAu: ${prefix}movie naruto shippuden`);
        }

        const query = text.trim();
        await sock.sendMessage(m.chat, { react: { text: "🎥", key: m.key } });

        let movieTitle = query;
        let downloadLink = null;
        let quality = "720p";

        try {
            // Step 1: Primary - Public movie downloader API (workers/dev style - badilisha na yako inayofaa)
            // Mfano wa free public endpoints (unaweza kutumia cobalt.tools au similar workers)
            const searchUrl = `https://api.example-movie-dl.workers.dev/search?q=${encodeURIComponent(query)}`; // Badilisha na real free endpoint
            const searchRes = await axios.get(searchUrl, { timeout: 15000 });
            
            // Chukua first result (au best quality)
            const results = searchRes.data?.results || [];
            if (results.length > 0) {
                movieTitle = results[0].title || movieTitle;
                downloadLink = results[0].mp4_720 || results[0].downloadLink || results[0].url;
            }
        } catch (e) {
            console.log("Primary movie API failed, trying fallback...");
        }

        // Step 2: Fallback - YTS.mx style or public torrent metadata + magnet/public link (simple scrape)
        if (!downloadLink) {
            try {
                // YTS API (free & popular for movies)
                const ytsUrl = `https://yts.mx/api/v2/list_movies.json?query_term=${encodeURIComponent(query)}&limit=5`;
                const ytsRes = await axios.get(ytsUrl);
                const movies = ytsRes.data?.data?.movies || [];

                if (movies.length > 0) {
                    const selectedMovie = movies[0];
                    movieTitle = selectedMovie.title_long || movieTitle;
                    
                    // Chagua torrent link au direct (YTS inatoa torrents, unaweza kutumia external converter au toa magnet)
                    // Hapa tuna-toa info + link (kwa simplicity)
                    if (selectedMovie.torrents && selectedMovie.torrents.length > 0) {
                        const bestTorrent = selectedMovie.torrents.find(t => t.quality === "720p") || selectedMovie.torrents[0];
                        downloadLink = bestTorrent.url; // Magnet au torrent file link
                        quality = bestTorrent.quality;
                    }
                }
            } catch (e) {
                console.log("YTS fallback failed");
            }
        }

        // Step 3: Final fallback - Public domain / free movies (Internet Archive style)
        if (!downloadLink) {
            try {
                const archiveUrl = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)}&output=json`;
                const archiveRes = await axios.get(archiveUrl);
                // Chukua first item with MP4 if available
                // Logic rahisi: toa link ya archive.org item
            } catch (e) {}
        }

        if (!downloadLink) {
            await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
            return await reply("❌ Hakuna movie iliyopatikana kutoka vyanzo vya bure. Jaribu jina sahihi au tena baadaye.\n\nNote: Full copyrighted movies inaweza kuhitaji torrent clients.");
        }

        // Send preview
        await sock.sendMessage(m.chat, {
            text: `🎬 *\( {movieTitle}*\n📥 Inapakua ( \){quality})...\n⚠️ File inaweza kuwa kubwa sana!`
        }, { quoted: m });

        await sock.sendMessage(m.chat, { react: { text: "⬇️", key: m.key } });

        // Tumia document mode kwa movies kubwa (WhatsApp inaruhusu hadi \~2GB kwa document)
        await sock.sendMessage(m.chat, {
            document: { url: downloadLink },
            mimetype: 'video/mp4',
            fileName: `${movieTitle.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`,
            caption: `🎬 ${movieTitle}\nQuality: ${quality}\nDownloaded from free sources\n👑 Your Bot`
        }, { quoted: m });

        await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

    } catch (error) {
        console.error('Movie download error:', error);
        await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
        await reply("❌ Download imeshindwa. Jaribu tena au tumia jina la movie maarufu.");
    }
};