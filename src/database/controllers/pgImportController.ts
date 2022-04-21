import pool from "../dbpool";
import Player from "../../models/player";
import PlayerEventResult from "../../models/playerEventResult";
import PlayerEventResultRound from "../../models/playerEventResultRound";
import * as playerDao from "../../dao/player";
import * as eventDao from "../../dao/event";
import * as playerEventResultDao from '../../dao/playerEventResult'
import * as playerEventResultRoundDao from '../../dao/playerEventResultRound'
import AbstractImportController from "./abstractController";

export default class PGImportController extends AbstractImportController {
    storeData = async () => {
        const client = await pool.connect();
        try {
          await client.query("BEGIN");
      
          await eventDao.save(client, this.event)
      
          await Promise.all(this.players.map(async (player: Player) => {
              return await playerDao.save(client, player)
          }));
      
          await Promise.all(this.playerEventResults.map(async (playerEventResult: PlayerEventResult) => {
              return await playerEventResultDao.save(client, playerEventResult);
          }))

          await Promise.all(this.playerEventResultRounds.map(async (playerEventResultRound: PlayerEventResultRound) => {
            return await playerEventResultRoundDao.save(client, playerEventResultRound);
          }))

          await client.query("COMMIT");   

          console.log('Data imported succesfully')

        } catch (e) {
          await client.query("ROLLBACK");
          console.error(e)
        } finally {
          client.release();
          process.exit()
        }
      };    
}