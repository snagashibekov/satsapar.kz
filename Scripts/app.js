var app = angular.module("satsapar", [
    'ui.bootstrap',
    'ui.router',
    'ngAnimate'
]);

require('./app/config/config')(app);
require('./app/directives/spinner.direct')(app);
require('./app/directives/latintocyrillic.direct')(app);
require('./app/directives/wagoninfo.direct')(app);
require('./app/filter/filters')(app);

require('./app/layout/shellctrl')(app);
require('./app/home/strainctrl')(app);
require('./app/trains/trainsctrl')(app);
require('./app/home/bookinginfoctrl')(app);
require('./app/booking/bookingctrl')(app);
require('./app/services/spinner.service')(app);
require('./app/services/s-api.service')(app);
require('./app/services/client.storage.service')(app);
require('./app/services/httpIntercept.service')(app);
require('./app/services/constant-api.service')(app);
require('./app/services/wagonschema.service')(app);