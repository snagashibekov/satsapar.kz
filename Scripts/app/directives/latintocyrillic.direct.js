module.exports = function (app) {
    'use strict';
    
    app.directive('latinToCyrillic', latinToCyrillic);
    latinToCyrillic.$inject=['constantApi']
    function latinToCyrillic(cons) {
        return {
            restrict: 'A',
            link: link
        };
        function link(scope, element, attrs) {
            element.bind('keyup ', function (event) {
                element.val(cons.latinToCyrillic(element.val() || ""));
                // var text = 
                // var result = element.val() || "";
                // var telement = String.fromCharCode(event.keyCode);
                // dict.some(function (delement) {
                //     if (delement.latin === telement.toLowerCase()) {
                //         telement = delement.cyrillic;
                //         // event.preventDefault(true);
                //         event.stopPropagation(true);
                //         element.val(result + telement);
                //         return true;
                //     }
                //     return false;
                // });

                //     for(var i=0;i<text.length;i++){
                //         var telement=text[i];
                //         dict.some(function(delement){
                //             if (delement.latin===telement.toLowerCase()){
                //                 telement=delement.cyrillic;                            
                //                 return true;       
                //             }
                //             return false;
                //         });
                //         result+=telement;            
                // }
                // element.val(result);
            });
        }
    }
};