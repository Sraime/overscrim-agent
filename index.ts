import { OverScrimClient } from "./client/client";
import { MongooseConnector } from "./mongoose-connector";
import { db } from "./config/config";

const dbConnector: MongooseConnector = new MongooseConnector(
  db.host,
  db.port,
  db.name
);
dbConnector.connect()
const client = new OverScrimClient();
client.start();
