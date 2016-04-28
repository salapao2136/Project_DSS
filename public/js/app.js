/* global angular, $ */
angular.module('wekaApp', ['ngAnimate', 'ui.materialize'])
  .controller('wekaCtrl', function ($scope, $http) {
    $http.get('js/data.json').success(function (req, res) {
      $scope.formData = $.map(req, function (value, index) {
        return [value]
      })
      $scope.labels = Object.keys(req)
    })
    $scope.form = [null, null, null, null, null, null, null, null, null, null, null, null, null]
    // $scope.form = ['M', '21', 'A', 'd', 'sm', 'E', 'F', '2', 'F', 'F', 'S', 'A', 'S']
    $scope.cli = function (tab) {
      $('ul.tabs').tabs('select_tab', tab)
    }

    $scope.checkNext = function (tab) {
      $('ul.tabs').tabs('select_tab', tab)
    }

    $scope.checkHave = function () {
      $scope.form.forEach(function (element, index, array) {
        if (element !== null) $('a.test' + (index + 1)).addClass('have')
        else if (element === null) $('a.test' + (index + 1)).removeClass('have')
      })
    }

    $scope.post = function () {
      $scope.showModel = false
      $scope.data = "'" + $scope.form.join("','") + "',?"
      $http.post('/data', {data: $scope.data}).success(function (req, res) {
        var result = req[2].split(' ').filter(function (item) { return item !== '' })
        answer(result)
      })
    }

    $scope.percentage = function () {
      var have = $scope.form.filter(function (item) { return item !== null })
      var fullPercent = $scope.form.length
      var per = (have.length * 100) / fullPercent
      return Math.round(per)
    }

    var answer = function (res) {
      $scope.showModel = true
      var x = res[3] * 100
      $scope.resRe = x.toFixed(2)
      var imgres = res[2].split(':')
      if (imgres[1] === 'cluster0') {
        $scope.classify = 'ไม่ค่อยเหมาะสมเท่าไหร่'
        $scope.message = {gender: 'ชาย',
          gpa: '1.87-2.33',
          into: 'Admission',
          fin: 'วิทย์-คณิต',
          area: 'ภาคกลาง',
          special_class: 'ไม่เคยเรียนพิเศษเพื่อสอบเข้าที่นี่',
          revenue: '150,001-300,000 บาท/ต่อปี',
          loan: 'ไม่เคยกู้ กยศ.',
          part_time: 'เคยทำงานพิเศษ',
          activity: 'เข้าร่วมกิจกรรมเป็นบางครั้ง',
          work: 'ชอบทำงานร่วมกับผู้อื่นมากกว่า',
        leader: 'ได้รับเลือกเป็นผู้นำเป็นบางครั้ง'}
      } else if (imgres[1] === 'cluster1') {
        $scope.classify = 'เหมาะสม'
        $scope.message = {gender: 'ชาย',
          gpa: '2.33-2.78',
          into: 'Admission',
          fin: 'ศิลป์-คำนวณ',
          area: 'ภาคกลาง',
          special_class: 'ไม่เคยเรียนพิเศษเพื่อสอบเข้าที่นี่',
          revenue: '150,001-300,000 บาท/ต่อปี',
          loan: 'ไม่เคยกู้ กยศ.',
          part_time: 'ไม่เคยทำงานพิเศษ',
          activity: 'เข้าร่วมกิจกรรมเป็นประจำ',
          work: 'ชอบทำงานร่วมกับผู้อื่นมากกว่า',
        leader: 'ได้รับเลือกเป็นผู้นำเป็นบางครั้ง'}
      } else if (imgres[1] === 'cluster2') {
        $scope.classify = 'เหมาะสมมาก'
        $scope.message = {gender: 'ชาย',
          gpa: '2.78-3.24',
          into: 'โควต้าพื้นที่',
          fin: 'วิทย์-คณิต',
          area: 'ภาคตะวันออก',
          special_class: 'ไม่เคยเรียนพิเศษเพื่อสอบเข้าที่นี่',
          revenue: 'น้อยกว่า 150,000 บาท/ต่อปี',
          loan: 'เคยกู้ กยศ.',
          part_time: 'เคยทำงานพิเศษ',
          activity: 'เข้าร่วมกิจกรรมเป็นบางครั้ง',
          work: 'ชอบทำงานคนเดียวมากกว่า',
        leader: 'ได้รับเลือกเป็นผู้นำเป็นบางครั้ง'}
      }
    }
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
