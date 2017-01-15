exports.get = function(req, res) {
    res.send('/users/' + req.params.userId + '/comments/' + (req.params.id || 'null') + ' -> GET')
}