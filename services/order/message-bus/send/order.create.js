const amqp = require("amqplib");
const exchangeName = "order.create";

module.exports = {
  send: async (order) => {
    try {
      const queue = "orders";

      if (!order) {
        throw new Error("Sould send a valid order to message queue");
      }
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

      const url = "amqp://guest:secretpassword@localhost";
      const connection = await amqp.connect(opt);
      const ch1 = await connection.createChannel();
      await ch1.assertQueue(queue);

      console.log("jonatildi");
      const message = JSON.stringify(order);
      ch1.sendToQueue(queue, Buffer.from(message));
      console.log(`Message '${order}' sent to queue '${exchangeName}'`);

      await ch1.close();
      await connection.close();
    } catch (err) {
      console.error(
        `Error Sending Order Added Event to ${exchangeName}: ${err}`
      );
    }
  },
};
