import type {JestConfigWithTsJest} from "ts-jest";

const config: JestConfigWithTsJest = {
	preset: "ts-jest/presets/js-with-ts",
	coverageDirectory: "coverage",
	rootDir: ".",
	testRegex: ["\\.test\\.ts$", "\\.test\\.js$"],
	testPathIgnorePatterns: [
		"/node_modules/",
		"/dist/",
		"/coverage/",
		"/.vscode/",
		"/.git/",
		"/.github/",
	],
};

export default config;
