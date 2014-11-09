FROM tutum/apache-php

RUN \
    apt-get update -y && \
    apt-get install -y php5-mcrypt php5-intl git && \
    php5enmod mcrypt && \
    php5enmod intl && \
    composer self-update && \
    composer install

#composer create-project --prefer-dist -s dev cakephp/app geo-task

