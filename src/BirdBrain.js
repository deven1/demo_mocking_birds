const fs = require("fs");

const BirdBrain = {
  getPatterns() {
    const patterns = fs.readFileSync(__dirname + "/../server/patterns.json");
    return JSON.parse(patterns);
  }
};

module.exports = BirdBrain;
