export interface CommandDescriber {
  aliases: string[];
  description: CommandDescription;
  args: ArgumentDescription[];
}

interface CommandDescription {
  content: string;
  usage: string;
  example: string[];
}

interface ArgumentDescription {
  id: string;
  type: string;
}
