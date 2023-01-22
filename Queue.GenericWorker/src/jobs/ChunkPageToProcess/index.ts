import amqp from 'amqplib/callback_api'
import PageChunkEvent from 'devjuniorpro/src/PageChunkEvent';

function post(channel: amqp.Channel, msg: string, id: number){
    
    channel.sendToQueue('process-chunk-page', Buffer.from(
        JSON.stringify({
            id: id,
            content: msg,
            datetime: new Date().toISOString()
        })
    ))
}
export default async function (channel: amqp.Channel, PageChunkEvent : PageChunkEvent) {
        channel.assertQueue('process-chunk-page', {
            durable: true,
        });
    
        const fullContent = PageChunkEvent.content;
        const size = fullContent.length;

        if(size > 2000){
            for(let i = 0; i < Math.ceil(size/2000); i++){
                let chunk = fullContent.substring(i,i+2000)
                post(channel,chunk,PageChunkEvent.id)
            }
        }else{
            post(channel,fullContent,PageChunkEvent.id)
        }
       

}