import amqp from 'amqplib/callback_api'
import ChunkEvent from 'devjuniorpro/src/ChunkEvent';
import axios from 'axios';
import ClosedResult from '../../Interfaces/ClosedResult';
import ClosedJobEvidence from '../../Interfaces/ClosedJobEvidence';

export default async function (channel: amqp.Channel) {
    // TODO : No momento, ProcessEvidence está pegando apenas um resultado da api para teste
    // O serviço generic worker ainda precisa ser adaptado para enviar chunks que possam se identificar como
    // ultimo ou não, para que o processamento aqui possa ser específico para cada vaga

    channel.assertQueue('Queue.Database', {
        durable: true,
    });

    const res: any = await axios.get('http://localhost:5226/api/ClosedResult');
    console.log(res.data)
    const jobs: ClosedResult[] = res.data;
    const jobId = jobs[0].jobId;
    const allJobsWithThisJobId = jobs.filter(j => j.jobId == jobId)
    const countIsClosed = allJobsWithThisJobId.filter(j => j.value == '1').length

    const evidence: ClosedJobEvidence = {
        JobId: jobId,
        ActualStatus: 0,
        CountIsClosed: countIsClosed,
        PossiblyClosed: countIsClosed >= 1
    }

    channel.sendToQueue('Queue.Database.Processed', Buffer.from(
        JSON.stringify(evidence)
    ))
}
