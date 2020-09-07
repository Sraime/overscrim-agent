import { AkairoClient, ListenerHandler, AkairoModule } from "discord-akairo";
import { token, prefix, owners } from "../config/config";
import { Message } from "discord.js";
import { join } from "path";
import { DescribedCommandHandler } from "./command-helper";
import { CommandDescriber } from "./command-describer";
import { TimeArgumentParser } from "../argument-parsers/time-argument-parser";
import { ServiceHandler } from "./service-handler";
import { Service } from "./core-service";

export class OverScrimClient extends AkairoClient {
  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, "..", "listeners")
  });

  public serviceHandler: ServiceHandler = new ServiceHandler(this, {
    directory: join(__dirname, "..", "services")
  });

  public commandHandler: DescribedCommandHandler = new DescribedCommandHandler(
    this,
    {
      directory: join(__dirname, "..", "commands"),
      prefix: prefix,
      allowMention: false,
      handleEdits: false,
      commandUtil: true,
      commandUtilLifetime: 3e5,
      defaultCooldown: 6e4,
      argumentDefaults: {
        prompt: {
          modifyStart: (_: Message, str: string): string =>
            `$(str)\n\nTyp \`cancel\` to cancel the command`,
          modifyRetry: (_: Message, str: string): string =>
            `$(str)\n\nTyp \`cancel\` to cancel the command`,
          timeout: "You took too long, the command has now been cancelled...",
          ended:
            "You exceeded the maximum amount of tries, this command has now been cncelled",
          cancel: "This command has been cancelled",
          retries: 3,
          time: 3e4
        },
        otherwise: ""
      },
      ignorePermissions: owners
    }
  );

  public constructor() {
    super({ ownerID: owners });
  }

  private async _init(): Promise<void> {
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process
    });
    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
    this.serviceHandler.loadAll();
    this.commandHandler.resolver.addType("time", TimeArgumentParser);
  }

  public async start(): Promise<string> {
    await this._init();
    return this.login(token);
  }

  getCommandsInfo(): CommandDescriber[] {
    return this.commandHandler.modules.map(c => c.commandInfo);
  }

  getService(serviceClass: any): Service {
    const serviceInstance =
      typeof serviceClass === "function"
        ? this.serviceHandler.modules.get(serviceClass.name)
        : undefined;
    if (!serviceInstance)
      throw Error("Service " + serviceClass.name + " does not exist");
    return serviceClass;
  }
}
