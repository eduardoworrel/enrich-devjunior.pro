import amqp from 'amqplib/callback_api'
import ColectFromOpenJobs from './jobs/ColectFromOpenJobs';
// const host = process.env.RABBITMQ_URL;
const host = "amqp://admin:qQ,87i7i7Y,somosfodA@159.223.100.252:5672";
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
    channel.assertQueue('Queue.Puppeteer', {
      durable: true,
    });

    channel.consume('Queue.Puppeteer',async function(msg) {
      if(msg?.content) {
        await ColectFromOpenJobs(channel)
      }
    }, {
      noAck: true
    });
  });

});

