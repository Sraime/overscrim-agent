require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const mongoose = require("mongoose");

let commands = [
  require("./commands/find"),
  require("./commands/register"),
  require("./commands/help"),
];

const mongoDB = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => {
    console.log("Connection to database has been established successfully.");
  })
  .catch((err) => {
    logger.log({
      level: "info",
      message: `Unable to connect to the database ${err}`,
    });
  });

bot.login(TOKEN);
bot.commands = commands;

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!scrim-`);
});

bot.on("message", (msg) => {
  const parsedCmd = msg.content.split(" ");
  let commandKey;
  if (msg.author.id === bot.user.id || !parsedCmd[0].startsWith("!scrim-")) {
    return;
  }

  commandKey = parsedCmd[0].replace("!scrim-", "");
  const args = parsedCmd.splice(1);
  console.log(msg.author.tag, commandKey, args);

  try {
    //verify if command exist
    const command = commands.filter((c) => c.name === commandKey)[0];
    if (!command) {
      throw new Error("Invalid command");
    }
    if (
      command.numberOfArguments &&
      command.numberOfArguments !== args.length
    ) {
      let reply = `You didn't provide correct arguments, ${msg.author}!
      ${command.numberOfArguments} expected, got ${args.length}`;
      if (command.usage) {
        reply += `\nThe proper usage would be: \`!scrim-${command.name} ${command.usage}\``;
      }
      throw new Error(reply);
    }
    command.execute(bot, msg, args);
  } catch (error) {
    msg.channel.send(error.message);
  }
});
