import express, { Express } from "express";
import Prometheus from "prom-client";
import { setupCounter } from "./metrics/counter";

const app: Express = express();
const port = 3000 || process.env.PORT;

// ! Every metric need to be "touched" after create/reset to be shown in
// !    the /metrics endpoint.

async function setupMain() {
  await setupCounter(app);

  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", Prometheus.register.contentType);
    res.end(await Prometheus.register.metrics());
  });

  app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

setupMain()
  .then(() => console.log("[setupMain] DONE"))
  .catch((err) => console.error("[setupMain] [ERR]", err));
