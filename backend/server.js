import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const VT = process.env.VT_API_KEY;

app.post("/scan-url", async (req, res) => {
  const { url } = req.body;

  if (!url.startsWith("https://github.com")) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const r = await fetch(
    "https://www.virustotal.com/api/v3/urls",
    {
      method: "POST",
      headers: {
        "x-apikey": VT,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `url=${encodeURIComponent(url)}`
    }
  );

  const data = await r.json();
  res.json(data);
});

app.listen(3000);
