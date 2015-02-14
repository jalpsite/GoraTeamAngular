
function controlador1($scope,$http){
$scope.Simple = function(){
	sessvars.myObj
		//var datos;
	/*$http.post('http://10.77.33.107:8080/SpringGoraTeam/persona/login/',{dni:$scope.usuario,correo:$scope.pass})
				.success(function (data) {
					alert(data);
				    	if (data == "") {
				    		alert("Hola");
				    	}else{
				    		alert(data)
				    	}
				 });*/
                //alert($scope.usuario +' - '+ $scope.pass);
	$http({
       	   method: 'POST', 
       	   url: 'http://10.77.33.117:8083/SpringGoraTeam/persona/login',
       	   data: $.param({dni:$scope.pass,correo:$scope.usuario}),
       	   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      
       	}).success(function (data) {
				    	if (data == "") {
				    		alert("Usuario no Registrado");
				    	}else{
				    		sessvars.myObj=data;
				    		if (sessvars.myObj[1]==1) 
				    			{
				    				location.href="home.html#/forms/Mantenimiento";
				    			}
				    		else{
				    			location.href="home.html#/forms/form-templates";
				    		};
				    	}
				 });


     }

     
}


