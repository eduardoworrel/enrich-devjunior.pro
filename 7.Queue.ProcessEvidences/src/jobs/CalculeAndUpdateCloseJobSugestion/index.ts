import amqp from 'amqplib/callback_api'
import ChunkEvent from 'devjuniorpro/src/ChunkEvent';
import axios from 'axios';

export default async function (channel: amqp.Channel, ChunkEvent : ChunkEvent) {
    channel.assertQueue('Queue.Database', {
        durable: true,
    });

    const res : any = await axios.get('http://localhost:5226/api/Result');
    const jobs = res.data;



    channel.sendToQueue('Queue.Database', Buffer.from(
        JSON.stringify({})
    ))
        
       

}