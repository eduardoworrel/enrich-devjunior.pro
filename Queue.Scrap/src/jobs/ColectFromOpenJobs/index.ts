import puppeteer from 'puppeteer';
import { Job } from "../../model/Jobs";
import amqp from 'amqplib/callback_api'
import axios from 'axios';

export default async function (channel: amqp.Channel) {

    const res : any = await axios.get('https://api.devjunior.pro/api/Vaga/GetVagas');
    for(let key in res){

        console.log(key)
        key != "data" ? console.log(res[key]) : console.log(res[key].length)
    }
    
    const jobs = res.data
    const actives = jobs
        .filter((job: Job) => job.active)

    console.log(actives.length,"quantidade de ativos")
    //access urls with puppeteer

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    channel.assertQueue('vaga', {
        durable: true,
    });
    for (const active of actives) {
        console.log(active.jobLink,"url processando")
    
        await page.goto(active.jobLink);
        const text = await page.evaluate(() => document.body.textContent);


        channel.sendToQueue('vaga', Buffer.from(
            JSON.stringify({
                id: active.id,
                content: text,
                datetime: new Date().toISOString()
            })
        ))
    }

}