function ControladorDatosPersonales($scope,$http)
	{   function Persona()
		{
			this.idpersona="";
			this.apepat="";
			this.apemat="";
			this.nombres="";
			this.estado="a";
			this.estadocivil="Soltero";
			this.fechanacimiento="";
			this.nacionalidad="Perú";			
			this.numerodocidentidad="";
			this.tipodocidentidad="";
			this.idManager=""
			this.codigo=" "
			this.sexo="M";		
			this.presentacion=""	
		}
		
		function Telefono()
		{
			this.idpersonatelefono="";
			this.idpersona="";
			this.telefono="";
			this.tipo ="";
			this.estado="a";
		}
		function Email()
		{
			
			this.idpersona="";
			this.idpersonaemail="";
			this.email="";
			this.tipo="";
			this.estado="a";
		}	
		function Direccion()
		{
			this.idpersonadireccion="";
			this.idpersona="";
			this.idubigeo="";
			this.direccion="";
			this.tipo="Casa";
			this.estado="a";
		}	

		//COMPETENCIAS=================================================//
		function competencia(){
			this.idcompetencia="";
  			this.descripcion="";
  			this.estado="A";

		}
		function matriz(){
			this.idmatriz="";
			this.idcompetencia="";
			this.idpersona="";
		}

		function habilidad(){
			this.idhabilidad="";
			this.idmatriz="";
		}

		function habilidades(){
		  this.idhabilidades="";
		  this.descripcion="";
		  this.fechaactualizacion="";
		  this.calificacion="";
		  this.idcompetencia="";

		}

		function atributo(){
		  this.idatributo="";
		  this.descripcion="";
		  this.estado="";
		}


		//COMPETENCIAS=================================================//

		$scope._persona= new Persona();
		$scope._direcciones= [];
		$scope._direccion= new Direccion();
		$scope._telefonos= [];
		$scope._telefono= new Telefono();
		$scope._emails= [];
		$scope._email= new Email();
		$scope.IP="10.77.33.117:8080"

		$scope.agregarDireccion = function(){

			var dir= new Direccion();
			dir.idpersonadireccion=$scope._direccion.idpersonadireccion;
			dir.idpersona=$scope._direccion.idpersona;
			dir.idubigeo=$scope._direccion.idubigeo[0];
			dir.direccion=$scope._direccion.direccion;
			dir.tipo=$scope._direccion.tipo;
			dir.estado=$scope._direccion.estado;
			$scope._direcciones.push(dir);
			
		};


		$scope.agregarEmail = function(){
			var ema= new Email();
			ema.idpersona=$scope._email.idpersona;
			ema.idpersonaemail=$scope._email.idpersonaemail;
			ema.email=$scope._email.email;
			ema.tipo=$scope._email.tipo;
			ema.estado=$scope._email.estado;
			$scope._emails.push(ema);
		};
		$scope.agregarTelefono = function(){
			var tel= new Telefono();

			tel.idpersonatelefono=$scope._telefono.idpersonatelefono;
			tel.idpersona=$scope._telefono.idpersona;
			tel.telefono=$scope._telefono.telefono;
			tel.tipo=$scope._telefono.tipo;			
			tel.estado=$scope._telefono.estado;
			$scope._telefonos.push(tel);
			//alert($scope._telefono.telefono)
		};
		$scope.prueba = function(){
			//$http.post('http://10.77.33.107:8080/SpringGoraTeam/persona/email/create/1',$scope._email.idpersona,$scope._email.idpersona);
			//$http.post('http://10.77.33.107:8080/SpringGoraTeam/persona/telefono/create/1',$scope._telefono);
			//$http.post('http://10.77.33.107:8080/SpringGoraTeam/persona/email/create/1',$scope._direcciones);
			function dataid(data)
			{
				$scope.id=data;
				for (var i = $scope._emails.length - 1; i >= 0; i--) {
				 	$http({
		        		    method: 'POST', 
		        		    url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/email/create/'+$scope.id,
		        		    data: $.param($scope._emails[i]),
		        		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		        		}); 
				 };
				 for (var i = $scope._telefonos.length - 1; i >= 0; i--) {
				 	$http({
		        		    method: 'POST', 
		        		    url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/telefono/create/'+$scope.id,
		        		    data: $.param($scope._telefonos[i]),
		        		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		        		}); 
				 };
				 for (var i = $scope._direcciones.length - 1; i >= 0; i--)
				 	{
				 	$http({
		        		    method: 'POST', 
		        		    url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/direccion/create/'+$scope.id,
		        		    data: $.param($scope._direcciones[i]),
		        		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		        		}); 
				 	};
			}
			$http({
        		    method: 'POST', 
        		    url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/create/',
        		    data: $.param($scope._persona),
        		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},

        		}).success(function(data){dataid(data);}); 
		 

		};
		$scope.Paises=["Peru","CHINA"]
		$scope.selectedNac=$scope.Paises[0];
		$scope.selectedIpais=$scope.Paises[0];
		$scope.DatosPersonales=[];
		$scope.Telefonos=[];
		$scope.Emails=[];		
		$scope.Direccion=[];
		$scope.Experiencia=[];	
		$scope.Estudios=[];	
		$scope.Habilidad=[];
		$scope.Competencia=[];
			
		$scope.selectedAtributo=[];
		$scope.tipoFono='Movil'
		$scope.tipoDireccion="Casa"		
		$scope.Sexo = 'M';
		//$scope.prov;
		$scope.tipoDocumento='1';
 		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/departamentos').success(function(data) {
   	        $scope.items = data ;
          $scope.seleccDepartamento = $scope.items[-1];  
        });
        $scope.llamaTipoDocumento= function()
        {			
			$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/tipodocumentos').success(function(data) {
	   	        $scope.tipoDocumento = data ;
	            //$scope.seleccProvincia = $scope.items2[-1];  
	        });
	 	} 	
	 	$scope.llamaDepartamento = function()
        {			
			$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/departamento/'+$scope.seleccDepartamento+'/provincias').success(function(data) {
	   	        $scope.items2 = data ;
	            $scope.seleccProvincia = $scope.items2[-1];  
	        });
	 	}
        $scope.llamaProvincia = function(){
       	$scope.dept=$scope.seleccDepartamento;
		$scope.prov=$scope.seleccProvincia;
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/departamento/'+$scope.dept+'/provincia/'+$scope.seleccProvincia+'/distritos').success(function(data) {
   	        $scope.items3 = data;
          $scope.seleccDistrito = $scope.items3[-1];  

        });
 	}		

		
		
		$scope.cargaDatos = function(){
			$scope.DatosPersonales = [{nombres:"Wilmer Antonio", apellidosPa:"Cotrina",apellidosMa:"Barzola", sexo:"d",nacionalidad:"Perú",estadocivil:"1",tipodocidentidad:"DNI", numerodocidentidad:"42685235", fecNac:"ddd"}] 
		 
   	        alert($scope.DatosPersonales[0].nombres)
		};

		$scope.Experiencia=[];
		
		$scope.agregarExperiencia = function(){
			$scope.Experiencia.push({puesto:$scope.textoPuesto, Empresa:$scope.Empresa,pais:$scope.selectedIpais.nombre,descripcion:$scope.descripcion,fecIni:$("#startdate").val(),fecFin:$("#finishdate").val()});
			//limpiar();
			alert($scope.Experiencia[0].pais)
			$("#pestañas").show();
		};
    	$scope.guardarEstudios = function(){
			$scope.Estudios.push({institucion:$scope.textoPuesto, titulo:$scope.Empresa,nivel:$("#nivel option:selected").html(),grado:$scope.descripcion,fecIni:$("#fechaInicio01").val(),fecFin:$("#fechaFin01").val(),descripcion:$scope.descripcionEst});
			alert($("#nivel option:selected").html())
			$("#pestañaEstudios").show();
		};
		$scope.cargaInstiruciones = function(){

			$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/universidades').success(function(data) {
   	        $scope.Instituciones = data ;
         	$scope.selectUni = $scope.Instituciones[0];  
        	});
        	$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/carreras').success(function(data) {
		   	     $scope.itemsCarre = data ;
		         $scope.seleccCarrera = $scope.itemsCarre[0];  	      	
		        });
        	$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/grados').success(function(data) {
		   	    
		   	      $scope.itemsGrado = data ;
		          $scope.seleccGrado = $scope.itemsGrado[0];  
		           alert($scope.itemsGrado[0])
		        });

		};
		$scope.cargaCompetencia= function(){			 
			$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/competencias').success(function(data) {
   	        $scope.itenCompetencia = data ;
         	$scope.selectCompe = $scope.itenCompetencia[1];  
         	//tener cuidado  aca la seleccion esta enuno por pruebas debe estar en 0
        	});
		};
		$scope.llamaDHablidad= function(){
			$http.get('http://'+$scope.IP+'/SpringGoraTeam/competencia/'+$scope.selectCompe[0]+'/habilidades').success(function(data) {
   	        $scope.Hablidad = data;
   	        $scope.selectHabi = $scope.Hablidad[0];
   	        $("#divHbilidad").show();  
   	        //$scope.llamaDAtributo();

        	});		 
			
		};

		$scope.llamaDAtributo= function(){
			$http.get('http://'+$scope.IP+'/SpringGoraTeam/habilidad/'+$scope.selectHabi[0]+'/atributos').success(function(data) {
   	        $scope.itenAtributos = data ;
        	});		 
			//alert( $scope.itenAtributos+"  *W* ");
			
		};
		
			$scope.llamaDeTodo= function(){
			 //for (var i = $scope.selectedAtributo.length - 1; i >= 0; i--) {
			 //	alert($scope.selectedAtributo[i][1]+" +++ ");	

			 //			 };
         	
			//alert( $scope.itenAtributos+"  *W* ");
			
		};

		$scope.Competencias=[];
		
		$scope.agregarCompetencia = function(){
			$scope.Competencias.push({competencia:$scope.selectCompe[1], Habilidad:$scope.selectHabi[1]});
			//alert($scope.selectedAtributo.length);
			for (var i = $scope.selectedAtributo.length - 1; i >= 0; i--) {
				alert("Dege- "+$scope.selectedAtributo[i][1]);
				var atrib=$scope.selectedAtributo[i][1];
				$scope.Competencias.push({atributo:atrib});
				alert($scope.Competencias[0].atributo);
				//alert($scope.Competencias[0]);
			}
			//limpiar();
			alert($scope.Competencias[0].competencia+" - "+$scope.Competencias[0].Habilidad);
			for (var i = $scope.Competencias.selectedAtributo.length - 1; i >= 0; i--) {
				//alert(i+" - "+$scope.Competencias[i].atributo);
			}
			//$("#pestañas").show();
			//alert("Hola GEnte");
		};
		
		function Matriz()
		{
			this.idMatriz="";
			this.idcompe= "";
			this.idpersona="";
			alert("ss");
		}

		function Habilidades()
		{
			this.idMatriz="";
			this.idHabilidad="";
		}
		function Atributos()
		{
			this.idMatriz="";
			this.idHabilidad="";
			this.idHabilidad="";
		}


	}