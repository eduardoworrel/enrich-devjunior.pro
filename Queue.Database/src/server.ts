import amqp from 'amqplib/callback_api'
import SaveJobAssessment from './jobs/SaveJobAssessment';

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
    channel.assertQueue('save-job-assessment', {
      durable: true,
    });

    channel.consume('save-job-assessment',async function(msg) {
      if(msg?.content) {
        console.log("call save-job-assessment")
        await SaveJobAssessment(channel, JSON.parse(msg?.content.toString()))
      }
    }, {
      noAck: true
    });
  });

});

