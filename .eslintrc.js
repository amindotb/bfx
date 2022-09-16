module.exports = {
    root: true,
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 8,
        requireConfigFile: false,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            sourceType: 'module',
        }
    },
    extends: ['eslint:recommended'],
    rules: {
        'curly': 'error',
        'quotes': ['error', 'single'],
        'indent': [
            'error',
            4
        ],
        'no-console': [
            0
        ],
        'semi': ['error', 'always'],
        'space-infix-ops': [
            'error'
        ],
        'no-cond-assign': [
            'error'
        ],
        'no-dupe-args': [
            'error'
        ],
        'no-dupe-keys': [
            'error'
        ],
        'no-duplicate-case': [
            'error'
        ],
        'no-empty-character-class': [
            'error'
        ],
        'no-empty': [
            'error'
        ],
        'no-extra-boolean-cast': [
            'error'
        ],
        'no-extra-semi': [
            'error'
        ],
        'no-obj-calls': [
            'error'
        ],
        'no-unexpected-multiline': [
            'error'
        ],
        'no-unreachable': [
            'error'
        ],
        'no-unsafe-negation': [
            'error'
        ],
        'use-isnan': [
            'error'
        ],
        'valid-typeof': [
            'error'
        ],
        'default-case': [
            'error'
        ],
        'eqeqeq': [
            'error'
        ],
        'no-alert': [
            'error'
        ],
        'no-caller': [
            'error'
        ],
        'no-case-declarations': [
            'off'
        ],
        'no-else-return': [
            'error'
        ],
        'no-eq-null': [
            'error'
        ],
        'no-eval': [
            'error'
        ],
        'no-extra-bind': [
            'error'
        ],
        'no-extra-label': [
            'error'
        ],
        'no-fallthrough': [
            'error'
        ],
        'no-floating-decimal': [
            'error'
        ],
        'no-global-assign': [
            'error'
        ],
        'no-implicit-coercion': [
            'error'
        ],
        'no-implicit-globals': [
            'error'
        ],
        'yoda': [
            'error'
        ],
        'no-with': [
            'error'
        ],
        'no-void': [
            'error'
        ],
        'no-useless-call': [
            'error'
        ],
        'no-unused-labels': [
            'error'
        ],
        'no-unmodified-loop-condition': [
            'error'
        ],
        'no-sequences': [
            'error'
        ],
        'no-self-compare': [
            'error'
        ],
        'no-self-assign': [
            'error'
        ],
        'no-return-assign': [
            'error'
        ],
        'no-redeclare': [
            'error'
        ],
        'no-proto': [
            'error'
        ],
        'no-new': [
            'error'
        ],
        'no-new-wrappers': [
            'error'
        ],
        'no-new-func': [
            'error'
        ],
        'no-implied-eval': [
            'error'
        ],
        'callback-return': [
            'error'
        ],
        'handle-callback-err': [
            'error'
        ]
    },
    'env': {
        'node': true,
        'es6': true
    }
};