FROM tutum/apache-php

RUN \
    apt-get update -y && \
    apt-get install -y php5-mcrypt php5-intl git && \
    php5enmod mcrypt && \
    php5enmod intl && \
    a2enmod rewrite && \
    composer self-update && \
    composer install && \
    chown -R www-data tmp && \
    mkdir -p logs && chown -R www-data logs

RUN \
    (git submodule add -f git://github.com/dkullmann/CakePHP-Elastic-Search-DataSource.git plugins/Elastic || true) && \
    git submodule update --init

ADD apache_defaults.conf /etc/apache2/sites-available/000-default.conf


#composer create-project --prefer-dist -s dev cakephp/app geo-task

