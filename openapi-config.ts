import type { ConfigFile } from "@rtk-query/codegen-openapi";

const apiUrl = "https://api.forecapp.link";
// TODO: make it work with process.env.NEXT_PUBLIC_API_URL

const config: ConfigFile = {
  schemaFile: `${apiUrl}/openapi.json`,
  apiFile: "./src/store/emptyApi.ts",
  apiImport: "emptySplitApi",
  outputFile: "./src/store/api.ts",
  exportName: "api",
  hooks: true,
};

export default config;
