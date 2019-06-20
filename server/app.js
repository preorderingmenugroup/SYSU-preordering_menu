const fs = require('fs');
const path = require('path');
const express = require('express');
const axios = require('axios');
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
    axios.get(data.tokenUrl).then((result) => {
        let accessToken = result.data.access_token
        let postdata = {'env': data.envid, 'query': 'db.collection(\"Restaurant\").where({}).get()'}
        let queryURL = 'https://api.weixin.qq.com/tcb/databasequery?access_token=' + accessToken
        axios.post(queryURL, postdata).then((postresult) => {
            let downloadURL = 'https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=' + accessToken
            postdata = {'env': data.envid, 'file_list':[{'fileid':postresult.data.data[0].GatePhoto, 'max_age': 7200}]}
            axios.post(downloadURL, postdata).then((downloadresult) => {
                console.log(downloadresult)
            }, function() {
                console.log('downloadFailed')
            })
            console.log(postresult.data.data)
            res.send(postresult.data)
        }, function() {
            console.log('queryFailed')
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
app.listen(8082);
