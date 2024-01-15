import amqplib = require('amqplib');
import {Channel} from "amqplib";

let rabbitConnection = null;
const rabbitChannels: Map<string, Channel> = new Map<string, Channel>();

export async function connectToRabbitMQ() {
  rabbitConnection = await amqplib.connect(process.env.AMQP_URL);
}

export async function sendToRabbitMQ(notificationMessage) {
  const queueName = notificationMessage.forUsername;
  let rabbitChannel = rabbitChannels.get(queueName);
  if (rabbitChannel == null) {
    rabbitChannel = await createUserRabbitChannel(queueName);
  }
  await rabbitChannel.assertQueue(queueName, {durable: true});
  console.log('sending to queue: ' + queueName);
  rabbitChannel.sendToQueue(queueName, Buffer.from(JSON.stringify(notificationMessage)));
}

export async function consumeFromChannel(username: string, ws) {
  const queueName = username;
  const rabbitChannel = rabbitChannels.get(username);
  await rabbitChannel.assertQueue(queueName, {durable: true});
  rabbitChannel.consume(queueName, (message) => {
      const content = message.content.toString();
      console.log('receiving from queue name: ' + queueName);

      ws.clients.forEach((client) => {
        if (client.username === username) {
          client.send(content);
        }
      });
    }, {noAck: true},
  );
}

export async function createUserRabbitChannel(username: string) {
  const queueName = username;
  const rabbitChannel = await rabbitConnection.createChannel();
  rabbitChannels.set(username, rabbitChannel);
  return rabbitChannel;
}

export async function disconnectUserChannel(username: string) {
  const channel = rabbitChannels.get(username);
  await channel.close();
  rabbitChannels.delete(username);
}


module.exports = {
  connectToRabbitMQ,
  sendToRabbitMQ,
  createUserRabbitChannel,
  disconnectUserChannel,
  consumeFromChannel
};
