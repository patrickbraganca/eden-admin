angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
  .controller('NovoEventoCtrl', function($scope,$http) {


        $scope.data_hoje = function(){
            var data = new Date();
            var dia = data.getDate();
            var mes = data.getMonth() + 1;
            var ano = data.getFullYear();
            return [dia, mes, ano].join('/');
        };

      $scope.adicionar_evento = function (Evento){


        $http.post('http://api-eden.cursophprj.com.br/eventos/insert', {'titulo':Evento.titulo,'sub_titulo':Evento.sub_titulo,'descricao':Evento.descricao,'data_evento':Evento.data_evento});

          alert ("Evento adicionado com sucesso")

            }
       })


.controller('EventosCtrl', function($scope,$http) {

    //criei a listagem do eventos dentro de uma funcao para que ela seja chamada no ng-init na view
    $scope.listarTodosEventos = function(){
        $http.get("http://api-eden.cursophprj.com.br/eventos") .then(function(response)
        {
            $scope.eventos = (response.data.eventos)

        });
    }

        $scope.excluir_evento = function (id){
            $http.post('http://api-eden.cursophprj.com.br/eventos/delete', {'id':id})
                .success(function (){
                    //desse jeito o listar todos os eventos e executado somente depois de concluir a operacao de exclusao
                    alert("excluido com sucesso!");
                    $scope.listarTodosEventos();
                }
            );


            //assim antes de concluir a exclusao o eventos para listar todos e chamado
            //$http.post('http://api-eden.cursophprj.com.br/eventos/delete',{'id':id});
            //alert("excluido com sucesso!");
            //$scope.listarTodosEventos(); //chamei a funcao para carregar todos os eventos apos excluir
        }
})


    .controller('AtualizarEventoCtrl', function($scope,$stateParams,$http,$state) {

        var evento_id = ($stateParams.evento_id);
        $scope.evento_id = evento_id;

        $http.get("http://api-eden.cursophprj.com.br/eventos/"+evento_id) .then(function(response){
            $scope.Evento = (response.data.eventos);

        });
        $scope.atualizar_evento = function (Evento){
          $http.post('http://api-eden.cursophprj.com.br/eventos/update',{'id':Evento.id,'titulo':Evento.titulo,sub_titulo:Evento.sub_titulo,'descricao':Evento.descricao,'data_evento':Evento.data_evento});
            alert("Evento atualizado com sucesso");
            $state.go("app.eventos");

        }
    })

.controller('DetalhesCtrl', function($scope, $stateParams, $http) {
  var evento_id = ($stateParams.evento_id);

  $scope.evento_id = evento_id;

  $http.get("http://api-eden.cursophprj.com.br/eventos/"+evento_id) .then(function(response){
    $scope.evento_selecionado = (response.data.eventos);
      {
      }


  });
    $scope.listarTodosEventos = function () {
        $http.get("http://api-eden.cursophprj.com.br/eventos") .then(function(response) {
            $scope.eventos = (response.data.eventos);
        });
    };
    $scope.excluir_evento = function (id) {
        $http.post('http://api-eden.cursophprj.com.br/eventos/delete', {'id':id})
            .success(function (){
                $scope.listarTodosEventos();
            }
        );
    }



});
