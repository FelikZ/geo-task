geo-task
========

Test task to textkernel.nl

**Preferred method**

You have [Linux](https://docs.docker.com/installation/ubuntulinux/) or [Mac OS X](https://docs.docker.com/installation/mac/) with installed [docker](http://docker.io) (version **1.3.x**, [ubuntu](http://www.ubuntuupdates.org/ppa/docker))
Steps:

1. `git clone https://github.com/FelikZ/geo-task geo-task && cd geo-task`
2. `sudo chmod +x install.sh && ./install.sh`
3. [localhost:8080](http://localhost:8080/)

If you will run this on OS X / Windows, be sure to install [virtualbox](https://www.virtualbox.org/) and [boot2docker](http://boot2docker.io/) tool in order to run docker.

**Other**

If you not familar with docker it strongly recommended to begin it.
To install it without docker you need a lot of time.
Steps:

1. Install logstash to your system
2. Install apache + php
3. Install modules for php and other instructions from [this file](https://github.com/FelikZ/geo-task/blob/master/Dockerfile)
4. Make record in /etc/hosts `elasticdb` so application can found it
5. Create mapping in elastic search my `curl -X PUT --data @mapping.json http://localhost:9200/opengeodb/locality/_mapping` using [mapping.json](https://github.com/FelikZ/geo-task/blob/master/docker-logstash/mapping.json)
6. Download `*.tab` CSV files from [opengeodb](http://fa-technik.adfc.de/code/opengeodb/)
7. Use `cat <DE.tab> | /opt/logstash/bin/logstash -f opengeodb.conf` to index data to elasticdb using [opengeodb.conf](https://github.com/FelikZ/geo-task/blob/master/docker-logstash/opengeodb.conf)
8. finally open application http://localhost:80/
