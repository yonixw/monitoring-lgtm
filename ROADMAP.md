Metrics to be stored in Mimir (not old promotheus)

Metric Tooling:
    Simple text modification to the /metrics endpoint? (proxy)
    Filter metrics (dynamic) when pulling?
    Add labels to certain existing sources
        https://prometheus.io/docs/prometheus/latest/configuration/configuration/
    Retention per  metric? / label? / both?
        per promotheus: 
            https://stackoverflow.com/questions/59298811/increasing-prometheus-storage-retention
        or mimir per tenant
            "... Grafana Mimir doesn’t support per-series deletion and retention, nor does it support Prometheus’ Delete series API."
            https://grafana.com/docs/mimir/latest/configure/configure-metrics-storage-retention/
    Jobs of aggregations:
        Mimir "recording rule"
        Group by day
        Predict AI? (Mock predict)
            AI from TODAY minus [7,14,30,90,180] days
        Shift by X minutes? by single RATE[] ? Can we just do it by query (delta query)?
        Combine API request, to a virtual 1:
            https://github.com/jacksontj/promxy
    Think about decoupling collecter, so he can report "service 0" if down
        or a "meta" metric about latest collections and if all EP are up


Grafana
    Graphs
    HTML/SVG Template
    Graph per user? per group?
        user with magic url?
    Drill down, can you remember what label in prev dash?
        like same dash var `$__rate_interval` from https://prometheus.io/docs/visualization/grafana/
    Graphs from config
        https://github.com/grafana/mimir/blob/main/docs/sources/mimir/get-started/play-with-grafana-mimir/docker-compose.yml

Alerts
    can you do per label? (like per env but with same metric name?)
    can you do custom logic?
        if X out of Y ?
        From multiple queries:
            (like 5 failures in the last 10, but not 0 in the last 5, and 1 in the last 1)
    alert off hook?
    "(un)subscribe" to alert with your own slack channel? email?

OpenTel Metric
    Should we just create a /metric point ourself? Can we do all PromQL types using OpenTel?

Tracing (Tempo)
    Collect and visualize
        Service Graph
    Filter using ENV?

Logs and Tracing
    Live log view?
        Do we ditch console logs once and for all and just make it colorful json/emojis?
    How to know if trace have logs? 
    How to know if log have trace?
    Logs manipulation?
        Aggregate (throttle, debounce)
        Convert fields like time, ENUMS etc...


Dynamic Logs with Sidekick
    grafana/pyroscope
        code profile (flame map)
    Add dynamic log that will send to loki? (for debug)
        [*] https://kaya.medium.com/sidekick-recipes-2-add-missing-logs-to-your-running-microservices-and-send-them-to-loki-1f5a3449343c
        [*] https://kaya.medium.com/sidekick-open-source-live-debugger-embed-sidekick-features-to-your-applications-1bacf083da5c

        [1] https://github.com/runsidekick/sidekick-docs/tree/main/docs/open-source
        [2] https://github.com/runsidekick/sidekick/blob/master/docker/docker-compose.yml

        [*] https://github.com/runsidekick/sidekick/blob/master/README-legacy.MD#running-sidekick-using-our-docker-image
        [*] https://web.archive.org/web/20240000000000*/https://www.runsidekick.com/

User experience reply
    Microsoft clarity vs Selfhost
        Trace ID by user id in console.error? (but with nice css)

User Heatmap 

User income/funnel analytics 
    GA vs Selfhost
