const { Telegraf, Markup } = require('telegraf');
const { exec } = require('child_process');

const TOKEN = 'YOUR_BOT_TOKEN';
const FORWARD_CHANNEL_ID = '@your_channel_id';

const PLAN_1_LIMIT = 5;
const PLAN_2_LIMIT = 10;
const PLAN_3_LIMIT = 15;

let PLAN_1_PRICE = 99000;
let PLAN_2_PRICE = 199000;
let PLAN_3_PRICE = 299000;

const ADMIN_USER_IDS = ['123456789', '987654321'];

const BOT_VERSION = '3.0.0';
const CREATOR_CONTACT = '@creator_username';
const BOT_CREATION_DATE = '2023-07-01';
const COPYRIGHT_NOTICE = '© 2023 SansYourWays. All rights reserved.';

const PAYMENT_METHODS = [
  { name: 'Bank Transfer', value: 'bank_transfer' },
  { name: 'DANA', value: 'dana' }
];

const bot = new Telegraf(TOKEN);

bot.catch((err, ctx) => {
  console.error(`Error occurred for ${ctx.updateType}`, err);
  ctx.reply(`An error occurred: ${err.message}`);
});

bot.start((ctx) => {
  ctx.reply('Bot started!');
});

const forwardingCounter = new Map();

const plan1Subscribers = new Set();
const plan2Subscribers = new Set();
const plan3Subscribers = new Set();

bot.on('message', async (ctx) => {
  const chatId = ctx.message.chat.id;
  const prefix = ctx.message.text.split(' ')[0];

  if (prefix === '/f' || prefix === '/forward') {
    let counter = forwardingCounter.get(chatId) || 0;

    if (counter >= PLAN_3_LIMIT) {
      return ctx.reply('You have exceeded your forwarding limit. Please subscribe to a higher plan or unsubscribe to change your plan.');
    }

    counter++;
    forwardingCounter.set(chatId, counter);

    try {
      await ctx.telegram.forwardMessage(FORWARD_CHANNEL_ID, chatId, ctx.message.message_id);
      ctx.replyWithHTML(`Message forwarded successfully!\n\nBot Version: ${BOT_VERSION}\nCreator Contact: ${CREATOR_CONTACT}\n\n${COPYRIGHT_NOTICE}`);
    } catch (error) {
      console.error('Failed to forward message:', error);
      ctx.reply('Failed to forward the message. Please try again later.');
    }
  } else {
    ctx.reply(`Invalid command. To forward messages, use the "/forward" or "/f" prefix.\n\n${COPYRIGHT_NOTICE}`);
  }
});

bot.command('direct', (ctx) => {
  ctx.reply('This is a direct message from the bot.');
});

bot.command('help', (ctx) => {
  showHelpMenu(ctx);
});

bot.command('speedtest', (ctx) => {
  if (!isAdminUser(ctx.from.id)) {
    return ctx.reply('Only admin users can use this command.');
  }

  runSpeedTest(ctx);
});

bot.command('subscribe', (ctx) => {
  showPaymentMethods(ctx);
});

bot.command('unsubscribe', (ctx) => {
  unsubscribe(ctx);
});

bot.command('leavegroup', (ctx) => {
  if (ctx.chat.type !== 'group' && ctx.chat.type !== 'supergroup' && ctx.chat.type !== 'channel') {
    return ctx.reply('This command can only be used in a group or channel.');
  }

  if (!isAdminUser(ctx.from.id)) {
    return ctx.reply('Only admin users can use this command.');
  }

  leaveGroup(ctx);
});

bot.command('datetime', (ctx) => {
  showDateTime(ctx);
});

bot.command('mention', (ctx) => {
  mentionUser(ctx);
});

bot.command('subscribers', (ctx) => {
  if (!isAdminUser(ctx.from.id)) {
    return ctx.reply('Only admin users can use this command.');
  }

  showSubscribers(ctx);
});

bot.command('setprice', (ctx) => {
  if (!isAdminUser(ctx.from.id)) {
    return ctx.reply('Only admin users can use this command.');
  }

  setPlanPrice(ctx);
});

bot.command('version', (ctx) => {
  ctx.reply(`Bot Version: ${BOT_VERSION}`);
});

bot.launch().then(() => {
  console.log('Bot started');

  const formattedCreationDate = new Date(BOT_CREATION_DATE).toLocaleDateString();
  console.log(`Bot created on: ${formattedCreationDate}`);
  console.log(`Bot version: ${BOT_VERSION}`);
  console.log('Bot is online!');
}).catch((err) => {
  console.error('Failed to start bot', err);
});

function showHelpMenu(ctx) {
  const helpMessage = `
    Available commands:
    - /start: Start the bot
    - /f or /forward: Forward a message (subscription required)
    - /direct: Send a direct message from the bot
    - /help: Show this help menu
    - /speedtest: Run a speed test (admin only)
    - /subscribe: Subscribe to a forwarding plan
    - /unsubscribe: Unsubscribe from the current plan
    - /leavegroup: Leave the group or channel (admin only)
    - /datetime: Show the current date and time
    - /mention: Mention a user in a reply message
    - /subscribers: Show the subscriber list (admin only)
    - /setprice: Set the price of a plan (admin only)
    - /version: Show the bot version

    Bot Version: ${BOT_VERSION}
    Bot Creator: ${CREATOR_CONTACT}
    Bot Creation Date: ${BOT_CREATION_DATE}
    ${COPYRIGHT_NOTICE}
  `;

  ctx.reply(helpMessage);
}

function isAdminUser(userId) {
  return ADMIN_USER_IDS.includes(userId.toString());
}

function runSpeedTest(ctx) {
  ctx.reply('Running speed test...');

  exec('speedtest-cli --simple', (error, stdout) => {
    if (error) {
      console.error('Speed test failed:', error);
      ctx.reply('Speed test failed. Please try again later.');
      return;
    }

    const results = stdout.split('\n');

    const ping = results[0].split(':')[1].trim();
    const download = results[1].split(':')[1].trim();
    const upload = results[2].split(':')[1].trim();

    const speedTestResult = `
      Speed test results:
      Ping: ${ping}
      Download speed: ${download}
      Upload speed: ${upload}
    `;
    ctx.reply(speedTestResult);
  });
}

function showPaymentMethods(ctx) {
  const buttons = PAYMENT_METHODS.map(method => Markup.button.callback(method.name, `subscribe_${method.value}`));

  const keyboard = Markup.inlineKeyboard(buttons);
  ctx.reply('Choose a payment method:', keyboard);
}

function unsubscribe(ctx) {
  const chatId = ctx.message.chat.id;
  forwardingCounter.delete(chatId);

  plan1Subscribers.delete(chatId);
  plan2Subscribers.delete(chatId);

  ctx.reply('You have unsubscribed from the current plan. You will no longer have forwarding limits.');
}

function leaveGroup(ctx) {
  ctx.leaveChat();
  ctx.reply('I have left the group or channel.');
}

function showDateTime(ctx) {
  const currentDate = new Date();
  const dateTimeString = currentDate.toISOString();
  ctx.reply(dateTimeString);
}

function mentionUser(ctx) {
  const mentionedUser = ctx.message.reply_to_message.from;

  if (!mentionedUser) {
    return ctx.reply('Please reply to a message to mention a user.');
  }

  const mentionText = `Hello, ${mentionedUser.first_name}! You have been mentioned.`;
  ctx.reply(mentionText);
}

function showSubscribers(ctx) {
  const plan1Count = plan1Subscribers.size;
  const plan2Count = plan2Subscribers.size;
  const plan3Count = plan3Subscribers.size;

  const subscribersText = `
    Subscriber list:
    Plan 1 Subscribers: ${plan1Count}
    Plan 2 Subscribers: ${plan2Count}
    Plan 3 Subscribers: ${plan3Count}
  `;
  ctx.reply(subscribersText);
}

function setPlanPrice(ctx) {
  const args = ctx.message.text.split(' ');

  if (args.length !== 4) {
    return ctx.reply('Invalid command. Usage: /setprice <plan_number> <price>');
  }

  const planNumber = parseInt(args[1]);
  const price = parseInt(args[2]);
  const currency = args[3];

  if (isNaN(planNumber) || isNaN(price)) {
    return ctx.reply('Invalid plan number or price.');
  }

  if (planNumber === 1) {
    PLAN_1_PRICE = price;
  } else if (planNumber === 2) {
    PLAN_2_PRICE = price;
  } else if (planNumber === 3) {
    PLAN_3_PRICE = price;
  } else {
    return ctx.reply('Invalid plan number. Valid plan numbers are 1, 2, and 3.');
  }

  ctx.reply(`Price for plan ${planNumber} set to ${price} ${currency}.`);
}
