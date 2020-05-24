const ncp = require("ncp").ncp;
const source = "./build";
const destination = "./../server/build/";

ncp.limit = 16;

/**
 * Copy the build folder from the client to the server
 * for deployment
 */
ncp(source, destination, function (err) {
    if (err) {
        return console.error(err);
    }
});
