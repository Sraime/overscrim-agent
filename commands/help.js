// module.exports = (bot, msg) => {
//   msg.channel.send(`!scrim-help\tget help
// !scrim-publish\tget help
// !scrim-find [EU|NA] [PC|SWITCH] [SR] HH:MM
// !scrim-request\tget help
// !scrim-cancel\tget help
// !scrim-newTime\tget help
// !scrim-agenda\tget help
// !scrim-hystory\tget help
// !scrim-setreminder\tget help
// !scrim-accept\tget help`);
// };

module.exports = {
  name: "help",
  description: "List all commands or info about a specific command.",
  usage: "<command>",
  execute(bot, message, args) {
    // inside a command, event listener, etc.
    const commands = [];
    commands.push("**Overscrim Agent - command lines information**");
    commands.push("```Markdown");
    bot.commands.forEach((command) => {
      commands.push(
        "!scrim-" +
          command.name +
          " " +
          (command?.usage || "") +
          " - " +
          command.description +
          ""
      );
    });
    commands.push("```");
    message.channel.send(commands.join("\n"));
  },
};
