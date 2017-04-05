// require classes
const Ornithologist = require("./Ornithologist");
const Bird = require("./Bird");

// construct Bird objects with names and patterns
let sparrow = new Bird("sparrow", [1, 1, 2, 1]);
let eagle = new Bird("eagle", [3, 4, 5, 6, 9]);
let dog = new Bird("sparrow", [6, 6, 6]);

// construct Ornithologist object with list of recognized patterns
const orn = new Ornithologist({
  sparrow: [1, 1, 2, 1],
  eagle: [3, 4, 5, 6, 9]
});

// attach listeners to Bird objects to console log notes
sparrow.on("chirp", note => console.log("sparrow:", note));
eagle.on("chirp", note => console.log("eagle:", note));
dog.on("chirp", note => console.log("dog:", note));

// have the Ornithologist listen to each bird to attempt identification
orn.listen(sparrow, (err, bird) => {
  console.log("This bird is a " + bird);
});

orn.listen(eagle, (err, bird) => {
  console.log("This bird is a " + bird);
});

orn.listen(dog, (err, bird) => {
  console.log(err.message);
});
