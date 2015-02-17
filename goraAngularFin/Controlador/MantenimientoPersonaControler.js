 //alert(sessvars.myObj[0]);
function DatosPersonalesController($scope,$http){
  $scope.IP=IP;

    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]).success(function(data) {
     
      $scope.foto=sessvars.myObj[0];
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
    $scope.cambiaNombres=function(){
      alert("Hola");
      /*formData = {nombres:$scope.nombre,apepat:$scope.apepat,apemat:$scope.apemat,idpersona:sessvars.myObj[0]};
      $.ajax({
            url: 'http://'+IP+'/SpringGoraTeam/persona/update/1/',
            method: 'POST', 
            data: formData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            success: function(data){console.log(data)}
          });*/
    }

};


function DatosTelefonosController($scope,$http){
 $scope.IP=IP;

    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/telefono').success(function(data) {
       $scope.tele = data; 

       //alert($scope.tele[0].tipo);
      });

    //alert($scope.tele[0].tipo);
};


function DatosCorreosController($scope,$http){
  $scope.IP=IP;
    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/email').success(function(data) {
       $scope.correo = data; 

       //alert($scope.tele[0].tipo);
    });
};

function DatosDireccionesController($scope,$http){
  $scope.IP=IP;
  $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/direccion').success(function(data) {
       $scope.direc = data; 
    });

  /* $http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/ubigeo/'+direc.idubigeo).success(function(data) {
       $scope.sea = data; 
       alert($scope.sea.departamento);
    });*/
    //alert($scope.tele[0].tipo);
};


function DatosExperienciaController($scope,$http){
  $scope.IP=IP;
  $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/experiencias').success(function(data) {
       $scope.exp = data; 
       //alert(data[0].cargo);
      console.log(data[0].cargo);
  });
};


function DatosEducacionController($scope,$http){
  $scope.IP=IP;
    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/formacion').success(function(data) {
       $scope.educ = data;        
    });   
   
};

function DatosCompetenciaController($scope,$http){
  $scope.IP=IP;
  var idAtribs="";
  var idHabs="";
    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/competencias').success(function(data) {
       $scope.competi = data; 

    function Habilidad()
    {
      this.idHabilidad="";      
      this.nomhabilidades="";
      this.atributotemp=[];
    }
    function Atributos()
    {
      this.idatributos=""
      this.idatributo="";
      this.nomatributo="";

    }
    $scope._habilidades=[];


      $scope.muestraHab=function(dato){
         //alert(dato)
         $scope.datos=dato
         $scope.IP=IP;
         $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/'+$scope.datos+'/habilidades').success(function(data) {
           $scope._habilidades=[];
         for (var i = data.length - 1; i >= 0; i--) {
              var temhabi= new Habilidad();
                  temhabi.idHabilidad=data[i][0]
                  temhabi.idHabilidades=data[i][1];
                  temhabi.nomhabilidades=data[i][2];
                  temhabi.atributotemp=[];
                  $scope._habilidades.push(temhabi);
         };
        });

      }
      $scope.muestraAtri=function(dato2,y){
         
         $scope.dato2=dato2;
         $scope.IP=IP;
         $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/'+$scope.datos+'/'+$scope.dato2+'/atributos').success(function(data) {
         $scope.atrib = data; 
         for (var i = $scope._habilidades.length - 1; i >= 0; i--) {
           $scope._habilidades[i].atributotemp=[];
         };
         for (var i = data.length - 1; i >= 0; i--) {

                var temAtrib= new Atributos();
                    temAtrib.idatributos=data[i][0];
                    temAtrib.idatributo=data[i][1];
                    temAtrib.nomatributo=data[i][2];
           $scope._habilidades[y].atributotemp.push(temAtrib);
         };
        });

      }
});

  $scope.cargarEditAtributo = function(x){
   idAtribs=x;
      $http.get('http://'+IP+'/SpringGoraTeam/atributos/extracto/'+sessvars.myObj[0]+'/'+$scope.dato2+'/atributos').success(function(data) {
          $scope.dato2[0]
          $('#dialog_editAtributo').data("idListAtributo", data);
          $('#dialog_editAtributo').dialog('open');
          //$('#varHabil').val($scope.dato2);
          return false;
      });
    };

        $scope.cargarEditHabilidad = function(y){
        idHabs=y
      $http.get('http://'+IP+'/SpringGoraTeam/habilidad/extracto/'+sessvars.myObj[0]+'/'+$scope.datos+'/habilidades').success(function(data) {
          $('#dialog_editHabilidad').data("idListHabilidad", data);
          $('#dialog_editHabilidad').dialog('open');
          return false;
      });
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

    $('#dialog_editAtributo').dialog({
      autoOpen : false,
      width : 500,
      height: 300,
      resizable : false,
      modal : true,
      title : "<div class='widget-header'><h4>Editar Atributo</h4></div>",
      buttons : [{
          html : "Cancelar",
          "class" : "btn btn-default",
          click : function() {
            $(this).dialog("close");
          }
        }, {
          html : "<i class='fa fa-check'></i>&nbsp; Actualizar", 
          "class" : "btn btn-primary",
          click : function() {
            //alert(idAtribs);
            //alert(varContAtr);
            //alert(varContHabs);
            //alert(varContComp);
            
            //alert("aTRIB seLL"+$("#idEditSelect").val());
            var formData = {"idatributos":idAtribs};
              $.ajax({
                url : "http://"+IP+"/SpringGoraTeam/atributos/update/"+$("#idEditSelect").val(),
                type: "POST",
                data: formData,
              success: function(data5, textStatus, jqXHR)
                {
                 alert("Datos modificados satisfactoriamente");
                 location.reload();

                },
              error: function (jqXHR, textStatus, errorThrown)
               {
                alert("No sale");
               }
              });

              $(this).dialog("close");


          }
        }],
      open: function(event, ui) {
          $("#dialog_editAtributo").empty();

          var listAtributo = $('#dialog_editAtributo').data("idListAtributo");

          console.log(listAtributo);

          var $varDiv = $('<div></div>');
          var $varSelect = $('<select style="width:100%" class="select2" id="idEditSelect"/>');
          $.each(listAtributo, function(i, atributos) {
              var varOption = $('<option/>');
              varOption.attr({ 'value': atributos[0] }).text(atributos[1]);
              $varSelect.append(varOption);
          });

          $varDiv.append($varSelect);
          $("#dialog_editAtributo").append($varDiv);
      },
    }).css({overflow:"auto"});


 $('#dialog_editHabilidad').dialog({
      autoOpen : false,
      width : 500,
      height: 400,
      resizable : false,
      modal : true,
      title : "<div class='widget-header'><h4>Editar Habilidad</h4></div>",
      buttons : [{
          html : "Cancelar",
          "class" : "btn btn-default",
          click : function() {
            $(this).dialog("close");
          }
        }, {
          html : "<i class='fa fa-check'></i>&nbsp; Actualizar",
          "class" : "btn btn-primary",
          click : function() {
           
            alert(idFor);
           // $(this).dialog("close");

 $('#idTableAtributo tbody tr').each(function(index, element){
                var id = $(element).find("td").eq(0).html(),
                Nombre = $(element).find("td").eq(1).html();
                alert(id+" - "+Nombre);
                var formData = {"idhabilidad":idHabs};
              $.ajax({
                url : "http://"+IP+"/SpringGoraTeam/habilidad/update/"+id,
                type: "POST",
                data: formData,
              success: function(data5, textStatus, jqXHR)
                {
                 alert("Datos modificados satisfactoriamente");
                 location.reload();

                },
              error: function (jqXHR, textStatus, errorThrown)
               {
                alert("No sale");
               }
              });

              

             });
$(this).dialog("close");
   /*          var formData = {"idatributos":varContHabs};
              $.ajax({
                url : "http://"+IP+"/SpringGoraTeam/habilidad/update/"+$("#idEditSelect").val(),
                type: "POST",
                data: formData,
              success: function(data5, textStatus, jqXHR)
                {
                 alert("Datos modificados satisfactoriamente");
                 location.reload();

                },
              error: function (jqXHR, textStatus, errorThrown)
               {
                alert("No sale");
               }
              });

              $(this).dialog("close");
*/
          }
        }],
      open: function(event, ui) {
          $("#dialog_editHabilidad").empty();

          var listHabilidad = $('#dialog_editHabilidad').data("idListHabilidad");

          console.log(listHabilidad);

          var $varDivHab = $('<div id="idDivSelectHabilidad"></div>');
          var $varSelect = $('<select style="width:100%" class="select2" id="idEditSelectHabilidad"/>');
          var varOptionDefault = $('<option/>');
          varOptionDefault.attr({ 'value': '-1' }).text('-- Seleccione habilidad --');
          $varSelect.append(varOptionDefault);
          $.each(listHabilidad, function(i, habilidades) {
              var varOption = $('<option/>');
              varOption.attr({ 'value': habilidades[0] }).text(habilidades[1]);
              $varSelect.append(varOption);
          });

          $varDivHab.append($varSelect);
          $("#dialog_editHabilidad").append($varDivHab);

          var $varDiv1 = $('<div>&nbsp;</div>');
          $("#dialog_editHabilidad").append($varDiv1);

          var $varDivAtr = $('<div id="idDivSelectAtributo"></div>');
          var $varSelectAtr = $('<select style="width:100%" class="select2" id="idEditSelectAtributo"/>');
          var varOptionAtrDefault = $('<option/>');
          varOptionAtrDefault.attr({ 'value': '-1' }).text('-- Seleccione atributo --');
          $varSelectAtr.append(varOptionAtrDefault);
          $varDivAtr.append($varSelectAtr);
          $("#dialog_editHabilidad").append($varDivAtr);

          var $varDiv2 = $('<div>&nbsp;</div>');
          $("#dialog_editHabilidad").append($varDiv2);

          var $varDivGroup = $('<div id="idDivGroup"></div>');
          var $varDivButton = $('<div id="idDivButtonAtributo" style="float: left"></div>');
          var $rButton=$('<input/>').attr({
                        type: "button",
                        id: "idButtonAddAtributo",
                        value: 'Agregar Atributo'
                      });
          $varDivButton.append($rButton);
          $varDivGroup.append($varDivButton);


          var $varDivAllButton = $('<div id="idDivAllDeleteTable" style="float: left"></div>');
          var $rAllButton=$('<input/>').attr({
                        type: "button",
                        id: "idButtonAllDeleteTable",
                        value: 'Limpiar tabla'
                      });
          $varDivAllButton.append($rAllButton);
          $varDivGroup.append($varDivAllButton);

          $("#dialog_editHabilidad").append($varDivGroup);

          var $varDiv3 = $('<div>&nbsp;</div>');
          $("#dialog_editHabilidad").append($varDiv3);
          var $varDiv4 = $('<div>&nbsp;</div>');
          $("#dialog_editHabilidad").append($varDiv4);

          var $varDivTable = $('<div id="idDivTableAtributo"></div>');
          var $rTable=$('<table id="idTableAtributo" cellspacing="1" cellpadding="1" border="1"/>');
          var $rTHead=$('<thead/>');
          var $rTrTh=$('<tr/>');
          $rTrTh.append($('<th/>').text("Id"));
          $rTrTh.append($('<th/>').text("Atributo"));
          $rTrTh.append($('<th/>').text(""));
          $rTHead.append($rTrTh);
                                    
          $rTable.append($rTHead);
          $rTable.append($('<tbody/>'));
          $varDivTable.append($rTable);
          $("#dialog_editHabilidad").append($varDivTable);

          var script = document.createElement( "script" );
          script.type = "text/javascript";
          script.src = "js/util/utilOper.js";
          $("#dialog_editHabilidad").append(script);
      },
    }).css({overflow:"auto"});
};










