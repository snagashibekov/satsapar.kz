module.exports = function (app) {
    app.factory('httpIntercept', httpIntercept);
    app.config(['$httpProvider',function(httpProvider){
        httpProvider.interceptors.push('httpIntercept');
    }]);
    function httpIntercept() {
        return {
            request: function (config) {
                if (config.url==="/Home/SearchTrains" 
                    || config.url==="/Home/StationAutoComplete"
                    || config.url==="/Home/GetTrain"
                    || config.url==="/Booking/BookingInfo"){
                    config.url="http://localhost:3000"+config.url;
                    config.method='GET';
                }
                return config;
            },
            requestError: function (config) {                
                return config;
            },
            response: function (res) {                
                return res;
            }
        };
    }
};