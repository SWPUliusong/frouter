const config = {
	":" : "$",
	"?" : "!",
	"_" : false,
    "debug": true
}

module.exports = function(param) {

    let conf = Object.create(config);

    Object.assign(conf, param);

    conf["_"] = conf["_"] === true ? "/" : "_";

    return conf;
}