'use strict';

// controlador de inicio de session
app.controller('SignupFormController', ['$scope', '$filter','$http', '$state','MyService', 'toaster','$modal', function($scope, $filter,$http, $state,MyService,toaster,$modal) {
    $scope.toaster = {
    title: 'Exito!!',
    type: 'success',
    text: 'En hora buena! su solicitud de registro se ha realizado con éxito',
  };
  $scope.pop = function(){
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };

    $scope.user = {};
    $scope.datos=[];
    $scope.establecimientos={};
    $scope.createEstablecimiento = function(user){
       $http.post('http://localhost:1345/establecimiento/', {administrador: $scope.user.nombre, emailAdministrador: $scope.user.email});
    };

    $scope.entrar = function(user) {
      $http.get('http://localhost:1345/userbcsc/?email=' +$scope.user.email).success(function(respuesta){
        $scope.datos = respuesta.results[0];
        MyService.data.datos=$scope.datos;
      });
      MyService.data.idUsuario=MyService.data.datos.id;
      $scope.app.usuario=MyService.data.datos.email; 
      $scope.pop();     
      if(MyService.data.datos){
       
      }
     // 
    };




$scope.a = function (user,item) {
MyService.tipo="Odontologo";
MyService.letra="a";
  $scope.aperturaModal(item,user);
 };
 $scope.b = function (user,item) {
MyService.tipo="Asistente";
MyService.letra="b";
  $scope.aperturaModal(item,user);
 };
 $scope.c = function (user,item) {
MyService.tipo="Clinica/consultorio";
  MyService.letra="c";
  $scope.aperturaModal(item,user);
 };
 $scope.d = function (user,item) {
MyService.tipo="Laboratorio";
MyService.letra="d";
  $scope.aperturaModal(item,user);
 };
 $scope.e = function (user,item) {
MyService.tipo="Dental";
MyService.letra="e";
  $scope.aperturaModal(item,user);
 };

     $scope.aperturaModal = function (item,user) {
      
      var user=[];
      user.tipo=MyService.tipo;
      
      // alert("tipo:" +user.tipo);
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
     var item=[];
  var dato="";
  var datosCuenta={};
  // datosCuenta.tipo=user.tipo;
     item.tipo=MyService.tipo;
     item.letra=MyService.letra;

  // item.tipo=MyService.data.tipo;
      var modalInstance = $modal.open({
        templateUrl: 'modalNuevoCliente.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
          dato: function  () {
            return item;
            // body...
          },
           user: function  () {
            return user;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
     
    }, function () {
 
       // $scope.getClientes2();
       // $state.go('app.clientes');
      // $log.info('Modal cerrado a las: ' + new Date());
    });
  };

    $scope.ok = function(user) {
      $http.post('http://localhost:1345/cliente/', {
        nombresC: $scope.user.nombre, 
        apellidosC:'',
        identificacionC:'',
        telefonoC:'',
        direccionC:'',
        status:'pendiente',
        email: $scope.user.email, 
        password: $scope.user.password,
        nivel:3,
        nombreRazon:'',
        numeroIdentificacionFiscal:'',
        direccion:'',
        telefono:'',


          });
     $state.go('access.signin');
   };

  }])
