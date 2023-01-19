
# Signaling server for Virtual Y

Signaling server for WebRTC part of Virtual Y. Created to serve Virtual Y simple peer library integration.

## Requirements
- Node.js 14

## How to install.

1. Clone this repository.
2. Go to the project directory.
3. Run `npm install`
4. Configure SSL certificate with LetsEncrypt.
5. Copy .env.example to .env and fill it with your data.
6. Run your server with: node server.js

## How to install with Docker

1. Clone this repository.
2. Go to the project directory.
3. Copy .env.example to .env and fill it with your data.
4. Sign certificate with LetsEncrypt by run script `bash sign-certificate.sh`
5. Run `docker-compose up --build -d`
