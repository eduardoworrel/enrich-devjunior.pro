"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const ColectFromOpenJobs_1 = __importDefault(require("./jobs/ColectFromOpenJobs"));
callback_api_1.default.connect('amqp://admin:admin@localhost:5672', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        channel.assertQueue('start-scrap', {
            durable: true,
        });
        channel.consume('start-scrap', async function (msg) {
            if (msg?.content) {
                console.log("call ColectFromOpenJobs");
                await (0, ColectFromOpenJobs_1.default)(channel);
            }
        }, {
            noAck: true
        });
    });
});
