'use strict'

const path = require("path")

function formatPath(filePath, root, options) {
	return filePath
		.replace(root, "")
		.replace(/\\/g, "/")
		.replace(new RegExp("\\" + options[":"], 'g'), ":")
		.replace(new RegExp("\\" + options["?"], 'g'), "?")
		.replace(new RegExp('_', 'g'), options['_'])
		.replace(/.js$/g, '')
		.replace(/\/index$/g, "/")
}

module.exports = formatPath