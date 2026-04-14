export default async function handler(req, res) {
  const { url } = req;
  // Strip "/api" prefix to get the target path, e.g. /api/data?p=1 -> /data?p=1
  const targetPath = url.replace(/^\/api/, "");
  const targetUrl = `https://devtest.teskalabs.com${targetPath}`;

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy request failed" });
  }
}
