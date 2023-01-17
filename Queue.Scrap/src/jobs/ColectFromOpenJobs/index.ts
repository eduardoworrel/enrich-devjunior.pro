import puppeteer from 'puppeteer';
import { Job } from "../../model/Jobs";
import amqp from 'amqplib/callback_api'
import fetch from 'node-fetch';

export default async function (channel: amqp.Channel) {

    const jobs : any = await fetch('https://api.devjunior.pro/api/Vaga/GetVagas')
        .then(res => res.json());

    const actives = jobs
        .filter((job: Job) => job.active)


    //access urls with puppeteer

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    channel.assertQueue('vaga', {
        durable: true,
    });
    for (const active of actives) {
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