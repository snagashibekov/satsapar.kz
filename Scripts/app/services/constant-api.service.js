module.exports = function (app) {
    app.factory('constantApi', constantApi);
    function constantApi() {
        var dict =
            [{ latin: 'a', cyrillic: 'а' },
            { latin: 's', cyrillic: 'с' },
            { latin: 'd', cyrillic: 'д' },
            { latin: 'f', cyrillic: 'ф' },
            { latin: 'g', cyrillic: 'г' },
            { latin: 'h', cyrillic: 'х' },
            { latin: 'j', cyrillic: 'ж' },
            { latin: 'k', cyrillic: 'к' },
            { latin: 'l', cyrillic: 'л' },            
            { latin: 'z', cyrillic: 'з' },
            { latin: 'x', cyrillic: 'х' },
            { latin: 'c', cyrillic: 'с' },
            { latin: 'v', cyrillic: 'в' },
            { latin: 'b', cyrillic: 'б' },
            { latin: 'n', cyrillic: 'н' },
            { latin: 'm', cyrillic: 'м' },
            { latin: 'q', cyrillic: 'к' },
            { latin: 'w', cyrillic: 'в' },
            { latin: 'e', cyrillic: 'е' },
            { latin: 'r', cyrillic: 'р' },
            { latin: 't', cyrillic: 'т' },
            { latin: 'y', cyrillic: 'ю' },
            { latin: 'u', cyrillic: 'у' },
            { latin: 'i', cyrillic: 'и' },
            { latin: 'o', cyrillic: 'о' },
            { latin: 'p', cyrillic: 'п' }
            ];

        var dictReserve =
            [{ latin: 'a', cyrillic: 'ф' },
            { latin: 's', cyrillic: 'ы' },
            { latin: 'd', cyrillic: 'в' },
            { latin: 'f', cyrillic: 'а' },
            { latin: 'g', cyrillic: 'п' },
            { latin: 'h', cyrillic: 'р' },
            { latin: 'j', cyrillic: 'о' },
            { latin: 'k', cyrillic: 'л' },
            { latin: 'l', cyrillic: 'д' },
            { latin: ';', cyrillic: 'ж' },
            { latin: 'z', cyrillic: 'я' },
            { latin: 'x', cyrillic: 'ч' },
            { latin: 'c', cyrillic: 'с' },
            { latin: 'v', cyrillic: 'м' },
            { latin: 'b', cyrillic: 'и' },
            { latin: 'n', cyrillic: 'т' },
            { latin: 'm', cyrillic: 'ь' },
            { latin: ',', cyrillic: 'б' },
            { latin: '.', cyrillic: 'ю' },
            { latin: 'q', cyrillic: 'й' },
            { latin: 'w', cyrillic: 'ц' },
            { latin: 'e', cyrillic: 'у' },
            { latin: 'r', cyrillic: 'к' },
            { latin: 't', cyrillic: 'е' },
            { latin: 'y', cyrillic: 'н' },
            { latin: 'u', cyrillic: 'г' },
            { latin: 'i', cyrillic: 'ш' },
            { latin: 'o', cyrillic: 'щ' },
            { latin: 'p', cyrillic: 'з' },
            { latin: '[', cyrillic: 'х' },
            { latin: ']', cyrillic: 'ъ' }];

        var visibleData = {
            homeMain: { name: "homeMain", value: true },
            homeBooking: { name: "homeBooking", value: false },
            rulePurchase: { name: "rulePurchase", value: false },
            ruleRefund: { name: "ruleRefund", value: false },
        };
        var wagonTypes = [{ name: 'Общий', shortName: 'Общи', typeValue: 1 },
        { name: 'Сидячий', shortName: 'Сидяч', typeValue: 2 },
        { name: 'Плацкартный', shortName: 'Плацк', typeValue: 3 },
        { name: 'Купе', shortName: 'Купе', typeValue: 4 },
        { name: 'Мягкий', shortName: 'Мягк', typeValue: 5 },
        { name: 'Люкс', shortName: 'Люкс', typeValue: 6 }
        ];
        var schemaTypes = [
            { type: "Купе", typeValue: 4, special: 0, value: 0,classService:"", maxplaces: 36, schema: 'Scripts/app/trains/wagon/schema0.html' },
            { type: "Купе", typeValue: 4, special: 0, value: 11, maxplaces: 40,schema: 'Scripts/app/trains/wagon/schema11.html' },
            { type: "Купе", typeValue: 4, special: 1, value: 1, maxplaces: 12,schema: 'Scripts/app/trains/wagon/schema1.html' },
            { type: "Купе", typeValue: 4, special: 2, value: 7, maxplaces: 100,schema: 'Scripts/app/trains/wagon/schema7.html' },
            { type: "Плацкартный", typeValue: 3, special: 0, value: 3, maxplaces: 54,schema: 'Scripts/app/trains/wagon/schema3.html' },
            { type: "Плацкартный", typeValue: 3, special: 1, value: 4, maxplaces: 18,schema: 'Scripts/app/trains/wagon/schema4.html' },
            { type: "Плацкартный", typeValue: 3, special: 2, value: 5, maxplaces: 60,schema: 'Scripts/app/trains/wagon/schema5.html' },
            { type: "Люкс", typeValue: 6, special: 0, value: 6, maxplaces: 18,schema: 'Scripts/app/trains/wagon/schema6.html' },
            { type: "Люкс", typeValue: 6, special: 1, value: 8, maxplaces: 10,schema: 'Scripts/app/trains/wagon/schema8.html' },
            { type: "Люкс", typeValue: 6, special: 2, value: 7, maxplaces: 100,schema: 'Scripts/app/trains/wagon/schema7.html' },            
            { type: "Общий", typeValue: 1, special: 0, value: 10, maxplaces: 81,schema: 'Scripts/app/trains/wagon/schema10.html' },
            { type: "Плацкартный", typeValue: 3, special: 0, value: 12, maxplaces: 56,schema: 'Scripts/app/trains/wagon/schema12.html' },
            { type: "Другие", special: -1, value: 7,schema: 'Scripts/app/trains/wagon/schema7.html' }
        ];
        if (document.getElementById('__RequestVerificationToken'))
            var cfrToken = document.getElementById('__RequestVerificationToken').value;
        return {
            Token: (cfrToken ? cfrToken : ""),
            visibleData: visibleData,
            setActiveView: setActiveView,
            latinToCyrillic: latinToCyrillic,
            wagonTypes: wagonTypes,
            schemaTypes: schemaTypes
        };
        function latinToCyrillic(text) {
            var result = "";
            for (var i = 0; i < text.length; i++) {
                var telement = text[i];
                dict.some(function (delement) {
                    if (delement.latin === telement.toLowerCase()) {
                        telement = delement.cyrillic;
                        return true;
                    }
                    return false;
                });
                result += telement;
            }
            return result;
        }
        function setActiveView(visible, invisible) {
            if (_.isArray(visible)) {
                visible.forEach(element => {
                    visibleData[element].value = true;
                });
            }
            if (_.isArray(invisible)) {
                invisible.forEach(element => {
                    visibleData[element].value = false;
                });
            }
        }
    }
}