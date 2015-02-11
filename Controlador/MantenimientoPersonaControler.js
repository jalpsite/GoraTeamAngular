
function DatosPersonalesController($scope,$http){
  $scope.IP=IP;

    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/1200').success(function(data) {
   
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

    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/1200/telefono').success(function(data) {
       $scope.tele = data; 

       //alert($scope.tele[0].tipo);
});

    //alert($scope.tele[0].tipo);

};


function DatosCorreosController($scope,$http){
$scope.IP=IP;

    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/1200/email').success(function(data) {
       $scope.correo = data; 

       //alert($scope.tele[0].tipo);
});

    //alert($scope.tele[0].tipo);

};

function DatosDireccionesController($scope,$http){
$scope.IP=IP;


    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/1200/direccion').success(function(data) {
       $scope.direc = data; 

       //alert($scope.tele[0].tipo);
});

    //alert($scope.tele[0].tipo);

};




function DatosExperienciaController($scope,$http){
$scope.IP=IP;
/*
function Experiencia()
    {
      this.idexperiencia="";      
      this.cargo="";
      this.descripcion="";
      this.estado="a";
      this.idpersona="";
      this.empresa ="";
      this.cargonom ="";
      this.pais="";
      this.anhoinicio="";
      this.anhofin ="";
      
    }
   $scope.experienci= new Experiencia();
   $scope.experiencias=[];


    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/1200/experiencias').success(function(data)
     {
      for (var i = 0; i < data.length; i++) {
        alert(data[i].cargo)
        var m=jQuery.inArray( data[i].cargo, data )
        console.log(m);
      };
       
        
});*/
     
   
   $scope.tipoPet=function(carg){
        //alert($scope.exp[1].cargo);
       // alert(carg);
        var superior=[];
        superior.push(carg);
        for (var i = superior.length - 1; i >= 0; i--) {
            alert(superior[i]);
             
        };
      
      //alert("hola");
      //alert(datas[0]);
        

   
   }

};







