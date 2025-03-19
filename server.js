// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// 請將 YOUR_API_KEY 替換為你的 Riot API 金鑰
const API_KEY = 'RGAPI-d5aa29fb-e9f7-42d9-8b6c-be2b1f037785';

// 為了讓前端可以呼叫 API，使用 JSON 格式解析
app.use(express.json());

// 範例：根據召喚師名稱查詢 VALORANT 排行（實際 API 端點請參考 Riot 的官方文件）
app.get('/api/rank', async (req, res) => {
  const summoner = req.query.summoner;
  if (!summoner) {
    return res.status(400).json({ error: 'Missing summoner parameter' });
  }

  try {
    // 注意：以下 URL 僅為示例，請根據 Riot 的 VALORANT API 文檔調整正確的端點
    const url = `https://api.riotgames.com/val/ranked/v1/leaderboards/by-summoner/${encodeURIComponent(summoner)}`;
    
    const response = await axios.get(url, {
      headers: {
        'X-Riot-Token': API_KEY
      }
    });
    
    // 將取得的資料返回給前端
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching rank data:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error fetching rank data' });
  }
});

// 範例：查詢 VALORANT 狀態（同樣需依據實際 API 端點修改）
app.get('/api/status', async (req, res) => {
  try {
    // 示範 URL，請根據 Riot 文件修改
    const url = 'https://api.riotgames.com/val/status/v1/platform-data';
    
    const response = await axios.get(url, {
      headers: {
        'X-Riot-Token': API_KEY
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching status data:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error fetching status data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
