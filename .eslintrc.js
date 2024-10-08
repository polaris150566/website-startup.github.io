module.exports = {
	"env": {
		"browser": true,
		"es2021" : true
	},
	"root"     : true,
	"extends"  : "eslint:recommended",
	"plugins"  : [ "align-assignments" ],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType" : "module"
	},
	"rules": {
		"dot-location"                       : [ "warn", "object" ],
		"no-undef"                           : [ "off" ],
		"no-unused-vars"                     : [ "warn" ],
		"arrow-body-style"                   : [ "warn", "as-needed" ],
		"brace-style"                        : [ "warn", "1tbs", { "allowSingleLine": true } ],
		"block-spacing"                      : [ "warn", "always" ],
		"arrow-spacing"                      : [ "warn", { before: true, after: true } ],
		"array-bracket-spacing"              : [ "warn", "always" ],
		"comma-spacing"                      : [ "warn", { before: false, after: true } ],
		"func-call-spacing"                  : [ "warn", "never" ],
		"key-spacing"                        : [ "warn", { align: "colon" } ],
		"no-trailing-spaces"                 : [ "warn", { skipBlankLines: false } ],
		"object-curly-spacing"               : [ "warn", "always" ],
		"space-before-blocks"                : [ "warn", "never" ],
		"space-in-parens"                    : [ "warn", "always" ],
		"space-unary-ops"                    : [ "warn", { words: true, nonwords: false } ],
		"template-curly-spacing"             : [ "warn", "always" ],
		"semi"                               : [ "warn", "always" ],
		"align-assignments/align-assignments": [ "warn", { "requiresOnly": false } ],
		"indent"                             : [ "warn", "tab" ],
		"no-cond-assign"                     : [ "off" ],
		"no-extra-semi"                      : [ "off" ]
		// "no-case-declarations"               : [ "off" ]
	}
};
