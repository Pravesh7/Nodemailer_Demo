const express= require('express');
const bodyParser= require('body-parser');
var exphbs  = require('express-handlebars');
const nodemailer=require('nodemailer');
const path= require('path');
require('dotenv').config();

const app= express();

// Express Handlebars (View Engine Setup)
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Setting up the Static Public Folder
app.use('/public',express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname, '/views')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Routes
app.get('/getdata', (req,res)=>{
    res.redirect('http://localhost:7000/home.html');
});


app.post('/send', (req,res)=> {
    
// console.log(req.body);    console all the fields that are present in the form 

  const output=`
    <p>you have a new Contact Request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
      service:'gmail',
      // host:  ,
      auth:{
        user:'bobbyrdj007@gmail.com',
        password:'Pravesh@vinove123'
      },
      // When you are trying/sending mail from localhost(and you are not on original domain) then you have to include tls:{}
      // tls:{
      //   rejectUnauthorized:false
      // }
    });

    let mailOptions={
      from:"bobbyrdj007@gmail.com",
      to:"vishalims095@gmail.com",
      subject:"Testing nodemailer",
      text:'Testing',
      // html:'fhgsdfhjsgdf'   // sent to the reciever
    }
    
    transporter.sendMail(mailOptions, function(err,data){
      if(err){
        console.log(err);
      }
        console.log('HURRAYYY -------->>>>Mail Sent');
        // res.render('index',{msg:'Congo---Mail Sent'})
    });
})

app.listen(7000, () => console.log("Server is listening"));
