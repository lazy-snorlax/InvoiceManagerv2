# Use the official PHP 8.3.17 FPM image as the base image
FROM php:8.3.17-fpm

# Set to keep file permissions same as host for mounted volume
RUN useradd -m -u 1000 ubuntu

# Install system dependencies
RUN apt-get update && apt-get install -y \
    unixodbc \
    unixodbc-dev \
    gnupg \
    ca-certificates \
    curl \
    git \
    zip \
    libxml2-dev \
    libltdl7 \
    libodbc1 \
    odbcinst \
    odbcinst1debian2 \
    locales-all \
    && rm -rf /var/lib/apt/lists/*

# Install Microsoft ODBC Driver for SQL Server
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql18

# Install PHP extensions
# RUN docker-php-ext-install sqlsrv pdo_sqlsrv
RUN pecl install sqlsrv pdo_sqlsrv \
    && docker-php-ext-enable sqlsrv pdo_sqlsrv

# Copy your custom PHP configuration files if you have any
# COPY ./php.ini /usr/local/etc/php/

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php && \
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