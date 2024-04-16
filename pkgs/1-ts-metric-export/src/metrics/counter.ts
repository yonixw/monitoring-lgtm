import { Express } from "express";
import Prometheus from "prom-client";

const counter = new Prometheus.Counter({
  name: "counter_example",
  help: "Counter is an increasing float from 0 supports: add(num=1), reset()",
  labelNames: ["scope_Counter", "multiscope_Counter"] as const,
  aggregator: "sum" // 'sum', 'first', 'min', 'max', 'average' or 'omit'
});

export async function setupCounter(app: Express) {

  app.get(["/counter/addf", "/counter/addf/:num"], async (req, res) => {
    const add = parseFloat(req.params.num) || 0;
    if (add !== 0) {
      counter.inc(add); // NULL label only
      counter.inc({ scope_Counter: "example1" }, add);
      counter.inc({ scope_Counter: "example1", multiscope_Counter: "host:port" }, add);
    } else {
      counter.inc(); // NULL label only
      counter.inc({ scope_Counter: "example1" });
      counter.inc({ scope_Counter: "example1", multiscope_Counter: "host:port" });
    }
    res.send({ counter: await counter.get() });
  });

  app.get(["/counter/reset"], async (req, res) => {
    counter.reset(); // Reset ALL label scopes
    res.send({ counter: await counter.get() });
  });

  console.log("[setupCounter] DONE");
}
