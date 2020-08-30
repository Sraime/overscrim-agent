const Utils = require("../tools/utils");

const MessageHandler = bot => {
  return msg => {
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
      const command = bot.commands.filter(c => c.name === commandKey)[0];
      if (!command) {
        throw new Error("Invalid command");
      }
      Utils.validateParams(command, args);
      command.execute(bot, msg, args);
    } catch (error) {
      console.error(error);
      msg.channel.send(error.message);
    }
  };
};

module.exports = MessageHandler;
