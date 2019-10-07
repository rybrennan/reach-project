# 1. Hangman TOC

  - [1.1. To do](#11-to-do)
  - [1.2. Usage](#12-usage)
  - [1.3. Development Setup](#13-development-setup)
  - [1.4. Log](#14-log)
    - [1.4.1. Setting up React without CRA](#141-setting-up-react-without-CRA)
      - [1.4.1.1 Configure Webpack](#1411-configure-webpack)
      - [1.4.1.2 Configure Babel](#1412-configure-babel)
      - [1.4.1.3 Make Webpack aware of Babel](#1413-make-webpack-aware-of-babel)


 ## 1.1. To do

```
 x setup React with Webpack and Babel
 x setup Express server
 - revisit to bundle into a `dist` folder

```

## 1.2. Usage

- At the start of the game the computer/secret-keeper will choose a dictionary word
- The guesser loses the game if they guess 6 letters that are not in the secret word
- The guesser wins the game if they guess all letters in the secret word correctly and have
- not already lost the game per the conditions above

## 1.3. Development Setup

- Server: [Express](http://expressjs.com/)
- Client: [React](http://reactjs.org/)

## 1.4. Log

### 1.4.1. Setting up React without CRA

I work regularly with React but it had been a bit since I setup a React application from scratch.
I opted to forgoe using Create React App so I could get a review on what Webpack and Babel were doing behind the scenes.

#### 1.4.1.1 Configure Webpack
The command below installed:
- [webpack](https://webpack.js.org) as our module bundler and build tool.
- [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) which serves our bundled app in `/public` in a local environment.
- [webpack-cli](https://webpack-gatsby.netlify.com/api/cli/) configures our Webpack with a config file

``` sh
$> npm install --save-dev webpack webpack-dev-server webpack-cli
```
In the webpack configuration file, `./src/index.js` file as entry point to bundle all of source files and these bundled files will result in a `bundle.js` file which will be generated in `/public` folder.

```
webpack.config.js
```
``` js
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './public'
  }
};

```

#### 1.4.1.2 Configure Babel

This command:
```
$> npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-stage-2 babel-preset-react
```
Installs:
- [babel](https://babeljs.io) Babel transpiles back our code to ES5 so it will work in all browsers.
- Also it converts JSX into Javascript:

So this:
```js
function NameComponent(props) {
  return (
    <h1>{props.name}</h1>
  )
}
```

Becomes this:
```js
function NameComponent(props) {
  return React.createElement(
    'h1',
    null,
    props.name
  )
}
```
#### 1.4.1.3 Make Webpack aware of Babel

Back in the `webpack.config` file, we add `module` and `resolve` keys.

``` js
var path = require('path');

module.exports = {
    entry: './src/index.js',
    //Right Here:
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    //And Here:
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/public')
    },
    devServer: {
        contentBase: './public',

    }
};

```


<!-- All hail this article

https://stackoverflow.com/questions/21895233/how-in-node-to-split-string-by-newline-n -->