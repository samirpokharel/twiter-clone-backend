import { randomInt } from "crypto";

exports.generateFromEmail = (email) => {
  const nameParts = email.replace(/@.+/, "");
  const name = nameParts.replace(/[&/\\#,+()$~%._@'":*?<>{}]/g, "");
  return name + randomInt(10000, 90000).toString();
};
