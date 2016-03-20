import {MemoryCache} from './index'

let cache = new MemoryCache();
cache.set('key1', 'value1');
cache.set('key2', 'value2', 1000);
cache.set('key3', 'value3', 2000, function(key) {
    console.log(`Removed entry for ${key}`);
});

console.log(`Size: ${cache.Size}`);
let value1 = cache.get('key1');
console.log(`Value 1: ${value1}`);
setTimeout(function(){
    let value2 = cache.get('key2');
    console.log(`Value 2: ${value2}`);
}, 1050);
cache.remove('key1');
console.log(`Cache contains Key1? ${cache.contains('key1')}`);
cache.clear();