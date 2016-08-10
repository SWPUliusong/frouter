# frouter
  a middleware for express,file path is routes
  
  由[nswbmw](https://github.com/nswbmw)大神的[koa-frouter](https://github.com/nswbmw/koa-frouter)加工而成

# install
  npm install frouter

### Usage

```
app.use(app, options)
```
- app: {Object} a express application.
- options: {Object|String->root}
  - root: {String} router directory
  - wildcard: {String} will replace it with '`:`', default '`$`'
  - ignorable: {String} will replace it with '`?`', default '`!`'

# example

**File tree**

```
├── app.js
├── package.json
├── ...
└── router
    ├── users
    │   └── $uid.js
    │
    ├── posts
    │   ├── user
    │   │   └── $id.js
    │   ├── book
    │   │   └── $id.js
    │   └── comment
    │       └── $id!.js
    ├── index.js
    └── links.js
```
**$uid.js**

```
exports.post = function (req, res, next) {
  var uid = req.params.uid
  ...
}
```


**$id.js**

```
/*如果你使用multer这类中间件或者要添加流程控制,可以将暴露的请求方法赋值为数组*/
var multer = require("multer");
var storage = multer.diskStorage({...})
var upload = multer({storage:storage})

exports.post = [upload.single('coverImg'), function (req, res, next) {
  if (req.session.user) {
    next()
  }
  else {
    res.redirect("/login")
  }
}, function (req, res, next) {
  var uid = req.params.uid
  console.log(req.file)
}]
```

**app.js**

```
var app = require('express')();
var frouter = require('frouter');

app.use(frouter(app, __dirname + '/router'));
app.listen(3000);
```
