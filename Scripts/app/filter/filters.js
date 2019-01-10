module.exports=function(app){
    app.filter('getDate',getDate);
    function getDate(){
        return function(data){
            return moment(data).toDate();
        };
    }
    app.filter('momentFormat',momentFormat);
    function momentFormat(){
        return function(data,format){
            return moment(data).format(format);
        };
    }
}