import Fuse from "fuse.js";
let searchPattern = "A";
const fuseOptions = {
  threshold: 0.5,
  keys: ["text"],
};
const fuse = new Fuse(["Aos", " Akash"], fuseOptions);
console.log(`Checking for: ${searchPattern} \n`);
let matches = fuse.search(searchPattern);
console.log(`Found: ${JSON.stringify(matches)}`);
