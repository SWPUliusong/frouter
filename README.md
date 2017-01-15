# frouter
  a middleware for express,file path is routes
  
  由[nswbmw](https://github.com/nswbmw)大神的[koa-frouter](https://github.com/nswbmw/koa-frouter)加工而成

# install
  npm install frouter --save

### Usage

```
app.use(app, options)
```
- app: {Object} a express application.
- options: {Object|String->root}
  - root: {String} router directory
  - ":": {String} 将在挂载路由前用 '`:`' 替换的字符, default '`$`'
  - "?": {String} 将在挂载路由前用 '`?`' 替换的字符, default '`!`'
  - "\_": {Boolean} 是否将 '`_`' 替换为路径分隔符 '`/`', default '`false`'
  - "debug": {Boolean} 是否在启动时显示各个路由, default '`true`'

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
**app.js**

```
const app = require('express')();
const path = require("path");
let frouter = require('frouter');

app.use(frouter(app, path.join(__dirname, 'router')));
app.listen(3000);
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