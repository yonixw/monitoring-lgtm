// https://prometheus.io/docs/practices/histograms/

import { Express } from "express";
import Prometheus from "prom-client";

const summart = new Prometheus.Summary({
    name: "summary_example",
    help: "Summary - ",

});