module.exports = {
    "env": {
        "browser": true,
        "es6": true,
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2016,
        "sourceType": "module",
    },
    "rules": {
        "indent": [
            "error",
            "table"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};