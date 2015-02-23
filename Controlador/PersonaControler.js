function controladorPrincipal($scope,$http){
	$scope.perid=sessvars.myObj[0];
	$scope.TamañoMatriz=0;
	$scope.TamañoFormacion=0;
	$scope.TamañoExp=0;
	

	$scope.cargaListas=function()
	{
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/departamentos').success(function(data) {
			$scope.items = data ;
		  $scope.seleccDepartamento = $scope.items[-1];  
		}).error(function(data) 
									{
										msgError();
									});
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/nacionalidad').success(function(data) {
				$scope.Nacionalidad = data ;
			}).error(function(data) 
									{
										msgError();
									});
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/estadocivil').success(function(data) {
				$scope.Estadocivil = data ;
			}).error(function(data) 
									{
										msgError();
									});
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/tipodocumentos').success(function(data) {
				$scope.tipoDocumento = data ;
			}).error(function(data) 
									{
										msgError();
									});
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/tipoemail').success(function(data) {
				$scope.TipoEmail = data ;
			}).error(function(data) 
									{
										msgError();
									});
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/tipotelefono').success(function(data) {
				$scope.TipoTelefono = data ;
			}).error(function(data) 
									{
										msgError();
									});
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/tipodireccion').success(function(data) {
				$scope.TipoDireccion = data ;
			}).error(function(data) 
									{
										msgError();
									});
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/competencias').success(function(data) {
			$scope.itenCompetencia = data ;
			$scope._matriz.idcompetencia = $scope.itenCompetencia[-1];  
			
			}).error(function(data) 
									{
										msgError();
									});
		 $http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/cargos').success(function(data) {
				$scope.TipoCargo = data ;
			}).error(function(data) 
									{
										msgError();
									});
	}

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
			this.tipodocidentidad="DNI";
			this.idManager="";
			this.codigo="";
			this.sexo="M";      
			this.presentacion="";
			this.perfil="INCOMPLETO";   
		}
		function Usuario()
		{
			this.estado="A";
			this.usuario="";
			this.pass=""
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
			this.encurso=""
			this.indice="";
			
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
			this.encurso=""
			this.indice=""
			
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
			this.nomatributo="";
			this.idhabilidad="";

		}
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
		$scope._usuario= new Usuario(); 
		$scope.estaFormaci=false;
		$scope.estadoExp=false;
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
		$scope.expActual = function()
		{
			if ($scope.estadoExp) 
			{
				$("#finishdate").prop('disabled', false);               
				
			}
			else
			{
				$("#finishdate").prop('disabled', true);
				$scope._experiencia.anhofin="";
			}
			;   

		}
		$scope.formActual = function()
		{           if ($scope.estaFormaci) 
			{
				$("#fechaFin01").prop('disabled', false);               
				
			}
			else
			{
				$("#fechaFin01").prop('disabled', true);
				$scope._estudio.anhofin="";
			};  

		}
		
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
				$.smallBox({
					title : "Requisitos Minimos",
					content :"Debe Seleccionar un Tipo de Dirección",
					color : "#C46A69",
					icon : "fa fa-warning shake animated",
					timeout : 4000
								});
			}
			else if ($scope._direccion.direccion.trim().length < 1) 
			{
				$.smallBox({
					title : "Requisitos Minimos",
					content :"Debe Ingresar una Dirección",
					color : "#C46A69",
					icon : "fa fa-warning shake animated",
					timeout : 4000
								});
			}
			else if ($scope._direccion.idubigeo == null) 
			{
				$.smallBox({
					title : "Requisitos Minimos",
					content :"Debe elegir su departamento provincia y distrito",
					color : "#C46A69",
					icon : "fa fa-warning shake animated",
					timeout : 4000
							});
			}
			else
			{
				var dir= new Direccion();

				dir.idpersonadireccion=$scope._direccion.idpersonadireccion;
				dir.idpersona=$scope._direccion.idpersona;
				dir.idubigeo=$scope._direccion.idubigeo[0];
				dir.direccion=$scope._direccion.direccion;
				dir.tipo=$scope._direccion.tipo;
				dir.estado=$scope._direccion.estado;
				dir.descripcion="Tipo de Dirección: "+$scope._direccion.tipo+"\nDirección:"+$scope._direccion.direccion+"\n"+$scope.seleccDepartamento+" - "+$scope.seleccProvincia+" - "+$scope._direccion.idubigeo[1];
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
				$.smallBox({
					title : "Requisitos Minimos",
					content :"Debe Seleccionar un Tipo de Email",
					color : "#C46A69",
					icon : "fa fa-warning shake animated",
					timeout : 4000
								});
			}
			else if ($scope._email.email.trim().length < 1) 
			{
				$.smallBox({
					title : "Requisitos Minimos",
					content :"Debe Ingresar un Email",
					color : "#C46A69",
					icon : "fa fa-warning shake animated",
					timeout : 4000
								});
			}
			else if($scope._email.tipo=="LABORAL") 
			{   if(/\w+([-+.']\w+)*(@GORA)\.COM$/.test($scope._email.email)) 
				{
					var ema= new Email();
					ema.idpersona=$scope._email.idpersona;
					ema.idpersonaemail=$scope._email.idpersonaemail;
					ema.email=$scope._email.email;
					ema.tipo=$scope._email.tipo;
					ema.estado=$scope._email.estado;
					$scope._emails.push(ema);
				}
				else
				{
					$.smallBox({
					title : "EMAIL LABORAL",
					content :"El correo laboral debe ser de @GORA.COM",
					color : "#C46A69",
					icon : "fa fa-warning shake animated",
					timeout : 4000
								});
				}
				
			}
			else{
				if(/^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test($scope._email.email)) 
				{
					var ema= new Email();
					ema.idpersona=$scope._email.idpersona;
					ema.idpersonaemail=$scope._email.idpersonaemail;
					ema.email=$scope._email.email;
					ema.tipo=$scope._email.tipo;
					ema.estado=$scope._email.estado;
					$scope._emails.push(ema);
				}
				else
				{
					$.smallBox({
					title : "EMAIL INVALIDO",
					content :"Debe Ingresar un formato Valido",
					color : "#C46A69",
					icon : "fa fa-warning shake animated",
					timeout : 4000
								});
				}
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

			
		}
		
		$scope.llamaDHablidad= function(){
			$(".select2-search-choice").remove();
			$scope.itenAtributos=[];
			$("#agregah").hide();
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
		if ($scope._estudio.anhofin<$scope._estudio.anhoinicio && $scope.estaFormaci==false) 
				{
						$.smallBox({
							title : "Error el año de Inicio es menor al Año de Finalización",
							content : "<i class='fa fa-clock-o'></i> <i>2 seconds ago...</i>",
							color : "#C46A69",
							iconSmall : "fa fa-thumbs-up bounce animated",
							timeout : 4000
						});
				}
		else if($scope._estudio.iduniversidad== null|| $scope._estudio.idcarrera== null|| $scope._estudio.nivelestudio== null|| $scope._estudio.idgrado== null || $scope._estudio.descripcion.trim().length<1||  $scope._estudio.anhoinicio.trim().length<1)
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
			est.idformacion="";
			est.indice= $scope._estudios.length;    
			est.iduniversidad=$scope._estudio.iduniversidad[0];
			est.uninom =$scope._estudio.iduniversidad[1];           
			est.idcarrera=$scope._estudio.idcarrera[0]; 
			est.nomCarrera=$scope._estudio.idcarrera[1];        
			est.idgrado =$scope._estudio.idgrado[0];
			est.nivelestudio=$scope._estudio.nivelestudio[1];   
			est.anhoinicio=$scope._estudio.anhoinicio;
			est.anhofin =$scope._estudio.anhofin;
			est.descripcion=$scope._estudio.descripcion;
			if ($scope.estaFormaci) 
				{
					est.encurso="1";
					est.anhofin="1990/01/01"
				}
				else{
					est.encurso="0";
				};          
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
			
		if ($scope._experiencia.anhofin<$scope._experiencia.anhoinicio && $scope.estadoExp==false) 
			{
					$.smallBox({
						title : "Error el año de Inicio es menor al Año de Finalización",
						content : "<i class='fa fa-exclamation-triangle'></i> <i>2 seconds ago...</i>",
						color : "#C46A69",
						iconSmall : "fa fa-thumbs-up bounce animated",
						timeout : 4000
					});
			}

		else if($scope._experiencia.empresa.trim().length<1|| $scope._experiencia.cargo== null|| $scope._experiencia.pais== null || $scope._experiencia.descripcion.trim().length<1|| $scope._experiencia.anhoinicio.trim().length<1)
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
				exp.idexperiencia="";
				exp.indice=$scope._experiencias.length;
				exp.cargo=$scope._experiencia.cargo[0];
				exp.cargonom=$scope._experiencia.cargo[1];
				exp.descripcion=$scope._experiencia.descripcion;
				exp.estado=$scope._experiencia.estado;
				exp.idpersona=$scope._experiencia.idpersona;
				exp.empresa=$scope._experiencia.empresa;
				exp.pais=$scope._experiencia.pais;
				exp.anhoinicio=new Date($scope._experiencia.anhoinicio);
				exp.anhofin=new Date($scope._experiencia.anhofin);
				if ($scope.estadoExp) 
				{
					exp.encurso="1";
					exp.anhofin=new Date("1990/01/01");
				}
				else
				{
					exp.encurso="0";
				};  
				
				$scope._experiencias.push(exp); 
				$("#pestañas").show();
				$("#experiencia").hide();
				$("#agregar").show();
				$scope._experiencia.idexperiencia="";           
				$scope._experiencia.cargo="";
				$scope._experiencia.descripcion="";
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
			
			habi.idMatriz=Math.floor((Math.random() * 1000) + 1);
			habi.idHabilidad=Math.floor((Math.random() * 100) + 1);
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
								
						  
					  }).success(function(data)
					  {
						if (data==1) 
							{
								$.smallBox({
								title : "Error de Identidad ",
								content :"El Numero de Documento de Identidad ya se encuentra registrado en la base de Datos",
								color : "#C46A69",
								icon : "fa fa-warning shake animated",
								timeout : 4000
											});
								$scope._persona.numerodocidentidad="";
							};
						});
			}
		};
		$scope.verificacionUsuario=function (){
			if($scope._usuario.usuario.trim().length>9){
			$http({
					method: 'POST', 
					url: 'http://'+$scope.IP+'/SpringGoraTeam/usuario/validausuario',
					data: $.param({usuario:$scope._usuario.usuario.trim()}),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						}).success(function(data)
						  {
							if (data==1) 
								{
									$.smallBox({
									title : "Email",
									content :"El Correo Ingresado ya se encuentra Registrado",
									color : "#C46A69",
									icon : "fa fa-warning shake animated",
									timeout : 4000
												});
									$scope._usuario.usuario="";
								};
							}).error(function(data) 
										{
											msgErrorGuardar();
										}); 
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
		$scope.primerSave = function()
			{
				if( $scope._persona.numerodocidentidad.trim().length < 1 ||  $scope._usuario.usuario.length < 1)    
				{
					$.smallBox({
							title : "Requisitos Minimos para el Registro",
							content : "Los Datos obligatorios son el Numero de Documento y un correo Laboral",
							color : "#C46A69",
							iconSmall : "fa fa-thumbs-up bounce animated",
							timeout : 4000
						});
				}
				else
				{   if(/\w+([-+.']\w+)*(@GORA)\.COM$/.test($scope._usuario.usuario)) 
					{   $scope._usuario.pass=$scope._persona.numerodocidentidad;
						$.SmartMessageBox({
						title : "Confirmar",
						content : "Esta Seguro que desea Finalizar y guardar la información?",
						buttons : '[Si][No]'
							}, function(ButtonPressed) {
								if (ButtonPressed === "Si")
								{
									
									$http({
											method: 'POST', 
											url: 'http://'+$scope.IP+'/SpringGoraTeam/usuario/create/',
											data: $.param($scope._usuario),            
											headers: {'Content-Type': 'application/x-www-form-urlencoded'},
									}).success(function(data)
											{
												$scope._persona.numerodocidentidad="";
												$scope._usuario.usuario="";
												$.smallBox({
												title : "Los Datos Fueron almacenados con exito",
												content : "<i class='fa fa-clock-o'></i> <i>Los datos fueron registrados con éxito</i>",
												color : "#659265",
												iconSmall : "fa fa-check fa-2x fadeInRight animated",
												timeout : 4000});
											}
										).error(function(data) 
													{
														msgErrorGuardar();
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
					else
					{
						$.smallBox({
						title : "EMAIL LABORAL",
						content :"El correo laboral debe ser de @GORA.COM",
						color : "#C46A69",
						icon : "fa fa-warning shake animated",
						timeout : 4000
									});
					}
					
				}       
				
					
			}
		$scope.guardaMatrizUpdate = function()
		{
			var contador=$scope._matrices.length - 1;           
			var contadorHabilidades=0;
			if (contador>=0) {
				contadorHabilidades=$scope._matrices[contador].habilidades.length - 1
			};
			function guardarAtributo(atributo,data)
			{   
				for (var i = atributo.length - 1; i >= 0; i--) {
					
					$.ajax({
					  async:false, 
					  cache:false,
					  url: 'http://'+$scope.IP+'/SpringGoraTeam/atributos/create/'+data+'/'+atributo[i].idatributo,
					  method: 'POST', 
					  data: $.param(atributo[i]),
					  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					  success: function(data){console.log(data)}
					});
				};          
			};
			
			function guardarHabilidades(habilidad,data)
			{   
				
				for (var i = habilidad.length - 1; i >= 0; i--)
				 {
					$.ajax({
					  async:false, 
					  cache:false,
					   url: 'http://'+$scope.IP+'/SpringGoraTeam/habilidad/create/'+$scope.id+'/'+data+'/'+habilidad[i].idhabilidades,
					  method: 'POST', 
					  data: $.param(habilidad[i]),
					  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					  success: function(data){guardarAtributo(habilidad[i].atributotemp,data);}
					});
					
				};   
			};
			function dataid(data)
			{
				$scope.id=data;
				if ($scope._emails.length>0) { 
				$http(
				{

					  method: 'POST', 
					  url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/email/update/'+$scope.id,
					  dataType: 'json',
					  data:JSON.stringify($scope._emails),            
					  contentType:'application/json'      
					  }).error(function(data) 
									{
										msgErrorGuardar();
									});
				};
					  if ($scope._telefonos.length>0) {              
					$http({
							method: 'POST', 
							url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/telefono/update/'+$scope.id,
							dataType: 'json',
							data: JSON.stringify($scope._telefonos),
							contentType:'application/json'
						}).error(function(data) 
									{
										msgErrorGuardar();
									}); 
				};
					if ($scope._direcciones.length>0) {
					$http({
							method: 'POST', 
							url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/direccion/update/'+$scope.id,
							dataType: 'json',
							data: JSON.stringify($scope._direcciones),
							contentType:'application/json'
						}).error(function(data) 
									{
										msgErrorGuardar();
									});
				};
					if ($scope._experiencias.length>0) {
						$http({
							method: 'POST', 
							url: 'http://'+$scope.IP+'/SpringGoraTeam/experiencia/update/'+$scope.id,
							dataType: 'json',
							data: JSON.stringify($scope._experiencias),
							contentType:'application/json'
						}).error(function(data) 
									{
										msgErrorGuardar();
									}); 
					};
					
				 for (var i = $scope._estudios.length - 1; i >= 0; i--) {
					$http({
							method: 'POST', 
							url: 'http://'+$scope.IP+'/SpringGoraTeam/formacion/update/'+$scope.id+'/'+$scope._estudios[i].iduniversidad+'/'+$scope._estudios[i].idcarrera+'/'+$scope._estudios[i].idgrado,
							data: $.param($scope._estudios[i]),
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						}).error(function(data) 
									{
										msgErrorGuardar();
									}); 
				 };
				 for (var i = $scope._matrices.length - 1; i >= $scope.TamañoMatriz; i--) {
				$.ajax({
					  async:false, 
					  cache:false,
					  url: 'http://'+$scope.IP+'/SpringGoraTeam/matriz/create/'+$scope.id+'/'+$scope._matrices[i].idcompetencia,
					  method: 'POST', 
					  data: $.param($scope._matrices[i]), 
					  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					  success: function(data){guardarHabilidades($scope._matrices[i].habilidades,data);},
					  error:function(data){guardarHabilidades($scope._matrices[i].habilidades,data);}
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
						if ($scope._matrices.length>0 && $scope._estudios.length>0 && $scope._experiencias.length>0) {$scope._persona.perfil="COMPLETO";};
							
				$http({
					method: 'POST', 
					url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/update/user/'+sessvars.myObj[6],
					data: $.param($scope._persona),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},

				}).success(function(data)
							{
								dataid(data);
								$.smallBox({
								title : "Los Datos Fueron almacenados con exito",
								content : "<i class='fa fa-clock-o'></i> <i>Los datos fueron registrados con éxito</i>",
								color : "#659265",
								iconSmall : "fa fa-check fa-2x fadeInRight animated",
								timeout : 4000});
							}
						).error(function(data) 
									{
										msgErrorGuardar();
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
		

		$scope.cargaInicio=function ()
		{
			var id=$scope.perid;
			$http({ method: 'GET', 
					url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/'+id,
					}).success(function(data)
						{
							$scope._emails=[];
							var dt_to="anhofin"
							$scope._persona.idpersona=data.idpersona;
							$scope._persona.nombres=data.nombres;
							$scope._persona.apepat=data.apepat;
							$scope._persona.apemat=data.apemat;
							$scope._persona.estadocivil=data.estadocivil;
							if (data.fechanacimiento!=null) 
								{
									var dateee=data.fechanacimiento.replace(/\-/g, '/');
									$scope._persona.fechanacimiento= $.datepicker.formatDate('yy/mm/dd', new Date(dateee));
								}
							else
								{
									$scope._persona.fechanacimiento="";
								};
							$scope._persona.nacionalidad=data.nacionalidad;
							if (data.tipodocidentidad!=null)
								$scope._persona.tipodocidentidad=data.tipodocidentidad;
							else
								$scope._persona.tipodocidentidad="DNI";
							if (data.sexo!=null) 
								$scope._persona.sexo=data.sexo;
							else
								$scope._persona.sexo="M";

							$scope._persona.numerodocidentidad=data.numerodocidentidad;
							$scope._persona.presentacion=data.presentacion;
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
								$http({ method: 'GET', 
								url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/'+id+'/experiencias',
								}).success(function(data)
									{   if (data.length>0) {$("#pestañas").show();};
											
										for (var i = data.length - 1; i >= 0; i--) {
											var temp= new Experiencia();
											temp.idexperiencia=data[i].idexperiencia;
											temp.cargo=data[i].cargo;
											temp.idpersona=data[i].idpersona;
											temp.descripcion=data[i].descripcion;                                       
											temp.cargonom=$scope.TipoCargo.filter(function (person) { return person[0] == "2" })[0][1];
											temp.indice=$scope._experiencias.length;
											temp.anhofin=data[i].anhofin;
											temp.pais=data[i].pais;
											temp.encurso=data[i].encurso;
											temp.anhoinicio=data[i].anhoinicio;
											temp.empresa=data[i].empresa;
											$scope._experiencias.push(temp);
										};
										$scope.TamañoExp=$scope._experiencias.length;   
									}).error(function(data) 
										{
											msgError();
										});
								$http({ method: 'GET', 
								url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/'+id+'/formacion',
								}).success(function(data)
									{   if (data.length>0) {$("#pestañaEstudios").show();};
														
										for (var i = data.length - 1; i >= 0; i--) {
											var temp= new Estudio();
											temp.idformacion=data[i].idformacion;
											temp.iduniversidad=data[i].universidad.iduniversidad;
											temp.uninom=data[i].universidad.nombre;
											temp.idgrado=data[i].grado.idgrado;
											temp.encurso=data[i].encurso;
											temp.idpersona=data[i].idpersona;
											temp.descripcion=data[i].descripcion;                                       
											
											temp.indice=$scope._estudios.length;                                            
											temp.idcarrera=data[i].carrera.idcarrera;                                           
											temp.nomCarrera=data[i].carrera.nombre;
											temp.nivelestudio=data[i].nivelestudio;
											var dateee=data[i].anhofin.replace(/\-/g, '/');
												dt_to = $.datepicker.formatDate('yy/mm/dd', new Date(dateee));
											temp.anhofin=dt_to;
											var dateee2=data[i].anhoinicio.replace(/\-/g, '/');
												dt_to2 = $.datepicker.formatDate('yy/mm/dd', new Date(dateee2));
											temp.anhoinicio=dt_to2;
											$scope._estudios.push(temp);
										};
										$scope.TamañoFormacion=$scope._estudios.length; 
									}).error(function(data) 
										{
											msgError();
										});
								$http({ method: 'GET', 
								url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/'+id+'/competencias',
								}).success(function(data)
									{   
											for (var i = data.length - 1; i >= 0; i--) {
											var temp= new Matriz();
											temp.idmatriz=data[i][0];
											temp.idcompetencia=data[i][1];
											temp.nomcompetencia=data[i][2];
											temp.idpersona=id;
											
											temp.habilidades=guardarHabi(data[i][1]);
											temp.estado="A";                                            
											$scope._matrices.push(temp);
											
											
										};
										$scope.TamañoMatriz=$scope._matrices.length;                        
									}).error(function(data) 
									{
										msgError();
									});
						}).error(function(data) 
									{
										msgError();
									});
			function guardarHabi(x)
			{ var habilidades=[];
				$http({ method: 'GET', 
				url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/'+id+'/'+x+'/habilidades',
				}).success(function(data)
					{   
						for (var i = data.length - 1; i >= 0; i--)
						{
							var tempH= new Habilidad();
							tempH.idMatriz="";
							tempH.idHabilidad=data[i][1];
							tempH.idpersona="";
							tempH.idhabilidades=data[i][0];
							tempH.nomhabilidades=data[i][2];
							tempH.atributotemp=guardaAtri(x,tempH.idHabilidad);
							habilidades.push(tempH);
																	
						}
														
												
				}).error(function(data) {
					msgError();
				  });
				return  habilidades;
			}
			function guardaAtri(x,y)
			{ var atributos=[];
				$http({ method: 'GET', 
				url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/'+id+'/'+x+'/'+y+'/atributos',
				}).success(function(data)
				{   
					for (var i = data.length - 1; i >= 0; i--)
					{
						var atributo= new Atributos();
						atributo.idatributos=data[i][0];
						atributo.idatributo=data[i][1];
						atributo.nomatributo=data[i][2];
						atributo.idhabilidad=y;
						atributos.push(atributo);
					}
																	
				}).error(function(data) {
					msgError();
				  });       
				return  atributos;
			}
		}
		$scope.filtro=function()
		{   
			Array.prototype.remove = function(x) { 
				var i;
				for(i in this){
					if(this[i].toString() == x.toString()){
						this.splice(i,1)
					}
				}
			}
			for (var i = $scope._matrices.length - 1; i >= 0; i--) {
				
				$scope.itenCompetencia.remove( [$scope._matrices[i].idcompetencia, $scope._matrices[i].nomcompetencia]);
				
			};
			
			
		}
	}