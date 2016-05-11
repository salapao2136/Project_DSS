var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require('fs')
var jsonParser = bodyParser.json()
var mongoose = require('mongoose')
mongoose.connect('mongodb://root:1234@ds021691.mlab.com:21691/dss_itkmutnb')
var Schema = mongoose.Schema
var thingSchema = new Schema({}, { strict: false })
var Student = mongoose.model('students', thingSchema)
app.set('port', (process.env.PORT || 3000))

app.use(express.static('public'))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

var exec = require('child_process').exec

app.post('/data', jsonParser, function (req, res) {
  if (req.body !== null) {
    create_unseen_arff(req.body.data, (result) => {
      var data = req.body.data
      data = data.split("'")
      data = data.filter((item) => item !== '' && item !== ',')
      data.splice(13, 1)
      var add = result[2].split(' ').filter((item) => item !== '')[2].split(':')[1]
      data.push(add)
      var insert = new Student({data: data})
      insert.save()
      res.send(result)
    })
  }
})

app.get('/datas', function (req, res) {
  Student.find(function (err, data) {
    if (err === null) res.send(data)
    else res.sendStatus(400)
  })
})

app.get('/online', function (req, res) {
  res.send({status: 'online'})
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

  fs.readFile(masterFile, 'utf8', function (err, data) {
    fs.writeFile(outputFile, data + txt, function (err) {
      if (err) console.log(err)
    })
    if (err) console.log(err)
  })
  runCMD(function (output) {
    res(output)
  })
}

app.listen(app.get('port'), function () {
  console.log('Server Start at port ', app.get('port'))
})
