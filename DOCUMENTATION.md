## Documentation

The documentation provides an overview of the Telegram bot code and its various functions and features.

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Commands](#commands)
- [Contributing](#contributing)
- [License](#license)

### Introduction

The Telegram bot is a simple bot built using the Telegraf framework in Node.js. It provides basic functionality for forwarding messages to a specified channel and sending direct messages to users.

### Installation

To install and run the Telegram bot, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Configure the bot token: Replace `'YOUR_BOT_TOKEN'` with your actual bot token in the `bot.js` file.
4. Run the bot: `node bot.js`

### Usage

Once the bot is running, users can interact with it by sending commands or messages. The available commands are described in the [Commands](#commands) section below.

### Configuration

The bot requires a Telegram bot token to function properly. You can obtain a bot token by creating a new bot on the Telegram BotFather platform. Replace `'YOUR_BOT_TOKEN'` with your actual bot token in the `bot.js` file.

### Commands

The Telegram bot supports the following commands:

- `/start`: Start the bot.
- `/forward <channel> <message>`: Forward a message to the specified channel.
- `/direct <user> <message>`: Send a direct message to the specified user.
- `/help`: Show the help menu with a list of available commands.

### Contributing

Contributions to this project are welcome! If you have any suggestions, enhancements, or bug fixes, please open an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## README

### Telegram Bot

The Telegram bot is a simple bot built using the Telegraf framework in Node.js. It allows users to forward messages to a specified channel and send direct messages to other users.

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the bot token:

   Replace `'YOUR_BOT_TOKEN'` with your actual bot token in the `bot.js` file.

4. Run the bot:

   ```bash
   node bot.js
   ```

### Usage

Once the bot is running, users can interact with it by sending commands or messages. The available commands are described below:

- `/start`: Start the bot.
- `/forward <channel> <message>`: Forward a message to the specified channel.
- `/direct <user> <message>`: Send a direct message to the specified user.
- `/help`: Show the help menu with a list of available commands.

### Contributing

Contributions to this project are welcome! If you have any suggestions, enhancements, or bug fixes, please open an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
