# AIRSEC-NEO

To start the AIRSEC-NEO correctly, you need to follow these steps:

1. Make sure you have Node.js installed on your system. You can download it from the official Node.js website: https://nodejs.org

2. Create a new directory for your bot project and navigate to that directory in your terminal or command prompt.

3. Create a new file, e.g., `bot.js`, and open it in a text editor.

4. Copy the Telegram bot code into the `bot.js` file.

5. Open a terminal or command prompt in the directory where `bot.js` is located.

6. Run the following command in the terminal to install the required dependencies (Telegraf):

   ```
   npm install telegraf
   ```

7. Once the installation is complete, you can start the bot by running the following command:

   ```
   node bot.js
   ```

   This command will execute the `bot.js` file and start the bot.

8. You should see a message indicating that the bot is running and connected to the Telegram servers.

9. Now, your bot is ready to receive and respond to messages and commands on Telegram.

Keep in mind that the bot will only respond to messages and commands in the chats or groups where it is added as a member or when it receives a direct message. Make sure to invite your bot to the desired groups or start a direct conversation with it to interact with the bot.

You can customize the behavior of the bot by modifying the code in the `bot.js` file according to your requirements.

To get a token:

To get the token for your Telegram bot, you'll need to create a new bot and obtain the API token from the BotFather. Here's a step-by-step guide on how to get the token:

1. Open the Telegram app and search for "BotFather" in the search bar.
2. Start a chat with BotFather by clicking on the bot's name and then clicking on the "Start" button.
3. Send the command `/newbot` to BotFather to create a new bot.
4. BotFather will guide you through the process of creating a new bot. You'll be asked to provide a name and a username for your bot.
5. Once you have provided a name and a username, BotFather will create your bot and provide you with an API token.
6. Copy the API token provided by BotFather. It will be a long string of characters.
7. Replace the `'YOUR_TOKEN'` placeholder in the code with the API token you copied.

Make sure to keep your API token secure and avoid sharing it with others, as it provides access to your Telegram bot and its functionalities.
