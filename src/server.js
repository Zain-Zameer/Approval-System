const  express = require('express');
const  path =require('path');
const app = express();

const db = require("../models");

const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host:"smtp.gmail.com",
  port:587,
  secure:false,
  auth: {
    user: 'defaultxt9@gmail.com', // Replace with your Gmail address
    pass: 'aphu qgmh ntsl oeqa',        // Replace with your Gmail password
  },
});


const {registeredUser} = require("../models");
const {otpCreator} = require("../models");

app.use(express.json());
app.use(express.static(path.join(__dirname, '../assets')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../','landingPage.html'));
});

app.get('/logIn',(req,res)=>{
    res.sendFile(path.join(__dirname,'../','assets','html/logIn.html'));
});

app.get('/signUp',(req,res)=>{
    res.sendFile(path.join(__dirname,'../','assets','html/signUp.html'));
});

app.get('/enterOTP',(req,res)=>{
    res.sendFile(path.join(__dirname,'../','assets','html/enterOTP.html'));
});


app.get('/sendOTP',(req,res)=>{
    let otpLength = 6;
    let otp = Math.floor(Math.random() * Math.pow(10, otpLength));
    const userEmail = req.query.email;

    transporter.sendMail({
        from: '"Approval System" <defaultxt9@gmail.com>', // sender address
        to: `${userEmail}`, // list of receivers
        subject: 'OTP CODE for confirmation', // Subject line
        html: `Here is your OTP code to continue creating your account in the approval system: <b>${otp}</b>`, 
    }, (error, info) => {
        if (error) {
        console.log('Error occurred:', error);
        res.status(500).send('Failed to send OTP');
        } else {
        console.log('Email sent: ' + info.response);
        console.log(otp);
        res.json({ otp: otp });
        }
    });
});

// app.push("/InsertNewUser",(req,res)=>{


//     registeredUser.create({
//         username:"Zain",
//         email:"zain@gmail.com",
//         password:"helloworld",
//         position:"Manager",
//     }).catch(err=>{
//         if(err){
//             console.log(err);
//         }
//     });
//     res.send("Inserted data");
// })





 app.listen(8080,()=>{
        console.log("Server is listening on port 8080");
    });   
