const ncp = require('ncp').ncp;

const source = "./build";
const destination = "./../server/build/";

ncp.limit = 16;

ncp(source, destination, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log("done!");
});

console.log("FINISHED POST BUILD");
