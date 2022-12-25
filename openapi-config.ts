import type { ConfigFile } from "@rtk-query/codegen-openapi";

const apiUrl = "https://api.forecapp.link";
// TODO: make it work with process.env.NEXT_PUBLIC_API_URL

const config: ConfigFile = {
  schemaFile: `${apiUrl}/openapi.json`,
  apiFile: "./src/store/emptyApi.ts",
  apiImport: "emptySplitApi",
  outputFile: "./src/store/forecappApi.ts",
  exportName: "forecappApi",
  hooks: true,
};

export default config;
