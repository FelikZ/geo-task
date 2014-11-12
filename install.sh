git clone https://github.com/FelikZ/geo-task geo-task
cd geo-task

# boot2docker stop
# sh sh/docker_open_port.sh 9292
# sh sh/docker_open_port.sh 9200
# sh sh/docker_open_port.sh 8080
# boot2docker up
docker run -d \
  -p 9292:9292 \
  -p 9200:9200 \
  --name logstash \
  felikz/geo-task

docker build -t php .
docker run -d \
  --name php \
  -p 8080:80 \
  --link logstash:elasticdb \
  php
