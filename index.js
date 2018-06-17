var express = require('express');
var fs = require('fs');
let hbs = require('hbs');
//Express is a function and it will return Object so you need to assign to a let or variable to run app
let app = express();

//To use Partials we need to handle hbs.expressPartials method
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getYear',()=>{
  return new Date().getFullYear();
});

//TO Use Static Folder we need to use app.use and express.static method
app.use(express.static(__dirname + '/public'));

//To tell express that by using middleware we need to more than what express cannt do

app.use((req,res,next) => {
  fs.appendFileSync('index.log',`Time stamp: ${new Date().toString()} :: ${req.method} \ ${req.path} ` +'\n')
  console.log(`Time stamp: ${new Date().toString()}`);
  next();
})

//To use Template engine form path file we need HandleBar js that is Express handlebar view engine to render the Template
app.set('view engine','hbs');

app.get('/',(req,res) => {
  res.render('layout.hbs',{
    title:'Home Page'
  });
}); // This method will take root path of the url and call back the given function with two arguments 1) request (headers) 2) respond (Data send back to broswer)



app.get('/contact',(req,res) => {
  res.render('contact.hbs',{
    title:'Contact Page'
  })
});

app.listen(3000, () => {
  console.log('Server opened for 3000');
});// It will listen the port number where we r using on browser and connect to the application
