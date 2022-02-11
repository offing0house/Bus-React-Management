const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT | 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/hello',(req,res)=>{
//     res.send({message: 'Hello Express!'});
// });

app.get('/api/customers',(req,res) => {
    res.send([
            {
              'id': 1,
              'image': 'https://placeimg.com/64/64/1',
              'name' : 'a1',
              'birthday' : 'b1',
              'gender' : 'c1',
              'job' : 'd1'
            },
            {
              'id': 2,
              'image': 'https://placeimg.com/64/64/2',
              'name' : 'a2',
              'birthday' : 'b2',
              'gender' : 'c2',
              'job' : 'd2'
            },
            {
              'id': 3,
              'image': 'https://placeimg.com/64/64/3',
              'name' : 'a3',
              'birthday' : 'b3',
              'gender' : 'c3',
              'job' : 'd3'
            }
    ]);
})

app.listen(port,() => console.log(`Listening on port ${port}`));
