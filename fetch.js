export default async function handler(req, res) {
  const { appName, device, key } = req.query;

  if (!appName || !device || !key) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const url = `https://platform.antares.id:8443/~/antares-cse/antares-id/${appName}/${device}/la`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-M2M-Origin": key,
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).send(text);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
