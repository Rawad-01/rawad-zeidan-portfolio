import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve, sep, extname } from "node:path";
const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
  } catch {
    res.writeHead(400).end();
    return;
  }
  let file = resolve(root, "." + pathname);
  if (file !== root && !file.startsWith(root + sep)) {
    res.writeHead(403).end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory())
    file = resolve(file, "index.html");
  if (!existsSync(file)) {
    res.writeHead(404, { "Content-Type": "text/html" });
    createReadStream(resolve(root, "404.html")).pipe(res);
    return;
  }
  const size = statSync(file).size,
    range = req.headers.range;
  const headers = {
    "Content-Type": types[extname(file)] || "application/octet-stream",
    "Accept-Ranges": "bytes",
    "X-Content-Type-Options": "nosniff",
  };
  if (range) {
    const m = /^bytes=(\d+)-(\d*)$/.exec(range);
    if (!m) {
      res.writeHead(416, { "Content-Range": `bytes */${size}` }).end();
      return;
    }
    const start = Number(m[1]),
      end = Math.min(m[2] ? Number(m[2]) : size - 1, size - 1);
    if (start > end || start >= size) {
      res.writeHead(416, { "Content-Range": `bytes */${size}` }).end();
      return;
    }
    res.writeHead(206, {
      ...headers,
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": end - start + 1,
    });
    if (req.method === "HEAD") res.end();
    else createReadStream(file, { start, end }).pipe(res);
    return;
  }
  res.writeHead(200, { ...headers, "Content-Length": size });
  if (req.method === "HEAD") res.end();
  else createReadStream(file).pipe(res);
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Local: http://127.0.0.1:${port}`),
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => server.close(() => process.exit(0)));
