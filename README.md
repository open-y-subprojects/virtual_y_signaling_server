
# Signaling server for Virtual Y

Signaling server for WebRTC part of Virtual Y. Created to serve Virtual Y simple peer library integration.

## Requirements
- Node.js 14

## How to install

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

## How to test the setup

Once installed, you can test the server to ensure it's properly responding:

Server: `signals.example.com`
WebSocket Port: `8091`

1. Go to this (or any) [WebSocket Tester](https://www.piesocket.com/websocket-tester]
2. Enter your server's web socket URL with a test `meetingId`: `wss://signals.example.com:8091/?meetingId=7348347`
3. Click connect and observe `Connection Established` if everything is working.
4. Send any message via the tester.
5. SSH to the server: `ssh admin@signals.example.com`
6. Run the logger: `docker logs virtual_y_signaling_server_app_1` and make sure you see your message.

![Online_Websockets_Tester_-_Debug_Client_Tool](https://user-images.githubusercontent.com/238201/219690174-37080a61-2afa-48dd-bde1-73515e33761c.png)

