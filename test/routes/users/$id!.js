exports.get = function(req, res) {
    res.send('/users/' + (req.params.id || 'null') + ' -> GET')
}

exports.post = function(req, res) {
    res.send('/users -> POST')
}

exports.delete = function(req, res) {
    res.send('/users/' + req.params.id + ' -> DELETE')
}