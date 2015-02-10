function ControladorDatosCompetencia($scope, $http){   
	$scope.IP="10.77.33.117:8083";
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

	function getDataOfService(){
      	$http({
       	   method: 'POST', 
       	   url: 'http://'+$scope.IP+'/SpringGoraTeam/persona/filtro',
		   params: {competencias:$scope._comp,habilidades:$scope._hab,atributos:$scope._atri},       	   
		   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
       	}).success(function (data) {
       		var filtroPersona = data;
       		$scope.listPersonaCompetencia = [];
			if(filtroPersona.length > 0){
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
			};
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
}