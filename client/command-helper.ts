import { CommandHandler, CommandHandlerOptions } from "discord-akairo";
import { Collection } from "discord.js";
import { SelfDescribedCommand } from "../commands/self-described-command";
import { OverScrimClient } from "./client";

export class DescribedCommandHandler extends CommandHandler {
  public modules: Collection<string, SelfDescribedCommand>;
  constructor(client: OverScrimClient, options: CommandHandlerOptions) {
    super(client, options);
    this.modules = new Collection();
  }
}
