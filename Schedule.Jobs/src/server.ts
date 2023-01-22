import amqp from 'amqplib/callback_api'
import cron from 'node-cron'
const host = process.env.RABBITMQ_URL;
if(host == undefined){
  throw Error("cant find rabbitmq host")
}
amqp.connect(host, function(error0, connection) {  
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    // cron.schedule("10 * * * *", async () => {
      channel.assertQueue('start-scrap', {
        durable: true,
      });
      channel.sendToQueue('start-scrap', Buffer.from(
        ""
      ))
    // });

    });

  });
  