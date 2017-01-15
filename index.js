'use strict'

const path = require("path")
const formatPath = require("./lib/formatPath")
const ls = require("./lib/ls")
const config = require("./lib/config")

function frouter(app, opt) {

	if (!opt) {
    	throw new Error('root config required.');
  	}

	if (typeof opt === 'string') {
		if (!path.isAbsolute(opt)) {
		    opt = path.join(process.cwd(), opt);
		}
		opt = {root: opt}
	} 

	opt = config(opt);

  	let root = opt.root;

  	ls(root).forEach(function(filepath) {
  		let exportFuncs = require(filepath);
	    let pathRegexp = formatPath(filepath, root, opt);

	    for (let method in exportFuncs) {

		    if (!Array.isArray(exportFuncs[method])) {
		    	exportFuncs[method] = [exportFuncs[method]]
		    }
		    exportFuncs[method].unshift(pathRegexp)

	        app[method].apply(app, exportFuncs[method])
			if (opt.debug) {
				console.log(
					'%s%s%s -> %s%s%s',
					'\x1B[32m\x1B[1m',
					pathRegexp,
					'\x1B[22m\x1B[39m',
					'\x1B[36m',
					method.toUpperCase(),
					'\x1B[39m'
				)
			}
	    };
  	})

  	return function (req, res, next){
  		next()
  	}

}

module.exports = frouter