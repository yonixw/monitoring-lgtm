Old typescript log library:
    https://github.com/yonixw/xwlogger.logger/tree/master
        https://github.com/yonixw/xwlogger.logger/blob/bf904b3738b280a9f12d1d68ef54f21870e71b3a/lib/src/logger.ts


https://signoz.io/docs/instrumentation/javascript/

functionality to support:
    - Promethus
        - pull logs from text endpoints, timeseries db
    - Actions:
        - push trace = [start, stop, parent]
            aggregations?
        - push metric = [series,time, value]
        - push log = [data, {args}]
            aggregations?
    - Features:
        - connect by trace id any 2 actions (even log and metric)
        - retention level for each action (like log is critical, info, debug etc.)
    - Plugins    
        - 1 action to log to opentel and winston


    grafana/pyroscope
        code profile (flame map)
    Add dynamic log that will send to loki? (for debug)
        [*] https://kaya.medium.com/sidekick-recipes-2-add-missing-logs-to-your-running-microservices-and-send-them-to-loki-1f5a3449343c
        [*] https://kaya.medium.com/sidekick-open-source-live-debugger-embed-sidekick-features-to-your-applications-1bacf083da5c

        [1] https://github.com/runsidekick/sidekick-docs/tree/main/docs/open-source
        [2] https://github.com/runsidekick/sidekick/blob/master/docker/docker-compose.yml

        [*] https://github.com/runsidekick/sidekick/blob/master/README-legacy.MD#running-sidekick-using-our-docker-image
        [*] https://web.archive.org/web/20240000000000*/https://www.runsidekick.com/


- prometheus pull
- grafana agent push to mimir

mimir = (any prometheus feature) 
    + h-scale 
    + durable storage (on stuff like s3) 
        s3 is 1-write vs many-read
    + multi tentancy queries (=permissions/encryptions)

loki = logs indexed by labels, also timeseries, no free-text labels
        not s3, but s3 available for logs chunks (also there is a compactor)

tempo:
    trace is empty shell having "span" children. span is more like a single job
    top trace time not always from start to finish, as child spans can keep doing background jobs
    s3 backend
    sampling available

[ ] https://github.com/grafana/agent
    https://github.com/grafana/agent/tree/main/example/docker-compose
    Avalanche - demo data
        https://github.com/prometheus-community/avalanche

[ ] otel -> graphana agenst Seems the best since it will send all to LGTM

[ ] Limit time range of queries? (so you don't search 1 year back on accident)
[ ] How to cache queries?
[ ] mask logs in the collection phase

https://play.grafana.org/

graphana stack for logs...
    lgtm stack
        mltp with lgtm
            https://grafana.com/blog/2022/04/01/get-started-with-metrics-logs-and-traces-in-our-new-grafana-labs-asia-pacific-webinar-series/
            https://github.com/grafana/intro-to-mltp
        https://github.com/cedricziel/dd-extension-lgtm/blob/main/docker-compose.yaml
    retention/log rotation


Logs
    https://github.com/open-telemetry/opentelemetry-js
        https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node
        Metrics?
        Logs?
            winstone
    https://startupstash.com/signoz-alternatives/

    Using all grafana+tempo+prometheus+loki:
        https://grafana.com/docs/opentelemetry/
        https://github.com/blueswen/opentelemetry-apm

    support env or config to tell if to print to console
        see example of "DEBUG=testcontainers.*" in
            also for metrics, traces 
            simple split of "." and continue if "*" or arr[size] is smaller so we can use A.* and *.DEBUG and (* for everyting since it's the prefix)
        features from my log solution?
            maximum per minute? (rate, absolute)
                emit "maximum reached" once
            etc.
        https://testcontainers.com/guides/getting-started-with-testcontainers-for-nodejs/

====================================


MIT-IFPAY
    https://github.com/directus/directus?tab=License-1-ov-file#readme
    This licence is valid as long as this repo is being sponsered with 
        at least 10$ a month for every year which had more than one code relevant commit
        so for the 10th year, a sponser of at least 100$ a month
        
        For all places with "hot loaded" code. But not places like the result exist
        without the code, Like PDF that was created. Or AI output that doesn't need the code.

    THIS    DERIVED
    V       ?       MIT
    X       X       MIT
    X       V       SSPL (because if AGPL, he can just host it)


https://github.com/openobserve/openobserve?tab=readme-ov-file
    1 docker???
https://github.com/highlight/highlight
    logrocket not opensource anymore

supabase as multiple "postgres" manager
    parseplatform.org MongoDB or PostgreSQL
    mariadb alt? (for bookstack/wordpress)
        https://www.reddit.com/r/Supabase/comments/15an011/is_supabase_self_hosted_good/


! 3 if not more (hyperdx, signoz and highlight) built on top of clickhouse now.
 
## Compare:
##     hyperdx - hard to run under gitpod, need docker rebuild
##             - no session record private mask
##             - not many graphs variations
## 
##     signoz  - easy to run. but
##             - not many graphs variations
##             - no user record
## 
##     grafana stack - huge with too many configs...


        
Dependency Graph (like for last week)?
    https://www.jaegertracing.io/docs/1.21/opentelemetry/
        jaegertracing + elastic + https://github.com/jaegertracing/spark-dependencies

Live debug for NodeJS with some global logger to emit traces/spans/metrics/logs+getActive

Proxy?CDN? + Auth for  multiple frontends?
    Caddy?

Files + DB + Auth
    Appwrite
        Functions
    Supabase
        Function, AI-Embedding?
    pocketbase.io
        SSO SAML: https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols-oidc
        SQLite, very simple docker
            https://litestream.io/ - Continuously stream SQLite changes to AWS S3


Function
    otel Logs=emit Event
        https://stackoverflow.com/questions/74946379/how-to-use-opentelemetry-logs-in-javascriptnodejs
    Just express?
        Workspaces for shared libs?

Jobs
    temporal?
        auto fix unit test until works?
     Maybe my code with DB constistency
        Workflow stuff like sleep?
        Need Pub/Sub
            https://www.mongodb.com/docs/manual/changeStreams/#modify-change-stream-output

Secrets
    https://infisical.com/
