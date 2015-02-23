
function controlador1($scope,$http){
$scope.Simple = function(){
	var ip="10.77.33.117:8083";
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
			   url: 'http://'+ip +'/SpringGoraTeam/usuario/login',
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
								$http({
										method: 'GET', 
										url: 'http://'+ip+'/SpringGoraTeam/usuario/'+sessvars.myObj[6]+'/roles/',
										}).success(function(data)
											{		
												sessvars.myObj.push(data);
												if (sessvars.myObj[5]=="COMPLETO") 
													{
														location.href="home.html#/forms/Mantenimiento";
													}
												else{
													location.href="home.html#/forms/form-templates";
												};						
														
											});

								
							}
			});
		}
	}	 
}




