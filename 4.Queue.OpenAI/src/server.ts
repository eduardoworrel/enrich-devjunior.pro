import { Configuration, OpenAIApi } from "openai";

const key = process.env.OPENAI_API_KEY
if(key == undefined){
  throw Error("cant find openai key")
}
const configuration = new Configuration({
    apiKey: key,
});
const openai = new OpenAIApi(configuration);

import amqp from 'amqplib/callback_api'
import askForOpenedJobByText from "./Jobs/askForOpenedJobByText";
import ChunkEvent from "devjuniorpro/src/ChunkEvent";
import askForClosedJobByText from "./Jobs/askForClosedJobByText";

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
    
    channel.assertQueue('Queue.OpenAI', {
      durable: true,
    });
    channel.prefetch(1)
    channel.consume('Queue.OpenAI', async function(msg : amqp.Message | null) {
      if(msg?.content) {
        let result : ChunkEvent = JSON.parse(msg.content.toString())
        
        console.log("call to chat gpt with '"+result.content+"'")
        // await askForOpenedJobByText(channel, result.id, result.content , openai)
        // setTimeout( async() => {

          await askForClosedJobByText(channel, result.id, result.content , openai)
        // }, 2000);
        setTimeout(() => {
          channel.ack(msg);
        }, 5000);
      }
     
    }, {
      noAck: false
    });

  });

});

