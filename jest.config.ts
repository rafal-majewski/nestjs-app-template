import type {JestConfigWithTsJest} from "ts-jest";

const config: JestConfigWithTsJest = {
	preset: "ts-jest/presets/default",
	moduleNameMapper: {
		"^(.*)\\.js$": ["$1.ts", "$1.js"],
	},
	coverageDirectory: "coverage_report",
	rootDir: ".",
	testRegex: ["\\.test\\.ts$", "\\.test\\.js$"],
	testPathIgnorePatterns: [
		"/node_modules/",
		"/dist/",
		"/coverage_report/",
		"/.vscode/",
		"/.git/",
		"/.github/",
	],
};

export default config;
