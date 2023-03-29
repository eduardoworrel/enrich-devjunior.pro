import puppeteer from 'puppeteer';
import Job from "devjuniorpro/src/Jobs";
import amqp from 'amqplib/callback_api'
import axios from 'axios';

export default async function (channel: amqp.Channel) {

    // const res : any = await axios.get('https://api.devjunior.pro/api/Vaga/GetVagas');
    // const jobs = res.data
    const actives = [
        {id:1,url:'https://www.linkedin.com/jobs/view/3053449268/?refId=2a8473a8-6f56-4c4e-abb9-221ade2a2b1e'},
        {id:2,url:'https://www.linkedin.com/jobs/view/3151220688/?refId=0695a877-f702-4dad-860d-dc331e133750'},
    ]
    // const actives = jobs
    //     .filter((job: Job) => !job.active)

    // console.log(actives.length,"quantidade de ativos")
    // //access urls with puppeteer

    const browser = await puppeteer.launch({
        // executablePath: '/usr/bin/google-chrome',
        args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    channel.assertQueue('Queue.GenericWorker', {
        durable: true,
    });
    for (const active of actives) {
        
        // await page.goto(active.jobLink,{
        await page.goto(active.url,{
            waitUntil:"networkidle2"
        });
        
        const text = await page.evaluate(() => document.body.innerText);
        const url = await page.evaluate(() => window.location.hostname);
        
        channel.sendToQueue('Queue.GenericWorker', Buffer.from(
            JSON.stringify({
                id: active.id,
                content: text,
                url: url,
                datetime: new Date().toISOString()
            })
        ))
    }

}