module.exports = function (app) {
    app.controller("trainsCtrl", ['$state', '$stateParams', 'dataService', 
            'train','constantApi','$timeout', trainsCtrl]);
    function trainsCtrl(state, params, dataService, train,consApi,$timeout) {
        var vm = this;
        vm.trainsInfo = params.trainsInfo;        
        vm.dates = [moment(vm.trainsInfo.Trains[0].Date).subtract(1,'day').toDate(), moment(vm.trainsInfo.Trains[0].Date).toDate(), moment(vm.trainsInfo.Trains[0].Date).add(1,'day').toDate()];
        var typesofwagon = consApi.wagonTypes;
        vm.getCapitalized = function (data) {
            if (!data) {
                return data;
            }
            return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
        };
        vm.getCar = function (tr, cartype, classService, tariff) {
            if (vm.activeTrain && vm.activeTrain.schema) {
                vm.activeTrain.schema = undefined;
                vm.activeTrain.SelectedCars = undefined;
            }
            vm.activeTrain = tr;
            tr.SelectedCars = null;
            dataService.getTrain(vm.trainsInfo.PassRouteCodeFrom, vm.trainsInfo.PassRouteCodeTo, moment(tr.DepartureDateTime).format("DD-MM-YY HH:mm:ss"), tr.Number)
                .then(function (response) {
                    // try {
                        var result = response.data || response;
                        var carsresult = result.ForwardDirectionDto.Trains[0].Train.Cars;
                        var cars;
                        // var arrTypeCars=[];
                        var found = false;
                        for (var j = 0; j < carsresult.length; j++) {                            
                            if 
                                (vm.getWagonType(carsresult[j].Type, carsresult[j].ClassService).toLowerCase() === cartype.toLowerCase()
                                    || carsresult[j].Type.toLowerCase() === cartype.toLowerCase())
                                {
                                if (found && (carsresult[j].ClassService.Type === classService.Type || carsresult[j].Tariff === tariff)){
                                    cars = carsresult[j];
                                } else if(!found)
                                     cars = carsresult[j];
                                found = true;
                            } else if (!found) {
                                if (carsresult[j].Type.toLowerCase() !== 'плацкартный' &&
                                    carsresult[j].Type.toLowerCase() !== 'купе' &&
                                    carsresult[j].Type.toLowerCase() !== 'люкс' &&
                                    carsresult[j].Tariff === tariff
                                    && carsresult[j].ClassService.Type === classService.Type) {
                                    tr = true;
                                    cars = carsresult[j];                                    
                                }
                            }
                            var sumwagons = 0;
                            carsresult[j].Cars.forEach(function (entry) {
                                sumwagons += entry.Places.length;
                            });                            
                        }
                        if (cars)
                            cars.Cars[0].selected = true;
                        else {
                            alert(cartype +" не найден!");
                        }
                        tr.detailedCars = carsresult;
                        tr.SelectedCars = cars;
                        $timeout(function(){vm.changeCar(tr,cars.Cars[0],cars);});
                        
                    // } catch (ex) { alert('Ошибка :'+ex); }

                }, function (error) { alert(error.data || error) });
        };
        vm.getWagonType = function (type, classService) {
            var result="";
            if (classService && classService.Value) {
                typesofwagon.forEach(function (element) {
                    if (classService.Value.toLowerCase().indexOf(element.shortName.toLowerCase()) !== -1) {
                        result = element.shortName;
                    }
                });
            }
            if (!result) {
                typesofwagon.forEach(function (element) {
                    if (element.typeValue == type) {
                        result = element.shortName;
                    }
                });
            }
            return result;
        };
        vm.moveDate=function(ind){
            // var index=parseInt(ind);
            if (vm.dates[ind]>=new Date().setHours(0, 0, 0, 0)){
            vm.dates=[  moment(vm.dates[ind]).subtract(1,'day').toDate(), 
                        moment(vm.dates[ind]).toDate(), 
                        moment(vm.dates[ind]).add(1,'day').toDate()];
            }
            
            dataService.getTrains(moment(vm.dates[1]).format("DD.MM.YYYY"),
                vm.trainsInfo.PassRouteCodeFrom,vm.trainsInfo.PassRouteCodeTo)
                .then(function(response){
                    var data=response.data;
                    if (data === undefined) {
                        alert('В указанную дату поезд не ходит либо произошла ошибка при поиске на эту дату! ');
                        return;
                    }
                    try {
                        if (!('Trains' in data)) {
                            alert(data);
                            return;
                        }
                    }
                    catch (err) {
                        alert(data);
                        return;
                    }
                    vm.trainsInfo=data;                    
                });
        };
        vm.changeCar = function (tr, car, allCars) {
            allCars.Cars.forEach(function (c) {
                c.selected = false;
            });
            car.selected = true;            
            car.Type=allCars.Type;
            car.ClassService=allCars.ClassService;
            tr.changeSchema(car);
        };        
    }
};