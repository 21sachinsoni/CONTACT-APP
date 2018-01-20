var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var app = express();
var db = mongojs('employeedetail',['employeedetail']);
/*
app.get('/',function(req,res){
    res.send('Hello Node..I m Express');
});
*/

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());


app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});



app.get('/employeelist',function(req,res){
    console.log("Get request received");
   /*  employee1={
        name:'sachin',
        gender:'male',
        city:'Mathura',
        salary:'800000'
    };
    employee2={
        name:'neeraj',
        gender:'male',
        city:'Mathura',
        salary:'500000'
    };
    employee3={
        name:'abhi',
        gender:'male',
        city:'Mathura',
        salary:'600000'
    };
    employee4={
        name:'kannu',
        gender:'male',
        city:'Mathura',
        salary:'700000'
    };
     employee5={
        name:'mannu',
        gender:'male',
        city:'Mathura',
        salary:'700000'
    };
    var employeeList=[employee1,employee2,employee3,employee4,employee5];
    */
    db.employeedetail.find(function(err,docs){
    console.log(docs); 
     res.json(docs);   
    });
    
});
app.post('/employeelist',function(req,res){
    console.log(req.body);
    db.employeedetail.insert(req.body,function(err,doc){
        res.json(doc);
    });
});


app.delete('/employeelist/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    db.employeedetail.remove({_id:mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);      
    });
});

app.get('/employeelist/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    db.employeedetail.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);      
    });
});

app.put('/employeelist/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    db.employeedetail.findAndModify({
        query:{_id:mongojs.ObjectId(id)},
        update:{$set:{name:req.body.name,gender:req.body.gender,city:req.body.city,salary:req.body.salary}},
        new:true
    },function(err,doc){
        res.json(doc);
         
    });
   
});


app.listen(5000);
console.log("Server start on port 5000... URL is http://127.0.0.1:5000");