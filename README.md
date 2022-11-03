# nestjs-app-template

This is a template for a Nest.js TypeScript project.

The following following tools have been configured:

- [Jest](https://www.npmjs.com/package/jest) for unit testing
- [ESLint](https://www.npmjs.com/package/eslint) for linting
- [Prettier](https://www.npmjs.com/package/prettier) for code formatting
- [ts-node](https://www.npmjs.com/package/ts-node) for running TypeScript code
- [TypeScript](https://www.npmjs.com/package/typescript) for TypeScript support

## Usage

### Install dependencies

```bash
npm ci
```

### Edit the code

You can edit the code in the `src` directory.
The entry point of your application is `src/main.ts`.

### Run the application in development mode

```bash
npm run dev
```

Note: The project uses [ts-node](https://www.npmjs.com/package/ts-node) to run TypeScript code on the fly.

### Build the application

```bash
npm run build
```

This will create a `dist` directory with the compiled code.

Note: The `dist` directory will mimic the main directory structure. All directories with TypeScript files will be recreated in the `dist` directory. In the default configuration those are `src` and `test`.

### Run the built application

To run with `NODE_ENV=development`:

```bash
npm run preview
```

To run with `NODE_ENV=production`:

```bash
npm run start
```

Note: This will command will fail if the application has not been built (no `dist` directory)!

### Test the application

Tests can be found in the `test` directory.
[Jest](https://www.npmjs.com/package/jest) is used to run and write the tests.

```bash
npm run jest-check
```

This will run the tests and also providing a tabular code coverage report.
An HTML code coverage report will be also generated in the `coverage` directory.

### Run the linter

```bash
npm run eslint-check
```

Note: The linter will return a non-zero exit code if there are any linting errors or warnings.

You can also try to automatically fix some of the errors and warnings by running:

```bash
npm run eslint-fix
```

### Run the formatter

```bash
npm run prettier-check
```

Formatting errors can be automatically fixed by running:

```bash
npm run prettier-fix
```

## CI Pipeline

The CI pipeline is configured in the `.github/workflows/ci.yml` file.
It consists of the following (run in parallel) jobs:

### ESLint check

```bash
npm run eslint-check
```

### Prettier check

```bash
npm run prettier-check
```

### Jest check

```bash
npm run jest-check
```

### npm audit check

```bash
npm run npm-audit-check
```

### Building the application

```bash
npm run build
```

You can later download the built application from the "Artifacts" tab of the GitHub Actions workflow.
