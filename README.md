SDM2014fall
=================

NTUIM SDM 2014 fall final project

Environment Setup
-----------------

```
$ sudo npm install
$ npm start
```

The server will listen on the port 3000

Repository Branches
-------------------
* `master`: *For production*
* `dev`: Major development branch.
* `<other branches>`: Feature branches.

Git use
-------------------
* git status // check the project result
* git branch `dev` // create `dev` branch
* git checkout `dev` // change to `dev` branch
* git add . -A // add all the change to your local repo
* git commit -m "blablabla" // commit the change, and make some message for other to check
* git pull origin `dev` // pull the lastest code on the git server
* git push origin `dev` // push your local code to the git server

Directory Structure
-------------------
* `view/` : Contains all the `ejs` view for server render.
* `routes/`: Contains all the controllers.
* `public/` : Contains all non-compiled assets, such as css, js, images, icons, etc.
* `config/` : Configurations.
* `node_module/` : Contains all the node packages installed from `npm install`.

File Usage
-------------------
* `.gitignore`: Ensure some special dir/file not include in git repo.
* `app.js`: The main funtion for node.js server.
* `instruction.txt`: The file that include the DB account and password.
* `package.json`: Use for node.js to install the packages.
* `README.md`: I am README.md!

Code Style
-------------------
* `js`: indent use `2 space`, convert indention to space
* `js`: one space after `,` , one space before `{`
* `css`: indent use `2 space`, convert indention to space
* `css`: one space before `{`, one space after `:`, no space before `;`, `}` in a single line
* more css style guide : 
* 1. https://github.com/styleguide/css
* 2. http://learn.shayhowe.com/advanced-html-css/performance-organization/
* `html | ejs`: indent use `2 space`, convert indention to space

Code Style Example
-------------------
JS
```
$scope.example = function(req, res) {
  if (a > b && a > c) {
    // do something
  } else {
    // do something
  }
}
```

CSS
```
 // good practice
.article-name {
  color: #3b5998;
  font-size: 14px;
  font-weight: 600;
}

// bad practice
.article-name{
  color:#3b5998;
  font-size:14px ;
  font-weight: 600;}
```
