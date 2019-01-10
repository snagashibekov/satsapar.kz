module.exports=function (app){
    'use strict';
    var Spinner=require('../../../node_modules/spin.js/spin.js').Spinner;
    // Window.Spinner=require('../../../node_modules/spin.js/spin.js');
    app.directive('spinner',spinner);
    spinner.$inject=['$window'];
    function spinner(window){
        var dm={
            link:link,
            restrict:'A'
        };
        return dm;
        function link(scope,element,attrs){
            scope.spinner=null;
            scope.$watch(attrs.spinner,function(options){
                if (scope.spinner){
                    scope.spinner.stop();
                }
                console.log(window.Spinner);
                console.log(window.app);
                scope.spinner=new Spinner(options);
                scope.spinner.spin(element[0]);
            },true);
        }
    }
};
