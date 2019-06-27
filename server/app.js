const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var data = {
    appid: 'wx1b73f99b71b71538',
    appSecret: '8040e17bf84df69ae30e08bfe9721d8e',
    envid: "cloud-database-5hfz6",
    tokenUrl: '',
    queryUrl: '',
    accessToken: '',
    result: ''
  }
data.tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + data.appid + '&secret=' + data.appSecret

axios.get(data.tokenUrl).then((res) => {
        data.accessToken = res.data.access_token
        console.log(data)
      }, function () {
        console.log('Unable to get token.')
      })
app.use(express.static(path.resolve(__dirname, './dist')))

app.get('/', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
    res.send(html)
})

app.get('/token', function(req, res) {
    axios.get(data.tokenUrl).then((result) => {
        data.accessToken = result.data.access_token
        console.log(data)
        res.send(data.accessToken)
    }, function () {
        console.log('Unable to get token.')
    })
})

app.get('/restaurants', function(req, res) {
    //console.log(res)
    axios.get(data.tokenUrl).then((result) => {
        let accessToken = result.data.access_token
        let postdata = {'env': data.envid, 'query': 'db.collection(\"Restaurant\").where({}).get()'}
        let queryURL = 'https://api.weixin.qq.com/tcb/databasequery?access_token=' + accessToken
        axios.post(queryURL, postdata).then((postresult) => {
            console.log(postresult.data)
            for (var i in postresult.data.data){
                postresult.data.data[i] = JSON.parse(postresult.data.data[i])
                var EnvironmentPhoto = postresult.data.data[i].EnvironmentPhoto
                var GatePhoto = postresult.data.data[i].GatePhoto
                var IdCardBackPhoto = postresult.data.data[i].IdCardBackPhoto
                var IdCardFrontPhoto = postresult.data.data[i].IdCardFrontPhoto
                var ProductionLicence = postresult.data.data[i].ProductionLicence
                var Photos = []
                Photos.push(EnvironmentPhoto,GatePhoto,IdCardBackPhoto,IdCardFrontPhoto,ProductionLicence)
                console.log('photos:',Photos)
                for(idx in Photos){
                    var splitString = Photos[idx].split('/')
                    var databaseName = splitString[2]
                    if(typeof(databaseName) != "undefined" ){
                       databaseName =  databaseName.split('.')[1] + '.tcb.qcloud.la'
                       var resourcePath = '/' + splitString[3] + '/' + splitString[4] + '/' +splitString[5]
                       Photos[idx] = 'https://' + databaseName + resourcePath
                    }
                }
                
                console.log(Photos)
                postresult.data.data[i].EnvironmentPhoto = Photos[0]
                postresult.data.data[i].GatePhoto = Photos[1]
                postresult.data.data[i].IdCardBackPhoto =  Photos[2]
                postresult.data.data[i].IdCardFrontPhoto = Photos[3]
                postresult.data.data[i].ProductionLicence = Photos[4]
            }
            res.send(postresult.data)
        }, function() {
            console.log('queryFailed')
        })
        
    }, function () {
        console.log('Unable to get token.')
    })
})

app.get('/schools', function(req, res) {
    axios.get(data.tokenUrl).then((result) => {
        let accessToken = result.data.access_token
        let postdata = {'env': data.envid, 'query': 'db.collection(\"School\").where({}).get()'}
        let queryURL = 'https://api.weixin.qq.com/tcb/databasequery?access_token=' + accessToken
        axios.post(queryURL, postdata).then((postresult) => {
	    for (var i in postresult.data.data){
		postresult.data.data[i] = JSON.parse(postresult.data.data[i])
            }
            console.log(postresult.data.data)
            res.send(postresult.data)
	})
    }, function () {
        console.log('Unable to get token.')
    })
})



app.post('/updateReview', function(req, res) {
    let request = req.body
    console.log(request.id)
    axios.get(data.tokenUrl).then((result) => {
        let accessToken = result.data.access_token
        let query = 'db.collection(\"Restaurant\").where({_id:\''+ request.id + '\'}).update({data:{isReviewed :' + request.reviewed + '}})'
        console.log(query)
        let postdata = {'env': data.envid, 'query': query}
        let queryURL = 'https://api.weixin.qq.com/tcb/databaseupdate?access_token=' + accessToken
        axios.post(queryURL, postdata).then((postresult) => {
            console.log(postresult.data)
            res.send(postresult.data)
        }, function() {
            console.log('queryFailed')
        })

    }, function () {
        console.log('Unable to get token.')
    })
})

app.post('/newSchool', function(req, res) {
    let request = req.body
    console.log(request)
    axios.get(data.tokenUrl).then((result) => {
        console.log(Date.now())
        let id = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
        console.log(id)
        request = {
            data: [{
	        SchoolId: id,
	        SchoolName: request.SchoolName
            }]
	}
        let accessToken = result.data.access_token
        let query = 'db.collection(\"School\").add(' + JSON.stringify(request) + ')'
        console.log(query)
        let postdata = {'env': data.envid, 'query': query}
        let queryURL = 'https://api.weixin.qq.com/tcb/databaseadd?access_token=' + accessToken
        axios.post(queryURL, postdata).then((postresult) => {
            console.log(postresult.data)
            res.send(postresult.data)
        }, function() {
            console.log('queryFailed')
        })

    }, function () {
        console.log('Unable to get token.')
    })
}) 
app.listen(8082);
