# AIRSEC NEO v3

This is a Telegram bot built using the Telegraf framework in Node.js. The bot provides several functions and features for users and administrators.

## Features

### User Features
- **Forwarding**: Users can forward messages to a specified channel.
- **Direct Message**: Users can receive a direct message from the bot.
- **Help Menu**: Users can access a help menu that lists all available commands and provides information about the bot.

### Admin Features
- **Speed Test**: Admin users can run a speed test to check the bot's network speed.
- **Subscribe**: Users can subscribe to a forwarding plan with different limits.
- **Unsubscribe**: Users can unsubscribe from their current forwarding plan.
- **Leave Group**: Admin users can make the bot leave a group or channel.
- **DateTime**: Users can request the current date and time.
- **Mention**: Users can mention a user in a reply message.
- **Subscribers**: Admin users can view the subscriber list of each forwarding plan.
- **Set Price**: Admin users can set the price of each forwarding plan.
- **Version**: Users can check the bot version.

## Installation

1. Clone this repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Configure the bot token in the code: Replace `'YOUR_BOT_TOKEN'` with your actual bot token.
4. Run the bot: `node bot.js`

## Usage

Once the bot is up and running, you can interact with it using the following commands:

- **/start**: Start the bot.
- **/f or /forward**: Forward a message to a specified channel.
- **/direct**: Receive a direct message from the bot.
- **/help**: Show the help menu with a list of available commands.
- **/speedtest**: Run a speed test (admin only).
- **/subscribe**: Subscribe to a forwarding plan.
- **/unsubscribe**: Unsubscribe from the current plan.
- **/leavegroup**: Make the bot leave the current group or channel (admin only).
- **/datetime**: Show the current date and time.
- **/mention**: Mention a user in a reply message.
- **/subscribers**: Show the subscriber list (admin only).
- **/setprice**: Set the price of a forwarding plan (admin only).
- **/version**: Show the bot version.

## Configuration

The following configuration options are available in the code:

- **TOKEN**: The Telegram bot token. Replace `'YOUR_BOT_TOKEN'` with your actual bot token.
- **FORWARD_CHANNEL_ID**: The ID of the channel where messages will be forwarded.
- **PLAN_1_LIMIT**: The message forwarding limit for Plan 1 subscribers.
- **PLAN_2_LIMIT**: The message forwarding limit for Plan 2 subscribers.
- **PLAN_3_LIMIT**: The message forwarding limit for Plan 3 subscribers.
- **PLAN_1_PRICE**: The price of Plan 1 in IDR currency.
- **PLAN_2_PRICE**: The price of Plan 2 in IDR currency.
- **PLAN_3_PRICE**: The price of Plan 3 in IDR currency.
- **ADMIN_USER_IDS**: An array of user IDs that have admin privileges.
- **BOT_VERSION**: The current version of the bot.
- **CREATOR_CONTACT**: The contact or ID of the bot creator.
- **BOT_CREATION_DATE**: The date when the bot was created.
- **COPYRIGHT_NOTICE**: The copyright notice.

## Contributing

Contributions to this project are welcome! Feel free to open issues and submit pull requests.

## License

This project is licensed under the MIT License.

 See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The Telegram Bot API and the Telegraf framework for Node.js.

Feel free to customize this README file according to your specific needs and add any additional information that might be relevant for your users.
