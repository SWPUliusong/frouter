exports.get = function(req, res) {
    res.send('/comments/' + (req.params.id || 'null') + ' -> GET')
}
exports.post = function() {
    res.send('/comments/ -> POST')
}
exports.delete = function() {
    res.send('/comments/' + req.params.id + ' -> DELETE')
}