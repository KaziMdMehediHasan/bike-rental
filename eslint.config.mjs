import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from '@eslint/js'

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,

    // eslint.config.js
    {
        languageOptions: {
            globals: {
                ...globals.node
            }
        }
    },
    {
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "prefer-const": "error",
            "no-console": "warn",
        }
    },
    {
        ignores: ["**/node_modules/", "dist/"]
    }
);