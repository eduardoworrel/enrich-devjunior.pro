"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const axios_1 = __importDefault(require("axios"));
async function default_1(channel) {
    const res = await axios_1.default.get('https://api.devjunior.pro/api/Vaga/GetVagas');
    for (let key in res) {
        console.log(key);
        key != "data" ? console.log(res[key]) : console.log(res[key].length);
    }
    const jobs = res.data;
    const actives = jobs
        .filter((job) => job.active);
    console.log(actives.length, "quantidade de ativos");
    //access urls with puppeteer
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    channel.assertQueue('vaga', {
        durable: true,
    });
    for (const active of actives) {
        console.log(active.jobLink, "url processando");
        await page.goto(active.jobLink);
        const text = await page.evaluate(() => document.body.textContent);
        channel.sendToQueue('vaga', Buffer.from(JSON.stringify({
            id: active.id,
            content: text,
            datetime: new Date().toISOString()
        })));
    }
}
exports.default = default_1;
