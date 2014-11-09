boot2docker stop
sh sh/docker_open_port.sh 9292
sh sh/docker_open_port.sh 9200
sh sh/docker_open_port.sh 8080
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
docker run -d \
  --name php \
  -p 8080:80 \
  --link logstash:elasticdb \
  -v ~/test/geo-task/:/data \
  php
