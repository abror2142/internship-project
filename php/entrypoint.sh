#!/bin/sh
set -e

php artisan migrate --force

chown -R www-data:www-data /app /app/vendor
chmod -R 775 /app /app/vendor

exec php-fpm