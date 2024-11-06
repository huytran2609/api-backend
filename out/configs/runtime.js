import fs from 'fs';
import util from 'util';
import path from 'path';

const initRuntime = () => {
    process.on("uncaughtException", (err) => {
        console.log(err);
    });
    const logFile = fs.createWriteStream(path.join("./debug.log"), {
        flags: "a",
    });
    const logStdout = process.stdout;
    console.log = function (d) {
        // eslint-disable-next-line prefer-rest-params
        logFile.write(
        // eslint-disable-next-line prefer-rest-params
        `${new Date().toISOString()} ${util.format.apply(null, arguments)} \n`);
        new this.Console(logStdout).log(d);
    };
    console.error = (d) => {
        console.log(d);
    };
    console.warn = (d) => {
        console.log(d);
    };
    console.info = (d) => {
        console.log(d);
    };
};

export { initRuntime };
