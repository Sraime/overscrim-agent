require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const mongoose = require("mongoose");
const MessageHandler = require("./handlers/message-handler");
const GuildJoinHandler = require("./handlers/guild-join-handler");
const GuildLeaveHandler = require("./handlers/guild-leave-handler");
const ServerReadyHandler = require("./handlers/server-ready-handler");

let commands = [
  require("./commands/find"),
  require("./commands/publish"),
  require("./commands/help"),
  require("./commands/info"),
  require("./commands/agenda"),
  require("./commands/propose")
];

const mongoDB = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => {
    console.log("Connection to database has been established successfully.");
  })
  .catch(err => {
    console.error(err);
    logger.log({
      level: "info",
      message: `Unable to connect to the database ${err}`
    });
  });

bot.login(TOKEN);
bot.commands = commands;

bot.on("ready", ServerReadyHandler(bot));

bot.on("guildCreate", GuildJoinHandler(bot));

bot.on("guildDelete", GuildLeaveHandler(bot));

bot.on("message", MessageHandler(bot));
