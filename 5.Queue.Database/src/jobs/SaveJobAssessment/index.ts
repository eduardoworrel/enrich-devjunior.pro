import amqp from 'amqplib/callback_api';
import axios from 'axios';
import ChunkEvent from 'devjuniorpro/src/ChunkEvent';

export default async function (channel: amqp.Channel, ChunkEvent : ChunkEvent) {
    let response = await axios.post("http://localhost:5226/api/ClosedResult",{
      "id": 0,
      "jobId": ChunkEvent.id,
      "value": ChunkEvent.content,
      "colected_at": ChunkEvent.datetime
    })
}