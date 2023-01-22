import amqp from 'amqplib/callback_api'
import ChunkPageToProcess from './jobs/ChunkPageToProcess';

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
    channel.assertQueue('chunk-page', {
      durable: true,
    });

    channel.consume('chunk-page',async function(msg) {
      if(msg?.content) {
        console.log("call chunkPageToProcess")
        await ChunkPageToProcess(channel, JSON.parse(msg?.content.toString()))
      }
    }, {
      noAck: true
    });
  });

});

