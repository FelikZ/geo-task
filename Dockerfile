FROM tutum/apache-php

RUN \
    apt-get update -y && \
    apt-get install -y php5-mcrypt php5-intl git && \
    php5enmod mcrypt && \
    php5enmod intl && \
    a2enmod rewrite

ADD apache_defaults.conf /etc/apache2/sites-available/000-default.conf

RUN \
    chown -R www-data /app/tmp && \
    mkdir -p /app/logs && chown -R www-data /app/logs && \
    composer self-update && \
    composer install

