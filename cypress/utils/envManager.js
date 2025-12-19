const dev = require("../../config/dev.config");
const qa = require("../../config/qa.config");
const prod = require("../../config/prod.config");

const envMap = { dev, qa, prod };

export const getEnvConfig = (env = "qa") => envMap[env];
