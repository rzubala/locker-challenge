import express from 'express';

import * as playerController from '../controllers/players'

const router = express.Router();

router.get('/players/:eventId/:playerName?', playerController.getPlayers);

export default router;