const EventEmitter = require("events");

const PATIENCE_LEVEL = 10;

class ListeningSession extends EventEmitter {
  constructor(analyze, bird) {
    super();
    this.analyze = analyze;
    this.bird = bird;
    this.pattern = [];
    this.resetDeathTimer();
    bird.on("chirp", this.handleChirp.bind(this));
  }
  handleChirp(note) {
    this.resetDeathTimer();
    this.pattern.push(note);
    let birdName = this.analyze(this.pattern);

    if (birdName) {
      this.success(birdName);
    } else if (this.pattern.length > PATIENCE_LEVEL) {
      this.failure();
    }
  }
  success(birdName) {
    this.emit("identification", birdName);
    this.complete();
  }
  failure() {
    this.emit(
      "error",
      new Error("I do not recognize this bird. I am a failure.")
    );
    this.complete();
  }
  complete() {
    clearTimeout(this.timer);
    this.bird.removeAllListeners("chirp");
  }
  resetDeathTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => {
        this.emit(
          "error",
          new Error(
            "I'm not sure what that bird was, but I think it's dead now."
          )
        );
      },
      4000
    );
  }
}

module.exports = ListeningSession;
