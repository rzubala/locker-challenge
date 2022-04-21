import express, {NextFunction, Request, Response} from "express";
import cors from "cors";
import { PoolClient } from "pg";
import pool from "./database/dbpool";
import playersRouter from "./routes/players";

const port = process.env.PORT || 3000;

const server = express();
server.use(cors());
server.use(express.json());
server.use(playersRouter);

server.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    const status = 500
    const message = '[Locker] An internal error occured'    
    res.status(status).json({message: message})
})

pool
  .connect()
  .then((client: PoolClient) => {
    server.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
    client.release()
  })
  .catch((err: Error) => {
    console.log("Could not connect to database");
    console.error(err);
  });