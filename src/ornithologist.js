const BirdBrain = require("./BirdBrain");

class Ornithologist {
  constructor() {
    this.patterns = BirdBrain.getPatterns();
  }
  listen(bird, cb) {
    let pattern = [];

    bird.on("chirp", sound => {
      pattern.push(sound);
      let birdName = this.analyze(pattern);

      if (birdName) {
        cb(null, birdName);
        this.pattern = [];
        bird.removeAllListeners("chirp");
      } else {
        if (pattern.length > 10) {
          cb(new Error("I do not recognize this bird. I am a failure."));
          this.pattern = [];
          bird.removeAllListeners("chirp");
        }
      }
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
