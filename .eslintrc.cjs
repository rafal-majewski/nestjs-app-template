module.exports = {
	root: true,
	overrides: [
		{
			files: ["*.ts"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: __dirname,
				sourceType: "module",
				ecmaVersion: 13,
			},
			extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
			plugins: ["@typescript-eslint"],
			rules: {
				"no-empty-function": "off",
				"@typescript-eslint/no-empty-function": "off",
			},
			env: {
				es2022: true,
				node: true,
			},
		},
		{
			files: ["*.test.ts"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: __dirname,
				sourceType: "module",
				ecmaVersion: 13,
			},
			extends: [
				"eslint:recommended",
				"plugin:@typescript-eslint/recommended",
				"plugin:jest/recommended",
				"prettier",
			],
			plugins: ["@typescript-eslint", "jest"],
			rules: {
				"no-empty-function": "off",
				"@typescript-eslint/no-empty-function": "off",
			},
			env: {
				es2022: true,
				node: true,
			},
		},
		{
			files: ["*.js", "*.cjs", "*.mjs"],
			parser: "espree",
			parserOptions: {
				ecmaVersion: 13,
				sourceType: "module",
			},
			extends: ["eslint:recommended", "prettier"],
			rules: {
				"no-empty-function": "off",
			},
			env: {
				es2022: true,
				node: true,
			},
		},
		{
			files: ["*.test.js", "*.test.cjs", "*.test.mjs"],
			parser: "espree",
			parserOptions: {
				ecmaVersion: 13,
				sourceType: "module",
			},
			extends: ["eslint:recommended", "plugin:jest/recommended", "prettier"],
			plugins: ["jest"],
			rules: {
				"no-empty-function": "off",
			},
			env: {
				es2022: true,
				node: true,
			},
		},
	],
};
