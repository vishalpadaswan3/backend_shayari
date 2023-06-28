const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/shayari', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    console.log('keyword', keyword);

    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: `Shayari about ${keyword} in hindi around 60 words\n\nShayari:`,
      max_tokens: 100,
      temperature: 0.7,
      n: 1
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const shayari = response.data.choices[0].text.trim();
    res.json({ shayari });
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error.response ? error.response.data : 'Something went wrong';
    res.status(500).json({ error: errorMessage });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
