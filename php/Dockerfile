FROM php:8.2-fpm AS app

RUN apt-get update && apt-get install -y \
    libfreetype-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    zlib1g-dev \
    libzip-dev \
    unzip \
    npm \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install zip pdo pdo_mysql

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /app

COPY ./app/composer.* .

RUN composer install --prefer-dist --no-dev --no-scripts --no-progress --no-interaction

COPY ./app .

RUN npm install

RUN npm run build

RUN composer dump-autoload --optimize

COPY ./php/entrypoint.sh /

ENTRYPOINT [ "sh", "/entrypoint.sh" ]


FROM app as app_dev

ENV XDEBUG_MODE=off

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/

COPY ./php/conf.d/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

RUN set -eux; \
	install-php-extensions xdebug