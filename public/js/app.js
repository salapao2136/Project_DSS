/* global angular, $ */
angular.module('wekaApp', ['ui.materialize'])
  .controller('wekaCtrl', function ($scope, $http) {
    $http.get('js/data.json').success((req, res) => {
      $scope.formData = $.map(req, function (value, index) {
        return [value]
      })
      $scope.labels = Object.keys(req)

      console.log()
    })
    $scope.form = [null, null, null, null, null, null, null, null, null, null, null, null, null]
    // $scope.form = ['M', '21', 'A', 'd', 'sm', 'E', 'F', '2', 'F', 'F', 'S', 'A', 'S']

    $scope.checkHave = function () {
      $scope.form.forEach((element, index, array) => {
        if (element !== null) $('a.test' + (index + 1)).addClass('have')
        else if (element === null) $('a.test' + (index + 1)).removeClass('have')
      })
    }

    $scope.post = function () {
      $scope.showModel = false
      $scope.data = "'" + $scope.form.join("','") + "',?"
      $http.post('/data', {data: $scope.data}).success((req, res) => {
        var result = req[2].split(' ').filter((item) => item !== '')
        answer(result)
      })
    }

    $scope.percentage = function () {
      var have = $scope.form.filter((item) => item !== null)
      var fullPercent = $scope.form.length
      var per = (have.length * 100) / fullPercent
      return Math.round(per)
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

$(document).ready(function () {
  $('ul.tabs').tabs()
})

$(document).ready(function () {
  $('.parallax').parallax()
})
