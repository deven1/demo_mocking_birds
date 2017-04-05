const EventEmitter = require("events");

class Bird extends EventEmitter {
  constructor(name, pattern) {
    super();
    this.name = name;
    this.pattern = pattern;
    this.index = 0;
  }
  chirp() {
    let note = this.pattern[this.index];

    this.emit("chirp", note);

    this.index++;
    if (this.index === this.pattern.length) {
      this.index = 0;
    }
  }
  sing() {
    setTimeout(
      () => {
        this.chirp();
        this.sing();
      },
      300
    );
  }
}

module.exports = Bird;
