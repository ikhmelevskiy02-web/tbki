import { createServer } from "node:http";
import { once } from "node:events";
import worker from "./dist/server/index.js";

const server = createServer(async (incoming, outgoing) => {
  try {
    const chunks = [];
    for await (const chunk of incoming) chunks.push(chunk);
    const body = Buffer.concat(chunks);
    const headers = new Headers(incoming.headers);
    const request = new Request(`http://${incoming.headers.host || "localhost:8000"}${incoming.url || "/"}`, {
      method: incoming.method,
      headers,
      body: ["GET", "HEAD"].includes(incoming.method) ? undefined : body
    });
    const response = await worker.fetch(request, {
      AI_API_BASE_URL: process.env.AI_API_BASE_URL,
      AI_API_KEY: process.env.AI_API_KEY,
      AI_MODEL: process.env.AI_MODEL
    });
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    outgoing.end(Buffer.from(await response.arrayBuffer()));
  } catch {
    outgoing.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    outgoing.end("Internal server error");
  }
});

server.listen(8000, "127.0.0.1");
await once(server, "listening");
console.log("Assistant available at http://127.0.0.1:8000");
