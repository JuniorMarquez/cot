
app.controller('FullcalendarCtrl', ['$scope','$http','MyService','$filter', '$modal','$state', function($scope,$http,MyService,$filter, $modal,$state) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
 $scope.events=[];
$scope.filter={};
$scope.filter = '';
 $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
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
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];




    // $scope.events=MyService.data.events;

    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };
 
      
    /* event source that contains custom events on the scope */

    // $scope.events = [
    //   {title:'Reunion Inicial', start: new Date(y, m, 1), className: ['b-l b-2x b-info'], location:'Cede COT', info:'la reunion tiene una duracion minima de 3 horas!'},
    //   {title:'Jornada de capacitación', start: new Date(y, m, 3), end: new Date(y, m, 4, 9, 30), allDay: false, className: ['b-l b-2x b-danger'], location:'Táchira', info:'dos días de jornada.'},
    //   {title:'Game racing', start: new Date(y, m, 6, 16, 0), className: ['b-l b-2x b-info'], location:'Hongkong', info:'The most big racing of this year.'},
    //   {title:'Soccer', start: new Date(y, m, 8, 15, 0), className: ['b-l b-2x b-info'], location:'Rio', info:'Do not forget to watch.'},
    //   {title:'Family', start: new Date(y, m, 9, 19, 30), end: new Date(y, m, 9, 20, 30), className: ['b-l b-2x b-success'], info:'Family party'},
    //   {title:'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2), className: ['bg-success bg'], location:'HD City', info:'It is a long long event'},
    //   {title:'Play game', start: new Date(y, m, d - 1, 16, 0), className: ['b-l b-2x b-info'], location:'Tokyo', info:'Tokyo Game Racing'},
    //   {title:'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false, className: ['b-l b-2x b-primary'], location:'New York', info:'Party all day'},
    //   {title:'Repeating Event', start: new Date(y, m, d + 4, 16, 0), alDay: false, className: ['b-l b-2x b-warning'], location:'Home Town', info:'Repeat every day'},      
    //   {title:'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/', className: ['b-l b-2x b-primary']},
    //   {title:'Feed cat', start: new Date(y, m+1, 6, 18, 0), className: ['b-l b-2x b-info']}
    // ];

    /* alert on dayClick */
    $scope.precision = 400;
    $scope.lastClickTime = 0;
    $scope.alertOnEventClick = function( date, jsEvent, view ){
      var time = new Date().getTime();
      if(time - $scope.lastClickTime <= $scope.precision){
          $scope.events.push({
            title: 'New Event',
            start: date,
            className: ['b-l b-2x b-success']
          });
      }
      $scope.lastClickTime = time;
    };
    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };

    $scope.overlay = $('.fc-overlay');
    $scope.alertOnMouseOver = function( event, jsEvent, view ){
      $scope.event = event;
      $scope.overlay.removeClass('left right').find('.arrow').removeClass('left right top pull-up');
      var wrap = $(jsEvent.target).closest('.fc-event');
      var cal = wrap.closest('.calendar');
      var left = wrap.offset().left - cal.offset().left;
      var right = cal.width() - (wrap.offset().left - cal.offset().left + wrap.width());
      if( right > $scope.overlay.width() ) { 
        $scope.overlay.addClass('left').find('.arrow').addClass('left pull-up')
      }else if ( left > $scope.overlay.width() ) {
        $scope.overlay.addClass('right').find('.arrow').addClass('right pull-up');
      }else{
        $scope.overlay.find('.arrow').addClass('top');
      }
      (wrap.find('.fc-overlay').length == 0) && wrap.append( $scope.overlay );
    }

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        dayClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventMouseover: $scope.alertOnMouseOver
      }
    };
    
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.openNuevaActividad();
      // $scope.cargaData();
      // $scope.events.push({
      //   title: 'New Event',
      //   start: new Date(y, m, d),
      //   className: ['b-l b-2x b-info']
      // });
    };
    $scope.agregarItem = function(item) {
      // $scope.openNuevaActividad();
      // $scope.cargaData();
      // var nuevo = [];
      // nuevo = item;
      // $scope.events.push(nuevo);
     $state.go('app.dashboard-v1');
    };

    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };

    /* Change View */
    $scope.changeView = function(view, calendar) {
      $('.calendar').fullCalendar('changeView', view);
    };

    $scope.today = function(calendar) {
      $('.calendar').fullCalendar('today');
    };

    /* event sources array*/
  $scope.cargaData=function(){

  $http.get('http://54.202.62.62:1345/evento/').then(function (resp) {
      $scope.eventos = resp.data.results;
       // MyService.data.events=$scope.events;
       var bandera="";
    var bandera2="";
      for (var i= 0; i < $scope.eventos.length; i++){
        bandera = $scope.eventos[i].start;
        bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
        $scope.eventos[i].formateada=bandera2;
        $scope.events.push($scope.eventos[i]);

        // $scope.events[i].id=i;
      }
     // $scope.eventSources = [$scope.events];
    });
 };
    $scope.cargaData();
    $scope.eventSources = [$scope.events];
    $scope.openNuevaActividad = function (item,user) {
      // $scope.events={};
  var item=[];
  var dato="";
  var datosCuenta="";
 
  setTimeout(function() {
    item=$scope.item;
    datosCuenta=$scope.item;
    $scope.item.datosCuenta=datosCuenta;
  }, 300);
setTimeout(function() {  var modalInstance = $modal.open({
    templateUrl: 'modalNuevaActividad.html',
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
    modalInstance.result.then(function (selectedItem,item) {
      $scope.selected = selectedItem;
      $scope.agregarItem(item);
       // $state.go('app.miembros');
    }, function () {
     
     // $log.info('Modal dismissed at: ' + new Date());
    });}, 300);
  };
     // $scope.eventSources = [$scope.events];
}]);
/* EOF */