'use strict';
app.controller('graficoAnimalCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', function($scope, $http, $filter,$modal, MyService,filterFilter) {
}]);

app.controller('IndexController', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig,dato,datosSolicitud) {
$scope.date = moment();
}]);
app.controller('clientesCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig', 'toaster', '$state',function($scope,$http, $filter,$modal, MyService,filterFilter, datepickerConfig,toaster,$state) {
   $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Cliente habilitado con exito'   
  };

    $scope.today = function() {
      $scope.fechaInicio = new Date();
    };
    // $scope.today();

    $scope.clear = function () {
      $scope.fechaFin = null;
    };



    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };
     $scope.open2 = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened2 = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = 'MM/dd/yyyy';
    $scope.tbOptions = {
    filterText: ''};
    $scope.filter = '';
      $scope.tbOptions = {
      bDestroy: true,
      pageLength: 5,
      data: []                                              
    };
    
    $scope.filter = '';
      $scope.tbOptions3 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };


 $scope.vigilante=MyService.data.contador;
 $scope.vigilante=$scope.vigilante+1;
 MyService.data.contador=$scope.vigilante;

    $scope.getClientes = function () {
      $scope.clientes=null;
      $http.get('http://localhost:1345/cliente/').then(function (resp) {
        $scope.clientes = resp.data.results;
        var bandera="";
        var bandera2="";
        $scope.clientes2=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
         var result3 = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        var conversations = $scope.clientes;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;
        if ($scope.clientes && $scope.clientes.length > 0){
          for (var i=0;i < $scope.clientes.length;i++){
            var conversationDate1 =  $scope.clientes[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
            if (conversationDate >= start_date && conversationDate <= end_date){
              if ( $scope.clientes[i].status == "activo"){
                result.push($scope.clientes[i]);
                }
             if ( $scope.clientes[i].status == "pendiente"){
                result3.push($scope.clientes[i]);
                }
            }
            $scope.clientes2=result;
            $scope.clientes3=result3;
          }
        }
        var identif=0;
        if ($scope.clientes2){
        for (var i  = 0; i<$scope.clientes2.length;i++){
          bandera = $scope.clientes2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.clientes2[i].createdAtFormateada=bandera2;
          identif=$scope.clientes2[i].id;  
          $scope.clientes2[i].nombreCompleto=$scope.clientes2[i].nombresC+" "+$scope.clientes2[i].apellidosC;
          // $scope.clientes2[i].accion="<button onclick=\"angular.element(this).scope().openAprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Aprobar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          $scope.clientes2[i].accion="";                        
          $scope.clientes2[i].accion2="<button onclick=\"angular.element(this).scope().openBorrar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          }
        }
          if ($scope.clientes3){
         for (var i  = 0; i<$scope.clientes3.length;i++){
          bandera = $scope.clientes3[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.clientes3[i].createdAtFormateada=bandera2;
          identif=$scope.clientes3[i].id; 
           $scope.clientes3[i].nombreCompleto=$scope.clientes3[i].nombresC+" "+$scope.clientes3[i].apellidosC;
          $scope.clientes3[i].accion="<button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Aprobar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          $scope.clientes3[i].accion2="<button onclick=\"angular.element(this).scope().openBorrar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          }
          }
          $scope.clientes2=$scope.clientes2.reverse();
          $scope.tbOptions.data = $scope.clientes2;
          $scope.tbOptions.aoColumns=[
            // { mData: 'nombreRazon' }  ,
            // { mData: 'numeroIdentificacionFiscal' }  ,
            { mData: 'email'},
            // { mData: 'apellidosC' },
            { mData: 'accion' },
            { mData: 'accion2' }   
            ];
          $scope.clientes3=$scope.clientes3.reverse();
          $scope.tbOptions3.data = $scope.clientes3;
          $scope.tbOptions3.aoColumns=[
            // { mData: 'nombreRazon' }  ,
            // { mData: 'numeroIdentificacionFiscal' }  ,
            { mData: 'email'},
            // { mData: 'apellidosC' },
            { mData: 'accion' },
            { mData: 'accion2' }   
            ];
      });
    };

$scope.openBorrar = function (iden,timeout) {
  var item=[];
  var dato="";
  var datosCuenta="";
  $http.get('http://localhost:1345/cliente/'+iden).success(function(respuesta){        
    $scope.cliente = respuesta;
    $scope.item=respuesta;
    MyService.data.idenCliDel=respuesta.id;
  });
  setTimeout(function() {
    item=$scope.item;
    datosCuenta=$scope.item;
    $scope.item.datosCuenta=datosCuenta;
  }, 300);
setTimeout(function() {  var modalInstance = $modal.open({
    templateUrl: 'modalBorrar.html',
    controller: 'ModalInstanceCtrl',
    size: 'sm',
    resolve: {

           dato: function  () {
            return item;
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
       $scope.getClientes2();
       // $state.go('app.clientes');
    }, function () {
     
     // $log.info('Modal dismissed at: ' + new Date());
    });}, 300);
  };


 if ($scope.vigilante<=1){
  $scope.getClientes();
 }
    

    
    $scope.getClientes2 = function () {
      // if 
       // $("#dataTable").dataTable().fnDestroy();
    $scope.clientesSegundo=null;
    $http.get('http://localhost:1345/cliente/').then(function (resp) {
      $scope.clientesSegundo = resp.data.results;  
      var bandera="";
      var bandera2="";
      var result2 = [];
      var result3 = [];
      var conversations2 = $scope.clientesSegundo;
      var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy'); 
        var conversations = $scope.clientes;
        var start_date2 =  Date.parse(firstDay);
        var end_date2 = Date.parse(lastDay); 
      end_date2=end_date2+86400000;
      if ($scope.clientesSegundo && $scope.clientesSegundo.length > 0){
        var conversationDate =0;
        for (var i=0;i < $scope.clientesSegundo.length;i++){
          conversationDate=Date.parse($scope.clientesSegundo[i].createdAt);
          if (conversationDate >= start_date2 && conversationDate <= end_date2 ){
            if ( $scope.clientesSegundo[i].status == "activo"){

            result2.push($scope.clientesSegundo[i]);
            }
         if ( $scope.clientesSegundo[i].status == "pendiente"){
            result3.push($scope.clientesSegundo[i]);
            }
          }
          $scope.clientes2=result2; 
          $scope.clientes3=result3;   
        }
      }
        var clientePorAct=[];
        var identif=0;
        if ($scope.clientes2){
        for (var i  = 0; i<$scope.clientes2.length;i++){
          bandera = $scope.clientes2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.clientes2[i].createdAtFormateada=bandera2;
          identif=$scope.clientes2[i].id;  
           $scope.clientes2[i].nombreCompleto=$scope.clientes2[i].nombresC+" "+$scope.clientes2[i].apellidosC;
          // $scope.clientes2[i].accion="<button onclick=\"angular.element(this).scope().openAprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Aprobar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";
          $scope.clientes2[i].accion="";

       $scope.clientes2[i].accion2="<button onclick=\"angular.element(this).scope().openBorrar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        

        }
      }
      if ($scope.clientes3){
        for (var i  = 0; i<$scope.clientes3.length;i++){
          bandera = $scope.clientes3[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.clientes3[i].createdAtFormateada=bandera2;
          identif=$scope.clientes3[i].id; 
           $scope.clientes3[i].nombreCompleto=$scope.clientes3[i].nombresC+" "+$scope.clientes3[i].apellidosC;
          clientePorAct=$scope.clientes3[i];
          $scope.clientes3[i].accion="<button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Aprobar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";
       $scope.clientes3[i].accion2="<button onclick=\"angular.element(this).scope().openBorrar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        

        }
      }

        $scope.clientes2=$scope.clientes2.reverse();
        $scope.clientes3=$scope.clientes3.reverse();
        $scope.tbOptions.data = $scope.clientes2;
        $scope.tbOptions3.data = $scope.clientes3;
        $scope.tbOptions.aaData = result2;
        $scope.tbOptions3.aaData = result3;
    }); 

  };
  if ($scope.vigilante>1){
  $scope.getClientes2();
 }

 $scope.popAprobacion = function(){
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };
 $scope.Aprobacion = function (iden,timeout) {
  MyService.data.idenCliente= iden;
  // item.status="activo";
  // alert("dato:" +iden);
  var clienteAct={"status":"activo"};
  // clienteAct.id=iden;
  // clienteAct.status="activo";
   $scope.popAprobacion();
      $http.put('http://localhost:1345/cliente/'+MyService.data.idenCliente, clienteAct)
   $scope.getClientes2();
   setTimeout(function() {
    $state.go('app.dashboard-v1');
   }, 300);

    // $state.go('app.clientes');

   

   
}
 $scope.agregarCliente = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
     var item=[];
  var dato="";
  var datosCuenta="";
      var modalInstance = $modal.open({
        templateUrl: 'modalNuevoCliente.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
          dato: function  () {
            return item;
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
       $scope.getClientes2();
       // $state.go('app.clientes');
      // $log.info('Modal cerrado a las: ' + new Date());
    });
  };
}]);
