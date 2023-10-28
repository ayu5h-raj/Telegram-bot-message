const TelegramBot = require("node-telegram-bot-api");
const publisher = require('./publisher');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/.*/, async (msg) => {
  const {
    text,
    from: { id: chatId, username },
  } = msg;
  
  bot.sendMessage(chatId, `Received your text: ${text}`);
  console.log("Received your text: ", text);

  try{
    await publisher.publish('notifications', text);
  }
  catch(err){
    console.log(err);
  }
});

bot.on("polling_error", (msg) => console.log(msg));

