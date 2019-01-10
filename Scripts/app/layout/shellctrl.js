module.exports=function(app){
    app.controller('shellCtrl',shellCtrl);
    shellCtrl.$inject=['$rootScope'];
    function shellCtrl(rScope){
        var self=this;
        self.showSpinner=false;
        self.spinnerMessage='Загрузка ...';
        self.spinnerOptions={
            radius:40,
            lines:8,
            length:0,
            width:30,
            speed:1.7,
            corners:1.0,
            trail:100,
            color:'#2577e3'
        };
        
        rScope.$on('spinner.toggle',function(event,args){
            self.showSpinner=args.show;
            if (args.message){
                self.spinnerMessage=args.message;
            }
        });
    }
};