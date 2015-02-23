function ControladorDatosCompetencia($scope, $http){   
	$scope.IP=IP;
	$scope._comp= [];		
	$scope._hab= [];
	$scope._atri= [];
	$scope.listPersonaCompetencia = [];

	$scope.init= function(){
		getDataOfService();
	};
	
	
	
	
	$http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/competencias').success(function(data) {
	    $scope.items4 = data ;
      	$scope.seleccCompetencia = $scope.items4[-1];
    });
    $http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/habilidades').success(function(data) {
   	    $scope.items5 = data ;
   	    $scope.seleccHabilidad = $scope.items5[-1];
    });
    $http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/atributos').success(function(data) {
	        $scope.items6 = data ;
		$scope.seleccAtributo = $scope.items6[-1];
    });

	$scope.updateArrayCompetencia= function(){
		reset();
		$scope._comp = [];
		if($scope.seleccCompetencia.length > 0){
			for (var i = 0; i < $scope.seleccCompetencia.length ; i++) {
				var compe=$scope.seleccCompetencia[i];
				$scope._comp[i]= compe[0];
			};
		};

		getDataOfService();
	};
	$scope.updateArrayHabilidad= function(){
		reset();
		$scope._hab = [];
		if($scope.seleccHabilidad.length > 0){
			for (var i = 0; i < $scope.seleccHabilidad.length ; i++) {
				var compe=$scope.seleccHabilidad[i];
				$scope._hab[i]= compe[0];
			};
		};

		getDataOfService();
	};
	$scope.updateArrayAtributo= function(){
		reset();
		$scope._atri = [];
		if($scope.seleccAtributo.length > 0){
			for (var i = 0; i < $scope.seleccAtributo.length ; i++) {
				var compe=$scope.seleccAtributo[i];
				$scope._atri[i]= compe[0];
			};
	    };

	    getDataOfService();
	};

	$scope.cargarAtributos= function(idPersona){
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+idPersona+'/atributos').success(function (data2) {
			$('#dialog_atributo').data("idListAtributos",data2);
			$('#dialog_atributo').dialog('open');
			return false;
        });
	};

	$scope.cargarEmails= function(idPersona){
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+idPersona+'/email').success(function (data2) {
			$('#dialog_email').data("idListEmail", data2);
			$('#dialog_email').dialog('open');
			return false;
        });
	};

	$scope.cargarTelefonos= function(idPersona){
		$http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+idPersona+'/telefono').success(function (data2) {
			$('#dialog_telefono').data("idListTelefono", data2);
			$('#dialog_telefono').dialog('open');
			return false;
        });
	};

	$scope.isExisteId= function(idPersona){
		if(typeof idPersona === 'undefined'){
			return false;
		}else{
			return true;
		};
	};
	
	var reset=function(){
		$scope.paginacion=0;
		$scope.pagina=1;
		$scope.totalResultados=0;
	}
	
	$scope.paginacion=0;
	$scope.pagina=1;
	$scope.totalResultados=0;
	function getDataOfService(){
      	$http({
       	   method: 'POST', 
       	   url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/filtro/'+$scope.pagina,
		   params: {competencias:$scope._comp,habilidades:$scope._hab,atributos:$scope._atri},       	   
		   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
       	}).success(function (data) {
       		var filtroPersona = data;
       		$scope.listPersonaCompetencia = [];
			if(filtroPersona.length > 0){
				//Obtener numero de paginacion
				$scope.paginacion=parseInt(filtroPersona[filtroPersona.length-1].codigo);
				$scope.totalResultados=parseInt(filtroPersona[filtroPersona.length-1].numerodocidentidad);							
				filtroPersona.splice(filtroPersona.length-1, 1);
				
				$scope.llenarPaginasTotal($scope.paginacion);				
				
				////////
				var contador=0;
				for (var i = 0; i < filtroPersona.length ; i++) {
					var idPersona=filtroPersona[i].idpersona;
					$http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+idPersona+'/jefe').success(function (data) {
						var varPerson=filtroPersona[contador];

			          	var filtroPersonaFinal = new Object();
			          	filtroPersonaFinal.idPerson= varPerson.idpersona;
		          		filtroPersonaFinal.nombres= varPerson.nombres;
		          		filtroPersonaFinal.apellidos= getLastNameOk (varPerson.apepat, varPerson.apemat);
		          		filtroPersonaFinal.idJefe= data.idpersona;
		          		filtroPersonaFinal.nombresJefe= data.nombres; 
		          		filtroPersonaFinal.apellidosJefe= getLastNameOk (data.apepat, data.apemat);
			          	$scope.listPersonaCompetencia[contador]=filtroPersonaFinal;
			          	contador++;
			        });
				};
				
			}else{$scope.pagina=1;$scope.paginacion=0;totalResultados=0;};
		});
	}

	function getLastNameOk (apepat, apemat) {
		if(typeof apepat === 'undefined'){
		   return '';
		}else if(typeof apemat === 'undefined'){
			return apepat;
		}else{
			return apepat+' '+apemat;
		}
	};

	/*
	 * CONVERT DIALOG TITLE TO HTML
	 * REF: http://stackoverflow.com/questions/14488774/using-html-in-a-dialogs-title-in-jquery-ui-1-10
	 */
	$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
		_title : function(title) {
			if (!this.options.title) {
				title.html("&#160;");
			} else {
				title.html(this.options.title);
			}
		}
	}));

	$('#dialog_atributo').dialog({
		autoOpen : false,
		width : 600,
		height: 400,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4>Atributos</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check'></i>&nbsp; OK", "class" : "btn btn-primary",
			click : function() {
				$(this).dialog("close");
			}
		}],
		open: function(event, ui) {
			$('#dialog_atributo tbody').children('tr').remove();

	        var listAtributos = $('#dialog_atributo').data("idListAtributos");

			var tbody = $('#dialog_atributo tbody');
			var props = ["1", "2", "3"];
			$.each(listAtributos, function(i, atributos) {
				var tr = $('<tr>');
				$.each(props, function(i, prop) {
					$('<td>').html(atributos[prop]).appendTo(tr);
				});
				tbody.append(tr);
			});

    	},
	}).css({overflow:"auto"});

	$('#dialog_email').dialog({
		autoOpen : false,
		width : 600,
		height: 400,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4>Email</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check'></i>&nbsp; OK", "class" : "btn btn-primary",
			click : function() {
				$(this).dialog("close");
			}
		}],
		open: function(event, ui) {
			$('#dialog_email tbody').children('tr').remove();

	        var listEmail = $('#dialog_email').data("idListEmail");

			var tbody = $('#dialog_email tbody');
			var props = ["email", "tipo", "estado"];
			$.each(listEmail, function(i, emails) {
				var tr = $('<tr>');
				$.each(props, function(i, prop) {
					$('<td>').html(emails[prop]).appendTo(tr);
				});
				tbody.append(tr);
			});

    	},
	}).css({overflow:"auto"});

	$('#dialog_telefono').dialog({
		autoOpen : false,
		width : 600,
		height: 400,
		resizable : false,
		modal : true,
		title : "<div class='widget-header'><h4>Telefonos</h4></div>",
		buttons : [{
			html : "<i class='fa fa-check'></i>&nbsp; OK", "class" : "btn btn-primary",
			click : function() {
				$(this).dialog("close");
			}
		}],
		open: function(event, ui) {
			$('#dialog_telefono tbody').children('tr').remove();

	        var listTelefono = $('#dialog_telefono').data("idListTelefono");

			var tbody = $('#dialog_telefono tbody');
			var props = ["telefono", "tipo", "estado"];
			$.each(listTelefono, function(i, telefonos) {
				var tr = $('<tr>');
				$.each(props, function(i, prop) {
					$('<td>').html(telefonos[prop]).appendTo(tr);
				});
				tbody.append(tr);
			});

    	},
	}).css({overflow:"auto"});
			
	
		$scope.getNumber = function(pag) {			
			return new Array(pag);   
		}
		
		
		$scope.updatePagina= function(pag){				
			$scope.pagina=pag;								
			if(pag==($scope.flag+10)){				
				$scope.paginasMostrar.splice(0,10);
				//$scope.$apply();
				$scope.flag=($scope.flag+9);
				$scope.llenarPaginas($scope.paginasTotal);								
			}			
			if(pag<=($scope.paginasMostrar[0]-1)){
				$scope.paginasMostrar.splice(0,10);
				//$scope.$apply();
				$scope.flag=($scope.flag-9);
				$scope.llenarPaginas($scope.paginasTotal);	
			}			
			if(pag==1){
				$scope.paginasMostrar.splice(0,10);
				//$scope.$apply();
				$scope.flag=0;
				$scope.llenarPaginas($scope.paginasTotal);	
			}						
			getDataOfService();		
			scroll('tbBusqueda');												
		};
		
		$scope.paginasTotal=[];
		$scope.paginasMostrar=[];
		$scope.flag=0;
		
		$scope.llenarPaginasTotal=function(data){			
			for(i=0;i<data;i++){
				$scope.paginasTotal.push(i+1);
			}
			$scope.llenarPaginas($scope.paginasTotal);
		}
		
		$scope.llenarPaginas=function(data){
			$scope.paginasMostrar.splice(0,10);		
			for(i=$scope.flag;i<($scope.flag+10)&&i<$scope.paginacion;i++){						
				$scope.paginasMostrar.push(data[i]);							
			}			
			//$scope.$apply();					
		}				
}
function scroll(id){
          // Reove "link" from the ID
        id = id.replace("link", "");
          // Scroll		  	 
		 $('html,body').animate({
          scrollTop: parseInt($("#"+id).offset().top)-140},
            'slow');
		}