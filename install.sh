sh sh/docker_open_port.sh 9292
sh sh/docker_open_port.sh 9200
boot2docker up
docker run -d \
  -p 9292:9292 \
  -p 9200:9200 \
  --name logstash \
  -v /Users/macuser/test/geo-task:/data/geo \
  pblittle/docker-logstash


docker exec -ti logstash bash
cd /data/geo
wget http://fa-technik.adfc.de/code/opengeodb/DE.tab

# opengeodb.conf

cat DE.tab | /opt/logstash/bin/logstash -f opengeodb.conf

docker build -t php .
docker run --name php -d -p 80:80 php
