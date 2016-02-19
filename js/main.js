trasladar("#navbar-menu ul li a[href^='#']");
trasladar("#continue");
trasladar(".btn_pedir");

// define angular module/app
var formApp = angular.module('estampadosApp', []);

// create angular controller and pass in $scope and $http
function EstampController($scope, $http) {
  // create a blank object to hold our form information
  // $scope will allow this to pass between controller and view
  $scope.formData = {};
  // process the form
  $scope.processForm = function() {
    $http({
      method  : 'POST',
      url     : 'lib/send.php',
      data    : $.param($scope.formData),  // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data) {
        console.log(data);

        if (!data.success) {
          // if not successful, bind errors to error variables
          $scope.errorName = data.errors.name;
          $scope.errorEmail = data.errors.email;
          $scope.errorRazon = data.errors.razon;
          $scope.errorNumero = data.errors.numero;
          $scope.errorMensaje = data.errors.mensaje;
        } else {
          // if successful, bind success message to message
          $scope.message = data.message;
          $scope.errorName = '';
          $scope.errorEmail = '';
          $scope.errorRazon = '';
          $scope.errorNumero = '';
          $scope.errorMensaje = '';
        }
    });
  };

}

///////////// Funciones
function trasladar(link) {
  $(link).on('click', function(e) {
    // prevent default anchor click behavior
    e.preventDefault();
    // store hash
    var hash = this.hash;
    // animate
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function(){
      // when done, add hash to url
      // (default click behaviour)
      window.location.hash = hash;
    });
  });
}
