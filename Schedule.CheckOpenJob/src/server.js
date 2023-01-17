"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
callback_api_1.default.connect('amqp://admin:admin@localhost:5672', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        // cron.schedule("10 * * * *", async () => {
        channel.assertQueue('start-scrap', {
            durable: true,
        });
        channel.sendToQueue('start-scrap', Buffer.from(""));
        // });
    });
});
