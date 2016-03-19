'use strict';

var _index = require('./index');

let cache = new _index.MemoryCache();
cache.set('key1', 'value1');
cache.set('key2', 'value2', 200);
cache.set('key3', 'value3', 200, function (key) {
    console.log(`Removed {key}`);
});
console.log(cache.Size);
cache.remove('key3');
cache.clear();
//# sourceMappingURL=demo.js.map