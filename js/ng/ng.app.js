var smartApp = angular.module('smartApp', [
	'ngRoute',
	//'ngAnimate', // this is buggy, jarviswidget will not work with ngAnimate :(
	'ui.bootstrap',
	'plunker',
	'app.controllers',
	'app.demoControllers',
	'app.main',
	'app.navigation',
	'app.localize',
	'app.activity',
	'app.smartui'
]);
smartApp.controller('pruebaAppCtrl', function($scope){
	$scope.algo = "simpledddd";  
  });


smartApp.controller('prueba', controladorPrincipal);
function controladorPrincipal($scope,$http){
	$scope.perid=sessvars.myObj[0];
	

	function Persona()
		{
			this.idpersona="";
			this.apepat="";
			this.apemat="";
			this.nombres="";
			this.estado="A";
			this.estadocivil="Soltero";
			this.fechanacimiento="";
			this.nacionalidad="";			
			this.numerodocidentidad="";
			this.tipodocidentidad="1";
			this.idManager="";
			this.codigo=" ";
			this.sexo="M";		
			this.presentacion="";	
		}
		
		function Telefono()
		{
			this.idpersonatelefono="";
			this.idpersona="";
			this.telefono="";
			this.tipo ="";
			this.estado="A";
		}
		function Email()
		{
			
			this.idpersona="";
			this.idpersonaemail="";
			this.email="";
			this.tipo="";
			this.estado="A";
		}	
		function Direccion()
		{
			this.idpersonadireccion="";
			this.idpersona="";
			this.idubigeo="";
			this.direccion="";
			this.tipo="Casa";
			this.estado="A";
			this.descripcion=""
		}	
		function Experiencia()
		{
			this.idexperiencia="";			
			this.cargo="";
			this.descripcion="";
			this.estado="A";
			this.idpersona="";
			this.empresa ="";
			this.cargonom ="";
			this.pais="";
			this.anhoinicio="";
			this.anhofin ="";
			
		}
		function Estudio()
		{
			
			this.idpersona="";
			this.idformacion="";			
			this.iduniversidad="";			
			this.uninom ="";
			this.idcarrera="";
			this.nomCarrera="";
			this.idgrado ="";
			this.nivelestudio ="";
			this.descripcion="";		
			this.anhoinicio="";
			this.anhofin ="";
			
		}

		function Matriz()
		{
			this.idmatriz="";
			this.idcompetencia="";
			this.nomcompetencia="";
			this.idpersona="";	
			this.habilidades=[];
			this.estado="A";
				
		}
		function Habilidad()
		{
			this.idMatriz="";
			this.idHabilidad="";
			this.idpersona="";//creo q esto de puede quitar ya q la matriz trae el id de la persona
			this.idhabilidades="";
			this.nomhabilidades="";
			this.atributotemp=[];
		}
		function Atributos()
		{
			this.idatributos="";
			this.idatributo="";
			//this.nomatributo="";
			this.idhabilidad="";

		}



		$scope.llamaTipoDocumento= function()
		{			
			$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/tipodocumentos').success(function(data) {
				$scope.tipoDocumento = data ;
				//$scope.seleccProvincia = $scope.items2[-1];  
			});
		};
		$scope.llamaDepartamento = function()
		{			
			$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/departamento/'+$scope.seleccDepartamento+'/provincias').success(function(data) {
				$scope.items2 = data ;
				$scope.seleccProvincia = $scope.items2[-1];  
			});
		};
		$scope.llamaProvincia = function()
		{
			$scope.dept=$scope.seleccDepartamento;
			$scope.prov=$scope.seleccProvincia;
			$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/departamento/'+$scope.dept+'/provincia/'+$scope.seleccProvincia+'/distritos').success(function(data) {
				$scope.items3 = data;
			  $scope._direccion.idubigeo = $scope.items3[-1];  
					});
		};
		$scope.agregarDireccion = function(){
			if ($scope._direccion.tipo== null) 
			{
				alert("Debe Seleccionar un Tipo de Dirección")
			}
			else if ($scope._direccion.direccion.trim().length < 1) 
			{
				alert("Debe Ingresar una Dirección")
			}
			else
			{
				var dir= new Direccion();

				dir.idpersonadireccion=$scope._direccion.idpersonadireccion;
				dir.idpersona=$scope._direccion.idpersona;
				dir.idubigeo=$scope._direccion.idubigeo[0];
				dir.direccion=$scope._direccion.direccion;
				dir.tipo=$scope._direccion.tipo[0];
				dir.estado=$scope._direccion.estado;
				dir.descripcion="Tipo de Dirección: "+$scope._direccion.tipo[1]+"\nDirección:"+$scope._direccion.direccion+"\n"+$scope.seleccDepartamento+" - "+$scope.seleccProvincia+" - "+$scope._direccion.idubigeo[1];
				$scope._direcciones.push(dir);
				$scope.seleccDepartamento = $scope.items[-1]; 
				$scope.seleccProvincia = $scope.items2[-1];  
				$scope._direccion.idubigeo = $scope.items3[-1];
				$scope._direccion.tipo=$scope.TipoDireccion[-1];
				$scope._direccion.direccion="";				
			};			
			
		};

		$scope.agregarEmail = function(){
			if ($scope._email.tipo== null) 
			{
				alert("Debe Seleccionar un Tipo de Email")
			}
			else if ($scope._email.email.trim().length < 1) 
			{
				alert("Debe Ingresar un Email")
			}
			else
			{
				var ema= new Email();
				ema.idpersona=$scope._email.idpersona;
				ema.idpersonaemail=$scope._email.idpersonaemail;
				ema.email=$scope._email.email;
				ema.tipo=$scope._email.tipo;
				ema.estado=$scope._email.estado;
				$scope._emails.push(ema);
			};
			
		};
		$scope.agregarTelefono = function(){
			if ($scope._telefono.tipo== null) 
			{
				alert("Debe Seleccionar un Tipo de Telefono")
			}
			else if ($scope._telefono.telefono.trim().length < 1) 
			{
				alert("Debe Ingresar un Numero Telefonico")
			}
			else
			{

				var tel= new Telefono();
				tel.idpersonatelefono=$scope._telefono.idpersonatelefono;
				tel.idpersona=$scope._telefono.idpersona;
				tel.telefono=$scope._telefono.telefono;
				tel.tipo=$scope._telefono.tipo;			
				tel.estado=$scope._telefono.estado;
				$scope._telefonos.push(tel);
			}
			//alert($scope._telefono.telefono)
		};

		
		$scope.cargaExp=function ()
		{	
			$("#experiencia").show();
			$("#agregar").hide();
			$("#Cancelar").click(function()
			{
				limpiar();
			});	

			 $http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/cargos').success(function(data) {
				$scope.TipoCargo = data ;
			});
		}
		
		$scope.llamaDHablidad= function(){
			 $http.get('http://'+$scope.IP+'/SpringGoraTeam/competencia/'+$scope._matriz.idcompetencia[0]+'/habilidades').success(function(data) {
			$scope.Hablidad = data ;
			$scope._habilidad.idhabilidades = $scope.Hablidad[-1];
			$("#divHbilidad").show();  
					
			});
		};
		$scope.llamaDAtributo= function(){
			$(".select2-search-choice").remove();
			 $http.get('http://'+$scope.IP+'/SpringGoraTeam/habilidad/'+$scope._habilidad.idhabilidades[0]+'/atributos').success(function(data) {
			$scope.itenAtributos = data ;
			
			});		 

			
		};	
		$scope.cargaInstiruciones = function(){

			$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/universidades').success(function(data) {
			$scope.Instituciones = data ;
			$scope._estudio.iduniversidad = $scope.Instituciones[-1];  
			});
			$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/carreras').success(function(data) {
				 $scope.itemsCarre = data ;
				 $scope._estudio.idcarrera = $scope.itemsCarre[-1];  	      	
				});
			$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/grados').success(function(data) {
				
				  $scope.itemsGrado = data ;
				$scope._estudio.idgrado = $scope.itemsGrado[-1];  
				});
			$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/nivelestudio').success(function(data) {
				
				  $scope.itemsNivelE = data ;
				  $scope._estudio.nivelestudio = $scope.itemsNivelE[-1];  
				});

		};
		
		$scope.agregarEstudio = function(){
		if ($scope._estudio.anhofin<$scope._estudio.anhoinicio) 
				{
						$.smallBox({
							title : "Error el año de Inicio es menor al Año de Finalización",
							content : "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
							color : "#C46A69",
							iconSmall : "fa fa-thumbs-up bounce animated",
							timeout : 4000
						});
				}
		else if($scope._estudio.iduniversidad== null|| $scope._estudio.idcarrera== null|| $scope._estudio.nivelestudio== null|| $scope._estudio.idgrado== null || $scope._estudio.descripcion.trim().length<1|| $scope._estudio.anhofin.trim().length<1|| $scope._estudio.anhoinicio.trim().length<1)
		{
			$.smallBox({
							title : "Para poder agregar Información sobre su Formación es nesecisario llenar todos los campos",
							content : "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
							color : "#C46A69",
							iconSmall : "fa fa-thumbs-up bounce animated",
							timeout : 4000
						});
		}
			else
			{
			var est = new Estudio();
			est.idpersona=$scope._estudio.idpersona;
			est.idformacion=$scope._estudios.length;			
			est.iduniversidad=$scope._estudio.iduniversidad[0];
			est.uninom =$scope._estudio.iduniversidad[1];			
			est.idcarrera=$scope._estudio.idcarrera[0];	
			est.nomCarrera=$scope._estudio.idcarrera[1];		
			est.idgrado =$scope._estudio.idgrado[0];
			est.nivelestudio=$scope._estudio.nivelestudio[1];	
			est.anhoinicio=$scope._estudio.anhoinicio;
			est.anhofin =$scope._estudio.anhofin;
			est.descripcion=$scope._estudio.descripcion;			
			$scope._estudios.push(est);
			$scope._estudio.anhoinicio="";
			$scope._estudio.anhofin="";
			$scope._estudio.descripcion="";


			$("#pestañaEstudios").show();
			$("#agregarEstudio").show(); 
			$("#estudios").hide();
		}
		};
		$scope.agregarExperiencia = function(){
			if ($scope._experiencia.anhofin<$scope._experiencia.anhoinicio) 
				{
						$.smallBox({
							title : "Error el año de Inicio es menor al Año de Finalización",
							content : "<i class='fa fa-exclamation-triangle'></i> <i>2 seconds ago...</i>",
							color : "#C46A69",
							iconSmall : "fa fa-thumbs-up bounce animated",
							timeout : 4000
						});
				}

		else if($scope._experiencia.empresa.trim().length<1|| $scope._experiencia.cargo== null|| $scope._experiencia.pais== null || $scope._experiencia.descripcion.trim().length<1|| $scope._experiencia.anhofin.trim().length<1|| $scope._experiencia.anhoinicio.trim().length<1)
		{
			$.smallBox({
							title : "Para poder agregar Información sobre su Experiencia Laboral es nesecisario llenar todos los campos",
							content : "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
							color : "#C46A69",
							iconSmall : "fa fa-thumbs-up bounce animated",
							timeout : 4000
						});
		}
			else
			{
				var exp = new Experiencia();
				exp.idexperiencia=$scope._experiencias.length;
				exp.cargo=$scope._experiencia.cargo[0];
				exp.cargonom=$scope._experiencia.cargo[1];
				exp.descripcion=$scope._experiencia.descripcion;
				exp.estado=$scope._experiencia.estado;
				exp.idpersona=$scope._experiencia.idpersona;
				exp.empresa=$scope._experiencia.empresa;
				exp.pais=$scope._experiencia.pais;
				exp.anhoinicio=$scope._experiencia.anhoinicio;
				exp.anhofin=$scope._experiencia.anhofin;
				$scope._experiencias.push(exp);	
				$("#pestañas").show();
				$("#experiencia").hide();
				$("#agregar").show();
				$scope._experiencia.idexperiencia="";			
				$scope._experiencia.cargo="";
				$scope._experiencia.descripcion="";
				$scope._experiencia.estado="a";
				$scope._experiencia.idpersona="";
				$scope._experiencia.empresa ="";
				$scope._experiencia.cargonom ="";
				$scope._experiencia.pais=$scope.Nacionalidad[-1];
				$scope._experiencia.anhoinicio="";
				$scope._experiencia.anhofin ="";

			}
			
			

		};
		$scope.BtnAgregar = function(){
			if ($scope.selectedAtributos.length<1)
				{
					$("#agregah").hide();
				}
			else{$("#agregah").show();};


		}
		$scope.agregarHabilidad = function(){
			
			var habi = new Habilidad();			
			
			habi.idMatriz=$scope._matrices.length;
			habi.idHabilidad=$scope._habilidades.length;
			habi.idpersona="";
			habi.idhabilidades=$scope._habilidad.idhabilidades[0];	
			habi.nomhabilidades=$scope._habilidad.idhabilidades[1];
			for (var i = $scope.selectedAtributos.length-1; i >= 0; i--) {
				var x= new Atributos();
				x.idatributos="";
				x.idatributo=$scope.selectedAtributos[i][0];
				x.nomatributo=$scope.selectedAtributos[i][1];
				x.idhabilidad="";
				habi.atributotemp.push(x)
			};
			
			$("#agregah").hide();
			$scope.Hablidad.splice( $.inArray($scope._habilidad.idhabilidades,$scope.Hablidad) ,1 );
			$scope.selectedAtributos=[];
			$scope.itenAtributos=[];
			$scope._habilidades.push(habi);		
			$("#comboCompe").prop('disabled', true);	
			$('#lblatribu').addClass('input state-success');
			$(".select2-search-choice").remove();
			if ($scope._habilidades.length>0) 
				{
					$("#BotonPenultimo").show();
					$("#BotonPenultimo2").show();
				};
			
			//$scope._matriz.idcompetencia = $scope.itenCompetencia[-1];
			//$scope._habilidad.idhabilidades = $scope.Hablidad[-1];

		};
		$scope.limpiarCompe=function (){
			limpiar();
			$("#comboCompe").prop('disabled', false);
			$scope._habilidades=[];
			$("#BotonPenultimo").hide();
			$("#BotonPenultimo2").hide();
			$scope._matriz.idcompetencia = $scope.itenCompetencia[-1]; 			
			$scope.Hablidad=[];		
			$scope.itenAtributos =[];
			$('#lblatribu').removeClass('input state-success');
			$("#comboCompe").prop('disabled', false);
		};
		$scope.eliminarEmail=function (x){
			$scope._emails.splice( $.inArray(x,$scope._emails) ,1 );
		};
		$scope.eliminarTele=function (x){
			$scope._telefonos.splice( $.inArray(x,$scope._telefonos) ,1 );
		};
		$scope.eliminarDirec=function (x){
			$scope._direcciones.splice( $.inArray(x,$scope._direcciones) ,1 );
		};
		$scope.verificacionDNI=function (){
			if($scope._persona.numerodocidentidad.trim().length>1){
			$http({
					  method: 'GET', 
					  url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/validadocumento/'+$scope._persona.numerodocidentidad,
					            
					      
					  }).success(function(data){if (data==1) {alert("El DNI ingresado ya existe en la base de datos");$scope._persona.numerodocidentidad="";};;});
			}
		};
		$scope.agregarMatriz = function(){
			
			var mtz = new Matriz();			
			mtz.idmatriz=$scope._matriz.idmatriz;
			mtz.idcompetencia=$scope._matriz.idcompetencia[0];
			mtz.nomcompetencia=$scope._matriz.idcompetencia[1];
			mtz.idpersona=$scope._matriz.idpersona;	
			mtz.habilidades=$scope._habilidades;
			mtz.estado="A";		
			$scope._matrices.push(mtz);
			$scope._habilidades=[];
			$("#pestañas").show();
			$("#experiencia").hide();
			$("#agregar").show();	
			$("#competencia").hide();
			$("#agregarCompetencia").show();
			$("#agregah").hide();
			$("#BotonPenultimo").hide();
			$("#BotonPenultimo2").hide();
			$scope.itenCompetencia.splice( $.inArray($scope._matriz.idcompetencia,$scope.itenCompetencia) ,1 );
			$scope.Hablidad=[];		
			$scope.itenAtributos =[];
			$('#lblatribu').removeClass('input state-success');
			$("#comboCompe").prop('disabled', false);

		};		
		
		$scope.guardaMatriz = function()
		{
			var contador=$scope._matrices.length - 1;			
			var contadorHabilidades=0;
			if (contador>=0) {
				contadorHabilidades=$scope._matrices[contador].habilidades.length - 1
			};
			function guardarAtributo(data)
			{	
				for (var i = $scope._matrices[contador].habilidades[contadorHabilidades].atributotemp.length - 1; i >= 0; i--) {
					
					$.ajax({
					  async:false, 
					  cache:false,
					  url: 'http://'+$scope.IP+'/SpringGoraTeam/atributos/create/'+data+'/'+$scope._matrices[contador].habilidades[contadorHabilidades].atributotemp[i].idatributo,
					  method: 'POST', 
					  data: $.param($scope._matrices[contador].habilidades[contadorHabilidades].atributotemp[i]),
					  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					  success: function(data){console.log(data)}
					});
				};
				contadorHabilidades=contadorHabilidades-1;				
			};
			
			function guardarHabilidades(data)
			{	
				
				for (var i = $scope._matrices[contador].habilidades.length - 1; i >= 0; i--)
				 {
					$.ajax({
					  async:false, 
					  cache:false,
					   url: 'http://'+$scope.IP+'/SpringGoraTeam/habilidad/create/'+$scope.id+'/'+data+'/'+$scope._matrices[contador].habilidades[i].idhabilidades,
					  method: 'POST', 
					  data: $.param($scope._matrices[contador].habilidades[i]),
					  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					  success: function(data){guardarAtributo(data);}
					});
					
				};	 
				
				contador=contador-1;
			};
			function dataid(data)
			{
				$scope.id=data;
				$http({
					  method: 'POST', 
					  url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/email/create/'+$scope.id,
					  dataType: 'json',
					  data:JSON.stringify($scope._emails),	          
					  contentType:'application/json'      
					  }); 			 
					$http({
							method: 'POST', 
							url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/telefono/create/'+$scope.id,
							dataType: 'json',
							data: JSON.stringify($scope._telefonos),
							contentType:'application/json'
						}); 
				
					$http({
							method: 'POST', 
							url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/direccion/create/'+$scope.id,
							dataType: 'json',
							data: JSON.stringify($scope._direcciones),
							contentType:'application/json'
						}); 
				 	if ($scope._estudios.length>0) {
				 		$http({
							method: 'POST', 
							url: 'http://'+$scope.IP+'/SpringGoraTeam/experiencia/create/'+$scope.id,
							dataType: 'json',
							data: JSON.stringify($scope._experiencias),
							contentType:'application/json'
						}); 
				 	};
					
				 for (var i = $scope._estudios.length - 1; i >= 0; i--) {
					$http({
							method: 'POST', 
							url: 'http://'+$scope.IP+'/SpringGoraTeam/formacion/create/'+$scope.id+'/'+$scope._estudios[i].iduniversidad+'/'+$scope._estudios[i].idcarrera+'/'+$scope._estudios[i].idgrado,
							data: $.param($scope._estudios[i]),
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						}); 
				 };
				 for (var i = $scope._matrices.length - 1; i >= 0; i--) {
				$.ajax({
					  async:false, 
					  cache:false,
					  url: 'http://'+$scope.IP+'/SpringGoraTeam/matriz/create/'+$scope.id+'/'+$scope._matrices[i].idcompetencia,
					  method: 'POST', 
					  data: $.param($scope._matrices[i]), 
					  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					  success: function(data){guardarHabilidades(data);}
					});
				};
			}
			if($scope._persona.nombres.trim().length < 1 || $scope._persona.apepat.trim().length < 1 || $scope._persona.apemat.trim().length < 1 
				|| $scope._persona.fechanacimiento.trim().length < 1 || $scope._persona.estadocivil== null || $scope._persona.nacionalidad== null
				|| $scope._persona.numerodocidentidad.trim().length < 1 || $scope._persona.tipodocidentidad.trim().length < 1 || $scope._persona.presentacion.trim().length < 1 )	
				{
					alert("Los Datos personales son Obligatorios")
				}
			else
			{
				$http({
					method: 'POST', 
					url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/create/',
					data: $.param($scope._persona),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},

				}).success(function(data){dataid(data);
					alert("los datos fueron Registrados con exito");}); 	
			}			

		};
		$scope._persona= new Persona();
		$scope._direcciones= [];
		$scope._direccion= new Direccion();
		$scope._telefonos= [];
		$scope._telefono= new Telefono();
		$scope._emails= [];
		$scope._email= new Email();
		$scope._experiencias= [];
		$scope._experiencia= new Experiencia();
		$scope._estudios= [];
		$scope._estudio= new Estudio();
		$scope._matrices= [];
		$scope._matriz= new Matriz();
		$scope._habilidad= new Habilidad();
		$scope._habilidades= [];
		$scope.IP=IP;	


	//$scope.IP="10.77.33.117:8083"
	$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/departamentos').success(function(data) {
			$scope.items = data ;
		  $scope.seleccDepartamento = $scope.items[-1];  
		});
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/nacionalidad').success(function(data) {
				$scope.Nacionalidad = data ;
			});
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/estadocivil').success(function(data) {
				$scope.Estadocivil = data ;
			});
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/tipoemail').success(function(data) {
				$scope.TipoEmail = data ;
			});
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/tipotelefono').success(function(data) {
				$scope.TipoTelefono = data ;
			});
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/tipodireccion').success(function(data) {
				$scope.TipoDireccion = data ;
			});
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/competencias').success(function(data) {
			$scope.itenCompetencia = data ;
			$scope._matriz.idcompetencia = $scope.itenCompetencia[-1];  
			
			});
		cargaInicio($scope.perid);
		function cargaInicio(id)
		{
			$http({	method: 'GET', 
					url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/'+id,
					}).success(function(data)
						{
							$scope._emails=[];
							//var dateee=data.fechanacimiento.replace(/\-/g, '/');
							//dt_to = $.datepicker.formatDate('dd/mm/yy', new Date(dateee));
							$scope._persona.nombres=data.nombres;
							$scope._persona.apepat=data.apepat;
							$scope._persona.apemat=data.apemat;
							$scope._persona.estadocivil=data.estadocivil;
							$scope._persona.fechanacimiento=data.fechanacimiento;
							$scope._persona.nacionalidad=data.nacionalidad;
							$scope._persona.tipodocidentidad=data.tipodocidentidad;
							$scope._persona.numerodocidentidad=data.numerodocidentidad;
							$scope._persona.presentacion=data.presentacion;
							$scope._persona.estado=data.estado;
							$scope._persona.codigo=data.codigo;
							for (var i = data.personaEmails.length - 1; i >= 0; i--) {
								var tempEmail= new Email();
								tempEmail.idpersona=data.idpersona;
								tempEmail.idpersonaemail=data.personaEmails[i].idpersonaemail;
								tempEmail.email=data.personaEmails[i].email;
								tempEmail.estado=data.personaEmails[i].estado;
								tempEmail.tipo=data.personaEmails[i].tipo;							
								$scope._emails.push(tempEmail);
							};
							for (var i = data.personaTelefonos.length - 1; i >= 0; i--) {
								var tempTel= new Telefono();
								tempTel.idpersona=data.idpersona;
								tempTel.idpersonatelefono=data.personaTelefonos[i].idpersonatelefono;
								tempTel.telefono=data.personaTelefonos[i].telefono;
								tempTel.estado=data.personaTelefonos[i].estado;
								tempTel.tipo=data.personaTelefonos[i].tipo;							
								$scope._telefonos.push(tempTel);
							};
							for (var i = data.personaDireccions.length - 1; i >= 0; i--) {
								var tempDirec= new Telefono();
								tempDirec.idpersona=data.idpersona;
								tempDirec.idpersonadireccion=data.personaDireccions[i].idpersonadireccion;
								tempDirec.direccion=data.personaDireccions[i].direccion;
								tempDirec.estado=data.personaDireccions[i].estado;
								tempDirec.tipo=data.personaDireccions[i].tipo;
								tempDirec.idubigeo=data.personaDireccions[i].idubigeo;
								tempDirec.descripcion="Tipo de Dirección: "+data.personaDireccions[i].tipo+"\nDirección:"+data.personaDireccions[i].direccion;							
								$scope._direcciones.push(tempDirec);
								this.idpersonadireccion="";
			
							};
						});
		}
		$scope.guardaMatrizPrimera = function()
		{
			var contador=$scope._matrices.length - 1;			
			var contadorHabilidades=0;
			if (contador>=0) {
				contadorHabilidades=$scope._matrices[contador].habilidades.length - 1
			};
			function guardarAtributo(data)
			{	
				for (var i = $scope._matrices[contador].habilidades[contadorHabilidades].atributotemp.length - 1; i >= 0; i--) {
					
					$.ajax({
					  async:false, 
					  cache:false,
					  url: 'http://'+$scope.IP+'/SpringGoraTeam/atributos/create/'+data+'/'+$scope._matrices[contador].habilidades[contadorHabilidades].atributotemp[i].idatributo,
					  method: 'POST', 
					  data: $.param($scope._matrices[contador].habilidades[contadorHabilidades].atributotemp[i]),
					  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					  success: function(data){console.log(data)}
					});
				};
				contadorHabilidades=contadorHabilidades-1;				
			};
			
			function guardarHabilidades(data)
			{	
				
				for (var i = $scope._matrices[contador].habilidades.length - 1; i >= 0; i--)
				 {
					$.ajax({
					  async:false, 
					  cache:false,
					   url: 'http://'+$scope.IP+'/SpringGoraTeam/habilidad/create/'+$scope.id+'/'+data+'/'+$scope._matrices[contador].habilidades[i].idhabilidades,
					  method: 'POST', 
					  data: $.param($scope._matrices[contador].habilidades[i]),
					  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					  success: function(data){guardarAtributo(data);}
					});
					
				};	 
				
				contador=contador-1;
			};
			function dataid(data)
			{
				$scope.id=data;
				
				 if ($scope._experiencias.length>0) {
					$http({
							method: 'POST', 
							url: 'http://'+$scope.IP+'/SpringGoraTeam/experiencia/create/'+$scope.id,
							dataType: 'json',
							data: JSON.stringify($scope._experiencias),
							contentType:'application/json'
						}); 
				}
				 for (var i = $scope._estudios.length - 1; i >= 0; i--) {
					$http({
							method: 'POST', 
							url: 'http://'+$scope.IP+'/SpringGoraTeam/formacion/create/'+$scope.id+'/'+$scope._estudios[i].iduniversidad+'/'+$scope._estudios[i].idcarrera+'/'+$scope._estudios[i].idgrado,
							data: $.param($scope._estudios[i]),
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						}); 
				 };
				 for (var i = $scope._matrices.length - 1; i >= 0; i--) {
				$.ajax({
					  async:false, 
					  cache:false,
					  url: 'http://'+$scope.IP+'/SpringGoraTeam/matriz/create/'+$scope.id+'/'+$scope._matrices[i].idcompetencia,
					  method: 'POST', 
					  data: $.param($scope._matrices[i]), 
					  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					  success: function(data){guardarHabilidades(data);}
					});
				};
			}
			if($scope._persona.nombres.trim().length < 1 || $scope._persona.apepat.trim().length < 1 || $scope._persona.apemat.trim().length < 1 
				|| $scope._persona.fechanacimiento.trim().length < 1 || $scope._persona.estadocivil== null || $scope._persona.nacionalidad== null
				|| $scope._persona.numerodocidentidad.trim().length < 1 || $scope._persona.tipodocidentidad.trim().length < 1 || $scope._persona.presentacion.trim().length < 1 )	
				{
					$.smallBox({
							title : "Los Datos personales son Obligatorios",
							content : "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
							color : "#C46A69",
							iconSmall : "fa fa-thumbs-up bounce animated",
							timeout : 4000
						});
				}
			else
			{
				$.SmartMessageBox({
					title : "Confirmar",
					content : "Esta Seguro que desea Finalizar y guardar la información?",
					buttons : '[Si][No]'
				}, function(ButtonPressed) {
					if (ButtonPressed === "Si") {
							dataid($scope.perid);
							$.smallBox({
								title : "Los Datos Fueron almacenados con exito",
								content : "<i class='fa fa-clock-o'></i> <i>Los datos fueron registrados con éxito</i>",
								color : "#659265",
								iconSmall : "fa fa-check fa-2x fadeInRight animated",
								timeout : 4000
							});
					};
					if (ButtonPressed === "No") {
						$.smallBox({
							title : "Confirmación cancelada",
							content : "<i class='fa fa-clock-o'></i> <i>No se guardó los cambios</i>",
							color : "#C46A69",
							iconSmall : "fa fa-times fa-2x fadeInRight animated",
							timeout : 4000
						});
					};
				});
				
			}		

		};
	}

smartApp.config(['$routeProvider', '$provide', function($routeProvider, $provide) {
	$routeProvider
		.when('/', {
			redirectTo: '/dashboard'
		})

		/* We are loading our views dynamically by passing arguments to the location url */

		// A bug in smartwidget with angular (routes not reloading). 
		// We need to reload these pages everytime so widget would work
		// The trick is to add "/" at the end of the view.
		// http://stackoverflow.com/a/17588833
		.when('/:page', { // we can enable ngAnimate and implement the fix here, but it's a bit laggy
			templateUrl: function($routeParams) {
				return 'views/'+ $routeParams.page +'.html';
			},
			controller: 'PageViewController'
		})
		.when('/:page/:child*', {
			templateUrl: function($routeParams) {
				return 'views/'+ $routeParams.page + '/' + $routeParams.child + '.html';
			},
			controller: 'PageViewController'
		})
		.otherwise({
			redirectTo: '/dashboard'
		});

	// with this, you can use $log('Message') same as $log.info('Message');
	$provide.decorator('$log', ['$delegate',
	function($delegate) {
		// create a new function to be returned below as the $log service (instead of the $delegate)
		function logger() {
			// if $log fn is called directly, default to "info" message
			logger.info.apply(logger, arguments);
		}

		// add all the $log props into our new logger fn
		angular.extend(logger, $delegate);
		return logger;
	}]); 

}]);

smartApp.run(['$rootScope', 'settings', function($rootScope, settings) {
	settings.currentLang = settings.languages[0]; // en
}])