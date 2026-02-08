const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Main Assignment Endpoint: POST /ask-jiji
app.post('/ask-jiji', async (req, res) => {
    const { query } = req.body;

    // 1. Basic Input Validation [cite: 55, 78]
    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    try {
        // 2. Fetch matching resources from Supabase [cite: 56]
        const { data: resources, error } = await supabase
            .from('resources')
            .select('*')
            .ilike('title', `%${query}%`);

        if (error) throw error;

        // 3. Create structured response [cite: 23, 50, 57]
        const responseData = {
            answer: `I found ${resources.length} resources related to "${query}".`, // [cite: 59]
            resources: resources.map(r => ({
                title: r.title,
                type: r.type,
                link: r.url
            })) // [cite: 61]
        };

        // 4. Log the query into your queries table [cite: 83]
        await supabase.from('queries').insert([
            { query_text: query, response_text: responseData.answer }
        ]);

        return res.status(200).json(responseData);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" }); // [cite: 74]
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Jiji server active on http://localhost:${PORT}`));