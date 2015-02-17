var app = angular.module('plunker', []);


app.controller('MainCtrl', function($scope) {
  
});

app.directive('mypopover', function () {

return {
    link: function (scope, element, attrs) {
        //var popOverContent;
      
        var options = {
            content: '<div>free</div>',
            placement: "right",
            html: true,
            date: scope.date
        };
        $(element).popover(options);
    }
};
});