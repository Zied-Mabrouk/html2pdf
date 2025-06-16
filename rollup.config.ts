import type { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

import pkg from "./package.json" with { type: "json" };

const config: RollupOptions = {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "esm",
    },
  ],
  plugins: [
    resolve({
      // pass custom options to the resolve plugin
      moduleDirectories: ["node_modules"],
    }),
    typescript({ tsconfig: "./tsconfig.json" }),
    json(),
  ],
};

export default config;