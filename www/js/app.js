// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })



  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.novo_evento', {
      url: '/novo_evento',
      views: {
        'menuContent': {
          templateUrl: 'templates/novo_evento.html',
          controller: 'NovoEventoCtrl'
        }
      }
    })
    .state('app.eventos', {
      url: '/eventos',
      views: {
        'menuContent': {
          templateUrl: 'templates/eventos.html',
          controller: 'EventosCtrl'
        }
      }
    })
      .state('app.atualizar_evento', {
          url: '/atualizar_evento/:evento_id',
          views: {
              'menuContent': {
                  templateUrl: 'templates/atualizar_evento.html',
                  controller: 'AtualizarEventoCtrl'
              }
          }
      })

  .state('app.single', {
    url: '/detalhes/:evento_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/detalhes.html',
        controller: 'DetalhesCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/eventos');
});

//<input name="file" type="file" file-model="Evento.img"/>
// criando essa directive podemos utilizar a nova tag no html file-model
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    var file = (element[0].files[0]);
                    scope.file_selected = file.name;
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

//com o service podemos criar metodos dentro dele ex: add para deixar o codigo mais reutilizavel
app.service('EventoService', ['$http', function ($http) {
    this.add = function(Evento,url_upload){
        var fd = new FormData();
        fd.append('file', Evento.img);
        fd.append('titulo', Evento.titulo);
        fd.append('sub_titulo', Evento.sub_titulo);
        fd.append('descricao', Evento.descricao);
        fd.append('data_evento', Evento.data_evento);

        $http.post(url_upload, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .success(function(){
                alert("Adicionado com sucesso!");
            })
            .error(function(){
            });
    }
}]);