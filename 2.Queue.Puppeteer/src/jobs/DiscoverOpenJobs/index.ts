import puppeteer, { ElementHandle } from 'puppeteer';
import Job from "devjuniorpro/src/Jobs";
import amqp from 'amqplib/callback_api'
import axios from 'axios';

export default async function (channel: amqp.Channel) {



    const browser = await puppeteer.launch({
        // executablePath: '/usr/bin/google-chrome',
        args: ['--no-sandbox'],
        headless: false
    });
    const page = await browser.newPage();
    channel.assertQueue('Queue.GenericWorker', {
        durable: true,
    });
    
    await page.goto('https://www.linkedin.com/login'); 
    // Preenche o formulário de login 
    await page.type('#username', 'login'); 
    await page.type('#password', 'senha123'); 
    await page.click('.btn__primary--large'); 
    // Espera a página de feed carregar e vai para a página de empregos 
    await page.waitForSelector('.scaffold-layout__sidebar');
    await page.goto('https://www.linkedin.com/jobs/search/?keywords=Junior-Dev&refresh=true'); 
    // // Clica no filtro "Experiência" 
    // await page.click('#experience-input');
    // // Seleciona a opção "Estágio / Trainee" 
    // const option = await page.$('input[type="checkbox"][value="F"]') as ElementHandle; 
    // await option.click(); // Clica no botão "Aplicar" 
    // await page.click('.search-advanced-facets__button--apply');

    // Espera as vagas carregarem e pega os títulos das vagas 
    await page.waitForSelector('.jobs-search__results-list'); 
    const jobs = await page.$$eval('.job-card-container .job-card-list__title', elements => elements.map(el => el.textContent)); 
    console.log(jobs); 

    // Fecha o navegador 
    await browser.close(); 

    // channel.sendToQueue('Queue.GenericWorker', Buffer.from(
    //     JSON.stringify({
    //         id: active.id,
    //         content: text,
    //         url: url,
    //         datetime: new Date().toISOString()
    //     })
    // ))
}