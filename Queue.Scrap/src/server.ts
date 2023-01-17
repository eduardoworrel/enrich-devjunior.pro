import amqp from 'amqplib/callback_api'
import ColectFromOpenJobs from './jobs/ColectFromOpenJobs';

amqp.connect('amqp://admin:admin@localhost:5672', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    channel.assertQueue('start-scrap', {
      durable: true,
    });
    channel.consume('start-scrap',async function(msg) {
      if(msg?.content) {
        console.log("call ColectFromOpenJobs")
        await ColectFromOpenJobs(channel)
      }
    }, {
      noAck: true
    });

  });

});

