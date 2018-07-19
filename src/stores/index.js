const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter(path => path !== './index.js');

export const Stores = {};
export const stores = {};

keys.forEach(path => {
  const Store = context(path);
  const name = path.match(/\.\/(\w+)\.js/)[1];

  Stores[`${name}Store`] = Store;
  stores[`${name.toLowerCase()}Store`] = new Store();
});
