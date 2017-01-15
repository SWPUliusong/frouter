const app = require("express")()
const path = require("path")
const frouter = require("../index.js")

app.use(frouter(app, {
    root: __dirname + '/routes',
    "_": true,
}));

app.listen(3000, () => console.log('listening at 3000'))