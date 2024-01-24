// websocket.js
import {WebSocket} from 'ws';
import {getKeycloakKey} from './authUtils';
import {consumeFromChannel, createUserRabbitChannel, disconnectUserChannel} from './rabbitmq';
import {ADMIN_RESERVATION_EVENT} from "./express-app";

const jwt = require('jsonwebtoken');

export function setupWebSocketServer(httpServer) {
  const ws = new WebSocket.Server({server: httpServer});

  ws.on('connection', (socket, req) => {
    const url = new URL(`${req.headers.host}${req.url}`);
    const tokenStr = url.searchParams.get('token');

    if (!tokenStr) throw new Error('Token is missing');
    jwt.verify(tokenStr, getKeycloakKey, null, async function (err, decodedJwt) {
      if (err) {
        throw new Error('token not valid');
      }
      const username = decodedJwt.preferred_username;

      Object.assign(socket, {username: username}); // assign username to socket
      console.log('connected user: ' + username);

      await createUserRabbitChannel(username).catch(console.error);
      await consumeFromChannel(username, username, ws);

      const roles: string[] = decodedJwt['resource_access']['frontend']['roles'];
      const isAdmin = roles.indexOf('client-admin-role') !== -1;
      if (isAdmin) {
        await createUserRabbitChannel(ADMIN_RESERVATION_EVENT).catch(console.error);
        await consumeFromChannel(ADMIN_RESERVATION_EVENT, username, ws);
      }

      socket.on('close', async () => {
        await disconnectUserChannel(socket['username']);
        console.log('User disconnected: ' + socket['username'])
      });


    });
  });
  return ws;
}
