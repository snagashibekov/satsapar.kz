module.exports = function (app) {
    app.factory('wagonSchema', wagonSchema);
    wagonSchema.$inject = ['$http', '$templateCache', 'constantApi'];
    function wagonSchema($http, $templateCache, consApi) {
        var schemaTypes = consApi.schemaTypes;
        return {
            get: getSchema
        };
        function getSchemaUrl(selectedCar) {
            if (selectedCar.SpecialCarDetails === null || selectedCar.SpecialCarDetails === "undefined" || selectedCar.SpecialCarDetails.length === 0)
                selectedCar.SpecialCarDetails = [0];
            var result=null;
            for (var i = 0; i < schemaTypes.length; i++) {
                if (schemaTypes[i].type.toLowerCase() === selectedCar.Type.toLowerCase()
                    && (selectedCar.SpecialCarDetails[0] === schemaTypes[i].special
                        || selectedCar.ClassService.Type === schemaTypes[i].classService)) {
                    if (selectedCar.ClassService.Type === schemaTypes[i].classService)
                        return schemaTypes[i].schema;    
                    var maxPlaceExceeded = false;
                    for (var j = 0; j < selectedCar.Places.length; j++) {
                        if (parseInt(selectedCar.Places[j]) > schemaTypes[i].maxplaces) {
                            maxPlaceExceeded = true;
                        }
                    }
                    if (!maxPlaceExceeded) {
                        result=schemaTypes[i].schema;
                    }
                }
            }
            return result || schemaTypes[schemaTypes.length - 1].schema;
        }
        function getSchema(car) {
            var url = getSchemaUrl(car)
            if (!url) {
                return new Promise(function (resolve) { setTimeout(function () { resolve(null) }, 0) });
            }
            var wagonSchema = $templateCache.get(url);
            if (!wagonSchema) {
                return $http.get(url).then(function (response) {
                    $templateCache.put(url, response.data);
                    return $templateCache.get(url);
                });
            }
            return new Promise(function (resolve) { setTimeout(function () { resolve(wagonSchema) }, 0) });
        }
    }
}