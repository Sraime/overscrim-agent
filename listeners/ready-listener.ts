import { Listener } from "discord-akairo";

export default class ReadyListener extends Listener {
  public constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
      category: "client"
    });
  }

  exec(msg: any): void {
    if (!this.client.user) throw new Error("null User");
    console.log(this.client.user.tag + " is ready");
  }
}
