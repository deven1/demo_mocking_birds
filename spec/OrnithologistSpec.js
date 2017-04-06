const Ornithologist = require("../src/Ornithologist");

describe("Ornithologist", () => {
  let ornithologist, mockBird, mockBrain, spyJournal;

  describe("#listen", () => {
    beforeEach(() => {
      mockBird = {
        name: "Birdy",
        on: (name, cb) => {
          this.cb = cb;
        },
        chirp: val => {
          this.cb(val);
        },
        removeAllListeners: () => {
          this.cb = () => {};
        }
      };

      mockBrain = {
        getPatterns() {
          return { Birdy: [1, 2] };
        }
      };

      spyJournal = {
        logFailure() {},
        logIdentification() {
          console.log("HEY");
        }
      };

      spyOn(spyJournal, "logIdentification");
      spyOn(spyJournal, "logFailure");

      ornithologist = new Ornithologist({
        brain: mockBrain,
        journal: spyJournal
      });
    });

    it("identifies the bird", done => {
      ornithologist.listen(mockBird, (err, birdName) => {
        expect(birdName).toEqual("Birdy");
        expect(spyJournal.logIdentification).toHaveBeenCalled();
        done();
      });

      mockBird.chirp(1);
      mockBird.chirp(2);
    });

    it("returns an error if it cannot identify the pattern after 10 chirps", done => {
      ornithologist.listen(mockBird, (err, birdName) => {
        expect(err.message).toEqual(
          "I do not recognize this bird. I am a failure."
        );
        expect(spyJournal.logFailure).toHaveBeenCalled();
        done();
      });

      for (var i = 0; i < 11; i++) {
        mockBird.chirp("woof");
      }
    });

    it("returns an error if it cannot identify the pattern and the bird stops chirping", done => {
      ornithologist.listen(mockBird, (err, birdName) => {
        expect(err.message).toEqual(
          "I'm not sure what that bird was, but I think it's dead now."
        );
        expect(spyJournal.logFailure).toHaveBeenCalled();
        done();
      });

      for (var i = 0; i < 2; i++) {
        mockBird.chirp("woof");
      }
    });
  });
});
