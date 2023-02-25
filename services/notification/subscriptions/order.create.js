const amqp = require("amqplib");

const exchangeName = "order.create";
const queueName = "orders";

module.exports = {
  start: async () => {
    try {
      const opt = {
        protocol: "amqp",
        hostname: "localhost",
        port: 5672,
        username: "guest",
        password: "guest",
        locale: "en_US",
        frameMax: 0,
        heartbeat: 0,
        vhost: "/",
      };
      const url = "amqp://localhost";
      const connection = await amqp.connect(opt);
      const channel = await connection.createChannel();
      await channel.assertQueue(queueName);

      console.log("Consumer started  listening");

      channel.consume(queueName, (msg) => {
        if (msg !== null) {
          console.log("Recieved:", msg.content.toString());
          channel.ack(msg);
        } else {
          console.log("Consumer cancelled by server");
        }
      });
    } catch (err) {
      console.error(`Error Listening to ${exchangeName}, ${queueName}: ${err}`);
    }
  },
};
