import * as passport from 'passport';
import {sendToRabbitMQ} from './rabbitmq';
import KeycloakBearerStrategy = require('passport-keycloak-bearer');

passport.use(new KeycloakBearerStrategy({
  "realm": process.env.KEYCLOAK_REALM_NAME,
  "url": process.env.KEYCLOAK_BASEURL,
}, (jwtPayload, done) => {

  const username = jwtPayload['preferred_username'];
  return done(null, username);
}));


type NotificationMessage = {
  forUsername: string;
  message: string;
}

export function setupExpressApp(app) {
  app.post(
      '/ws/notifications',
      passport.authenticate('keycloak', { session: false }),
      (req, res) => {
        const body = req.body;
        if (!isValidNotificationMessage(body)) {
          return res.status(400).json({ error: 'Invalid request body' });
        }

        sendToRabbitMQ(body).catch(console.error);
        res.send('pong');
      },
  );
}

function isValidNotificationMessage(obj: any): obj is NotificationMessage {
  return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof obj.forUsername === 'string' &&
      typeof obj.message === 'string'
  );
}
