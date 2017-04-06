const Bird = require("../src/Bird");

describe("Bird", () => {
  var bird;

  beforeEach(() => {
    bird = new Bird("greg", [1, 2]);
  });

  describe("#chirp", () => {
    it("emits the next note in its pattern", done => {
      bird.once("chirp", note => {
        expect(note).toEqual(1);
        done();
      });

      bird.chirp();
    });
  });

  describe("#sing", () => {
    it("repeats its pattern", done => {
      let count = 0;

      bird.on("chirp", note => {
        count++;
        switch (count) {
          case 1:
            expect(note).toEqual(1);
            break;
          case 2:
            expect(note).toEqual(2);
            break;
          case 3:
            expect(note).toEqual(1);
            done();
            break;
          default:
        }
      });

      bird.chirp();
      bird.chirp();
      bird.chirp();
    });
  });
});
