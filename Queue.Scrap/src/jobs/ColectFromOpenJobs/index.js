"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const node_fetch_1 = __importDefault(require("node-fetch"));
async function default_1(channel) {
    const jobs = await (0, node_fetch_1.default)('https://api.devjunior.pro/api/Vaga/GetVagas')
        .then(res => res.json());
    const actives = jobs
        .filter((job) => job.active);
    //access urls with puppeteer
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    channel.assertQueue('vaga', {
        durable: true,
    });
    for (const active of actives) {
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
