'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  }).
  when('/view2/:diagramName', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$routeParams','$http',
  function($scope, $routeParams, $http) {
    /*
    $http.get('processes/' + $routeParams.processId + '.json').success(function(data) {
      $scope.process = data;

      $http.get(data.bpmnUrl).success(function(bpmn){
        console.log("Received bpmn " + bpmn);
        bpmnjs.importXML(bpmn, function(err) {

          if (!err) {
            console.log('success!');
            viewer.get('canvas').zoom('fit-viewport');
          } else {
            console.log('something went wrong:', err);
          }
        });
      });
    });
    */
    var BpmnViewer = window.BpmnJS;

    var viewer = new BpmnViewer({ container: '#canvasView2' });

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        viewer.importXML(xhr.response, function(err) {

          if (!err) {
            console.log('success!');
            viewer.get('canvas').zoom('fit-viewport');
          } else {
            console.log('something went wrong:', err);
          }
        });
      }
    };
    var diagramName = $routeParams.diagramName;

    var diagramUrl='../../resources/' + diagramName+'.bpmn';

    xhr.open('GET', diagramUrl, true);
    xhr.send(null);

  }]);
/*
 var BpmnViewer = window.BpmnJS;

 var viewer = new BpmnViewer({ container: '#canvas' });

 var xhr = new XMLHttpRequest();

 xhr.onreadystatechange = function() {
 if (xhr.readyState === 4) {
 viewer.importXML(xhr.response, function(err) {

 if (!err) {
 console.log('success!');
 viewer.get('canvas').zoom('fit-viewport');
 } else {
 console.log('something went wrong:', err);
 }
 });
 }
 };

 xhr.open('GET', '../resources/pizza-collaboration.bpmn', true);
 xhr.send(null);
 */