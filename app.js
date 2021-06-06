const express = require("express");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/HDAStudentsList', {useNewUrlParser: true, useUnifiedTopology: true});
const port =7000;
const path = require("path")

var contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    email: String,
    phone: String,
    date: String,
    dancetypes: String
  });

  var Students = mongoose.model('Students', contactSchema);


app.use('/static', express.static('static'));
app.use(express.urlencoded());


app.set('view engine','pug')
app.set('views', path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.status(200).render('home.pug')
});
app.get('/about',(req,res)=>{
    res.status(200).render('about.pug')
});
app.get('/service',(req,res)=>{
    res.status(200).render('service.pug')
});
app.get('/information',(req,res)=>{
    res.status(200).render('information.pug')
});
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug')
});
app.post('/contact',(req,res)=>{
    var mydata = new Students(req.body);
    mydata.save().then(()=>{
        res.send(`<h1 style="color:green;", style="Font-size:70px;">This information has been saved in (HDA) Database</h1>`)
    }).catch(()=>{
        res.status(400).send("<h1>This information has not saved in (HDA) Database</h1>")
    });
    
});

// app.post('/contact',(req,res)=>{
//     name=req.body.name
//     age=req.body.age
//     gender=req.body.gender
//     email=req.body.email
//     phone=req.body.phone
//     date=req.body.date
//     dancetypes=req.body.dancetypes

//     let outputToWrite = `
//     Name of the client is ${name}....
//     Age is ${age}.....
//     Gender is ${gender}....
//     Email Id :${email}
//     Phone no : ${phone}
//     Date of admission : ${date}
//     Dance types is ${dancetypes}`

//     fs.writeFileSync('output.txt', outputToWrite)
//     res.status(200).render('contact.pug')
// });


app.listen(port,(req,res)=>{
  console.log(`This is application on port ${port}`);
});