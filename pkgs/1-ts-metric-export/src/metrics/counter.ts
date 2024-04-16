import { Express } from "express";
import Prometheus from "prom-client";

const counter = new Prometheus.Counter({
  name: "counter_example",
  help: "Counter is integer from 0 supports: add(num=1), reset()",
  labelNames: ["labelC1"] as const,
  aggregator: "sum" // 'sum', 'first', 'min', 'max', 'average' or 'omit'
});

// inc() is updating a single label
//      starts from 0
// reset() is reseting ALL labels,
//      making them disapper from /metrics until next "inc"

export async function setupCounter(app: Express) {
  app.get(["/counter/add", "/counter/add/:num"], async (req, res) => {
    const add = parseInt(req.params.num) || 0;
    if (add !== 0) {
      counter.inc(add); // NULL label only
      counter.inc({ labelC1: add });
    } else {
      counter.inc(); // NULL label only
      counter.inc({ labelC1: 1 });
    }
    res.send({ counter: await counter.get() });
  });

  app.get(["/counter/addf", "/counter/addf/:num"], async (req, res) => {
    const add = parseFloat(req.params.num) || 0;
    if (add !== 0) {
      counter.inc(add); // NULL label only
      counter.inc({ labelC1: add });
    } else {
      counter.inc(); // NULL label only
      counter.inc({ labelC1: 1 });
    }
    res.send({ counter: await counter.get() });
  });

  app.get(["/counter/reset"], async (req, res) => {
    counter.reset(); // Reset ALL labels
    res.send({ counter: await counter.get() });
  });

  console.log("[setupCounter] DONE");
}
