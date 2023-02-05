import amqp from 'amqplib/callback_api';
import ColectFromOpenJobs from './jobs/ColectFromOpenJobs';
import dotnev from 'dotenv';

dotnev.config();

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
    channel.assertQueue('Queue.Puppeteer', {
      durable: true,
    });

    console.log('Aguardando trigger do Schedule.Jobs...')

    channel.consume('Queue.Puppeteer',async function(msg) {
      if(msg?.content) {
        await ColectFromOpenJobs(channel)
      }
    }, {
      noAck: true
    });
  });

});

