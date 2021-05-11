
# Signaling server for Virtual Y

Signaling server for WebRTC part of Virtual Y. Created to serve Virtual Y simple peer library integration.

How to install.

1. Clone this repository.
2. Go to the project directory.
3. Run `npm install`
4. Configure SSL certificate with LetsEncrypt.
5. Put links to the certificate at this line: https://github.com/open-y-subprojects/virtual_y_signaling_server/blob/main/server.js#L7
6. Run your server with: node server.js
