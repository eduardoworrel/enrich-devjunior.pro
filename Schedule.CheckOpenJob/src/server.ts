import amqp from 'amqplib/callback_api'
import cron from 'node-cron'

amqp.connect('amqp://admin:admin@localhost:5672', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    cron.schedule("52 * * * *", async () => {
      channel.assertQueue('start-scrap', {
        durable: true,
      });
      channel.sendToQueue('start-scrap', Buffer.from(
        ""
      ))
    });

    });

  });
  