import {
  ScrimRequest,
  CreateScrimRequest
} from "../models/scrim-request.model";
import { Platform } from "../models/platform-enum";
import { Region } from "../models/region-enum";

export interface ScrimsFilterOptions {
  region: Region;
  platform: Platform;
  srmin: number;
  srmax: number;
  date: Date;
}

export interface ScrimService {
  getFilteredScrims(options: ScrimsFilterOptions): Promise<ScrimRequest[]>;
  getOwnedScrims(discordId: string): Promise<ScrimRequest[]>;
  createScrim(scrimData: CreateScrimRequest): Promise<ScrimRequest>;
}
