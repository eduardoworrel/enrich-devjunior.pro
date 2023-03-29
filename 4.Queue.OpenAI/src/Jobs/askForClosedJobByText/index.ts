
import { OpenAIApi } from "openai";
import amqp from 'amqplib/callback_api'
import * as RuleAskForClosedJobByText from "../../Rules/RuleAskForClosedJobByText";

export default async function (channel: amqp.Channel, id : number, msg : string, url : string, openai : OpenAIApi) {
  
  const ask = RuleAskForClosedJobByText.getAiRule(msg, url )
  let res = "0"
  if(url == ("br.linkedin.com") || url == ("www.linkedin.com")){
    if (msg.includes("This job is no longer available")){
      res = "1"
    }
  }
  else{
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: ask,
      temperature: 0,
    });
   res = response.data.choices[0].text ?? "0"
  }

  channel.assertQueue('Queue.Database', {
    durable: true,
  });

  channel.sendToQueue('Queue.Database', Buffer.from(
    JSON.stringify({
        id: id,
        content: res,
        datetime: new Date().toISOString()
    })
  ))
}