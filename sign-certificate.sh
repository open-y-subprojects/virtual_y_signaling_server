#!/bin/bash

# Sign a new certificate using the certbot container

# Source .env enviroment file
set -o allexport;
source .env;
set +o allexport;

# Create a new certificate by running the certbot container
docker run --rm -p 80:80 -p 443:443 \
    --volume /etc/letsencrypt:/etc/letsencrypt \
    --volume /var/log/letsencrypt:/var/log/letsencrypt \
    certbot/certbot certonly \
        --standalone \
        --noninteractive --agree-tos \
        --register-unsafely-without-email \
        -d $DOMAIN \
        --rsa-key-size 4096;
