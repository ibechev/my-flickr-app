# my-flickr-app

An app that allows the user to search for a Flickr photos by tag name. The page loads 20 images initially and uses infinite scroller.

## Basic Tech Stack

my-flickr-app is built with [React-Express-Webpack Template]("https://github.com/ibechev/react-express-webpack-boilerplate.git"), which uses **React**, **Express** and **Webpack 4**. The project also includes the frameworks **Jest** and **Enzyme** for testing.

### Current versions

- React 16
- Webpack 4
- Babel-core 7
- Jest 24
- Enzyme 3
- ESLint 5

## Starting WebpackDevServer in Development environment

```sh
git clone
 https://github.com/ibechev/my-flickr-app.git

cd my-flickr-app

# install all node modules in the package.jeon file
npm install

# start the application - this will enable hot-reloading, linting and run tests, and will display the coverage in the console
npm start
```

Project will open at [http://localhost:3000/](http://localhost:3000/)

## Build static assets for Production environment

```sh
npm run build
```
