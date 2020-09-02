import mongoose from "mongoose";

export class MongooseConnector {
  constructor(
    private host: string,
    private port: number,
    private dbName: string
  ) {}

  public connect() {
    mongoose
      .connect("mongodb://" + this.host + ":" + this.port + "/" + this.dbName, {
        useNewUrlParser: true,
      })
      .then(() => {
        return console.info(`Successfully connected`);
      })
      .catch((error) => {
        console.error("Error connecting to database: ", error);
        return process.exit(1);
      });
  }
}
