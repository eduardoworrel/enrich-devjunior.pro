
import { OpenAIApi } from "openai";
import amqp from 'amqplib/callback_api'
import * as RuleAskForClosedJobByText from "../../Rules/RuleAskForClosedJobByText";

export default async function (channel: amqp.Channel, id : number, msg : string, url : string, openai : OpenAIApi) {
  
  const ask = RuleAskForClosedJobByText.getAiRule(msg, url )

  const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: ask,
      temperature: 0,
  });

  channel.assertQueue('Queue.Database', {
    durable: true,
  });

  channel.sendToQueue('Queue.Database', Buffer.from(
    JSON.stringify({
        id: id,
        content: response.data.choices[0].text,
        datetime: new Date().toISOString()
    })
  ))
}