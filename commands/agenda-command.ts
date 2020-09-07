import { Message } from "discord.js";
import { DbScrimService } from "../services/scrim-service/db-scrim-service";
import { CommandListFormater } from "../text-formaters/comand-list-formater";
import { ScrimListFormater } from "../text-formaters/scrim-list-formater";
import { SelfDescribedCommand } from "./self-described-command";

export default class AgendaCommand extends SelfDescribedCommand {
  public constructor() {
    super("agenda", {
      aliases: ["agenda"],
      category: "Public Commands",
      description: {
        content: "Get my registered scrims.",
        usage: "agenda",
        example: ["agenda"]
      },
      ratelimit: 3
    });
  }

  async exec(message: Message, args: any): Promise<Message> {
    if (!message.util || !this.client) throw new Error("undefined options");
    const scrims = await DbScrimService.getOwnedScrims(message.author.id);
    const formater = new ScrimListFormater();
    return message.util.send(formater.formatData(scrims));
  }
}
