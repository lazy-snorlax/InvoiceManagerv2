FROM php:8.1.3-fpm

# Set to keep file permissions same as host for mounted volume
RUN useradd -m -u 1000 ubuntu

# Install Deps
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg-dev \
    libpng-dev \
    libzip-dev \
    libfontconfig1 \
    libxrender1 \
    git \
    zip \
    default-mysql-client \
    libssl-dev \
    libicu-dev

# Install GD
RUN docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg \
    && docker-php-ext-install gd

# Install Opcache
RUN docker-php-ext-install opcache

# Install MySQL
RUN docker-php-ext-install pdo_mysql

# Install Other Dependencies
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install zip
RUN docker-php-ext-install intl

# Install Composer
RUN apt-get install -y curl && \
    curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer && \
    composer self-update && \
    apt-get remove --purge curl -y && \
    apt-get clean

# Configure PHP
RUN echo "php_admin_flag[log_errors] = On">>/usr/local/etc/php-fpm.conf

# Install PCOV
RUN pecl install pcov && docker-php-ext-enable pcov

COPY ./docker/php/headers.ini /usr/local/etc/php/conf.d/headers.ini
COPY ./docker/php/development.ini /usr/local/etc/php/conf.d/development.ini

WORKDIR /var/www