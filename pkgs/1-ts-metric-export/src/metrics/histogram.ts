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

    app.get(["/hist/reset"], async (req, res) => {
        histogram.reset();
        res.send({ histogram: await histogram.get() })
    })

    app.get(["/hist/zero"], async (req, res) => {
        histogram.zero({ scope_Hist: "example1" });
        res.send({ histogram: await histogram.get() })
    })

    app.get(["/hist/zero-no-label"], async (req, res) => {
        histogram.zero({});
        res.send({ histogram: await histogram.get() })
    })

    app.get(["/hist/timer"], async (req, res) => {
        const timerCB = histogram.startTimer({ scope_Hist: "timer" })
        res.send({ tick: timerCB(), histogram: await histogram.get() })
    })

    console.log("[setupHistogram] DONE");
}