 //alert(sessvars.myObj[0]);
function DatosPersonalesController($scope,$http){
  $scope.IP=IP;

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
$scope.IP=IP;

    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/telefono').success(function(data) {
       $scope.tele = data; 

       //alert($scope.tele[0].tipo);
});

    //alert($scope.tele[0].tipo);

};


function DatosCorreosController($scope,$http){
$scope.IP=IP;

    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/email').success(function(data) {
       $scope.correo = data; 

       //alert($scope.tele[0].tipo);
});

    //alert($scope.tele[0].tipo);

};

function DatosDireccionesController($scope,$http){
$scope.IP=IP;

    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/direccion').success(function(data) {
       $scope.direc = data; 

       //alert($scope.tele[0].tipo);
});

    //alert($scope.tele[0].tipo);

};




function DatosExperienciaController($scope,$http){
$scope.IP=IP;
    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/experiencias').success(function(data) {
       $scope.exp = data; 

       
        
});
     
   
 /*  $scope.tipoPet=function(carg){
        //alert($scope.exp[1].cargo);
       // alert(carg);
        var superior[];
        superior.push(carg);
        for (var i = superior.length - 1; i >= 0; i--) {
            alert(superior[i]);
        };
      $http.get('http://'+$scope.IP+'/SpringGoraTeam/cargo/'+carg).success(function(datas) {
      //alert("hola");
      alert(datas[0]);
        
});
   
   }*/

};


function DatosEducacionController($scope,$http){
$scope.IP=IP;
    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/formacion').success(function(data) {
       $scope.educ = data; 

       
        
});   
   


};








