import { Message } from "discord.js";
import { Platform } from "../models/platform-enum";
import { Region } from "../models/region-enum";
import { CommandListFormater } from "../text-formaters/comand-list-formater";
import { SelfDescribedCommand } from "./self-described-command";

const regionList = Object.values(Region);
const platformList = Object.values(Platform);

export default class HelpCommand extends SelfDescribedCommand {
  public constructor() {
    super("help", {
      aliases: ["help"],
      category: "Public Commands",
      description: {
        content: "Get the list of available commands.",
        usage: "help",
        example: ["help"]
      },
      ratelimit: 3
    });
  }

  async exec(message: Message, args: any): Promise<Message> {
    if (!message.util || !this.client) throw new Error("undefined options");
    const commandListFormater = new CommandListFormater();
    return message.util.send(
      commandListFormater.formatData(this.client.getCommandsInfo())
    );
  }
}
