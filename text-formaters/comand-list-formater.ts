import { CommandDescriber } from "../client/command-describer";
import { TextFormater } from "./text-formater";

export class CommandListFormater implements TextFormater {
  formatData(commands: CommandDescriber[]): string {
    const textLines: string[] = [];
    textLines.push("**Overscrim Agent - command lines information**");
    textLines.push("```Markdown");
    commands.forEach(command => {
      textLines.push(
        "!scrim-" +
          command.aliases[0] +
          " " +
          (command.description.usage || "") +
          " - " +
          command.description.content +
          ""
      );
    });
    textLines.push("```");
    return textLines.join("\n");
  }
}
