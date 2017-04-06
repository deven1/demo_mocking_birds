const BirdBrain = require("./BirdBrain");
const BirdJournal = require("./BirdJournal");
const ListeningSession = require("./ListeningSession");

class Ornithologist {
  constructor({ brain = BirdBrain, journal = BirdJournal } = {}) {
    this.patterns = brain.getPatterns();
    this.journal = journal;
  }
  listen(bird, cb) {
    let session = new ListeningSession(this.analyze.bind(this), bird);

    session.on("identification", birdName => {
      this.journal.logIdentification(birdName);
      cb(null, birdName);
    });

    session.on("error", error => {
      this.journal.logFailure();
      cb(error);
    });
  }
  analyze(pattern) {
    for (var bird in this.patterns) {
      if (arraysMatch(pattern, this.patterns[bird])) {
        return bird;
      }
    }
    return false;
  }
}

const arraysMatch = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  return arr1.reduce(
    (memo, el, idx) => {
      if (el === arr2[idx]) {
        return memo;
      } else {
        return false;
      }
    },
    true
  );
};

module.exports = Ornithologist;
