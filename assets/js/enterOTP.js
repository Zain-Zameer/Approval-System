const USERNAME = localStorage.getItem("USERNAME");
const USEREMAIL = localStorage.getItem("USEREMAIL");
const USERPASSWORD = localStorage.getItem("USERPASSWORD");
const USERPOSITION = localStorage.getItem("USERPOSITION");
let USERNEWOTP = localStorage.getItem("USERNEWOTP");


function generateCustomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let customId = '';
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        customId += characters[randomIndex];
    }
    return customId;
}

function Continue(){
    let inputOTP = document.getElementById("otp");
    const takeOTP = inputOTP.value;
    let customID = generateCustomId();
    if(USERNEWOTP == takeOTP){

        fetch(`/storeNewUser?userName=${USERNAME}&userEmail=${USEREMAIL}&userPassword=${USERPASSWORD}&userPosition=${USERPOSITION}&userID=${customID}`)
        .then({  
        })
        
        window.location.href = '/logIn';
        console.log("OTP matched")
    }
    else{
        console.log("OTP not matched")
    }
        
}

function resendCode(){
    
    fetch(`/sendOTP?email=${USEREMAIL}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            USERNEWOTP = data.otp;
            localStorage.setItem("USERNEWOTP", data.otp);
            window.location.href = '/enterOTP'; 
        })

}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("continueBTN").addEventListener("click", Continue);
    document.getElementById("sendAG").addEventListener("click", resendCode);
    
});