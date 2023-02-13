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

  let prepareResponse = response.data.choices[0].text?.replace(/<[^>]*>/g, '');
  prepareResponse = prepareResponse?.replace(/\s+/g, ' ');
  prepareResponse = prepareResponse?.trim();

  console.log(`responseGPT: ${prepareResponse}`);

  channel.assertQueue('Queue.Database', {
    durable: true,
  });

  channel.sendToQueue(
    'Queue.Database',
    Buffer.from(
      JSON.stringify({
        id: id,
        content: prepareResponse,
        datetime: new Date().toISOString(),
      })
    )
  );
}
