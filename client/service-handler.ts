import { AkairoHandler, AkairoClient } from "discord-akairo";
import { Collection } from "discord.js";
import { Service } from "./core-service";

export interface ServiceHandlerOptions {
  directory: string;
}
export class ServiceHandler extends AkairoHandler {
  public modules: Collection<string, Service>;
  constructor(client: AkairoClient, options: ServiceHandlerOptions) {
    super(client, options);
    this.modules = new Collection();
  }
}
