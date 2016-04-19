var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require('fs')
var jsonParser = bodyParser.json()

app.set('port', (process.env.PORT || 3000))

app.use(express.static('public'))

var exec = require('child_process').exec

app.post('/data', jsonParser, function (req, res) {
  if (req.body !== null) {
    create_unseen_arff(req.body.data, (result) => {
      res.send(result)
    })
  }
})

var runCMD = function (result) {
  var cmd = "java -classpath 'public/resource/weka.jar' weka.classifiers.trees.J48 -l 'public/resource/bay2.model' -T 'public/resource/classify_unseen.arff' -p 0"
  exec(cmd, function (error, stdout, stderr) {
    result(stdout.split('\n').filter((item) => item !== ''))
    if (error) console.log(error)
  })
}

var create_unseen_arff = function (data, res) {
  var txt = data
  var masterFile = 'public/resource/classify_master.arff'
  var outputFile = 'public/resource/classify_unseen.arff'

  fs.readFile(masterFile, 'utf8', (err, data) => {
    fs.writeFile(outputFile, data + txt, function (err) {
      if (err) console.log(err)
    })
    if (err) console.log(err)
  })
  runCMD((output) => {
    res(output)
  })
}

app.listen(app.get('port'), function () {
  console.log('Server Start at port ', app.get('port'))
})
