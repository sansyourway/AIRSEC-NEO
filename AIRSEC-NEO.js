// Required dependencies
const { Telegraf, Markup } = require('telegraf');

// Replace 'YOUR_TOKEN' with your Telegram Bot API token
const TOKEN = 'YOUR_TOKEN';

// Create a new instance of the Telegraf bot
const bot = new Telegraf(TOKEN);

// Subscription plan for each forward
const subscriptionPlan = {
  free: {
    limit: 3, // Maximum number of forwards for free plan
    interval: 24 * 60 * 60 * 1000, // Interval (in milliseconds) for free plan
  },
  premium: {
    limit: 10, // Maximum number of forwards for premium plan
    interval: 12 * 60 * 60 * 1000, // Interval (in milliseconds) for premium plan
  },
};

// User subscriptions
const subscriptions = {};

/**
 * Start command handler
 * Sends a welcome message when the bot is started
 */
bot.start((ctx) => ctx.reply('Welcome to the Forwarding Bot!'));

/**
 * Help command handler
 * Displays the help menu with available commands
 */
bot.help((ctx) => {
  const helpMessage =
    "To forward a message, simply send it to this bot.\n\n" +
    "Available commands:\n" +
    "/help - Show this help menu\n" +
    "/subscribe - Subscribe to the premium plan\n" +
    "/unsubscribe - Unsubscribe from the premium plan\n" +
    "/leavegroup - Leave the current group\n" +
    "/speedtest - Test bot speed";
  ctx.reply(helpMessage);
});

/**
 * Leave group command handler
 * Makes the bot leave the current group
 */
bot.command('leavegroup', (ctx) => {
  const chatId = ctx.message.chat.id;
  bot.telegram.leaveChat(chatId);
});

/**
 * Subscribe command handler
 * Subscribes the user to the premium plan
 */
bot.command('subscribe', (ctx) => {
  const chatId = ctx.message.chat.id;
  if (subscriptions[chatId]) {
    ctx.reply('You are already subscribed to the premium plan.');
  } else {
    subscriptions[chatId] = {
      plan: 'premium',
      remaining: subscriptionPlan.premium.limit,
      nextReset: Date.now() + subscriptionPlan.premium.interval,
    };
    ctx.reply('You have successfully subscribed to the premium plan.');
  }
});

/**
 * Unsubscribe command handler
 * Unsubscribes the user from the premium plan
 */
bot.command('unsubscribe', (ctx) => {
  const chatId = ctx.message.chat.id;
  if (subscriptions[chatId]) {
    delete subscriptions[chatId];
    ctx.reply('You have unsubscribed from the premium plan.');
  } else {
    ctx.reply('You are not currently subscribed to any plan.');
  }
});

/**
 * Speedtest command handler
 * Measures the bot's speed and displays the latency
 */
bot.command('speedtest', async (ctx) => {
  const start = Date.now();
  const message = await ctx.reply('Testing bot speed...');
  const end = Date.now();
  const latency = end - start;
  await bot.telegram.editMessageText(ctx.chat.id, message.message_id, undefined, `Bot latency: ${latency}ms`);
});

/**
 * Message handler
 * Forwards the received message to the specified chat
 */
bot.on('message', (ctx) => {
  const chatId = ctx.message.chat.id;
  const forwardChatId = '123456789'; // Replace with the chat ID where you want to forward the message
  
  // Check subscription and forward message
  if (subscriptions[chatId] && subscriptions[chatId].remaining > 0) {
    subscriptions[chatId].remaining--;
    ctx.telegram.forwardMessage(forwardChatId, chatId, ctx.message.message_id);
  } else {
    ctx.reply('You have reached the maximum number of forwards for your subscription plan.');
  }
});

/**
 * Menu command handler
 * Displays a menu with available options
 */
bot.hears('Menu', (ctx) => {
  const menuKeyboard = Markup.keyboard([
    ['Forward Message', 'Subscription Plan'],
    ['Help', 'Leave Group', 'Speed Test'],
  ]).resize().extra();
  ctx.reply('Select an option:', menuKeyboard);
});

/**
 * Forward Message command handler
 * Prompts the user to send the message they want to forward
 */
bot.hears('Forward Message', (ctx) => {
  ctx.reply('Please send the message you want to forward.');
});

/**
 * Subscription Plan command handler
 * Displays the user's subscription plan details
 */
bot.hears('Subscription Plan', (ctx) => {
  const chatId = ctx.message.chat.id;
  const plan = subscriptions[chatId] ? subscriptions[chatId].plan : 'free';
  const remaining = subscriptions[chatId] ? subscriptions[chatId].remaining : 0;
  const nextReset = subscriptions[chatId] ? new Date(subscriptions[chatId].nextReset).toLocaleString() : 'N/A';
  
  const subscriptionMessage =
    `Your subscription plan: ${plan}\n` +
    `Remaining forwards: ${remaining}\n` +
    `Next reset: ${nextReset}`;
  ctx.reply(subscriptionMessage);
});

// Launch the bot
bot.launch();
