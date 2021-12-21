import dotEnv from "dotenv";
import app from "./app";

// Configure Envirnoment Veriable
dotEnv.config({ path: "./.env" });

let port = process.env.PORT || 8000;
let envirnoment = process.env.NODE_ENV;

app.listen(port, console.log(`${envirnoment} server running on port:${port}`));

process.on("uncaughtException", (err) => {
  console.log("uncaught exception...");
  console.log(err);
  process.exit(1);
});
