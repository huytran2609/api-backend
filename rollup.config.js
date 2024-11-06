import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import cleanup from "rollup-plugin-cleanup";
import { folderInput } from "rollup-plugin-folder-input";

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: [
      "./src/app.ts",
      // './src/*.(ts|js)',
      "./src/threads/*.(ts|js)",
      // './src/controllers/admin/data/reportworker.ts',
      // './src/controllers/admin/data/collectionworker.ts',
    ],
    output: {
      dir: production ? "dist" : "out",
      format: "esm",
      preserveModules: production ? false : true,
    },

    plugins: [
      folderInput(),
      json(),
      typescript({}),
      production &&
        cleanup({ comments: "istanbul", extensions: ["js", "ts"] }),
    ],
  },
];
