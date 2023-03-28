import amqp from 'amqplib/callback_api'
import ChunkEvent from 'devjuniorpro/src/ChunkEvent';

function post(channel: amqp.Channel, msg: string, id: number, url: string){
    
    channel.sendToQueue('Queue.OpenAI', Buffer.from(
        JSON.stringify({
            id: id,
            url:url,
            content: msg,
            datetime: new Date().toISOString()
        })
    ))
}
export default async function (channel: amqp.Channel, ChunkEvent : ChunkEvent) {
        channel.assertQueue('Queue.OpenAI', {
            durable: true,
        });
    
        let fullContent = ChunkEvent.content;

        fullContent = fullContent.replace(/<[^>]*>/g, ""); // remove all tags
        fullContent = fullContent.replace(/\s+/g, " "); // remove multiple whitespaces
        fullContent = fullContent.trim(); // remove leading and trailing whitespaces

        const size = fullContent.length;
        if(size > 4000){
            for(let i = 0; i < Math.ceil(size/4000); i++){
                let chunk = fullContent.substring(i + (i * 4000),(1 + i) * 4000)
                post(channel,chunk,ChunkEvent.id, ChunkEvent.url)
            }
        }else{
            post(channel,fullContent,ChunkEvent.id, ChunkEvent.url)
        }
       

}