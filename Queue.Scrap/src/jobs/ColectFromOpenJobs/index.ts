import puppeteer from 'puppeteer';
import Job from "devjuniorpro/src/Jobs";
import amqp from 'amqplib/callback_api'
import axios from 'axios';

export default async function (channel: amqp.Channel) {

    const res : any = await axios.get('https://api.devjunior.pro/api/Vaga/GetVagas');
    const jobs = res.data
    const actives = jobs
        .filter((job: Job) => !job.active)

    console.log(actives.length,"quantidade de ativos")
    //access urls with puppeteer

    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    channel.assertQueue('chunk-page', {
        durable: true,
    });
    for (const active of actives) {
        console.log(new Date().toISOString(),`- lendo [${active.jobLink}]`)
    
        await page.goto(active.jobLink,{
            waitUntil:"networkidle2"
        });
        
        const text = await page.evaluate(() => document.body.innerText);

        channel.sendToQueue('chunk-page', Buffer.from(
            JSON.stringify({
                id: active.id,
                content: text,
                datetime: new Date().toISOString()
            })
        ))
    }

}