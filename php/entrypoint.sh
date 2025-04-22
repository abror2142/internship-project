#!/bin/sh
set -e

php artisan migrate:fresh --seed --force

chown -R www-data:www-data /api /api/vendor
chmod -R 775 /api /api/vendor

exec php-fpm