 //alert(sessvars.myObj[0]);
function DatosPersonalesController($scope,$http){
  $scope.IP=IP;
<<<<<<< HEAD

    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]).success(function(data) {
   
    $scope.nombre = data; 
    $scope.apepat = data;
    $scope.apemat = data;
    $scope.nacion = data;
    $scope.nacio = data;
    $scope.persona =data;
    $scope.sexo;
  

    if ($scope.persona.sexo=="M") {
        $scope.sexo="MASCULINO";
    };
    if ($scope.persona.sexo=="F") {
        $scope.sexo="FEMENINO";
    };
    if ($scope.persona.estadocivil=="C") {
        $scope.estadoCivil="CASADO";
    };
     if ($scope.persona.estadocivil=="S") {
        $scope.estadoCivil="SOLTERO";
    };
     if ($scope.persona.estadocivil=="V") {
        $scope.estadoCivil="VIUDO";
    };
     if ($scope.persona.estadocivil=="D") {
        $scope.estadoCivil="DIVORCIO";
    };
=======
>>>>>>> Rama-Jordan-11/02/2015

    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]).success(function(data) {
     
      $scope.nombre = data; 
      $scope.apepat = data;
      $scope.apemat = data;
      $scope.nacion = data;
      $scope.nacio = data;
      $scope.persona =data;
      $scope.sexo;
    

      if ($scope.persona.sexo=="M") {
          $scope.sexo="MASCULINO";
      };
      if ($scope.persona.sexo=="F") {
          $scope.sexo="FEMENINO";
      };
      if ($scope.persona.estadocivil=="C") {
          $scope.estadoCivil="CASADO";
      };
       if ($scope.persona.estadocivil=="S") {
          $scope.estadoCivil="SOLTERO";
      };
       if ($scope.persona.estadocivil=="V") {
          $scope.estadoCivil="VIUDO";
      };
       if ($scope.persona.estadocivil=="D") {
          $scope.estadoCivil="DIVORCIO";
      };

  });
};


function DatosTelefonosController($scope,$http){
<<<<<<< HEAD
$scope.IP=IP;
=======
 $scope.IP=IP;
>>>>>>> Rama-Jordan-11/02/2015

    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/telefono').success(function(data) {
       $scope.tele = data; 

       //alert($scope.tele[0].tipo);
      });

    //alert($scope.tele[0].tipo);
};


function DatosCorreosController($scope,$http){
<<<<<<< HEAD
$scope.IP=IP;

=======
  $scope.IP=IP;
>>>>>>> Rama-Jordan-11/02/2015
    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/email').success(function(data) {
       $scope.correo = data; 

       //alert($scope.tele[0].tipo);
    });
};

function DatosDireccionesController($scope,$http){
<<<<<<< HEAD
$scope.IP=IP;

    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/direccion').success(function(data) {
=======
  $scope.IP=IP;
  $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/direccion').success(function(data) {
>>>>>>> Rama-Jordan-11/02/2015
       $scope.direc = data; 
    });

    //alert($scope.tele[0].tipo);
};


function DatosExperienciaController($scope,$http){
<<<<<<< HEAD
$scope.IP=IP;
    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/experiencias').success(function(data) {
=======
  $scope.IP=IP;
  $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/experiencias').success(function(data) {
>>>>>>> Rama-Jordan-11/02/2015
       $scope.exp = data; 
   
  });
};


function DatosEducacionController($scope,$http){
<<<<<<< HEAD
$scope.IP=IP;
    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/formacion').success(function(data) {
       $scope.educ = data; 

       
        
});   
=======
  $scope.IP=IP;
    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/formacion').success(function(data) {
       $scope.educ = data;        
    });   
>>>>>>> Rama-Jordan-11/02/2015
   
};

function DatosCompetenciaController($scope,$http){
  $scope.IP=IP;
    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+1+'/competencias').success(function(data) {
       $scope.competi = data; 

      $scope.muestraHab=function(dato){
         //alert(dato)
         $scope.datos=dato
         $scope.IP=IP;
         $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/1/'+$scope.datos+'/habilidades').success(function(data) {
         $scope.habilidad = data; 
        });

      }
      $scope.muestraAtri=function(dato2){
         //alert(dato)
         $scope.dato2=dato2;
         $scope.IP=IP;
         $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/1/'+$scope.datos+'/'+$scope.dato2+'/atributos').success(function(data) {
         $scope.atrib = data; 
        });

      }
});


};







