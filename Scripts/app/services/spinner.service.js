module.exports=function(app){
    app.factory('satSpinner',['$rootScope',satSpinner]);
    function satSpinner(rS){
        var service={
            hideSpinner:hideSpinner,
            showSpinner:showSpinner
        };
        function hideSpinner(){
            toogleSpinner(false);
        }
        function showSpinner(message){
            toogleSpinner(true,message);
        }
        function toogleSpinner(show,message){
            rS.$broadcast('spinner.toggle',{show:show,message:message});
        }
        return service;
    }
};