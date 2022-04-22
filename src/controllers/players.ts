import { Request, Response, NextFunction } from "express";
import { retrieveResults } from '../dao/playerEventResult'
import { RequestParams, RequestQuery } from "../models/controllerTypes";

const asNumber = (input: string | undefined): number | undefined => input ? +input : undefined

export const getPlayers = async (req: Request<RequestParams, {}, {}, RequestQuery>, res: Response, next: NextFunction) => {
  const eventId = req.params.eventId
  const playerName = req.params.playerName
  const limit = asNumber(req.query.limit);
  const skip = asNumber(req.query.skip);
  const sortColumn = asNumber(req.query.sort);
  const sortDirection = req.query.dir;

  try {
    const results = await retrieveResults(eventId, playerName, limit, skip, sortColumn, sortDirection)
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};
