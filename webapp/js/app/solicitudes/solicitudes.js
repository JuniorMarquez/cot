
app.controller('IndexController', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig','dato','datosCuenta',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig,dato,datosCuenta) {
$scope.date = moment();
}]);
app.controller('SolicitudesCtrl', ['$scope', '$state','$http', '$filter', '$modal', 'MyService', 'filterFilter', 'toaster','$timeout',  function($scope,  $state ,$http, $filter,$modal, MyService, filterFilter, toaster,$timeout) {
 $scope.nivel=MyService.data.nivel;
  var dato="";
  var datosCuenta="";
  $scope.toaster = {
  };

  $scope.filter = '';
  $scope.mensajePrenez = 'Registrar / anular estado de preñéz del consultor';
    
  $scope.today = function() {
    $scope.fechaNacimiento = new Date();
  };
 

  $scope.clear = function () {
    $scope.fechaNacimiento = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
    $scope.guardado=false;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = 'shortDate';

  $scope.guardado="false";
  $scope.guardar=function (item) {
    $scope.guardado="true";

    alert(+$scope.guardado);
  };
   $scope.mostrar=function (item) {
   $scope.guardado="false";
  };
  

    // body...
    if (MyService.data.luz){
        $scope.items = null;
        $scope.item=null;
        $scope.selectGroup2(MyService.data.consultor);
        MyService.data.luz=null;
        MyService.data.consultor=null;
    };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.consultarEnProceso = function(){
       $http.get('http://54.202.62.62:1345/solicitud/?estado=En proceso').then(function (resp) {   
      $scope.solicitudes = resp.data.results;
      $scope.detallesSolicitud = null;
     $scope.lateral = true;
    });
  };
  $scope.consultarEnProceso();
   $scope.consultarPendientes = function(){
    $http.get('http://54.202.62.62:1345/solicitud/?estado=Pendiente').then(function (resp) {
      $scope.solicitudes = resp.data.results;
      $scope.detallesSolicitud = null;
      $scope.lateral = false;   
    });
  };
   $scope.consultarFinalizadas = function(){
    $http.get('http://54.202.62.62:1345/solicitud/?estado=Finalizada').then(function (resp) {
    $scope.solicitudes = resp.data.results;
    $scope.detallesSolicitud = null;
     $scope.lateral = true; 
    });
  };

  
  $scope.openConfirm = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirm.html',
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
        $scope.item = null;  
        $scope.pop2();
        $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
   $scope.openConfirmBorrarConsultor = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirmBorrarConsultor.html',
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
        $scope.item = null;  
        $scope.pop2();
        $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openConfirm2 = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirm2.html',
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
       $scope.solicitudes.splice($scope.solicitudes.indexOf(item), 1);
        $scope.item = null;  
        $scope.pop8();
        
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.disabled = undefined;
  $scope.searchEnabled = undefined;

  $scope.enable = function() {
    $scope.disabled = false;
  };

  $scope.disable = function() {
    $scope.disabled = true;
  };

  $scope.enableSearch = function() {
    $scope.searchEnabled = true;
  }

  $scope.disableSearch = function() {
    $scope.searchEnabled = false;
  }

  $scope.clear = function() {
    $scope.person.selected = undefined;
    $scope.address.selected = undefined;
    $scope.country.selected = undefined;
  };

  $scope.createSolicitud = function(){
    var solicitud = {nombre: 'Nueva solicitud'};          
    solicitud.nombre = $scope.checkItem(solicitud, $scope.solicitudes, 'nombre');
    solicitud.idUsuario = MyService.data.idUsuario;
    $scope.solicitudes.push(solicitud);
  };

  $scope.checkItem = function(obj, arr, key){
    var i=0;
    angular.forEach(arr, function(item) {
      if(item[key].indexOf( obj[key] ) == 0){
        var j = item[key].replace(obj[key], '').trim();
        if(j){
          i = Math.max(i, parseInt(j)+1);
        }else{
          i = 1;
        }
      }
    });
    return obj[key] + (i ? ' '+i : '');
  };

  $scope.deleteSolicitud = function(item){
    $http.delete('http://54.202.62.62:1345/solicitud/'+item.id , item)
    $scope.solicitudes.splice($scope.solicitudes.indexOf(item), 1);
  };

  $scope.detallesSolicitud={};
  MyService.data.solicitud={};

  $scope.selectSolicitud = function(item){ 
    $scope.detallesSolicitud=item;  
    identif=item.id;
    $scope.detallesSolicitud.primerMensaje="hola";  
    $scope.detallesSolicitud.fecha=$filter('date')(new Date($scope.detallesSolicitud.createdAt),'dd/MM/yyyy');
    $scope.detallesSolicitud.dia=$filter('date')(new Date($scope.detallesSolicitud.createdAt),'yyyy');
    MyService.data.solicitud.titulo=item.titulo;
    angular.forEach($scope.solicitudes, function(item) {
      item.selected = false;
    });
    $scope.solicitud = item;
    $scope.solicitud.selected = true;
    $scope.filter = item.titulo;
    $http.get('http://54.202.62.62:1345/mensaje/?idSolicitud='+item.id).then(function (resp) {
      $scope.items = resp.data.results;
      $scope.item = null;  
    });
  };

  $scope.selectItem = function(item){    
    $scope.alerts=null;
    var identificador =item.id;
    var nombres =item.nombres;
    var nombres =item.nombres;
    MyService.data.hembra = nombres;
    MyService.data.nombres = nombres;
    MyService.data.identificador = identificador;
    angular.forEach($scope.items, function(item) {
      item.selected = false;
      item.editing = false;
      });
    $scope.item = item;
    $scope.item.selected = true;
    $http.get('http://54.202.62.62:1345/consultor/?idEstablecimiento='+MyService.data.idEstablecimiento).then(function (resp) {
      $scope.consultors = resp.data.results;
      });
     var pas = item.id;
    $scope.consultorsFiltrados = $scope.consultores.filter(function (consultor) {
      return (consultor.idconsultor == pas );
      });
    setTimeout(function() {}, 500);
  };

  $scope.deleteItem = function(item){
    $http.delete('http://54.202.62.62:1345/consultor/'+item.id , item)
    $scope.items.splice($scope.items.indexOf(item), 1);
    $scope.item = $filter('orderBy')($scope.items, 'nombres')[0];
    if($scope.item) $scope.item.selected = true;
  };

  $scope.deleteconsultor = function(consultor){
    $http.delete('http://54.202.62.62:1345/consultor/'+consultor.id , consultor)
    $scope.consultoresFiltrados.splice($scope.consultores.indexOf(consultor), 1);
    $scope.consultor = $filter('orderBy')($scope.consultores, 'nombres')[0];
    if($scope.consultor) $scope.consultor.selected = true;
  };

  $scope.createItem = function(){
    var item = {
      avatar:'img/avatar.png',
      mensajeNuevo:"Presione \"Editar\" para ingresar datos",
      idEstablecimiento: MyService.data.idEstablecimiento,
      nivel:2
    };
    $scope.items.push(item);
    $scope.selectItem(item);
    $scope.item.editing = true;
    $scope.item.solicitud = MyService.data.solicitud;
    $scope.item.mensajeNuevo=null;
    $scope.item.idUsuario = MyService.data.idUsuario;
    $http.get('http://54.202.62.62:1345/solicitud/').then(function (resp) {
    $scope.solicitudes = resp.data.results;
    }); 
  };

  $scope.editItem = function(item){
    if(item && item.selected){
      item.editing = true;
    }
  };

  $scope.solicitud = function(item){
    item.editing = false;
    var solicitud= {};
    MyService.data.idenSolicitud= item.id;
    solicitud.nombre=item.nombre;
    solicitud.idEstablecimiento=item.idEstablecimiento;
    solicitud.idUsuario=item.idUsuario;
    solicitud.idUsuarioAct=MyService.data.idUsuario;
    item.id=null;
    solicitud.selected=item.selected;
    solicitud.editing=item.editing;
    if (MyService.data.idenSolicitud){
      $http.put('http://54.202.62.62:1345/solicitud/'+MyService.data.idenSolicitud, solicitud)
    }
    else {
      $http.post('http://54.202.62.62:1345/solicitud/', solicitud)
    }
    $scope.items = null;
    $scope.item = null;
    $scope.ingredientes = null;
   };

  $scope.doneEditingConsultor = function(item){
    var consultorAct = {};
    MyService.data.idenConsultor=item.id;
    consultorAct.nombres=item.nombres;
    consultorAct.avatar='img/avatar.png';
    consultorAct.apellidos=item.apellidos;
    consultorAct.idEstablecimiento=item.idEstablecimiento;
    consultorAct.solicitud=item.solicitud;
    consultorAct.idUsuario=item.idUsuario;
    consultorAct.departamento=item.departamento;
    consultorAct.identificacion=item.identificacion;
    consultorAct.email=item.email;
    consultorAct.password=item.password;
    consultorAct.direccion=item.direccion;
    consultorAct.telefono=item.telefono;
    consultorAct.nivel=item.nivel;
    if (MyService.data.idenConsultor){
      $scope.pop4();
      $http.put('http://54.202.62.62:1345/consultor/'+MyService.data.idenConsultor , consultorAct)
    }
    else {
      $scope.pop3();;
      $http.post('http://54.202.62.62:1345/consultor/', consultorAct)
    }
    $http.get('http://54.202.62.62:1345/solicitud/').then(function (resp) {
      $scope.solicitudes = resp.data.results;
    });
    $http.get('http://54.202.62.62:1345/consultor/').then(function (resp) {
      $scope.app.states = resp.data.results;
    });
    $scope.consultores = null;
    item.editing = false;
  };

}]);
