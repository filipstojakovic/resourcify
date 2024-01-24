import * as passport from 'passport';
import {sendToRabbitMQ} from './rabbitmq';
import {Request} from 'express'
import {isValidNotificationMessage, NotificationMessage} from "./NotificationMessageType";
import KeycloakBearerStrategy = require('passport-keycloak-bearer');

passport.use(new KeycloakBearerStrategy({
  "realm": process.env.KEYCLOAK_REALM_NAME,
  "url": process.env.KEYCLOAK_BASEURL,
}, (jwtPayload, done) => {

  const username = jwtPayload['preferred_username'];
  const roles = jwtPayload['resource_access']['frontend']['roles']
  return done(null, {username, roles});
}));

export const ADMIN_RESERVATION_EVENT = "admin_reservation_event";

export function setupExpressApp(app) {
  app.post(
    '/ws/notifications',
    passport.authenticate('keycloak', {session: false}),
    (req: Request<{}, {}, NotificationMessage>, res) => {
      const body: NotificationMessage = req.body;
      if (!isValidNotificationMessage(body)) {
        return res.status(400).json({error: 'Invalid request body'});
      }

      sendToRabbitMQ(body, body.forUsername).catch(console.error);
      res.send('pong');
    },
  );
  app.post(
    '/ws/notifications/admin',
    passport.authenticate('keycloak', {session: false}),
    (req, res) => {
      // const roles = passport.user.roles
      const body: NotificationMessage = {
        forUsername: "admin",
        message: "admin",
        status: null,
      }

      sendToRabbitMQ(body, ADMIN_RESERVATION_EVENT).catch(console.error);
      res.send('pong');
    },
  );
}
