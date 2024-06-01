let USERNAME = "";
let USEREMAIL = "";
let USERPASSWORD = "";
let USERPOSITION = "";
let USERNEWOTP = 0;

export function CLEAR(event){
    event.preventDefault();
    let name = document.getElementById("Name")
    let email = document.getElementById("Email")
    let password = document.getElementById("Password")
    let confirmPassword = document.getElementById("ConfirmPassword")
    let options = document.getElementById("options")
    name.value = ""
    email.value = ""
    password.value = ""
    confirmPassword.value = ""
    options.value = "0"
    console.log("Cleared the inputs")  

      
}
export function SignUp(event){
    event.preventDefault();
    let name = document.getElementById("Name")
    let email = document.getElementById("Email")
    let password = document.getElementById("Password")
    let confirmPassword = document.getElementById("ConfirmPassword")
    let options = document.getElementById("options")


    // variables to store values
    const NAME= name.value;
    const EMAIL = email.value;
    const PASSWORD = password.value;
    const CONFIRMPASSWORD = confirmPassword.value;
    const OPTION = options.value;

    let check = false;

    if(!NAME){
        name.placeholder = "Enter name, please";
        name.style.borderColor = "red";
        check = true;
    }
    if(!EMAIL){
        email.placeholder = "Enter email, please";
        email.style.borderColor = "red";
        check = true;
    }
    if(!PASSWORD){
        password.placeholder = "Enter password, please";
        password.style.borderColor = "red";
        check = true;
    }
    if(!CONFIRMPASSWORD){
        confirmPassword.placeholder = "Enter confirm password, please";
        confirmPassword.style.borderColor = "red";
        check = true;
    }

    if(PASSWORD!=CONFIRMPASSWORD){
        confirmPassword.placeholder = "Password don't match";
        check = true;
    }

    if(!check){
        USERNAME = NAME;
        USEREMAIL = EMAIL;
        USERPASSWORD = PASSWORD;
        if(OPTION == "1"){
            USERPOSITION = "Employee";
        }
        if(OPTION == "2"){
            USERPOSITION = "Manager";
        }
        
        
        localStorage.setItem("USERNAME", USERNAME);
        localStorage.setItem("USEREMAIL", USEREMAIL);
        localStorage.setItem("USERPASSWORD", USERPASSWORD);
        localStorage.setItem("USERPOSITION", USERPOSITION);
        // console.log("SignUp Success:");
        // console.log("USERNAME:", USERNAME);
        // console.log("USEREMAIL:", USEREMAIL);
        // console.log("USERPASSWORD:", USERPASSWORD);
        // console.log("USERPOSITION:", USERPOSITION);
        // console.log("USERNEWOTP:", USERNEWOTP);
        
        fetch(`/sendOTP?email=${USEREMAIL}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            USERNEWOTP = data.otp;
            console.log(data)
            localStorage.setItem("USERNEWOTP", data.otp);
            window.location.href = '/enterOTP'; 
        })
        
}
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("signUp").addEventListener("click", SignUp);
    document.getElementById("Clear").addEventListener("click", CLEAR);
    
});

export function getUsername() {
    return USERNAME;
}

export function getUserEmail() {
    return USEREMAIL;
}

export function getUserPassword() {
    return USERPASSWORD;
}

export function getUserPosition() {
    return USERPOSITION;
}


