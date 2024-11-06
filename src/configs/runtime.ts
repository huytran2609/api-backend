import fs from "fs";
import util from "util";
import path from "path";

export const initRuntime = () => {
  process.on("uncaughtException", (err) => {
    console.log(err);
  });

  const logFile = fs.createWriteStream(path.join("./debug.log"), {
    flags: "a",
  });
  const logStdout = process.stdout;

  console.log = function (d: any) {
    // eslint-disable-next-line prefer-rest-params
    logFile.write(
      // eslint-disable-next-line prefer-rest-params
      `${new Date().toISOString()} ${util.format.apply(null, arguments as any)} \n`
    );
    new this.Console(logStdout).log(d);
  };

  console.error = (d: any) => {
    console.log(d);
  };
  console.warn = (d: any) => {
    console.log(d);
  };
  console.info = (d: any) => {
    console.log(d);
  };
};
