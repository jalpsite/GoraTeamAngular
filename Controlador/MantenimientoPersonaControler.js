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

    //alert($scope.tele[0].tipo);
};


function DatosExperienciaController($scope,$http){
  $scope.IP=IP;
  $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/experiencias').success(function(data) {
       $scope.exp = data; 
   
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
                  temhabi.idHabilidad=data[i][0];
                  temhabi.nomhabilidades=data[i][1];
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
      $http.get('http://'+IP+'/SpringGoraTeam/habilidad/extracto/'+sessvars.myObj[0]+'/'+$scope.dato2+'/atributos').success(function(data) {
          $scope.dato2[0]
          $('#dialog_editAtributo').data("idListAtributo", data);
          $('#dialog_editAtributo').dialog('open');
          //$('#varHabil').val($scope.dato2);
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
            alert(idAtribs);
             //alert(varContAtr);
            alert(varContHabs);
            //alert(varContComp);
            
            alert($("#idEditSelect").val());
            /*var formData = {"idatributos":idAtribs}
              $.ajax({
                url : "http://"+IP+"/SpringGoraTeam/atributos/update/"+varContHabs+"/"+$("#idEditSelect").val(),
                type: "POST",
                data: formData,
              success: function(data5, textStatus, jqXHR)
                {
                 alert("Datos modificados satisfactoriamente");
                 

                },
              error: function (jqXHR, textStatus, errorThrown)
               {
                alert("No sale");
               }
              });
*/
             // $(this).dialog("close");

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
};









