import { Express } from "express";
import Prometheus from "prom-client";

const gauge = new Prometheus.Gauge({
    name: "gauge_example",
    help: "Gauge is a number with: inc(),dec(),set(),reset()",
    labelNames: ["labelG1", "labelTimer1", "labelTimer2"] as const,
    aggregator: "sum" // 'sum', 'first', 'min', 'max', 'average' or 'omit' 
});

const reportTiming = gauge.startTimer({ labelTimer1: 1, labelTimer2: 2 });

export async function setupGauge(app: Express) {
    app.get("/gauge/timer", async (req, res) => {
        const tickTime = reportTiming();
        res.send({ tickTime, gauge: await gauge.get() })
    })

    app.get(["/gauge/addf", "/gauge/addf/:num"], async (req, res) => {
        const add = parseFloat(req.params.num) || 0;
        if (add !== 0) {
            gauge.inc(add); // NULL label only
            gauge.inc({ labelG1: add });
        } else {
            gauge.inc(); // NULL label only
            gauge.inc({ labelG1: 1 });
        }
        res.send({ gauge: await gauge.get() });
    });

    app.get(["/gauge/decf", "/gauge/decf/:num"], async (req, res) => {
        const dec = parseFloat(req.params.num) || 0;
        if (dec !== 0) {
            gauge.dec(dec); // NULL label only
            gauge.dec({ labelG1: dec });
        } else {
            gauge.dec(); // NULL label only
            gauge.dec({ labelG1: 1 });
        }
        res.send({ gauge: await gauge.get() });
    });

    app.get(["/gauge/set/:num"], async (req, res) => {
        const _set = parseFloat(req.params.num) || 0;
        if (_set !== 0) {
            gauge.set(_set); // NULL label only
            gauge.set({ labelG1: 1 }, _set);
        } else {
            gauge.set(0); // NULL label only
            gauge.set({ labelG1: 1 }, 1);
        }
        res.send({ gauge: await gauge.get() });
    });

    app.get(["/gauge/reset"], async (req, res) => {
        gauge.reset(); // Reset ALL labels
        res.send({ gauge: await gauge.get() });
    });

    console.log("[setupGauge] DONE");
}