const Discord = require("discord.js");

module.exports = {
  name: "info",
  description: "Get bot information",
  execute(bot, message, args) {
    // inside a command, event listener, etc.
    const embed = {
      color: 0xeb2ad1,
      title: "OverScrim - Bot information",
      author: {
        name: "By Heaven",
        url: "https://github.com/Sraime/overscrim-agent",
      },
      fields: [
        {
          name: "Join our discord",
          value: "https://discord.gg/5mCAbxG",
        },
        {
          name: "Invite the bot in your server",
          value:
            "https://discord.com/api/oauth2/authorize?client_id=748944287684886670&permissions=65536&scope=bot",
        },
        {
          name: "Source code url",
          value: "https://github.com/Sraime/overscrim-agent",
        },
      ],
      timestamp: new Date(),
    };
    message.channel.send({ embed });
  },
};
