const BirdJournal = {
  logIdentification(birdName) {
    console.log(
      `Dear OSNA,

      I believe I heard a ${birdName} today while sitting outside
      my ex's apartment. Please accept me back into your organization. I've
      apologized for my behavior at last year's gala. What else can I do to
      earn your favor?

      Sincerely,
      Dillon B. Kemp`
    );
  },
  logFailure() {
    console.log(
      `Dearest Margaret,

      I'm sorry I've let my ornithological studies tear us apart. I've come to
      realize that I am an utter failure in the field. I want to work things out
      with you. Please take me back! I am living in the park across the street
      from your apartment. I'll be waiting for you there...

      Eternally Yours,
      Dilly`
    );
  }
};

module.exports = BirdJournal;
