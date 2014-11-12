FROM pblittle/docker-logstash

RUN \
    apt-get update && apt-get install -y curl && \
    mkdir -p "/data/geo" && cd "/data/geo"

COPY ./opengeodb.conf /data/geo/
COPY ./mapping.json /data/geo/
COPY ./setup_geo_db /app/bin/
COPY ./boot_new /app/bin/

RUN \
    chmod -R 0770 "/app/bin/"

RUN \
    cd "/data/geo" && \
    wget http://fa-technik.adfc.de/code/opengeodb/DE.tab && \
    \
    wget http://fa-technik.adfc.de/code/opengeodb/AT.tab && \
    \
    wget http://fa-technik.adfc.de/code/opengeodb/BE.tab && \
    \
    wget http://fa-technik.adfc.de/code/opengeodb/CH.tab && \
    \
    wget http://fa-technik.adfc.de/code/opengeodb/LI.tab && \
    \
    wget http://fa-technik.adfc.de/code/opengeodb/LU.tab && \
    \
    wget http://fa-technik.adfc.de/code/opengeodb/PLZ.tab

ENTRYPOINT ["/app/bin/boot_new"]
