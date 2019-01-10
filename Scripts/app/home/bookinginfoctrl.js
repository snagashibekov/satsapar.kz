module.exports=function(app){
    app.controller('bookingInfoCtrl',bookingInfoCtrl);
    bookingInfoCtrl.$inject=['constantApi','dataService','$state'];
    function bookingInfoCtrl(constApi,ds,state){
        var self=this;
        self.bookingCode="";
        self.close=function(){         
            constApi.setActiveView([constApi.visibleData.homeMain.name],
                [constApi.visibleData.homeBooking.name,
                 constApi.visibleData.rulePurchase.name,
                 constApi.visibleData.ruleRefund.name]);
        };
        self.getBooking=function(){
            if (!self.bookingCode){
                alert("Введите код бронирования");
                return;
            }
            state.go('booking',{id:self.bookingCode});
        };
    }
}