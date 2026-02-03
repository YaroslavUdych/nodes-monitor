import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default [
	// what to ignore
	{
		ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.turbo/**', '**/coverage/**'],
	},

	// base rules for JavaScript
	js.configs.recommended,

	// base rules for TypeScript
	...tseslint.configs.recommended.map((config) => ({
		...config,
		languageOptions: {
			...config.languageOptions,
			parserOptions: {
				...config.languageOptions?.parserOptions,
				tsconfigRootDir: __dirname,
			},
		},
	})),

	// common rules for all code
	{
		plugins: {
			import: importPlugin,
		},
		rules: {
			'no-console': 'off', // only for MVP, can be enabled in production
			'no-debugger': 'warn',

			// TS: usually better
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'warn',

			// imports
			'import/no-duplicates': 'warn',
			'import/order': [
				'warn',
				{
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
		},
	},

	// Backend: Node environment
	{
		files: ['packages/backend/**/*.{ts,tsx,js}'],
		languageOptions: {
			globals: globals.node,
		},
		rules: {
			// if needed — can add node-specific rules
		},
	},

	// Frontend: Browser + React
	{
		files: ['packages/frontend/**/*.{ts,tsx}'],
		languageOptions: {
			globals: globals.browser,
		},
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
			'jsx-a11y': jsxA11yPlugin,
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			// React 17+ JSX runtime — no need to import React
			'react/react-in-jsx-scope': 'off',

			// Hooks rules
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
		},
	},
]
