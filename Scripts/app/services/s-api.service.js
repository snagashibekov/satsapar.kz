module.exports = function (app) {
    app.factory('dataService', satApi);
    satApi.$inject = ['$http', 'satSpinner', 'constantApi'];
    function satApi(http, sSpinner, constantApi) {
        var requestHeader =
            {
                __RequestVerificationToken: constantApi.Token
            };
        return {
            getLocations: getLocations,
            getTrains: getTrains,
            getTrain: getTrain,
            getBookingOrder: getBookingOrder
        };
        function getLocations(term) {
            return executeHttp('/Home/StationAutoComplete', {
                term: constantApi.latinToCyrillic(term)
                // delay: 0.5
            }, 'GET', true).then(onCompleteSuccess);
            function onCompleteSuccess(response) {
                return _.flatMap(!response.data ? response : response.data, function (location) {
                    return {
                        locationValue: location.StationCode,
                        label: location.StationName
                    };
                });
            }
        }
        function getBookingOrder(code) {
            return executeHttp('/Booking/BookingInfo',
                {
                    bookingCode: code
                },
                'GET');
        }
        function getTrains(departDate, from, to) {
            return executeHttp('/Home/SearchTrains',
                {
                    when: departDate,
                    stationFromCode: from,
                    stationToCode: to
                },
                'POST');
        }
        function getTrain(fromStationCode, toStationCode, departureDateTime, trainNumber) {
            return executeHttp('/Home/GetTrain', {
                fromStationCode: fromStationCode,
                toStationCode: toStationCode,
                departureDateTime: departureDateTime,
                trainNumber: trainNumber
            },
                'GET');
        }

        function executeHttp(url, data, method, hideSpinner) {
            if (!hideSpinner) sSpinner.showSpinner();
            if (method && method.toUpperCase() === 'GET') {
                return http({
                    headers: requestHeader,
                    url: url,
                    params: data,
                    method: method
                }).finally(function () {
                    if (!hideSpinner) sSpinner.hideSpinner();
                });
            } else {
                return http({
                    headers: requestHeader,
                    url: url,
                    data: data,
                    method: method
                }).finally(function () {
                    sSpinner.hideSpinner();
                });
            }
        }
    }
};