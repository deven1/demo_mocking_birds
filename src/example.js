const Ornithologist = require("./ornithologist");
const Bird = require("./Bird");

let sparrow = new Bird("sparrow", [1, 1, 2, 1]);
let eagle = new Bird("eagle", [3, 4, 5, 6, 9]);
let dog = new Bird("sparrow", [6, 6, 6]);

dog.on("chirp", note => console.log(note));

// sparrow.sing();
dog.sing();
// eagle.sing();

// Ornithologist.listen(sparrow, (err, bird) => {
//   console.log("This bird is a " + bird);
// });
//
// Ornithologist.listen(eagle, (err, bird) => {
//   console.log("This bird is a " + bird);
// });

Ornithologist.listen(dog, (err, bird) => {
  console.log(err);
});
