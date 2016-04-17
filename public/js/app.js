/* global angular, $ */
angular.module('wekaApp', ['ui.materialize'])
  .controller('wekaCtrl', function ($scope, $http) {
    $http.get('js/data.json').success((req, res) => {
      $scope.formData = req
      $scope.labels = Object.keys(req)
    })
    $scope.form = ['M','21','A','d','sm','E','F','2','F','F','S','A','S']
    $scope.post = function () {
      $scope.showModel = false
      $scope.data = "'" + $scope.form.join("','") + "',?"
      $http.post('/data', {data: $scope.data}).success((req, res) => {
        var result = req[2].split(' ').filter((item) => item !== '')
        answer(result)
      })
    }

    var answer = function (res) {
      $scope.resRe = res[3]
      var imgres = res[2].split(':')
      $scope.classify = imgres[1]
      $scope.showModel = true
    }

  // var tranfrom = function (str) {
  //   str = str.split(',')
  //   var emp = ''
  //   var gg = str.forEach(item => {
  //     var temp = item.split('=')
  //     emp += '{' + ['"name":"' + temp[0] + '"', '"value":"' + temp[1] + '"'].join(',') + '},'
  //   })
  //
  //   return emp
  // }
  })

$(document).ready(function () {
  $('select').material_select()
})

$(document).ready(function () {
  $('.modal-trigger').leanModal()
})
