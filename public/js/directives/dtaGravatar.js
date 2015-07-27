angular.module("p4")

// Usage : <dta-gravatar></dta-gravatar>
.directive("dtaGravatar", function () {
    "use strict";
    return {
        restrict: "E",
        templateUrl: "views/gravatar.html",
        link: function (scope, element, attrs, dtaGravatar) {
            //console.log(dtaGravatar.email);
        },
        bindToController: {
            email: "="
        },
        scope: {},
        controller: "DtaGravatarController",
        controllerAs: "dtaGravatar",
        transclude: true
    };

})

.controller("DtaGravatarController", function () {
    "use strict";
    var dtaGravatar = this;

    dtaGravatar.md5 = function (str) {
        return md5(str);
    };

})

;
