const TelegramBot = require('node-telegram-bot-api');
const Instagram = require('./help');
require('dotenv').config();

const { TELEGRAM_TOKEN } = process.env;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on('message', async (msg) => {
    const { text, chat: { id: chatId } } = msg;

    if (text === "/start") {
        bot.sendMessage(chatId, 'Hello!\n\nGetting stories from instagram by profile name.');
        return;
    }

    try {
        const loadingMessage = await bot.sendMessage(chatId, 'loading...');
        const stories = await Instagram.getStoriesByUsername(text);

        bot.deleteMessage(chatId, loadingMessage.message_id);

        if (stories.length === 0) {
            bot.sendMessage(chatId, `The user @${text} has no stories`);
            return;
        }

        stories.forEach(story => {
            if (story.type === 'video') {
                bot.sendVideo(msg.chat.id, story.url)
            } else if (story.type === 'image') {
                bot.sendPhoto(msg.chat.id, story.url);
            }
        })
    } catch (error) {
        bot.sendMessage(chatId, `Error when getting a story from @${text}`);
    }
});