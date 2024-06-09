const  express = require('express');
const  path =require('path');
const app = express();
var session = require('express-session');


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

// creation of database starter
const db = require("../models");
const registeredUser = require('../models/registeredUser');
const RegisteredUsers = db.RegisteredUsers;
const draftRequest  = db.draftRequest;

app.use(session({
    name:'sid',
    resave:false,
    saveUninitialized:false,
    secret:'fatimajinnah',
    cookie:{
        maxAge:1000 * 60 * 60 * 2,
        sameSite:true,
        secure:'development' === 'production'
    }
}))

app.use((req, res, next) => {
    if (req.session.Position === undefined) {
        req.session.Position = null;
    }
    next();
});


const redirectBasedOnPosition = (req, res, next) => {
    console.log(req.session.Position)
    
    if (req.session.Position === 'Employee') {
        return res.redirect('/EmployeeLanded');
    }else if (req.session.Position === 'Manager') {
        return res.redirect('/ManagerView');
    }
    else if(req.session.Position==='admin'){
        return res.redirect('/adminView')
    }
    
    
    next();
};

const redirectLogin=(req,res,next)=>{
    if(req.session.Position===null){
        return res.redirect('/logIn');
    }
    next()
}


const ensureManager = (req, res, next) => {
    if (req.session.Position !== 'Manager') {
        return res.redirect('/logIn'); 
    }
    next();
};

const ensureEmployee = (req, res, next) => {
    if (req.session.Position !== 'Employee') {
        return res.redirect('/logIn');
    }
    next();
};

const ensureAdmin = (req, res, next) => {
    if (req.session.Position !== 'admin') {
        return res.redirect('/logIn');
    }
    next();
};

app.use(express.json());
app.use(express.static(path.join(__dirname, '../assets')));


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../','landingPage.html'));
});

app.get('/logIn',redirectBasedOnPosition, (req, res) => { 
    res.sendFile(path.join(__dirname, '../assets/html/logIn.html'));
}); 

app.get('/EmployeeLanded',redirectLogin,ensureEmployee,(req,res)=>{
    res.sendFile(path.join(__dirname,'../assets/html/employeeLandingPage.html'));
});


app.get('/ManagerView',redirectLogin,ensureManager,(req,res)=>{
    res.sendFile(path.join(__dirname,'../assets/html/ManagerLandingPage.html'));
});

app.get('/adminView', redirectLogin, ensureAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'assets', 'html/adminView.html'));
});
app.post('/adminFor', (req, res) => {
    req.session.Position = 'admin';
    console.log(req.session.Position);
    return res.redirect('/adminView');
});
app.post('/employeeFor', (req, res) => {
    req.session.Position = 'Employee';
    console.log(req.session.Position);
    return res.redirect('/EmployeeLanded');
});
app.post('/managerFor', (req, res) => {
    req.session.Position = 'Manager';
    console.log(req.session.Position);
    return res.redirect('/ManagerView');
});


app.get('/signUp',redirectBasedOnPosition,(req,res)=>{
    res.sendFile(path.join(__dirname,'../','assets','html/signUp.html'));
});

app.get('/enterOTP',(req,res)=>{
    res.sendFile(path.join(__dirname,'../','assets','html/enterOTP.html'));
});

app.get('/logKey',(req,res)=>{
    res.sendFile(path.join(__dirname,'../','assets','html/logKey.html'));
});


app.get('/EmployeeRaiseRequest',redirectLogin,(req,res)=>{
    res.sendFile(path.join(__dirname,'../','assets','html/employeeRaiseReq.html'));
});

app.get('/EmployeeRaiseRequestSuccess',redirectLogin,(req,res)=>{
    res.sendFile(path.join(__dirname,'../','assets','html/requestRaisedSuccessfully.html'));
});

app.get('/requestAddedToDraftSuccessfully',redirectLogin,(req,res)=>{
    res.sendFile(path.join(__dirname,'../','assets','html/requestAddedToDraftSuccessfully.html'));
});

app.get('/employeeDraftRequest',redirectLogin,(req,res)=>{
    res.sendFile(path.join(__dirname,'../','assets','html/employeeDraftRequest.html'));
});

app.get('/employeeStatus',redirectLogin,(req,res)=>{
    res.sendFile(path.join(__dirname,'../','assets','html/employeeStatus.html'));
});



app.get('/sendOTP',(req,res)=>{
    let otpLength = 6;
    let otp = Math.floor(Math.random() * Math.pow(10, otpLength));
    const userEmail = req.query.email;

    transporter.sendMail({
        from: '"Approval System" <defaultxt9@gmail.com>', // sender address
        to: `${userEmail}`, // list of receivers
        subject: 'OTP CODE for confirmation', // Subject line
        html: `Here is your OTP code for creating your account in approval system: <b>${otp}</b>`, 
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

app.get('/sendLogKey',(req,res)=>{
    let otpLength = 6;
    let otp = Math.floor(Math.random() * Math.pow(10, otpLength));
    const userEmail = req.query.email;

    transporter.sendMail({
        from: '"Approval System" <defaultxt9@gmail.com>', // sender address
        to: `${userEmail}`, // list of receivers
        subject: 'Log Key for confirmation', // Subject line
        html: `Welcome User, Here is your key for your approval system: <b>${otp}</b>`, 
    }, (error, info) => {
        if (error) {
        console.log('Error occurred:', error);
        res.status(500).send('Failed to send Key');
        } else {
        console.log('Email sent: ' + info.response);
        console.log(otp);
        res.json({ otp: otp });
        }
    });
});


app.get('/storeNewUser',(req,res)=>{
    const Username = req.query.userName;
    const Useremail = req.query.userEmail;
    const Userpassword = req.query.userPassword;
    const Userposition = req.query.userPosition;
    const UserID = req.query.userID;

    RegisteredUsers.create({
        UserId:UserID,    
        username:Username,
        email:Useremail,
        password:Userpassword,
        position:Userposition,
    }).catch(err=>{
        if(err){
            console.log(err);
        }
    });
    console.log("Data inserted in database")
    res.send("inserted Data Successfully");
});


// Check user validation
app.get('/checkUser',(req,res)=>{
    const Useremail = req.query.userEmail;
    const Userpassword = req.query.userPassword;
    
    RegisteredUsers.findOne({
        where: {
          email: Useremail,
        },
      }).then(user => {
        if (user) {
          if (user.password === Userpassword) {
            res.json({ checkValid: "Success" });
            
            
            console.log("User authenticated successfully")
          } else {
            res.json({ checkValid: "Failure" });
          }
        } else {
            res.json({ checkValid: "Failure" });
        }
      }).catch(err => {
        console.log(err);
        res.json({ checkValid: "Failure" });
      });
});


app.get('/getUserInfo', (req, res) => {
    const userEmail = req.query.UserEmail;
    console.log(userEmail)
    if (!userEmail) {
        return res.status(400).json({ error: 'User email is required' });
    }

    RegisteredUsers.findOne({
        where: {
            email: userEmail,
        },
    })
    .then(user => {
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json({userPosition:user.position}); // Respond with the user information as JSON
    })
    .catch(err => {
        console.error('Error during database query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    });
});


app.post('/checkPosition', (req, res) => {
    const Useremail = req.body.userEmail;

    console.log('I am server side: ' + Useremail);
    
    RegisteredUsers.findOne({
        where: {
            email: Useremail,
        },
    }).then(user => {
        if (user) {
            req.session.Position = user.position;
            req.session.userID = user.id;
            console.log("I am request session position: " + req.session.Position);
            req.session.save(err => {
                if (err) {
                    console.log(err);
                    return res.redirect('/logIn'); // Redirect to login in case of error
                }
                if (user.position.trim() === 'Employee') {
                    console.log("redirecting to employee page")
                    return res.redirect('/EmployeeLanded');
                }
                if (user.position.trim() === 'Manager') {
                    return res.redirect('/ManagerView');
                }
            });
        } 
    }).catch(err => {
        console.log(err);
        return res.redirect('/logIn'); // Redirect to login in case of error
    });
});





// make it valid for draft check ids
app.get('/checkDraftID', (req, res) => {
    const draftID = req.query.id;
    
    draftRequest.findOne({
        where: {
            DraftId: draftID,
        },
    }).then(user => {
        if (user) {
            // Return the position of the user if found
            res.json({departNo: user.departmentNo,fileLocation:user.requestedDocumentFileLocation,Email:user.email,Id:user.DraftId});
            console.log("Data is transfered.")
        } else {
            res.json({ checkValid: "Failure" });
        }
    }).catch(err => {
        console.log(err);
        res.json({ checkValid: "Failure" });
    });
});

app.get('/removeDraft', (req, res) => {
    const draftID = req.query.id;
    const userEmail = req.query.email;

    draftRequest.findOne({
        where: {
            DraftId: draftID,
        },
    }).then(user => {
        if (user) {
            if (user.email === userEmail) {
                draftRequest.destroy({
                    where: {
                        DraftId: draftID,
                    }
                }).then(() => {
                    res.json({ message: "Draft removed successfully." });
                }).catch(err => {
                    console.log(err);
                    res.json({ message: "Error removing draft." });
                });
            } else {
                res.json({ message: "Email does not match." });
            }
        } else {
            res.json({ message: "Draft ID not found." });
        }
    }).catch(err => {
        console.log(err);
        res.json({ message: "Error finding draft." });
    });
});

const raiseRequest  = db.raiseRequest;
app.get('/sendReqData',(req,res)=>{
    const email = req.query.email;
    const department = req.query.department;
    const fileLocation = req.query.file;
    const status = req.query.status;
    const newID = req.query.id;
    raiseRequest.create({
        ReqId:newID,
        email:email,
        departmentNo:department,
        requestedDocumentFileLocation:fileLocation,
        status:status,
    }).catch(err=>{
        if(err){
            console.log(err);
        }
    });
    console.log("Data inserted in database")
    res.send("inserted Data Successfully");
});




app.get('/sendReqDraft',(req,res)=>{
    const email = req.query.email;
    const department = req.query.department;
    const fileLocation = req.query.file;
    const status = req.query.status;
    const newID = req.query.id;
    draftRequest.create({
        DraftId:newID,
        email:email,
        departmentNo:department,
        requestedDocumentFileLocation:fileLocation,
        status:status,
    }).catch(err=>{
        if(err){
            console.log(err);
        }
    });
    console.log("Data inserted in database")
    res.send("inserted Data Successfully");
});




// api  for getting raise requests
app.get('/raiseRequestsShow', (req, res) => {
    const emailID = req.query.email;

    raiseRequest.findAll({
        where: {
            email: emailID,
        },
    }).then(users => {
        if (users.length > 0) {
            const requestData = users.map(user => {
                return { RequestID: user.ReqId, RequestStatus: user.status };
            });
            res.json(requestData);
            console.log("Data is transferred.");
        } else {
            res.json({ checkValid: "Failure" });
        }
    }).catch(err => {
        console.error(err);
        res.json({ checkValid: "Failure" });
    });
});



// api  for getting draft requests
app.get('/draftRequestsShow', (req, res) => {
    const emailID = req.query.email;

    draftRequest.findAll({
        where: {
            email: emailID,
        },
    }).then(users => {
        if (users.length > 0) {
            const requestData = users.map(user => {
                return { DraftID: user.DraftId, DraftStatus: user.status };
            });
            res.json(requestData);
            console.log("Data is transferred.");
        } else {
            res.json({ checkValid: "Failure" });
        }
    }).catch(err => {
        console.error(err);
        res.json({ checkValid: "Failure" });
    });
});

// api for view requests that are sent
app.get('/viewSentRequests', (req, res) => {
    raiseRequest.findAll({
        where: {
            status: 'Sent',
        },
    }).then(users => {
        if (users.length > 0) {
            const requestData = users.map(user => {
                return { RequestID: user.ReqId};
            });
            res.json(requestData);
            console.log("Data is transferred.");
        } else {
            res.json({ checkValid: "Failure" });
        }
    }).catch(err => {
        console.error(err);
        res.json({ checkValid: "Failure" });
    });
});


// api  for getting detail of raise request
app.get('/raiseRequestDetail', (req, res) => {
    const RequestID = req.query.id;
    
    raiseRequest.findOne({
        where: {
            ReqId: RequestID,
        },
    }).then(user => {
        if (user) {
            res.json({RequestId: user.ReqId,RequestDepart:user.departmentNo,RequestEmail:user.email,RequestDocument:user.requestedDocumentFileLocation,RequestUploadTime:user.createdAt});
            console.log("Data is transfered.")
        } else {
            res.json({ checkValid: "Failure" });
        }
    }).catch(err => {
        console.log(err);
        res.json({ checkValid: "Failure" });
    });
});

//Update status to Approved
app.get('/updateStatus', (req, res) => {
    const ID = req.query.id;
    const STATUS = req.query.status;

    raiseRequest.findOne({
        where: {
            ReqId: ID,
        },
    }).then(user => {
        if (user) {
            if (user.ReqId === ID) {
                user.status = STATUS;
                user.save({ fields: ['status'] });
            } else {
                res.json({ message: "Email does not match." });
            }
        } else {
            res.json({ message: "Draft ID not found." });
        }
    }).catch(err => {
        console.log(err);
        res.json({ message: "Error finding draft." });
    });
});


app.get('/showEmployeesRequests', (req, res) => {
    const STATUS = req.query.status;
    
    raiseRequest.findAll({
        where: {
            status: STATUS,
        },
    }).then(user => {
        if (user) {
            const requestData = user.map(users => {
                return { RequestId: users.ReqId,RequestEmail:users.email};
            });
            res.json(requestData);
            
        } else {
            res.json({ checkValid: "Failure" });
        }
    }).catch(err => {
        console.log(err);
        res.json({ checkValid: "Failure" });
    });
});

app.get('/showManagerstats', (req, res) => {
    const STATUS = req.query.status;
    raiseRequest.findAll({
        where: {
            status: STATUS,
        },
    }).then(user => {
        if (user) {
            const requestData = user.map(users => {
                return { RequestId: users.ReqId};
            });
            res.json(requestData);
            
        } else {
            res.json({ checkValid: "Failure" });
        }
    }).catch(err => {
        console.log(err);
        res.json({ checkValid: "Failure" });
    });
});


app.post('/logOut',(req,res)=>{
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/EmployeeLanded');
        }
        res.clearCookie('sid');
        res.redirect('/logIn');
    });
})


db.sequelize.sync().then((req)=>{
    app.listen(8080,()=>{
        console.log("server is runnning");
    });
});