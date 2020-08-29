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
const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "List all commands or info about a specific command.",
  usage: "<command name>",
  execute(bot, message, args) {
    // inside a command, event listener, etc.
    const embed = {
      color: 0xeb2ad1,
      title: "OverScrim - Command helper",
      fields: [],
      footer: {
        text: "https://github.com/Sraime/overscrim-agent",
      },
    };
    bot.commands.forEach((element) => {
      embed.fields.push({
        name: "**!scrim-" + element.name + "** " + element.usage,
        value: "*" + element.description + "*",
      });
    });
    message.channel.send({ embed });
  },
};
