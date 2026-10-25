import { fileURLToPath } from "node:url";
import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { loadConfig } from "./config.js";
import { fixturesSource, iapAuthorization, shushuSource } from "./upstream.js";

const config = loadConfig();

const source = config.fixtures
  ? fixturesSource(fileURLToPath(new URL("../fixtures/reads.json", import.meta.url)), config.tzOffset)
  : shushuSource({
      shushuUrl: config.shushuUrl,
      tzOffset: config.tzOffset,
      authorization: iapAuthorization(config.iapAudience),
    });

const app = createApp({ source, allowedOrigins: config.allowedOrigins, tzOffset: config.tzOffset });

const server = serve({ fetch: app.fetch, port: config.port }, (info) => {
  console.log(
    JSON.stringify({
      severity: "INFO",
      message: `listening on ${info.port}`,
      fixtures: config.fixtures,
      allowedOrigins: config.allowedOrigins,
    }),
  );
});

// Cloud Run sends SIGTERM before stopping an instance.
process.on("SIGTERM", () => server.close(() => process.exit(0)));
