import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class InfoCommand extends Command {
  public constructor() {
    super("info", {
      aliases: ["info"],
      category: "Public Commands",
      description: {
        content: "Get information about this bot.",
        usage: "info",
        example: ["info"],
      },
      ratelimit: 3,
    });
  }

  exec(message: Message): Promise<Message> {
    if (!message.util) throw new Error("undefined options");
    const embed = {
      color: 0x9b59a3,
      title: "OverScrim - Bot information",
      author: {
        name: "By Heaven",
        url: "https://github.com/Sraime/overscrim-agent",
      },
      fields: [
        {
          name: "Get help",
          value: "!scrim-help",
        },
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
      footer: {
        text: "Version Bêta-1",
      },
    };
    return message.util.send({ embed });
  }
}
