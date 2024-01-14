import amqplib = require('amqplib');

let rabbitChannel = null; // Define your RabbitMQ channel here

export async function connectToRabbitMQ() {
  const rabbitConnection = await amqplib.connect(process.env.AMQP_URL);
  rabbitChannel = await rabbitConnection.createChannel();
}

export async function sendToRabbitMQ(notificationMessage) {
  const queueName = notificationMessage.forUsername;
  await rabbitChannel.assertQueue(queueName, { durable: true });
  console.log('sending to queue: ' + queueName);
  rabbitChannel.sendToQueue(queueName, Buffer.from(notificationMessage.message));
}

// receive message from queue and send to user
export async function receiveFromRabbitMQ(ws, username) {
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

module.exports = {
  connectToRabbitMQ,
  receiveFromRabbitMQ,
  sendToRabbitMQ,
};
