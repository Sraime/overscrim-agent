const Discord = require("discord.js");

module.exports = {
  name: "info",
  description: "Get bot information",
  parameters: [],
  execute(bot, message, args, isWelcome = false) {
    // inside a command, event listener, etc.
    const embed = {
      color: 0x9b59a3,
      title: "OverScrim - Bot information",
      author: {
        name: "By Heaven",
        url: "https://github.com/Sraime/overscrim-agent"
      },
      fields: [
        {
          name: "Get help",
          value: "!scrim-help"
        },
        {
          name: "Join our discord",
          value: "https://discord.gg/5mCAbxG"
        },
        {
          name: "Invite the bot in your server",
          value:
            "https://discord.com/api/oauth2/authorize?client_id=748944287684886670&permissions=65536&scope=bot"
        },
        {
          name: "Source code url",
          value: "https://github.com/Sraime/overscrim-agent"
        }
      ],
      timestamp: new Date(),
      footer: {
        text: "Version Bêta-1"
      }
    };
    if (isWelcome) {
      message.send({ embed });
    } else {
      message.channel.send({ embed });
    }
  }
};
