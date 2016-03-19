import {MemoryCache} from './index';
import 'should';
import 'should-sinon';
import * as sinon from 'sinon';

describe('MemoryCache', function() {
    it('should be available', function() {
        let cache = new MemoryCache();
        cache.should.be.Object();
    });
    it('should be able to add an item in cache', function() {
        let cache = new MemoryCache();
        (function() {
            cache.set('key1', 'value1');
        }).should.not.throw();
        cache.Size.should.be.exactly(1);
        cache._cacheStore.has('key1').should.be.true();
        
        (function() {
            cache.set('key2', 'value2', 100);
        }).should.not.throw();
        cache.Size.should.be.exactly(2);
        cache._cacheStore.has('key2').should.be.true();
        
        (function() {
            cache.set('key3', 'value3', 100, function(key) {
                console.log(key);
            });
        }).should.not.throw();
        cache.Size.should.be.exactly(3);
        cache._cacheStore.has('key3').should.be.true();
    });
    it('should be able get the size of the cache', function() {
        let cache = new MemoryCache();
        cache.set('key1', 'value1', 25);
        cache.set('key2', 'value2');
        cache.set('key3', 'value3', 25, function(key) {
            console.log(key)
        });
        cache.Size.should.be.exactly(3);
    });
    it('should be able to check if cache contains an item', function() {
        let cache = new MemoryCache();
        cache.set('key1', 'value1', 25);
        cache.set('key2', 'value2');
        cache.set('key3', 'value3', 25, function(key) {
            console.log(key)
        });
        cache.contains('key1').should.be.true();
        cache.contains('key2').should.be.true();
        cache.contains('key5').should.not.be.true();
    });
    it('should be able to retrieve an item from cache stored without a timeout', function(done) {
        let cache = new MemoryCache();
        cache.set('key1', 'value1');
        cache.set('key2', 'value2');
        cache.set('key3', 'value3');
        cache.get('key2').should.be.exactly('value2');
        setTimeout(function() {
            cache.get('key2').should.be.exactly('value2');
            done();
        }, 25);
    });
    it('should be able to retrieve an item from cache till timeout', function(done) {
        let cache = new MemoryCache();
        cache.set('key1', 'value1', 40);
        cache.set('key2', 'value2', 20);
        cache.set('key3', 'value3', 60);
        cache.get('key1').should.be.exactly('value1');
        setTimeout(function() {
            cache.get('key2').should.be.exactly('value2');
            done();
        }, 18);
    });
    it('should remove cached items after timeout', function(done) {
        let cache = new MemoryCache();
        cache.set('key1', 'value1', 40);
        cache.set('key2', 'value2', 20);
        cache.set('key3', 'value3', 60);
        cache.Size.should.be.exactly(3);
        setTimeout(function() {
            cache.contains('key1').should.be.true();
            cache.get('key1').should.be.ok();
            cache.contains('key2').should.be.false();
            //cache.get('key2').should.not.be.ok();
            cache.contains('key3').should.be.true();
            cache.get('key3').should.be.ok();
            cache.Size.should.be.exactly(2);
            done();
        }, 21);
    });
    it('should call the callback when timeout occures', function(done) {
        let cache = new MemoryCache(),
            callback1 = sinon.spy(),
            callback2 = sinon.spy();
        cache.set('key1', 'value1', 40, callback1);
        cache.set('key2', 'value2', 20, callback2);
        cache.set('key3', 'value3', 60);
        setTimeout(function() {
            callback1.should.not.be.called();
            callback2.should.be.calledWith('key2');
            done();
        }, 25);
    });
    it('should be able to remove an item from cache', function() {
        let cache = new MemoryCache();
        cache.set('key1', 'value1', 25);
        cache.set('key2', 'value2');
        cache.set('key3', 'value3', 25, function(key) {
            console.log(key)
        });
        cache.Size.should.be.exactly(3);
        cache.remove('key1');
        cache.Size.should.be.exactly(2);
        cache.remove('key2');
        cache.Size.should.be.exactly(1);
        cache.remove('key3');
        cache.Size.should.be.exactly(0);
    });
    it('should be able to clear the cache', function() {
        let cache = new MemoryCache();
        cache.set('key1', 'value1', 25);
        cache.set('key2', 'value2');
        cache.set('key3', 'value3', 25, function(key) {
            console.log(key)
        });
        cache.Size.should.be.exactly(3);
        cache.clear();
        cache.Size.should.be.exactly(0);
    });
});