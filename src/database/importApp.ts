import path from "path";
import fs from "fs";
import jsonStream from "jsonstream";
import { JsonCompetitor } from "../models/jsonTypes";
import ImportController from "./controllers/pgImportController";
import Player from "../models/player";
import Event from "../models/event"
import PlayerEventResultRound from "../models/playerEventResultRound";
import PlayerEventResult from "../models/playerEventResult";
import AbstractImportController from "./controllers/abstractController";

const inputJsonFile = path.join(__dirname, "..", "..", "data", "challenge.json");
const competitorsJsonPath = "events.0.competitions.0.competitors.*";

const importController: AbstractImportController = new ImportController()

const jsonFileStream = fs.createReadStream(inputJsonFile, { encoding: "utf8" });
const jsonStreamData = jsonStream.parse(competitorsJsonPath);

const event = new Event(0, "Waste Management Phoenix Open");
importController.addEvent(event)

jsonStreamData.on("data", (data: Partial<JsonCompetitor>) => {
  importController.addPlayer(Player.from(data.athlete));
  importController.addPlayerEventResult(PlayerEventResult.from(event, data))
  importController.addPlayerEventResultRounds(PlayerEventResultRound.from(event, data))
});

jsonStreamData.on("error", (error: Error) => {
  console.error("Import failed")
  console.error(error.message)
})

jsonStreamData.on("end", () => {
  importController.storeData();
});

jsonFileStream.pipe(jsonStreamData);
