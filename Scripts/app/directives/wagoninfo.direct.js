module.exports = function (app) {
    app.directive('wagonInfo', ['wagonSchema', '$compile',
        function (wagonSchema, $compile) {
            function link(scope, element, attrs) {
                scope.train.changeSchema = function (car) {
                    scope.car = car;
                    wagonSchema.get(car).then(function (data) {
                        if (data) {
                            scope.$evalAsync(function () {
                                element.html(data);
                                $compile(element.contents())(scope);
                                scope.train.selectionInText="_";
                                scope.train.selectedPlaces=[];
                                try{
                                element[0].focus();
                                if (element[0].scrollIntoView)
                                    element[0].getBoundingClientRect();                                    
                                    var elementRect = element[0].getBoundingClientRect();
                                    var absoluteElementTop = elementRect.top + window.pageYOffset;
                                    var middle = absoluteElementTop - (window.innerHeight / 2);
                                    window.scrollTo(0, middle);
                                }
                                catch(ex){console.log(ex);}
                            });
                        }
                    });
                };
                if (scope.schema) {
                    scope.train.changeSchema(scope.schema);
                }
                scope.addPlace = function (event,plc) {
                    if (!scope.checkAvailability(plc)){
                        return true;
                    }
                    if(!scope.train.selectedPlaces){
                        scope.train.selectedPlaces=[];
                    }
                    var selPlaces = scope.train.selectedPlaces;
                    var lgth = selPlaces.length;
                    var i = selPlaces.indexOf(plc);
                    if (i > -1) {                        
                        selPlaces.splice(i, 1);
                        scope.train.selectionInText = dispSelection(selPlaces);
                        event.currentTarget.classList.toggle('active');
                        return true;
                    }

                    if (lgth === 4) {
                        alert('Нельзя более 4 мест выбрать');
                        return true;
                    }
                    event.currentTarget.classList.toggle('active');
                    selPlaces.push(plc);
                    scope.train.selectionInText = dispSelection(selPlaces);
                    return true;

                    
                };
                function dispSelection(selPlaces) {                    
                    var tempMin = 1000;
                    var tempMax = 0;
                    var result='';
                    for (var i = 0; i < selPlaces.length; i++) {
                        if (tempMin > parseInt(selPlaces[i]))
                            tempMin = parseInt(selPlaces[i]);
                        if (tempMax < parseInt(selPlaces[i]))
                            tempMax = parseInt(selPlaces[i]);
                    }
                    if (selPlaces.length > 0) {
                        if (selPlaces.length <= 1)
                            result = tempMin;
                        else {
                            result = tempMin + '-' + tempMax;
                        }                        
                    }
                    else {
                        result = "_";
                    }
                    return result;
                }
                scope.checkAvailability = function (pl) {
                    var places = scope.car.Places;
                    if (places.indexOf(("000" + pl).slice(-3)) > -1)
                        return true;
                    else
                        return false;
                    return true;
                };
            }
            return {
                restrict: 'E',
                link: link,
                scope: {
                    train: '='
                }
            };
        }]);
};