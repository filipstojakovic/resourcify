require('dotenv').config();

import * as cors from 'cors'
import * as express from 'express'
import {WebSocket} from 'ws';
import * as passport from 'passport';
import amqplib = require('amqplib');
import KeycloakBearerStrategy = require("passport-keycloak-bearer");

const jwt = require('jsonwebtoken');
const { getKeycloakKey } = require('./authUtils.js'); // Adjust the path accordingly


type NotificationMessage = {
  forUsername: string;
  message: string;
}

console.log("running environment: " + process.env.ENV_NAME);

passport.use(new KeycloakBearerStrategy({
  "realm": process.env.KEYCLOAK_REALM_NAME,
  "url": process.env.KEYCLOAK_BASEURL,
}, (jwtPayload, done) => {

  const username = jwtPayload['preferred_username'];
  return done(null, username);
}));

const app = express()
app.use(cors());
app.use(express.json())

const port = process.env.PORT;
let rabbitChannel = null;

const httpServer = app.listen(port, async () => {
  console.log(`WebSocket server running on port ${port}`);
  const rabbitConnection = await amqplib.connect(process.env.AMQP_URL);
  rabbitChannel = await rabbitConnection.createChannel();
});

const ws = new WebSocket.Server({ server: httpServer });

// when user establishes connection
ws.on('connection', (socket, req) => {

  const url = new URL(`${req.headers.host}${req.url}`);
  const tokenStr = url.searchParams.get('token');

  if (!tokenStr) throw new Error('Token is missing');
  jwt.verify(tokenStr, getKeycloakKey, null, function (err, decodedJwt) {
    if (err) {
      throw new Error("token not valid")
    }
    const username = decodedJwt.preferred_username;

    Object.assign(socket, { username: username }); // assign username to socket
    console.log("connected user: " + username);

    receiveFromRabbitMQ(username).catch(console.error);
  });
});

// receive message from queue and send to user
async function receiveFromRabbitMQ(username) {
  const queueName = username;
  await rabbitChannel.assertQueue(queueName, { durable: true });
  rabbitChannel.consume(queueName, (message) => {
        const content = message.content.toString();
        console.log('receiving from queue name: ' + queueName);

        ws.clients.forEach((client) => {
          if (client.username === username) {
            client.send(content);
          }
        });
      }, { noAck: true },
  );
}

// receive message from microservice and send to queue
app.post(
    "/ws/notifications",
    passport.authenticate('keycloak', { session: false }),
    (req: express.Request<{}, {}, NotificationMessage>, res) => {
      const body: NotificationMessage = req.body;
      if (!isValidNotificationMessage(body)) {
        return res.status(400).json({ error: 'Invalid request body' });
      }

      sendToRabbitMQ(body).catch(console.error);
      res.send("pong");
    },
);


async function sendToRabbitMQ(notificationMessage: NotificationMessage) {
  const queueName = notificationMessage.forUsername;
  await rabbitChannel.assertQueue(queueName, { durable: true });
  console.log('sending to queue: ' + queueName);
  rabbitChannel.sendToQueue(queueName, Buffer.from(notificationMessage.message));
}

function isValidNotificationMessage(obj: any): obj is NotificationMessage {
  return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof obj.forUsername === 'string' &&
      typeof obj.message === 'string'
  );
}
