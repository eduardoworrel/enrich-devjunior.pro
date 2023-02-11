import {OpenAIApi} from 'openai';
import amqp from 'amqplib/callback_api';
import * as RuleAskForClosedJobByText from '../../Rules/RuleAskForClosedJobByText';

export default async function (
  channel: amqp.Channel,
  id: number,
  msg: string,
  openai: OpenAIApi
) {
  const ask = RuleAskForClosedJobByText.getAiRule(msg);
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: ask,
    temperature: 0.1,
    max_tokens: 4,
  });

  console.log(`responseGPT: ${response.data.choices[0].text}`);

  channel.assertQueue('Queue.Database', {
    durable: true,
  });

  channel.sendToQueue(
    'Queue.Database',
    Buffer.from(
      JSON.stringify({
        id: id,
        content: response.data.choices[0].text,
        datetime: new Date().toISOString(),
      })
    )
  );
}
