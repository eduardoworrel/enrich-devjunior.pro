import amqp from 'amqplib/callback_api'
import CalculeAndUpdateCloseJobSugestion from './jobs/CalculeAndUpdateCloseJobSugestion';
import dotenv from 'dotenv';

dotenv.config();  

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
    channel.assertQueue('Queue.ProcessEvidences', {
      durable: true,
    });

    console.log("Aguardando trigger para processar respostas do chatGPT...")
    channel.consume('Queue.ProcessEvidences',async function(msg) {
      if(msg?.content) {
        console.log("calling CalculeAndUpdateCloseJobSugestion...")
        await CalculeAndUpdateCloseJobSugestion(channel)
      }
    }, {
      noAck: true
    });
  });

});

