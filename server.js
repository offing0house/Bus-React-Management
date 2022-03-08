const fs = require('fs');
const request = require('request');
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const url = require('url');
const app = express();
const port = process.env.PORT | 5000;
const converter = require('xml-js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})


app.get('http://ec2-35-78-68-96.ap-northeast-1.compute.amazonaws.com/getLowArrInfoByStId/',(req,res) => {
  const query = url.parse(req.url,true).query;
  const stId = query.stId;
  const OPEN_API_KEY = '9bnaou0550%2BAePv%2BKJ5P03FS0nJlJqhAenEHOxpImpaW4XrlVsZ0g2Xynfg1el0zE8cE6OoWSQ2Igpu5%2F0Scyg%3D%3D';
  var api_url = 'http://ws.bus.go.kr/api/rest/arrive/getLowArrInfoByStId';
  var queryParams = '?' + encodeURIComponent('serviceKey') + '='+OPEN_API_KEY; /* Service Key*/
  queryParams += '&' + encodeURIComponent('stId') + '=' + encodeURIComponent(stId); /* */


  request({
    url: api_url + queryParams,
    method: 'GET'
  }, function (error, response, body) {
      const xmlToJson = converter.xml2json(body);  
      var data = JSON.parse(xmlToJson);

      res.send(data.elements[0].elements[2].elements);
      })
      
  });








app.get('http://ec2-35-78-68-96.ap-northeast-1.compute.amazonaws.com/api/customers',(req,res) => {
    connection.query(
      "SELECT * FROM CUSTOMER WHERE isDeleted = 1",
      (err,rows,fields) => {
        res.send(rows);
      }
    );
});

app.use('/image',express.static('./upload'));
app.post('http://ec2-35-78-68-96.ap-northeast-1.compute.amazonaws.com/api/customers', upload.single('image'), (req,res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), ?)';
  let image = req.body.image;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let isDeleted = req.body.isDeleted;
  let params = [image,name,birthday,gender,job,isDeleted];
  connection.query(sql,params,
    (err,rows,fields) => {
      res.send(rows);
    }
    )
  
});


app.delete('http://ec2-35-78-68-96.ap-northeast-1.compute.amazonaws.com/api/customers/:id',(req,res)=>{
  let sql = 'DELETE FROM CUSTOMER WHERE id = ?';
  let params = [req.params.id];
  
  connection.query(sql,params,
    (err,rows,fields) => {
      res.send(rows);
    }
    )
});

// app.truncate('/api/customers/',(req,res)=>{
//   let sql = 'TRUNCATE CUSTOMER';
  
//   connection.query(sql,params,
//     (err,rows,fields) => {
//       res.send(rows);
//     }
//     )
// });





app.listen(port,() => console.log(`Listening on port ${port}`));
