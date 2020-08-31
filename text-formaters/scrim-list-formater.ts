import { ScrimRequest } from "../models/scrim-request.model";
import { EnglishDatetimeFormater } from "./english-datetime-formater";
import { TextFormater } from "./text-formater";

export class ScrimListFormater implements TextFormater {
  formatData(scrims: ScrimRequest[]): string {
    if (scrims.length == 0) {
      return `No scrim registered`;
    }
    const scrimsRender = [];
    const dateFormater = new EnglishDatetimeFormater();
    scrims.forEach((scrim) => {
      scrimsRender.push(
        `Team **${scrim.teamName}** - ${scrim.region}, ${scrim.platform}, ${
          scrim.srmin
        }-${scrim.srmax}, ${dateFormater.formatData(
          scrim.datetime
        )} - status: ${
          scrim.validatedCandidate
            ? scrim.validatedCandidate
            : scrim.candidates.length > 0
            ? scrim.candidates.length +
              "candidated (" +
              scrim.candidates.join(",") +
              ")"
            : "Waiting candidates - id " + scrim._id
        }`
      );
    });
    scrimsRender.push(
      "**Candidate to a scrim with `!scrim-candidate <ID>` or publish  yours with `!scrim-publish NA PS4 100 500 2020-03-28 <HH:MM> <TEAMNAME>`**"
    );
    return scrimsRender.join("\n");
  }
}
