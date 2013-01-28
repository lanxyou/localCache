var localCache = function(limit) {
    if(!(this instanceof localCache)) {
        return new localCache(limit);
    }
    this.limit = limit || 10;
    this.cache = {};
    this.keys = [];
    this.issessionStorage
}
localCache.prototype.setItem = function(key, data) {
    var keys = this.keys,
        cache = this.cache;
    if(!cache.hasOwnProperty(key)) {
        if(keys.length == this.limit) {
            delete cache[keys.shift()];
            keys.push(key)
        }
    }
    cache[key] = data;
}
localCache.prototype.getItem = function(key) {
    return this.cache[key]
}
localCache.prototype.removeItem = function(key) {
    var keys = this.keys;
    for(var i = 0, l = keys.length; i < l; i++) {
        if(keys[i] == key) {
            keys.slice(i, 1);
            delete this.cache[key];
            break;
        }
    }
}
localCache.prototype.clear = function() {
    var cache = this.cache;
    for(var i in cache) {
        if(cache.hasOwnProperty(i)) {
            delete cache[i];
        }
    }
    this.keys.length = 0;
}