module.exports = function (app) {
    moment.locale('ru');
    moment.tz.setDefault("Asia/Almaty");
    app.config(['$stateProvider', '$urlRouterProvider', routesConfig]);
    function routesConfig(sp, urlRP) {
        sp.state('home', {
            url: '/',
            templateUrl: './Scripts/app/home/home.html',
            controller: 'strainCtrl',
            controllerAs: 'vm'
        }).state('train', {
            url: '/train',
            templateUrl: './Scripts/app/trains/trains.html',
            controller: 'trainsCtrl',
            params: {
                trainsInfo: null
            },
            controllerAs: 'vm',
            resolve: {
                train: ['dataService', function (ds) {
                    // return ds.getTrains("DD.MM.YYYY", "sd", "ds")
                    //     .then(function (response) {
                    //         return response.data;
                    //     });
                    return null;
                }
                ]
            }
        }).state('booking', {
            url: '/booking/:id',
            templateUrl: './Scripts/app/booking/booking.html',
            controller: 'bookingCtrl',            
            controllerAs: 'vm'
        });
        urlRP.otherwise('/');
    }
};