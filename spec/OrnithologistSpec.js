const Ornithologist = require("../src/Ornithologist");
describe("Ornithologist", () => {
  let ornithologist;
  describe("#listen", () => {
    beforeEach(() => {
      ornithologist = new Ornithologist();
    });
    it("identifies the bird", done => {
      let mockBird = {
        name: "Birdy",
        on: (name, cb) => {
          this.cb = cb;
        },
        chirp: val => {
          this.cb(val);
        },
        removeAllListeners: () => {}
      };

      ornithologist.listen(mockBird, (err, birdName) => {
        expect(birdName).toEqual("Birdy");
        done();
      });

      mockBird.chirp(1);
      mockBird.chirp(1);
      mockBird.chirp(2);
      mockBird.chirp(1);
    });
  });
});
