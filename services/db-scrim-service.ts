import { ScrimService, ScrimsFilterOptions } from "./scrim-service";
import {
  CreateScrimRequest,
  ScrimRequest
} from "../models/scrim-request.model";
import { Service } from "../client/core-service";

export default class DbScrimService extends Service implements ScrimService {
  constructor() {
    super(DbScrimService.name);
  }
  getFilteredScrims(
    options: ScrimsFilterOptions
  ): Promise<import("../models/scrim-request.model").ScrimRequest[]> {
    throw new Error("Method not implemented.");
  }
  getOwnedScrims(discordId: string): Promise<ScrimRequest[]> {
    throw new Error("Method not implemented.");
  }
  createScrim(scrimData: CreateScrimRequest): Promise<ScrimRequest> {
    throw new Error("Method not implemented.");
  }
}
