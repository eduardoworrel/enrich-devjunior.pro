import amqp from 'amqplib/callback_api'
import ChunkPageToProcess from './jobs/ChunkPageToProcess';

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
    channel.assertQueue('Queue.GenericWorker', {
      durable: true,
    });

    channel.consume('Queue.GenericWorker',async function(msg) {
      if(msg?.content) {
        console.log("call chunkPageToProcess")
        await ChunkPageToProcess(channel, JSON.parse(msg?.content.toString()))
      }
    }, {
      noAck: true
    });
  });

});

