import { Platform } from "../models/platform-enum";
import { Region } from "../models/region-enum";
import { ScrimRequest } from "../models/scrim-request.model";
import ScrimRequestModel from "../models/scrim-request.model";

export interface ScrimsFilterOptions {
  region: Region;
  platform: Platform;
  srmin: number;
  srmax: number;
  date: Date;
}

export abstract class ScrimService {
  static getFilteredScrims(
    options: ScrimsFilterOptions
  ): Promise<ScrimRequest[]> {
    var end = new Date(options.date);
    end.setHours(23, 59, 59, 99);
    return ScrimRequestModel.find({
      region: options.region,
      platform: options.platform,
      $and: [
        { srmin: { $lte: options.srmin } },
        { srmax: { $gte: options.srmax } },
      ],
      datetime: {
        $gte: options.date.toISOString(),
        $lte: end.toISOString(),
      },
    }).exec();
  }
}
