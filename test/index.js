const app = require("express")()
const path = require("path")
const frouter = require("../index.js")

console.log(__dirname)
app.use(frouter(app, {
    root: __dirname + '/routes',
    "_": true
}));