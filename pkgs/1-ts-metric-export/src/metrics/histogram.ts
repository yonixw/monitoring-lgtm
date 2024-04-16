import { Express } from "express";
import Prometheus from "prom-client";

const histogram = new Prometheus.Histogram({
    name: "histogram_example",
    help: "Histogram sums and count 1 to every value in matching buckets (because it uses less-equal notion)",
    buckets: [0.1, 0.5, 0.9],
    labelNames: ["scope_Hist"] as const
});

export async function setupHistogram(app: Express) {
    app.get(["/hist/random"], async (req, res) => {
        const x = Math.random();
        histogram.observe(x);
        histogram.observe({ scope_Hist: "example1" }, 1 - x);
        res.send({ x, histogram: await histogram.get() })
    })

    console.log("[setupHistogram] DONE");
}