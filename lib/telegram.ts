import { makePostRequest } from "./makePostRequest";


const telegramBotKey = process.env.TELEGRAM_BOT_TOCKEN;
const telegramChatId = process.env.TELEGRAM_CHAT_ID;

export async function telegramSendMessage(text: string) {
    const endpoint = `https://api.telegram.org/bot${telegramBotKey}/sendMessage`;
    const data = {
        text,
        parse_mode: "HTML",
        chat_id: telegramChatId
    }
    console.log("endpoint:", endpoint)
    console.log("data", data)
    await makePostRequest(endpoint, data);

}