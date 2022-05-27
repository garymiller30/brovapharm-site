import { makePostRequest } from "./makePostRequest";


const telegramBotKey = process.env.TELEGRAM_BOT_TOCKEN;
const telegramChatId = process.env.TELEGRAM_CHAT_ID;

export async function telegramSendMessage(text: string = "", url: string = "") {
    const endpoint = `https://api.telegram.org/bot${telegramBotKey}/sendMessage`;

    const boldOfs = text.lastIndexOf(" ");

    const data = {
        text,
        entities: [{

            type: "text_link",
            offset: 0,
            length: text.length,
            url

        }, {
            type: "bold",
            offset: boldOfs,
            length: text.length - boldOfs
        }],
        //parse_mode: "HTML",
        chat_id: telegramChatId,
        disable_web_page_preview: true
    }
    // console.log("endpoint:", endpoint)
    // console.log("data", data)
    await makePostRequest(endpoint, data);

}