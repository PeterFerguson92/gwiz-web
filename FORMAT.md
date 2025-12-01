# Formatting & Linting

This project uses Prettier for code formatting and ESLint for linting + import sorting.

Recommended dev dependencies to install locally:

```bash
npm install --save-dev prettier eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  eslint-plugin-simple-import-sort eslint-plugin-import eslint-config-prettier eslint-plugin-prettier
```

Useful npm scripts (available in `package.json`):

- `npm run format` — format source files with Prettier
- `npm run format:check` — check formatting
- `npm run lint` — run ESLint
- `npm run lint:fix` — run ESLint and auto-fix problems

VS Code: install the Prettier and ESLint extensions. The workspace has `.vscode/settings.json` enabling format-on-save and using Prettier as the default formatter for TypeScript.

Notes:

- After installing the dev dependencies above, run `npm run lint` and `npm run format` to apply checks/fixes.
- Optionally add `husky` + `lint-staged` to run formatting and linting on pre-commit.
