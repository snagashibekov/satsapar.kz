module.exports=function(app){
    app.factory('clientStorage',clientStore);
    clientStore.$inject=['$window'];
    function clientStore(window){
        var _storage = window.localStorage;
        return {
                    exists: function (key) {
                        return _storage[key] !== undefined;
                    },
                    delete: function (key) {
                        if (this.exists(key)) {
                            _storage.removeItem(key);
                        }                        
                    },
                    get: function (key) {
                        var returnValue = null,
                            value;
                        if (this.exists(key)) {
                            value = _storage[key];
                            try{
                                returnValue=JSON.parse(value);
                            } catch (e) {
                                if (e.constructor.name === 'SyntaxError') {
                                    returnValue = value;
                                }
                            }
                        }
                        return returnValue;
                    },
                    save: function (key, value) {
                        if (typeof value === 'object') {
                            var seen = [];
                            _storage.setItem(key, JSON.stringify(value, function (key, val) {
                                if (val != null && typeof val == "object") {
                                    if (seen.indexOf(val) >= 0) {
                                        return;
                                    }
                                    seen.push(val);
                                }
                                return val;
                            }));
                        } else {
                            _storage.setItem(key, value);
                        }
                    }            
                };
    }

};