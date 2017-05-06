'use strict';


app.controller('IndexController', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig,dato,datosSolicitud) {
$scope.date = moment();
}]);
app.controller('miembrosCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig', 'toaster', '$state',function($scope,$http, $filter,$modal, MyService,filterFilter, datepickerConfig,toaster,$state) {
   $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Miembro habilitado con exito'   
  };
$scope.miembros = [];
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
    $scope.tbOptionsPendientes = {
    filterText: ''};
    $scope.filter = '';
      $scope.tbOptionsPendientes = {
      bDestroy: true,
      pageLength: 15,
      data: []                                              
    };
    
    $scope.filter = '';
      $scope.tbOptions3 = {
      bDestroy: true,
      pageLength: 5,
      data: []                                        
    };

      $scope.tbOptionsOdontologos = {
      bDestroy: true,
      pageLength: 15,
      data: []
                                                     
    };
   
      $scope.tbOptionsClinicasConsultorios = {
      bDestroy: true,
      pageLength: 15,
      data: []
                                                     
    };

      $scope.tbOptionsAsistentes = {
      bDestroy: true,
      pageLength: 15,
      data: []
                                                     
    };

 $scope.vigilante=MyService.data.contador;


    $scope.getMiembros = function (timeout) {
      $scope.miembros=null;
      setTimeout(function() {
           $scope.vigilante=$scope.vigilante+1;
           MyService.data.contador=$scope.vigilante;
         
   // dtInstance.rerender(); 
      
      $http.get('http://54.202.62.62:1345/miembro/').then(function (resp) {
        $scope.miembros = resp.data.results;
        var bandera="";
        var bandera2="";
        $scope.miembrosActualizados=[];
        $scope.odontologos=[];
        $scope.asistentes=[];
        $scope.clinicasConsultorios=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        var result3 = [];
        var odontologos = [];
        var asistentes = [];
        var clinicasConsultorios = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        var conversations = $scope.miembros;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;
        if ($scope.miembros && $scope.miembros.length > 0){
          for (var i=0;i < $scope.miembros.length;i++){
            var conversationDate1 =  $scope.miembros[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
            if (conversationDate >= start_date && conversationDate <= end_date){
              if ( $scope.miembros[i].status == "actualizado"){
                result.push($scope.miembros[i]);
                }
             if ( $scope.miembros[i].status == "pendiente"){
                result3.push($scope.miembros[i]);
                }
            }
            $scope.miembrosActualizados=result;
            $scope.miembrosPendientes=result3;
          }
        }
        var identif=0;
        if ($scope.miembrosActualizados){
        for (var i  = 0; i<$scope.miembrosActualizados.length;i++){
          bandera = $scope.miembrosActualizados[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.miembrosActualizados[i].createdAtFormateada=bandera2;
          identif=$scope.miembrosActualizados[i].id;  
          if ($scope.miembrosActualizados[i].primerNombre){
          $scope.miembrosActualizados[i].nombreCompleto=$scope.miembrosActualizados[i].primerNombre+" "+$scope.miembrosActualizados[i].primerApellido;
          }
          $scope.miembrosActualizados[i].accion="";                        
          $scope.miembrosActualizados[i].accion2="<button onclick=\"angular.element(this).scope().openBorrar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          }
        }
        if ($scope.miembrosPendientes){
        for (var i  = 0; i<$scope.miembrosPendientes.length;i++){
          bandera = $scope.miembrosPendientes[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.miembrosPendientes[i].createdAtFormateada=bandera2;
          identif=$scope.miembrosPendientes[i].id; 
          $scope.miembrosPendientes[i].accion="<button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Aprobar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          $scope.miembrosPendientes[i].accion2="<button onclick=\"angular.element(this).scope().openBorrar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          }
        }

        for (var i  = 0; i<$scope.miembrosActualizados.length;i++){
          if($scope.miembrosActualizados[i].letra == "a"){
            odontologos.push($scope.miembrosActualizados[i]);
          }
          if($scope.miembrosActualizados[i].letra == "b"){
            asistentes.push($scope.miembrosActualizados[i]);
          }
          if($scope.miembrosActualizados[i].letra == "c"){
            clinicasConsultorios.push($scope.miembrosActualizados[i]);
          }

            $scope.odontologos=odontologos;
            $scope.asistentes=asistentes;
            $scope.clinicasConsultorios=clinicasConsultorios;
            }     
        $scope.miembrosActualizados=$scope.miembrosActualizados.reverse();
        $scope.tbOptionsPendientes.data = $scope.miembrosActualizados;
        $scope.tbOptionsPendientes.aaData = $scope.miembrosPendientes;
        $scope.tbOptionsPendientes.aoColumns=[
          { mData: 'email'},
          { mData: 'tipo'},
          { mData: 'createdAtFormateada'},
          { mData: 'accion' },
          { mData: 'accion2' }   
          ];

          $scope.tbOptionsOdontologos.data = $scope.odontologos;
          $scope.tbOptionsOdontologos.aaData = $scope.odontologos;
          $scope.tbOptionsOdontologos.aoColumns=[
            { mData: 'email'},
            { mData: 'nombreCompleto' },
            { mData:'createdAtFormateada'},
            { mData: 'accion2' }   
            ];
          $scope.tbOptionsAsistentes.data = $scope.asistentes;
          $scope.tbOptionsAsistentes.aaData = $scope.asistentes;
          $scope.tbOptionsAsistentes.aoColumns=[
            { mData: 'email'},
            { mData: 'nombreCompleto' },
            { mData:'createdAtFormateada'},
            { mData: 'accion2' }   
            ];
          $scope.tbOptionsClinicasConsultorios.data = $scope.clinicasConsultorios;
          $scope.tbOptionsClinicasConsultorios.aaData = $scope.clinicasConsultorios;
          $scope.tbOptionsClinicasConsultorios.aoColumns=[
            { mData: 'email'},
            { mData: 'nombres' },
            { mData:'createdAtFormateada'},
            { mData: 'accion2' }   
            ];
      });
}, 500);
    };
    $scope.getMiembros();

$scope.openBorrar = function (iden,timeout) {
  var item=[];
  var dato="";
  var datosCuenta="";
  $http.get('http://54.202.62.62:1345/miembro/'+iden).success(function(respuesta){        
    $scope.miembro = respuesta;
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
       $scope.getMiembros2();
       // $state.go('app.miembros');
    }, function () {
     
     // $log.info('Modal dismissed at: ' + new Date());
    });}, 300);
  };


 

    
  
//   if (MyService.data.contador>=1){
//    alert("mayor"+MyService.data.contador);
//     // $scope.vigilante=$scope.vigilante+1;
//  MyService.data.contador=MyService.data.contador+1;
//   // $scope.getMembers3();
  
//  }
// if (MyService.data.contador<1){
//    alert("menor"+MyService.data.contador);
//     // $scope.vigilante=$scope.vigilante+1;
// MyService.data.contador=MyService.data.contador+1;
//   // $scope.getMiembros();

//  }
    
 $scope.popAprobacion = function(){
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };

 $scope.Aprobacion = function (iden,timeout) {
  MyService.data.idenMiembro= iden;

  var miembroAct={"status":"actualizado"};

   $scope.popAprobacion();
      $http.put('http://54.202.62.62:1345/miembro/'+MyService.data.idenMiembro, miembroAct)
   $scope.getMiembros2();
   setTimeout(function() {
    $state.go('app.dashboard-v1');
   }, 300);

    // $state.go('app.miembros');
};

}]);
