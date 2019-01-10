module.exports=function(app){
    app.controller('bookingCtrl',bookingCtrl);
    bookingCtrl.$inject=['$state', '$stateParams','dataService','constantApi'];
    function bookingCtrl(state,params,ds,consApi){
        var vm=this;
        vm.getType=function(type){
            var result;
            consApi.wagonTypes.forEach(function (element) {
                if (element.typeValue == type) {
                    result = element.name;
                }
            });
            return result;
        };
        vm.close=function(){   
            state.go('home');
        };
        if (!params.id){
            alert("Код бронирования пустой!");
            return;
        }
        ds.getBookingOrder(params.id).then(function(response){
            vm.Order=response.data;
        },function(error){
            if (error.data){
                alert('Ошибка :' || error.data);
            } else  if (error){
                alert('Ошибка :' || error);
            }                 
        }).finally(function(){
            if (!vm.Order){
                alert('Бронирования не существует!');
                state.go('home');                
            }
        });
    }
};