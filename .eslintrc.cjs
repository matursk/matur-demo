module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: null,
	},
	plugins: ['@typescript-eslint', 'react-refresh', 'react-hooks'],
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'prettier'],
	ignorePatterns: ['dist', 'node_modules'],
	rules: {
		'react-refresh/only-export-components': 'warn',
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
	},
};








