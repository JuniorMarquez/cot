'use strict';

app.controller('Search1FormController', ['$scope', '$filter','$http', '$state', 'MyService','toaster','$modal', function($scope,$filter, $http, $state, MyService,toaster,$modal) {
    $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Datos de cuenta actualizados con exito',
  };
  $scope.filter = '';

  $scope.pop = function(){
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };

    $scope.user = {};
    $scope.users=[];
    $scope.clientes=[];
    $scope.full=[];
    $scope.authError = null;
    $scope.item={};
    MyService.data.full=[];
    $scope.item.nombre=MyService.data.nombre;
    $scope.item.apellido=MyService.data.apellido;
    $scope.item.email=MyService.data.email;
    $scope.item.password=MyService.data.password;
    $scope.editItem = function(item){
      if(item){
        item.editing = true;
      }
    };
  $scope.consultaClientes=function(){    
    $http.get('http://localhost:1345/cliente/' ).success(function(respuesta){
      $scope.clientes = respuesta.results; 
    });
  };
  $scope.consultaClientes();
  
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
        templateUrl: 'modalConsultaOdontologo.html',
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

  }]);