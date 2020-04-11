module.exports = {
    extends: ['plugin:prettier/recommended', 'plugin:react/recommended'],
    parser: 'babel-eslint',
    plugins: ['prettier', 'react-hooks'],
    env: {
        browser: true,
        node: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                trailingComma: 'all',
                tabWidth: 2,
                jsxBracketSameLine: false,
            },
        ],
        semi: 2,
        'no-console': 1,
        'no-unused-vars': 1,
        'react/prop-types': 0,
        'react/display-name': 0,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
};
