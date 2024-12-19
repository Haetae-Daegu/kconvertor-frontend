export default async function handler(req, res) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
    if (!API_URL) {
      return res.status(500).json({ error: "API_URL is not defined in the environment variables." });
    }
  
    const url = `${API_URL}${req.url.replace("/api/proxy", "")}`;
  
    try {
      const response = await fetch(url, {
        method: req.method,
        headers: {
          ...req.headers,
          "Content-Type": "application/json",
        },
        body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  