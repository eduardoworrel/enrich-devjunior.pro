
import { OpenAIApi } from "openai";
import amqp from 'amqplib/callback_api'
import * as RuleAskForOpenedJobByText from "../../Rules/RuleAskForOpenedJobByText";

export default async function (channel: amqp.Channel, id : number, msg : string, openai : OpenAIApi) {
  
  const ask = RuleAskForOpenedJobByText.getAiRule(msg)
  const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: ask,
      temperature: 0.3,
  });

  channel.assertQueue('save-job-assessment-opened', {
    durable: true,
  });

  channel.sendToQueue('save-job-assessment-opened', Buffer.from(
    JSON.stringify({
        id: id,
        content: response.data.choices[0].text,
        datetime: new Date().toISOString()
    })
  ))
}