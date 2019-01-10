module.exports = function (app) {
    'use strict';
    app.controller('strainCtrl', trainCtrl).directive('hoverAElement',hoverEl);
    function hoverEl(){
        return {
            scope:{
                hoverAElement:'@',
                className:'@'
            },
            link:function(scope,element,attrs){
                element.on('mouseenter',function(){
                    scope.upperElement=angular.element(document.getElementById(scope.hoverAElement));
                    scope.upperElement.addClass(scope.className);
                });
                element.on('mouseleave',function(){
                    if (scope.upperElement)
                        scope.upperElement.removeClass(scope.className);
                });
            }
        };
    }
    trainCtrl.$inject=['constantApi','dataService','$window','$state'];
    function trainCtrl(constApi,ds,window,state) {
          
        var daysToAddMax = 50;
        var day = 1;
        var self = this;
        self.visible=constApi.visibleData;
        self.open = openDialogDatePicker;
        self.departureDate= (new Date()).getTime();
        self.minDate = new Date();
        self.maxDate = moment(self.minDate).add(daysToAddMax, 'days').toDate();
        self.dateOptions = {
            showWeeks: false,
            useCurrent: false,
            minDate:self.minDate,
            maxDate:self.maxDate
        };
        self.getStations=function(val){
            return   ds.getLocations(val).then(function(data){
                return data;
            });
        };        
        // self.stations = [{'name':'Alabama','flag':'5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'},{'name':'Alaska','flag':'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'},{'name':'Arizona','flag':'9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'},{'name':'Arkansas','flag':'9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'},{'name':'California','flag':'0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'},{'name':'Colorado','flag':'4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'},{'name':'Connecticut','flag':'9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'},{'name':'Delaware','flag':'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'},{'name':'Florida','flag':'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'},{'name':'Georgia','flag':'5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'},{'name':'Hawaii','flag':'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'},{'name':'Idaho','flag':'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'},{'name':'Illinois','flag':'0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'},{'name':'Indiana','flag':'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'},{'name':'Iowa','flag':'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'},{'name':'Kansas','flag':'d/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'},{'name':'Kentucky','flag':'8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'},{'name':'Louisiana','flag':'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'},{'name':'Maine','flag':'3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'},{'name':'Maryland','flag':'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'},{'name':'Massachusetts','flag':'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'},{'name':'Michigan','flag':'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'},{'name':'Minnesota','flag':'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'},{'name':'Mississippi','flag':'4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'},{'name':'Missouri','flag':'5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'},{'name':'Montana','flag':'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'},{'name':'Nebraska','flag':'4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'},{'name':'Nevada','flag':'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'},{'name':'New Hampshire','flag':'2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'},{'name':'New Jersey','flag':'9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'},{'name':'New Mexico','flag':'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'},{'name':'New York','flag':'1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'},{'name':'North Carolina','flag':'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'},{'name':'North Dakota','flag':'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'},{'name':'Ohio','flag':'4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'},{'name':'Oklahoma','flag':'6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'},{'name':'Oregon','flag':'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'},{'name':'Pennsylvania','flag':'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'},{'name':'Rhode Island','flag':'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'},{'name':'South Carolina','flag':'6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'},{'name':'South Dakota','flag':'1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'},{'name':'Tennessee','flag':'9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'},{'name':'Texas','flag':'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'},{'name':'Utah','flag':'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'},{'name':'Vermont','flag':'4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'},{'name':'Virginia','flag':'4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'},{'name':'Washington','flag':'5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'},{'name':'West Virginia','flag':'2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'},{'name':'Wisconsin','flag':'2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'},{'name':'Wyoming','flag':'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}];
        self.dateFormat = { uiformat: "dd MMM EEE", momentFormat: "DD MMM ddd" };
        self.movPrevDate = movPrevDate;
        self.movNextDate=movNextDate;
        self.openBooking=function(name){
            constApi.setActiveView([name],
                [constApi.visibleData.homeMain.name]);            
                window.scrollTo(0,0);
        };
        self.switchDirections=function(){
            var tempStation=self.fromStation;
            self.fromStation=self.toStation;
            self.toStation=tempStation;
        };
        self.getTrains=function(){
            // state.go('train',{trainsInfo:null});  
            var error='';
            if (!self.fromStation || self.fromStation.length===0 || !self.fromStation.locationValue){
                error+="Выберите город отправление из списка! \n";
            }
            if (!self.toStation || self.toStation.length===0 || !self.toStation.locationValue){
                error+="Выберите город назначение из списка! \n";
            }
            
            if (!self.departureDate || self.departureDate< self.minDate){
                error+="Дата отправление не корректно!!";
            }
            if (error.length===0){
                ds.getTrains(moment(self.departureDate).format("DD.MM.YYYY"),self.fromStation.locationValue,self.toStation.locationValue)
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
                    state.go('train',{trainsInfo:data});                    
                });
            }
            else {
                alert(error);
            }
        };
        function openDialogDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();
            self.opened = true;
        }
        function movPrevDate() {
            if (!self.departureDate || self.departureDate.length < 1) {
                return;
            }
            if (self.departureDate <= self.minDate) {
                return;
            }
            var departureAdded=moment(self.departureDate).add(-1*day,'days').toDate();                                    
             self.departureDate=departureAdded.getTime();
        }
        function movNextDate() {
            if (!self.departureDate || self.departureDate.length < 1) {
                return;
            }
            if (self.departureDate >= self.maxDate) {
                return;
            }
            var departureAdded=moment(self.departureDate).add(day,'days').toDate();                                    
             self.departureDate=departureAdded.getTime();
        }        
    }
};