const getGender = require("./getGender");

const r = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

r.question("What is your name? ", (name) => {
  try {
    getGender(name).then((resp) =>
      resp?.gender
        ? console.log(`${name} is ${resp.gender}`)
        : console.log("Please try again")
    );
    r.close();
  } catch (error) {
    return error;
  }
});
