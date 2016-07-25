# frouter
  a middleware for express,file path is routes

# install
  npm install frouter

# example
  `var app = require("express")();`
  `var frouter = require("frouter");`
   
  `app.use(frouter(app, __dirname + "/routes"));`
  `app.listen(3000)`
