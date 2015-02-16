
function controlador1($scope,$http){
$scope.Simple = function(){
	if($scope.pass==null || $scope.pass=="" || $scope.usuario==null || $scope.usuario==""){
		$.smallBox({
			title : "Datos Incompletos",
			content : "<i class='fa fa-refresh'></i> <i>Todos los campos son requeridos...</i>",
			color : "#A3CC29",
			iconSmall : "fa fa-warning bounce animated",
			timeout : 3000
		});
	}else{
		sessvars.myObj
		
			$http({
			   method: 'POST', 
			   url: 'http://10.77.33.117:8083/SpringGoraTeam/persona/login',
			   data: $.param({dni:$scope.pass,correo:$scope.usuario}),
			   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		  
			}).success(function (data) {
							if (data == "") {																
								$.smallBox({
									title : "Usuario o Contraseña Incorrectos",
									content : "<i class='fa fa-refresh'></i> <i>Intente nuevamente...</i>",
									color : "#560000",
									iconSmall : "fa fa-bomb bounce animated",
									timeout : 3000
								});
							}else{
								sessvars.myObj=data;
								if (sessvars.myObj[5]==1) 
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
}




