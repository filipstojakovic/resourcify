import amqplib = require('amqplib');
import {Channel} from "amqplib";
import {NotificationMessage} from "./NotificationMessageType";

let rabbitConnection = null;
const rabbitChannels: Map<string, Channel> = new Map<string, Channel>();

export async function connectToRabbitMQ() {
  rabbitConnection = await amqplib.connect(process.env.AMQP_URL);
}

export async function sendToRabbitMQ(notificationMessage: NotificationMessage, queueName:string) {
  let rabbitChannel = rabbitChannels.get(queueName);
  if (rabbitChannel == null) {
    rabbitChannel = await createUserRabbitChannel(queueName);
  }
  await rabbitChannel.assertQueue(queueName, {durable: true});
  console.log('sending to queue: ' + queueName);
  rabbitChannel.sendToQueue(queueName, Buffer.from(JSON.stringify(notificationMessage)));
}

export async function consumeFromChannel(queueName:string , username: string, ws) {
  const rabbitChannel = rabbitChannels.get(username);
  await rabbitChannel.assertQueue(queueName, {durable: true});
  await rabbitChannel.consume(queueName, (message) => {
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

export async function createUserRabbitChannel(queueName: string) {
  const rabbitChannel = await rabbitConnection.createChannel();
  rabbitChannels.set(queueName, rabbitChannel);
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
