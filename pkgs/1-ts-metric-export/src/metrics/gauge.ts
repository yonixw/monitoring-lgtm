import { Express } from "express";
import Prometheus from "prom-client";

const gauge = new Prometheus.Gauge({
    name: "gauge_example",
    help: "Gauge is almost like float with: inc(n=1),dec(n=1),set(),reset(); example show set to time()",
    labelNames: ["gauge_Scope", "multiscope_Gauge"] as const,
    aggregator: "sum" // 'sum', 'first', 'min', 'max', 'average' or 'omit' 
});

const uptimeTimer = gauge.startTimer({ gauge_Scope: "timer" });

export async function setupGauge(app: Express) {
    app.get("/gauge/timer", async (req, res) => {
        const requestTimer = gauge.startTimer({ gauge_Scope: "req_timer" });
        res.send({
            uptimeSecs: uptimeTimer(), requestSecs: requestTimer(),
            gauge: await gauge.get()
        })
    })

    app.get(["/gauge/addf", "/gauge/addf/:num"], async (req, res) => {
        const add = parseFloat(req.params.num) || 0;
        if (add !== 0) {
            gauge.inc(add); // NULL label only
            gauge.inc({ gauge_Scope: "example1" }, add);
            gauge.inc({ gauge_Scope: "example1", multiscope_Gauge: "host:port" }, add);
        } else {
            gauge.inc(); // NULL label only
            gauge.inc({ gauge_Scope: "example1" });
            gauge.inc({ gauge_Scope: "example1", multiscope_Gauge: "host:port" });
        }
        res.send({ gauge: await gauge.get() });
    });

    app.get(["/gauge/decf", "/gauge/decf/:num"], async (req, res) => {
        const dec = parseFloat(req.params.num) || 0;
        if (dec !== 0) {
            gauge.dec(dec); // NULL label only
            gauge.dec({ gauge_Scope: "example1" }, dec);
            gauge.dec({ gauge_Scope: "example1", multiscope_Gauge: "host:port" }, dec);
        } else {
            gauge.dec(); // NULL label only
            gauge.dec({ gauge_Scope: "example1" });
            gauge.dec({ gauge_Scope: "example1", multiscope_Gauge: "host:port" });
        }
        res.send({ gauge: await gauge.get() });
    });

    app.get(["/gauge/set/:num"], async (req, res) => {
        const _set = parseFloat(req.params.num) || 0;
        if (_set !== 0) {
            gauge.set(_set); // NULL label only
            gauge.set({ gauge_Scope: "example1" }, _set);
            gauge.set({ gauge_Scope: "example1", multiscope_Gauge: "host:port" }, _set);
        } else {
            gauge.set(0); // NULL label only
            gauge.set({ gauge_Scope: "example1" }, 0);
            gauge.set({ gauge_Scope: "example1", multiscope_Gauge: "host:port" }, 0);
        }
        res.send({ gauge: await gauge.get() });
    });

    app.get(["/gauge/reset"], async (req, res) => {
        gauge.reset(); // Reset ALL labels
        res.send({ gauge: await gauge.get() });
    });

    console.log("[setupGauge] DONE");
}