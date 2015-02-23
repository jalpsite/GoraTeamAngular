
function controladorUsuario($scope,$http)
{	function Rol()
	{
		this.idusuariorol=null;
		this.idrol="";
		this.estado="";
		this.nomrol="";
		this.descripcion="";
		this.seleccion=false;

	}
	$scope.IP=IP;
	$scope.selectBuscar=0;
	$scope._persona=[];
	$scope.roles=[];

	
	function msgError()
		{   $.smallBox({
			title : "Dificultades Tecnicas",
			content : "Se presentaron problemas al cargar la pagina, Por favor actualize la pagina",
			color : "#C79121",
			icon : "fa fa-shield fadeInLeft animated",
			timeout : 4000
						});
		}
	function msgErrorGuardar()
		{   $.smallBox({
			title : "Problemas Tecnicos",
			content : "Se presentaron problemas al guardar sus datos, Por favor comuniquese con el administrador",
			color : "#C46A69",
			icon : "fa fa-warning shake animated",
			timeout : 4000
						});
		}
	$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/roles/')
					.success(
						function(data) 
						{
							
							for (var i = data.length - 1; i >= 0; i--)
							 {
							 	var roltemp= new Rol();
							 		roltemp.idusuariorol=null;
							 		roltemp.idrol=data[i].idrol;
							 		roltemp.estado=data[i].estado;
							 		roltemp.nomrol=data[i].nomrol;
							 		roltemp.descripcion=data[i].descripcion;
							 		roltemp.seleccion=false;
							 		$scope.roles.push(roltemp);
							};
						})
					.error(function(data) 
						{
							msgError();
						});



	$scope.buscarUsuario=function()
	{

		if($scope.valor==null)
		{
			$.smallBox({
			title : "Error de Ingreso de Datos",
			content : "No ingreso ningun valor a buscar",
			color : "#C79121",
			icon : "fa fa-shield fadeInLeft animated",
			timeout : 4000
						});
		}
		else{
			if($scope.selectBuscar==0)
				{
					$http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/buscarnombres/'+$scope.valor)
					.success(
						function(data) 
						{
							$scope.persona=data;
							$('#ModalUsuario').modal();
						})
					.error(function(data) 
						{
							msgError();
						});
					
				}
			else if($scope.selectBuscar==1)
				{
					$http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/buscardni/'+$scope.valor)
					.success(
						function(data) 
						{
							$('#ModalUsuario').modal();
							$scope.persona=data;
						})
					.error(function(data) 
						{
							msgError();
						});
				}
			
		}
	}
	$scope.asignarRol=function(i)
	{
		for (var j = $scope.roles.length - 1; j >= 0; j--)
			{
				
				$scope.roles[j].seleccion=false;
				$scope.roles[j].idusuariorol=null;
			};
		$http({
			method: 'GET', 
			url: 'http://'+$scope.IP+'/SpringGoraTeam/usuario/'+i.usuario.id+'/roles/',
			}).success(function(data)
				{
					for (var i = data.length - 1; i >= 0; i--) 
					{
						
						for (var j = $scope.roles.length - 1; j >= 0; j--)
						{
							if ($scope.roles[j].idrol==data[i].rol.idrol) 
							{
								if (data[i].estado=="A") {$scope.roles[j].seleccion=true};
								
								break;
							}

						};						
					};
					$scope.rolUser=data;							
							
				});
		$('#rolSave').removeClass('disabled')
		$scope._persona=i;
		$('#ModalUsuario').modal('hide');
	}
	$scope.rolUserSave=function()
		{
			$('#rolSave').addClass('disabled')
			$.smallBox({
									title : "EXITO",
									content : "<i class='fa fa-refresh'></i> <i>Se actualizaron los roles del usuario</i>",
									color : "#560000",
									iconSmall : "fa fa-bomb bounce animated",
									timeout : 3000
								});
			for (var j = $scope.roles.length - 1; j >= 0; j--)
				{
					for (var i = $scope.rolUser.length - 1; i >= 0; i--) {
						if ($scope.rolUser[i].rol.idrol==$scope.roles[j].idrol)
							{
								$scope.roles[j].idusuariorol=$scope.rolUser[i].idusuariorol;
							};
					};
					

				};
			for (var i = $scope.roles.length - 1; i >= 0; i--) 
				{
					if ($scope.roles[i].idusuariorol!=null || $scope.roles[i].seleccion==true) 
						{	var est="D";
							if ($scope.roles[i].seleccion) 
								est="A";
							if ($scope.roles[i].idusuariorol !=null) 
								{
								$http({
									method: 'POST', 
									url: 'http://'+$scope.IP+'/SpringGoraTeam/usuario/'+$scope.roles[i].idusuariorol+'/rol/update/'+$scope.roles[i].idrol,
									data: $.param({estado:est}),
									headers: {'Content-Type': 'application/x-www-form-urlencoded'}
										}).success(function(data)
										  {
											}).error(function(data) 
														{
															msgErrorGuardar();
														}); 
								}
							else
								{
									$http({
									method: 'POST', 
									url: 'http://'+$scope.IP+'/SpringGoraTeam/usuario/asignarrol/'+$scope._persona.idpersona+'/'+$scope.roles[i].idrol,									
									headers: {'Content-Type': 'application/x-www-form-urlencoded'}
										}).success(function(data)
										  {
											console.log("paso");
											}).error(function(data) 
														{
															msgErrorGuardar();
														});
								};
						};				
				};
					

				
		}
}