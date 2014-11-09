FROM tutum/apache-php

RUN \
    apt-get update -y && \
    apt-get install -y php5-mcrypt php5-intl git && \
    php5enmod mcrypt && \
    php5enmod intl && \
    composer self-update && \
    composer install && \
    chown -R www-data tmp && \
    chown -R www-data logs

RUN \
    git submodule add -f git://github.com/dkullmann/CakePHP-Elastic-Search-DataSource.git plugins/Elastic && \
    git submodule update --init


#composer create-project --prefer-dist -s dev cakephp/app geo-task

