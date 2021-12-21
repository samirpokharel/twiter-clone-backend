import dotEnv from "dotenv";
import app from "./app";
import { connect } from "mongoose";
import "colors";

// Configure Envirnoment Veriable
dotEnv.config({ path: "./.env" });

// Datbase Connections..
const isDevelopment = process.env.NODE_ENV === "development";
const DB_URL = isDevelopment ? process.env.DB_URL_DEV : process.env.DB_URL;

connect(DB_URL)
  .then((val) => console.log("Successfully! Connected to DB...".bgGreen))
  .catch((err) => console.error(`Error: ${err}`.red));


// Server setup

let port = process.env.PORT || 8000;
let envirnoment = process.env.NODE_ENV;

app.listen(port, console.log(`${envirnoment} server running on port:${port}`));

process.on("uncaughtException", (err) => {
  console.log("uncaught exception...");
  console.log(err);
  process.exit(1);
});
