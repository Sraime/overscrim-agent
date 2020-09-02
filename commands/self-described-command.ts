import { Command, CommandOptions } from "discord-akairo";
import { OverScrimClient } from "../client/client";
import { CommandDescriber } from "../client/command-describer";

export abstract class SelfDescribedCommand extends Command {
  commandInfo: CommandDescriber;
  client?: OverScrimClient;

  constructor(id: string, options: CommandOptions) {
    super(id, options);
    this.commandInfo = options as CommandDescriber;
  }
}
