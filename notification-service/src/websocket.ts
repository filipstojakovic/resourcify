// websocket.js
import {WebSocket} from 'ws';
import {getKeycloakKey} from './authUtils';
import {receiveFromRabbitMQ} from './rabbitmq';

const jwt = require('jsonwebtoken');

export function setupWebSocketServer(httpServer) {
  const ws = new WebSocket.Server({ server: httpServer });

  ws.on('connection', (socket, req) => {
    const url = new URL(`${req.headers.host}${req.url}`);
    const tokenStr = url.searchParams.get('token');

    if (!tokenStr) throw new Error('Token is missing');
    jwt.verify(tokenStr, getKeycloakKey, null, function (err, decodedJwt) {
      if (err) {
        throw new Error('token not valid');
      }
      const username = decodedJwt.preferred_username;

      Object.assign(socket, { username: username }); // assign username to socket
      console.log('connected user: ' + username);

      receiveFromRabbitMQ(ws, username).catch(console.error);
    });
  });
  return ws;
}
