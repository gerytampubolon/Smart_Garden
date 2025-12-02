// proxy.js
const express = require("express");
const fetch = require("node-fetch");  // ✅ gunakan node-fetch v2
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/fetch", async (req, res) => {
  const { appName, device, key } = req.query;
  const url = `https://platform.antares.id:8443/~/antares-cse/antares-id/${appName}/${device}/la`;

  try {
    const r = await fetch(url, {
      headers: {
        "X-M2M-Origin": key,
        "Accept": "application/json"
      }
    });

    if (!r.ok) {
      const text = await r.text();
      console.error("Antares response error:", text);
      return res.status(r.status).send(text);
    }

    const data = await r.json();
    console.log("✅ Data received from Antares");
    res.json(data);

  } catch (err) {
    console.error("❌ Proxy error:", err);
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log("Server running on port 3000 (open to LAN)");
});

