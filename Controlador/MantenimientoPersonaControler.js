function DatosPersonalesController($scope,$http){

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
    }  
      function Experiencia()
    {
      this.idexperiencia="";          
      this.cargo="";
      this.descripcion="";
      this.estado="A";
      this.empresa ="";
      this.pais="";
      this.anhoinicio="";
      this.anhofin ="";
      this.encurso="";
      
    }

    $scope.IP=IP;
    $scope.tele=[];
    $scope.correo=[];
    $scope.direc=[];
    $scope.exp= [];
    $scope._telefono= new Telefono();
    $scope._correo= new Email();
    $scope._direccion= new Direccion();
    $scope._experiencia= new Experiencia();

    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]).success(function(data) {
      $scope.foto=sessvars.myObj[0];
      $scope.persona =data;
      $scope.sexo;    
      $scope.fecha=$scope.persona.fechanacimiento;
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

    $scope.DatosTelefonos=function(){
      $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/telefono').success(function(data) {
      //$scope.tele = data;   
        for (var i = data.length - 1; i >= 0; i--) {
                var tempTel= new Telefono();
                tempTel.idpersona=sessvars.myObj[0];
                tempTel.idpersonatelefono=data[i].idpersonatelefono;
                tempTel.telefono=data[i].telefono;
                tempTel.estado=data[i].estado;
                tempTel.tipo=data[i].tipo;                         
                $scope.tele.push(tempTel);
                
              }; 
              //console.log($scope.tele.length)
      });
      
      $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/email').success(function(data) {
      //$scope.correo = data;
        for (var i = data.length - 1; i >= 0; i--) {
          var tempCorreo= new Email();
          tempCorreo.idpersona=sessvars.myObj[0];
          tempCorreo.idpersonaemail=data[i].idpersonaemail;
          tempCorreo.email=data[i].email;
          tempCorreo.estado=data[i].estado;
          tempCorreo.tipo=data[i].tipo;                         
          $scope.correo.push(tempCorreo);
        }; 
          //console.log($scope.tele.length)

      });

      $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/direccion').success(function(data) {
      //$scope.direc = data; 
        for (var i = data.length - 1; i >= 0; i--) {
          var tempDirecc= new Direccion();
          tempDirecc.idpersona=sessvars.myObj[0];
          tempDirecc.idpersonadireccion=data[i].idpersonadireccion;
          tempDirecc.direccion=data[i].direccion;
          tempDirecc.idubigeo=data[i].idubigeo;
          tempDirecc.estado=data[i].estado;
          tempDirecc.tipo=data[i].tipo;                         
          $scope.direc.push(tempDirecc);
        }; 

      });

      $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/experiencias').success(function(data) {
      //$scope.exp = data; 
         for (var i = data.length - 1; i >= 0; i--) {
          var tempExp= new Experiencia();
            tempExp.idexperiencia=data[i].idexperiencia;          
            tempExp.cargo=data[i].cargo;
            tempExp.descripcion=data[i].descripcion;
            tempExp.estado="A";
            tempExp.empresa =data[i].empresa;
            tempExp.pais=data[i].pais;
            tempExp.anhoinicio=data[i].anhoinicio;
            tempExp.anhofin =data[i].anhofin;
            tempExp.encurso=data[i].encurso;                               
          $scope.exp.push(tempExp);
        }; 
      });
      
      $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/formacion').success(function(data) {
      $scope.educ = data;        
      });  

      $http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/tipodireccion').success(function(data) {
        $scope.TipoDireccion = data ;
      });

      $http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/nacionalidad').success(function(data) {
        $scope.Nacionalidad = data ;
      });

     }

};


function DatosTelefonosController($scope,$http){

 $scope.IP=IP;
  $scope.cargaListaTelefonos=function()
    {
     //alert("xxxxxx"); 
      $http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/tipotelefono').success(function(data) {
      $scope.TipoTelefono = data ;
      }).error(function(data) 
      {
        msgError();
      });

     }

   
  $scope.agregarTelefono = function(){
         function Telefono()
    {      
      this.idpersonatelefono="";
      this.idpersona="";
      this.telefono="";
      this.tipo ="";
      this.estado="A";
    }

      if ($scope._telefono.tipo == "") 
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
        tel.idpersona=sessvars.myObj[0];
        tel.idpersonatelefono=$scope._telefono.idpersonatelefono;
        tel.telefono=$scope._telefono.telefono;
        tel.tipo=$scope._telefono.tipo;         
        tel.estado=$scope._telefono.estado;
        $scope.tele.push(tel);
        $http({
          method: 'POST', 
          url: 'http://'+IP+'/SpringGoraTeam/persona/telefono/create/'+sessvars.myObj[0],
          dataType: 'json',
          data: JSON.stringify([tel]),
          contentType:'application/json'
          }).success(function(data){
              $scope.tele=[];
               $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/telefono').success(function(data) {
                //$scope.tele = data;   
               for (var i = data.length - 1; i >= 0; i--) {
                var tempTel= new Telefono();
                tempTel.idpersona=sessvars.myObj[0];
                tempTel.idpersonatelefono=data[i].idpersonatelefono;
                tempTel.telefono=data[i].telefono;
                tempTel.estado=data[i].estado;
                tempTel.tipo=data[i].tipo;                         
                $scope.tele.push(tempTel);
                
              }; 
              //console.log($scope.tele.length)
      });


          }).error(function(data) 
              {
                msgErrorGuardar();
              }); 
          $scope._telefono.idpersonatelefono="";
          $scope._telefono.idpersona="";
          $scope._telefono.telefono="";
          $scope._telefono.tipo ="";
          $scope._telefono.estado="A";
          cierraColapseAgrega();
      }
    };

  $scope.modificaTelefono = function(idMod,tipo,nomb){
    
    /*  
    for(i=0;i< $scope.tele.length;i++) {
      if(idMod == $scope.tele[i].idpersonatelefono){
          console.log(idMod+" - "+tipo+" - "+nomb);
          $scope.tele[i].idpersona=sessvars.myObj[0];
          $scope.tele[i].idpersonatelefono=idMod;
          $scope.tele[i].telefono=nomb;
          $scope.tele[i].tipo=tipo;         
          $scope.tele[i].estado="A";
        } 
    }
    */
    $scope._telefono.idpersonatelefono=idMod;
    if ($scope._telefono.tipo == "") 
      {
        $scope._telefono.tipo =tipo;
        alert("Debe Seleccionar un Tipo de Telefono")
      }
      else if ($scope._telefono.telefono.trim().length < 1) 
      {
        alert("Debe Ingresar un Numero Telefonico")
        $scope._telefono.telefono=nomb;
      }
      else
      {
        //alert(cosa);
       // alert($scope._telefono.tipo[1]);
       //lert($(".cboTipoTeles"+x).val(comboTel))
        //var formData = {"idpersonatelefono":cosa,"estado":"A","telefono":$scope._telefono.tipo,"tipo":$scope._telefono.telefono}
        //console.log(formData);
       
        $http({
          method: 'POST', 
          url: "http://"+IP+"/SpringGoraTeam/persona/telefono/updatesingle/"+sessvars.myObj[0],
          data: $.param({"idpersonatelefono":$scope._telefono.idpersonatelefono,"estado":"A","telefono":$scope._telefono.telefono,"tipo":$scope._telefono.tipo[1]}),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          
          }).success(function (data) {
              if (data == "") {
                alert("Conflicto encontrado");
              }else{

                  for(i=0;i< $scope.tele.length;i++) {
                    if(data.idpersonatelefono == $scope.tele[i].idpersonatelefono){
                      $scope.tele[i].idpersona=sessvars.myObj[0];
                      $scope.tele[i].idpersonatelefono=data.idpersonatelefono;
                      $scope.tele[i].telefono=data.telefono;
                      $scope.tele[i].tipo=data.tipo;         
                      $scope.tele[i].estado=data.estado;
                    } 
                  }

                cierraColapseModifica(); 
                alert("Telefono Modificado")
              }
         });
      

      }

  };

   $scope.eliminaTelefono = function(array,idElim){

      $.SmartMessageBox({
        title : "Confirmar",
        content : "¿Esta Seguro que desea Eliminar el Telefono?",
        buttons : '[Si][No]'
      }, 
                    function(ButtonPressed) {
                      if (ButtonPressed === "Si") {
                         $http({
                              method: 'POST', 
                              url: "http://"+IP+"/SpringGoraTeam/persona/telefono/desactivar/"+idElim,
                              data: "",
                              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                              
                            });
                           for(i=0;i< $scope.tele.length;i++) {
                              if(idElim == $scope.tele[i].idpersonatelefono){
                                $scope.tele.splice( $.inArray(array,$scope.tele) ,1 );
                              } 
                            }
                          $.smallBox({
                            title : "El telefono fue eliminado con exito",
                            content : "<i class='fa fa-clock-o'></i> <i>Los datos fueron registrados con éxito</i>",
                            color : "#659265",
                            iconSmall : "fa fa-check fa-2x fadeInRight animated",
                            timeout : 4000
                          });
                      };
                      if (ButtonPressed === "No") {
                        $.smallBox({
                          title : "Elimacion cancelada",
                          content : "<i class='fa fa-clock-o'></i> <i>No se guardaron los cambios</i>",
                          color : "#C46A69",
                          iconSmall : "fa fa-times fa-2x fadeInRight animated",
                          timeout : 4000
                        });
                      };
                    });
   }

};



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



function DatosCorreosController($scope,$http){
  $scope.IP=IP;
  
 
  $scope.DatosTipoCorreo=function(){
    $http.get('http://'+IP+'/SpringGoraTeam/listas/tipoemail').success(function(data) {
      $scope.TipoCorreo =data;  
    });
  }

  $scope.agregarCorreo = function(){
    
    function Email()
      {        
        this.idpersona="";
        this.idpersonaemail="";
        this.email="";
        this.tipo="";
        this.estado="A";
      }    
    
    var filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    
    if ($scope._correo.tipo == "") 
      {
        alert("Debe Seleccionar un Tipo de Correo Electronico")
      }
    else if ($scope._correo.email.trim().length < 1) 
      {
        alert("Debe Ingresar un Correo Electronico")
      }
    else if(!filtro.test($scope._correo.email)){
        alert("Introduzca un email válido");
      }
    else
      {
        var mail = new Email();
        mail.idpersona=sessvars.myObj[0];
        mail.idpersonaemail=$scope._correo.idpersonaemail;
        mail.email=$scope._correo.email;
        mail.tipo=$scope._correo.tipo;         
        mail.estado=$scope._correo.estado;
        $scope.correo.push(mail);
        $http({
          method: 'POST', 
          url: 'http://'+IP+'/SpringGoraTeam/persona/email/create/'+sessvars.myObj[0],
          dataType: 'json',
          data: JSON.stringify([mail]),
          contentType:'application/json'
          }).success(function(data){
            $scope.correo=[];
            $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/email').success(function(data) {
              //$scope.correo = data;


                for (var i = data.length - 1; i >= 0; i--) {
                  var tempCorreo= new Email();
                  tempCorreo.idpersona=sessvars.myObj[0];
                  tempCorreo.idpersonaemail=data[i].idpersonaemail;
                  tempCorreo.email=data[i].email;
                  tempCorreo.estado=data[i].estado;
                  tempCorreo.tipo=data[i].tipo;                         
                  $scope.correo.push(tempCorreo);
                }; 
                  //console.log($scope.tele.length)

              });
                }).error(function(data) 
              {
                msgErrorGuardar();
              }); 
          $scope._correo.idpersonaemail="";
          $scope._correo.idpersona="";
          $scope._correo.email="";
          $scope._correo.tipo ="";
          $scope._correo.estado="A";
          cierraColapseCreaCorr()
      }
  };


  $scope.modificaCorreo = function(idMod,tipo,nomb){
         
    function Email()
      {        
        this.idpersona="";
        this.idpersonaemail="";
        this.email="";
        this.tipo="";
        this.estado="A";
      }  

      var filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
      $scope._correo.idpersona=idMod;

    if ($scope._correo.tipo == "") 
      {
        alert("Debe Seleccionar un Tipo de Correo Electronico")
      }
    else if ($scope._correo.email.trim().length < 1) 
      {
        alert("Debe Ingresar un Correo Electronico")
      }
    else if(!filtro.test($scope._correo.email))
      {
        alert("Introduzca un email válido");
      }
    else
      {        
       
        $http({
          method: 'POST', 
          url: "http://"+IP+"/SpringGoraTeam/persona/email/updatesingle/"+sessvars.myObj[0],
          data: $.param({"idpersonaemail":$scope._correo.idpersona,"email":$scope._correo.email,"estado":"A","tipo":$scope._correo.tipo[1]}),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          
          }).success(function (data) {
              if (data == "") {
                alert("Conflicto encontrado");
              }else{

                  for(i=0;i< $scope.correo.length;i++) {
                    if(data.idpersonaemail == $scope.correo[i].idpersonaemail){
                      $scope.correo[i].idpersona=sessvars.myObj[0];
                      $scope.correo[i].idpersonaemail=data.idpersonaemail;
                      $scope.correo[i].email=data.email;
                      $scope.correo[i].tipo=data.tipo;         
                      $scope.correo[i].estado=data.estado;
                    } 
                  }

                cierraColapse2()
                alert("Correo Electronico Modificado")
              }
         });
      

      }

  };


  $scope.eliminaCorreo = function(array,idElimDir){

      $.SmartMessageBox({
        title : "Confirmar",
        content : "¿Esta Seguro que desea Eliminar el Correo Electronico?",
        buttons : '[Si][No]'
      }, 
                    function(ButtonPressed) {
                      if (ButtonPressed === "Si") {
                         $http({
                              method: 'POST', 
                              url: "http://"+IP+"/SpringGoraTeam/persona/email/desactivar/"+idElimDir,
                              data: "",
                              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                              
                            });
                           for(i=0;i< $scope.correo.length;i++) {
                              if(idElimDir == $scope.correo[i].idpersonaemail){
                                $scope.correo.splice( $.inArray(array,$scope.correo) ,1 );
                              } 
                            }
                          $.smallBox({
                            title : "El Correo Electronico fue eliminado con exito",
                            content : "<i class='fa fa-clock-o'></i> <i>Los datos fueron registrados con éxito</i>",
                            color : "#659265",
                            iconSmall : "fa fa-check fa-2x fadeInRight animated",
                            timeout : 4000
                          });
                      };
                      if (ButtonPressed === "No") {
                        $.smallBox({
                          title : "Elimacion cancelada",
                          content : "<i class='fa fa-clock-o'></i> <i>No se guardaron los cambios</i>",
                          color : "#C46A69",
                          iconSmall : "fa fa-times fa-2x fadeInRight animated",
                          timeout : 4000
                        });
                      };
                    });
  }

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
  };


function DatosDireccionesController($scope,$http){
  $scope.IP=IP;

 $scope.datosDireccion=function(){

  $http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/departamentos').success(function(data) {
      $scope.items = data ;
      $scope.seleccDepartamento = $scope.items[-1];  
    });

    };

    $scope.llamaDepartamento = function(dept)
    {     
      $http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/departamento/'+dept+'/provincias').success(function(data) {
        $scope.items2 = data ;
        $scope.seleccProvincia = $scope.items2[-1];  
      });
    };
    $scope.llamaProvincia = function(dept,prov)
    {
      $scope.dept=$scope.seleccDepartamento;
      $scope.prov=$scope.seleccProvincia;
      $http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/departamento/'+dept+'/provincia/'+prov+'/distritos').success(function(data) {
        $scope.items3 = data;
        $scope._direccion.idubigeo = $scope.items3[-1];  
          });
    };
  
   $scope.agregarDireccion = function(){
        
      function Direccion()
        {
          this.idpersonadireccion="";
          this.idpersona="";
          this.idubigeo="";
          this.direccion="";
          this.tipo="Casa";
          this.estado="A";
        } 
      
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
                content :"Debe Seleccionar su distrito, provincia o Departamento",
                color : "#C46A69",
                icon : "fa fa-warning shake animated",
                timeout : 4000
                      });
            }
          else
            {
              var dir= new Direccion();
              dir.idpersona=sessvars.myObj[0];
              dir.idpersonadireccion=$scope._direccion.idpersonadireccion;
              dir.idubigeo=$scope._direccion.idubigeo;
              dir.direccion=$scope._direccion.direccion;
              dir.tipo=$scope._direccion.tipo;            
              dir.estado=$scope._direccion.estado;
              $scope.direc.push(dir);
              console.log(dir);
              $http({
                method: 'POST', 
                url: 'http://'+IP+'/SpringGoraTeam/persona/direccion/create/'+sessvars.myObj[0],
                dataType: 'json',
                data: JSON.stringify([dir]),
                contentType:'application/json'
                }).success(function(data){
                  $scope.direc=[];
                     $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/direccion').success(function(data) {
                      //$scope.direc = data; 
                        for (var i = data.length - 1; i >= 0; i--) {
                            

                          var tempDirecc= new Direccion();
                          tempDirecc.idpersona=sessvars.myObj[0];
                          tempDirecc.idpersonadireccion=data[i].idpersonadireccion;
                          tempDirecc.direccion=data[i].direccion;
                          tempDirecc.idubigeo=data[i].idubigeo;
                          tempDirecc.estado=data[i].estado;
                          tempDirecc.tipo=data[i].tipo;                         
                          $scope.direc.push(tempDirecc);
                        }; 

                      });
                }).error(function(data) 
                    {
                      msgErrorGuardar();
                    }); 

                

                  $scope._direccion.idpersonadireccion="";
                  $scope._direccion.idpersona="";
                  $scope._direccion.idubigeo="";
                  $scope._direccion.direccion="";
                  $scope._direccion.tipo="Casa";
                  $scope._direccion.estado="A";
                  $scope._direccion.descripcion=""
                  cierraGrabaDire();
                  
            }
    
    };

    $scope.eliminaDireccion = function(array,idElim){
        $.SmartMessageBox({
        title : "Confirmar",
        content : "¿Esta Seguro que desea Eliminar la Direccion?",
        buttons : '[Si][No]'
      }, 
                    function(ButtonPressed) {
                      if (ButtonPressed === "Si") {
                         $http({
                              method: 'POST', 
                              url: "http://"+IP+"/SpringGoraTeam/persona/direccion/desactivar/"+idElim,
                              data: "",
                              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                              
                            });
                           for(i=0;i< $scope.direc.length;i++) {
                              if(idElim == $scope.direc[i].idpersonadireccion){
                                $scope.direc.splice( $.inArray(array,$scope.direc) ,1 );
                              } 
                            }
                          $.smallBox({
                            title : "La direccion fue eliminado con exito",
                            content : "<i class='fa fa-clock-o'></i> <i>Los datos fueron registrados con éxito</i>",
                            color : "#659265",
                            iconSmall : "fa fa-check fa-2x fadeInRight animated",
                            timeout : 4000
                          });
                      };
                      if (ButtonPressed === "No") {
                        $.smallBox({
                          title : "Elimacion cancelada",
                          content : "<i class='fa fa-clock-o'></i> <i>No se guardaron los cambios</i>",
                          color : "#C46A69",
                          iconSmall : "fa fa-times fa-2x fadeInRight animated",
                          timeout : 4000
                        });
                      };
                    });
    };

};


function DatosExperienciaController($scope,$http){
  $scope.IP=IP;
     $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/experiencias').success(function(data) {
      $scope.exp = data; 
      });

  $scope.llamatipoExp = function()
    {
      $http.get('http://'+IP+'/SpringGoraTeam/listas/cargos').success(function(data) {
      $scope.TipoCargo = data ;
    });

    };

     $scope.agregarExperiencia = function(){
        
         function Experiencia()
          {
             this.idexperiencia="";          
              this.cargo="";
              this.descripcion="";
              this.estado="A";
              this.empresa ="";
              this.pais="";
              this.anhoinicio="";
              this.anhofin ="";
              this.encurso="";
            
          }          
        
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
                var exps= new  Experiencia();
                var inicio=$scope._experiencia.anhoinicio;
                var ano1=inicio.charAt(0)+inicio.charAt(1)+inicio.charAt(2)+inicio.charAt(3);
                var mes1=inicio.charAt(5)+inicio.charAt(6);
                var dia1=inicio.charAt(8)+inicio.charAt(9);
                var fec1=ano1+"-"+mes1+"-"+dia1;
                var fin=$scope._experiencia.anhofin;
                var ano2=fin.charAt(0)+fin.charAt(1)+fin.charAt(2)+fin.charAt(3);
                var mes2=fin.charAt(5)+fin.charAt(6);
                var dia2=fin.charAt(8)+fin.charAt(9);
                var fec2=ano2+"-"+mes2+"-"+dia2;
                exps.idpersona=sessvars.myObj[0];
                exps.idexperiencia=$scope._experiencia.idexperiencia;
                exps.cargo=$scope._experiencia.cargo;
                exps.descripcion=$scope._experiencia.descripcion;
                exps.estado=$scope._experiencia.estado;
                exps.empresa=$scope._experiencia.empresa;
                exps.pais=$scope._experiencia.pais;
                exps.anhoinicio=fec1;
                exps.anhofin=fec2;
                if ($scope.estadoExp) 
                  {
                    exps.encurso="1";
                    exps.anhofin=new Date("1990-01-01");
                  }
                  else
                  {
                    exps.encurso="0";
                  };  
                $scope.exp.push(exps);

                $http({
                  method: 'POST', 
                  url: 'http://'+IP+'/SpringGoraTeam/experiencia/create/'+sessvars.myObj[0],
                  dataType: 'json',
                  data: JSON.stringify([exps]),
                  contentType:'application/json'
                  }).success(function(data){
                    $scope.exp=[];
                            $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/experiencias').success(function(data) {
                              //$scope.exp = data; 
                                 for (var i = data.length - 1; i >= 0; i--) {
                                  var tempExp= new Experiencia();
                                    tempExp.idexperiencia=data[i].idexperiencia;          
                                    tempExp.cargo=data[i].cargo;
                                    tempExp.descripcion=data[i].descripcion;
                                    tempExp.estado="A";
                                    tempExp.empresa =data[i].empresa;
                                    tempExp.pais=data[i].pais;
                                    tempExp.anhoinicio=data[i].anhoinicio;
                                    tempExp.anhofin =data[i].anhofin;
                                    tempExp.encurso=data[i].encurso;                               
                                  $scope.exp.push(tempExp);
                                }; 
                              });
                  }).error(function(data) 
                      {
                        msgErrorGuardar();
                      }); 

                $scope._experiencia.idexperiencia="";          
                $scope._experiencia.cargo="";
                $scope._experiencia.descripcion="";
                $scope._experiencia.estado="A";
                $scope._experiencia.empresa ="";
                $scope._experiencia.pais="";
                $scope._experiencia.anhoinicio="";
                $scope._experiencia.anhofin ="";
                $scope._experiencia.encurso=false;
                cierraGrabaExp();  

                    
        }
      
      };


    $scope.modificaExperiencia = function(idExps){

      function Experiencia()
        {
          this.idexperiencia="";          
          this.cargo="";
          this.descripcion="";
          this.estado="A";
          this.empresa ="";
          this.pais="";
          this.anhoinicio="";
          this.anhofin ="";
          this.encurso="";
        }          
                  
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
                  var exps= new  Experiencia();
                  var inicio=$scope._experiencia.anhoinicio;
                  var ano1=inicio.charAt(0)+inicio.charAt(1)+inicio.charAt(2)+inicio.charAt(3);
                  var mes1=inicio.charAt(5)+inicio.charAt(6);
                  var dia1=inicio.charAt(8)+inicio.charAt(9);
                  var fec1=ano1+"/"+mes1+"/"+dia1;
                  var fin=$scope._experiencia.anhofin;
                  var ano2=fin.charAt(0)+fin.charAt(1)+fin.charAt(2)+fin.charAt(3);
                  var mes2=fin.charAt(5)+fin.charAt(6);
                  var dia2=fin.charAt(8)+fin.charAt(9);
                  var fec2=ano2+"/"+mes2+"/"+dia2;
                  exps.idpersona=sessvars.myObj[0];
                  exps.idexperiencia=idExps;
                  exps.cargo=$scope._experiencia.cargo[0];
                  exps.descripcion=$scope._experiencia.descripcion;
                  exps.estado=$scope._experiencia.estado;
                  exps.empresa=$scope._experiencia.empresa;
                  exps.pais=$scope._experiencia.pais[1];
                  exps.anhoinicio=fec1;
                  exps.anhofin=fec2;
                  if ($scope.estadoExp) 
                    {
                      exps.encurso="1";
                      exps.anhofin=new Date("1990/01/01");
                    }
                    else
                    {
                      exps.encurso="0";
                    };  
                  $scope.exp.push(exps);
                    console.log(exps);
            
        
                  $http({
                    method: 'POST', 
                    url: "http://"+IP+"/SpringGoraTeam/experiencia/updatesingle/"+sessvars.myObj[0],
                    data: $.param({"idexperiencia":idExps,"cargo":exps.cargo,"descripcion": exps.descripcion,"estado":"A","empresa":exps.empresa,"pais":exps.pais,"anhoinicio":fec1,"anhofin":fec2,"encurso":exps.encurso}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(data){
                      if (data == "") {
                         alert("Conflicto encontrado");
                      }else{
                        for(i=0;i< $scope.exp.length;i++) {
                          if(data.idexperiencia == $scope.exp[i].idexperiencia){
                              $scope.exp.idpersona=sessvars.myObj[0];
                              $scope.exp.idexperiencia=data.idexperiencia;
                              $scope.exp.cargo=data.cargo;
                              $scope.exp.descripcion=data.descripcion;
                              $scope.exp.estado=data.estado;
                              $scope.exp.empresa=data.empresa;
                              $scope.exp.pais=data.pais;
                              $scope.exp.anhoinicio=data.anhoinicio;
                              $scope.exp.anhofin=data.anhofin;
                          } 
                        }
                      }   
                
                    }).error(function(data) 
                        {
                          msgErrorGuardar();
                        }); 

                 cierraColapse4();
          


        }

        }


  

   $scope.eliminaExps = function(array,idElimDir){
        $.SmartMessageBox({
        title : "Confirmar",
        content : "¿Esta Seguro que desea Eliminar la Experiencia?",
        buttons : '[Si][No]'
        }, 
          function(ButtonPressed) {
            if (ButtonPressed === "Si") {
                  $http({
                    method: 'POST', 
                    url: "http://"+IP+"/SpringGoraTeam/experiencia/delete/"+idElimDir,
                    data: "",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                  });
                for(i=0;i< $scope.exp.length;i++) {
                  if(idElimDir == $scope.exp[i].idexperiencia){
                  $scope.exp.splice( $.inArray(array,$scope.exp) ,1 );
                  } 
                }
                  $.smallBox({
                    title : "la Experiencia fue eliminado con exito",
                    content : "<i class='fa fa-clock-o'></i> <i>Los datos fueron registrados con éxito</i>",
                    color : "#659265",
                    iconSmall : "fa fa-check fa-2x fadeInRight animated",
                    timeout : 4000
                  });
              };
              
              if (ButtonPressed === "No") {
                  $.smallBox({
                    title : "Elimacion cancelada",
                    content : "<i class='fa fa-clock-o'></i> <i>No se guardaron los cambios</i>",
                    color : "#C46A69",
                    iconSmall : "fa fa-times fa-2x fadeInRight animated",
                    timeout : 4000
                  });
                };
            });
    
  
    }

};

function DatosEducacionController($scope,$http){
  $scope.IP=IP;
    
    $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/formacion').success(function(data) {
      $scope.educ = data;        
      });  


  $scope.DatosEdu =function() 
  {
    $scope.IP=IP;             
      $http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/universidades').success(function(data) {
        $scope.unis = data ;
      });
      $http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/grados').success(function(data) {
        $scope.Grado = data ;
      });
      $http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/carreras').success(function(data) {
        $scope.carrera = data ;
      });
      $http.get('http://'+$scope.IP+'/SpringGoraTeam/listas/nivelestudio').success(function(data) {
        $scope.nivel = data ;
      });
   };

};

function DatosCompetenciaController($scope,$http){
  $scope.IP=IP;
  var idAtribs="";
  var idHabs="";
  var idEditMatriz="";

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
         $scope.idVarY=y;
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

    $scope.cargarEditCompetencia = function(z){
      idEditMatriz=z;
      $http.get('http://'+IP+'/SpringGoraTeam/competencia/extracto/'+sessvars.myObj[0]).success(function(data) {
          $('#dialog_editCompetencia').data("idListCompetencia", data);
          $('#dialog_editCompetencia').dialog('open');
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
      height: 200,
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
              var selectAtrib=$('#idEditSelect option:selected').val();

              if(selectAtrib == -1){
                alert("no hay datos para actualizar");
              }else{
                var formData = {"idatributos":idAtribs};
                $.ajax({
                  async:false, 
                  cache:false,
                  url : "http://"+IP+"/SpringGoraTeam/atributos/update/"+selectAtrib,
                  type: "POST",
                  data: formData,
                  success: function(){
                  },
                  error: function (){
                    alert("No grabo atributo");
                  }
                });

                updateDivDatos(1);
              }
              
              $(this).dialog("close");
            }
        }],
      open: function(event, ui) {
          $("#dialog_editAtributo").empty();

          var listAtributo = $('#dialog_editAtributo').data("idListAtributo");

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
                if($('#idTableAtributo >tbody >tr').length == 0){
                  alert('no hay datos para actualizar');
                }else{
                  var selectHab=$('#idEditSelectHabilidad option:selected').val();
                  var formData = {"idhabilidad":idHabs};
                  $.ajax({
                    async:false, 
                    cache:false,
                    url : "http://"+IP+"/SpringGoraTeam/habilidad/update/"+selectHab,
                    type: "POST",
                    data: formData,
                    success: function(){
                      $("#idTableAtributo tbody > tr").each(function () {
                        var rowvalue=[];
                        $(this).children().each(function () {
                          rowvalue.push($(this).text());
                        });
                        $.ajax({
                          async:false, 
                          cache:false,
                          url : "http://"+IP+"/SpringGoraTeam/atributos/create/"+idHabs+"/"+rowvalue[0],
                          type: "POST",
                          success: function(){
                          },
                          error: function (){
                            alert("no grabo atributo");
                          }
                        });
                      });
                    },
                    error: function (){
                      alert("no grabo habilidad");
                    }
                  });

                  updateDivDatos(2);
                }

              $(this).dialog("close");
          }
        }],
      open: function(event, ui) {
          $("#dialog_editHabilidad").empty();

          var listHabilidad = $('#dialog_editHabilidad').data("idListHabilidad");

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

          var $varDivAddAll = $('<div id="idDivAddAll" style="float: left"></div>');
          var $rAddAllButton=$('<input/>').attr({
                        type: "button",
                        id: "idButtonAddAll",
                        value: 'Agregar Todo'
                      });
          $varDivAddAll.append($rAddAllButton);
          $varDivGroup.append($varDivAddAll);


          var $varDivAllButton = $('<div id="idDivAllDeleteTable"></div>');
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

          var $varDivTable = $('<div id="idDivTableAtributo"></div>');
          var $rTable=$('<table id="idTableAtributo" class="gridtable2"/>');
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

    $('#dialog_editCompetencia').dialog({
      autoOpen : false,
      width : 500,
      height: 400,
      resizable : false,
      modal : true,
      title : "<div class='widget-header'><h4>Editar Competencia</h4></div>",
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
                    if($('#idTableAtributo2 >tbody >tr').length == 0){
                      alert('no hay datos para actualizar');
                    }else{
                      var selectCompet=$('#idEditSelectCompentecia option:selected').val();
                      var formData = {"idmatriz":idEditMatriz};
                      $.ajax({
                          async:false, 
                          cache:false,
                          url : "http://"+IP+"/SpringGoraTeam/matriz/update/"+selectCompet,
                          type: "POST",
                          data: formData,
                          success: function(){
                              var valAntIdHab="";
                              var arrayEditAtrib=[];
                              var objetoHabAtrib = new Object();
                              var arrayGeneral=[];
                              var countRows=1;
                              $("#idTableAtributo2 tbody > tr").each(function () {
                                var rowvalue=[];
                                $(this).children().each(function () {
                                  rowvalue.push($(this).text());
                                });

                                if(valAntIdHab!=rowvalue[0]){
                                  if(arrayEditAtrib.length > 0){
                                    objetoHabAtrib.idAtributos=arrayEditAtrib;
                                    arrayGeneral.push(objetoHabAtrib);
                                    objetoHabAtrib = new Object();
                                  }

                                  objetoHabAtrib.idHab=rowvalue[0];
                                  arrayEditAtrib=[];
                                  arrayEditAtrib.push(rowvalue[2]);

                                  if(countRows==$('#idTableAtributo2 >tbody >tr').length){
                                    objetoHabAtrib.idAtributos=arrayEditAtrib;
                                    arrayGeneral.push(objetoHabAtrib);
                                  }

                                  valAntIdHab=rowvalue[0];
                                }else{
                                  arrayEditAtrib.push(rowvalue[2]);

                                  if(countRows==$('#idTableAtributo2 >tbody >tr').length){
                                    objetoHabAtrib.idAtributos=arrayEditAtrib;
                                    arrayGeneral.push(objetoHabAtrib);
                                  }
                                }
                                countRows++;
                              });

                              for(var i=0; i<arrayGeneral.length; i++){
                                var varGeneral=arrayGeneral[i];
                                $.ajax({
                                    async:false, 
                                    cache:false,
                                    url : "http://"+IP+"/SpringGoraTeam/habilidad/create/"+sessvars.myObj[0]+"/"+idEditMatriz+"/"+varGeneral.idHab,
                                    type: "POST",
                                    success: function(data5){
                                          var filArrayAtrib=varGeneral.idAtributos;
                                          for(var j=0; j<filArrayAtrib.length; j++){
                                            $.ajax({
                                              url : "http://"+IP+"/SpringGoraTeam/atributos/create/"+data5+"/"+filArrayAtrib[j],
                                              type: "POST",  
                                              success: function(){
                                              },
                                              error: function (){
                                                alert("no grabo atributo");
                                              }
                                            });
                                          }
                                        },
                                    error: function (){
                                      alert("no grabo habilidad");
                                    }
                                });
                              }
                          },
                          error: function (){
                            alert("no grabo matriz");
                          }
                      });

                      updateDivDatos(3);         
                    }
                    
                    $(this).dialog("close");
              }
          }],
      open: function(event, ui) {
          $("#dialog_editCompetencia").empty();

          var listCompetencia = $('#dialog_editCompetencia').data("idListCompetencia");

          var $varDiv = $('<div></div>');
          var $varSelect = $('<select style="width:100%" id="idEditSelectCompentecia"/>');
          var varOptionDefaultComp = $('<option/>');
          varOptionDefaultComp.attr({ 'value': '-1' }).text('-- Seleccione Competencia --');
          $varSelect.append(varOptionDefaultComp);
          $.each(listCompetencia, function(i, competencias) {
              var varOption = $('<option/>');
              varOption.attr({ 'value': competencias[0] }).text(competencias[1]);
              $varSelect.append(varOption);
          });

          $varDiv.append($varSelect);
          $("#dialog_editCompetencia").append($varDiv);

          var $varDiv8 = $('<div>&nbsp;</div>');
          $("#dialog_editCompetencia").append($varDiv8);

          var $varDivHab = $('<div id="idDivSelectHabilidad2"></div>');
          var $varSelect = $('<select style="width:100%" id="idEditSelectHabilidad2"/>');
          var varOptionDefault = $('<option/>');
          varOptionDefault.attr({ 'value': '-1' }).text('-- Seleccione Habilidad/Atributo --');
          $varSelect.append(varOptionDefault);

          $varDivHab.append($varSelect);
          $("#dialog_editCompetencia").append($varDivHab);

          var $varDiv1 = $('<div>&nbsp;</div>');
          $("#dialog_editCompetencia").append($varDiv1);

          var $varDivGroup = $('<div id="idDivGroup2"></div>');
          var $varDivButton = $('<div id="idDivButtonAtributo2" style="float: left"></div>');
          var $rButton=$('<input/>').attr({
                        type: "button",
                        id: "idButtonAddAtributo2",
                        value: 'Agregar Habilidad/Atributo'
                      });
          $varDivButton.append($rButton);
          $varDivGroup.append($varDivButton);

          var $varDivAddAll = $('<div id="idDivAddAll2" style="float: left"></div>');
          var $rAddAllButton=$('<input/>').attr({
                        type: "button",
                        id: "idButtonAddAll2",
                        value: 'Agregar Todo'
                      });
          $varDivAddAll.append($rAddAllButton);
          $varDivGroup.append($varDivAddAll);

          var $varDivAllButton = $('<div id="idDivAllDeleteTable2"></div>');
          var $rAllButton=$('<input/>').attr({
                        type: "button",
                        id: "idButtonAllDeleteTable2",
                        value: 'Limpiar tabla'
                      });
          $varDivAllButton.append($rAllButton);
          $varDivGroup.append($varDivAllButton);

          $("#dialog_editCompetencia").append($varDivGroup);

          var $varDiv3 = $('<div>&nbsp;</div>');
          $("#dialog_editCompetencia").append($varDiv3);

          var $varDivTable = $('<div id="idDivTableAtributo2"></div>');
          var $rTable=$('<table id="idTableAtributo2" class="gridtable2"/>');
          var $rTHead=$('<thead/>');
          var $rTrTh=$('<tr/>');
          $rTrTh.append($('<th/>').text("Id Habilidad"));
          $rTrTh.append($('<th/>').text("Habilidad"));
          $rTrTh.append($('<th/>').text("Id Atributo"));
          $rTrTh.append($('<th/>').text("Atributo"));
          $rTrTh.append($('<th/>').text(""));
          $rTHead.append($rTrTh);
                                    
          $rTable.append($rTHead);
          $rTable.append($('<tbody/>'));
          $varDivTable.append($rTable);
          $("#dialog_editCompetencia").append($varDivTable);

          var script2 = document.createElement( "script" );
          script2.type = "text/javascript";
          script2.src = "js/util/utilOperCompetencia.js";
          $("#dialog_editCompetencia").append(script2);
      },
    }).css({overflow:"auto"});

    function updateDivDatos(flag){
        $scope.$apply(function(){
          if(flag == 3){
            $.ajax({
              async:false, 
              cache:false,
              url : "http://"+$scope.IP+"/SpringGoraTeam/persona/"+sessvars.myObj[0]+"/competencias",
              type: "GET",
              success: function(data){
                $scope.competi = data;
              }
            });
          }else if(flag == 2){
            $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/'+$scope.datos+'/habilidades').success(function(data) {
              $scope._habilidades=[];
              for (var i = data.length - 1; i >= 0; i--) {
                var temhabi= new Object();
                temhabi.idHabilidad=data[i][0]
                temhabi.idHabilidades=data[i][1];
                temhabi.nomhabilidades=data[i][2];
                temhabi.atributotemp=[];
                $scope._habilidades.push(temhabi);
              };
            });
          }else if(flag == 1){
            $http.get('http://'+$scope.IP+'/SpringGoraTeam/persona/'+sessvars.myObj[0]+'/'+$scope.datos+'/'+$scope.dato2+'/atributos').success(function(data) {
              $scope.atrib = data; 
              for (var i = $scope._habilidades.length - 1; i >= 0; i--) {
                $scope._habilidades[i].atributotemp=[];
              };
              for (var i = data.length - 1; i >= 0; i--) {
                var temAtrib = new Object();
                temAtrib.idatributos=data[i][0];
                temAtrib.idatributo=data[i][1];
                temAtrib.nomatributo=data[i][2];
                $scope._habilidades[$scope.idVarY].atributotemp.push(temAtrib);
              };
            });
          }
        });
    }
};