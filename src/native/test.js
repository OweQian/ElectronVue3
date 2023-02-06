let native = require("./build/Release/addon.node");
let paths = native.readFilePaths();
console.log(paths);
