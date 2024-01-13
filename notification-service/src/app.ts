require('dotenv').config();
import * as cors from 'cors';
import * as express from 'express';
import {setupWebSocketServer} from './websocket';
import {setupExpressApp} from './express-app';
import {connectToRabbitMQ} from './rabbitmq';

console.log("running environment: " + process.env.ENV_NAME);

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const httpServer = app.listen(port, async () => {
  console.log(`WebSocket server running on port ${port}`);
  await connectToRabbitMQ(); // Connect to RabbitMQ
  setupExpressApp(app); // Setup Express app
});

setupWebSocketServer(httpServer); // Setup WebSocket server
