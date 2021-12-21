import mongoose from "mongoose";

class Database {
  constructor() {
    this.connect();
  }

  async connect() {
    const isDevelopment = process.env.NODE_ENV === "development";
    const DB_URL = isDevelopment ? process.env.DB_URL : process.env.DB_URL;
    mongoose
      .connect(DB_URL)
      .then((val) => console.log("Successfully!!! Connected to DB"))
      .catch((err) => console.error(`Error: ${err}`));
  }
}

module.exports = new Database();
