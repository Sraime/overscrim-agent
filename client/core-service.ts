import { OverScrimClient } from "./client";
import { AkairoModule } from "discord-akairo";

export abstract class Service extends AkairoModule {
  client?: OverScrimClient;
}
