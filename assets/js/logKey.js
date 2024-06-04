
const USEREMAIL = localStorage.getItem("USEREMAIL");
let USERNEWOTP = localStorage.getItem("USERNEWOTP");
let userPosition = localStorage.getItem("userPosition");

function ContinueLog(){
    let inputOTP = document.getElementById("key");
    const takeOTP = inputOTP.value;
    if(USERNEWOTP == takeOTP){
        // success point
        fetch(`/checkPosition?userEmail=${USEREMAIL}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.position) {
                localStorage.setItem('userPosition', data.position);
                if (data.position==='Employee'){
                    window.location.href = '/EmployeeLanded'; 
                }
                if (data.position==='Manager'){
                    window.location.href = '/ManagerView';
                }
            } else {
                console.error('Failed to retrieve position: ', data);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        
        
        
    }
    else{
        console.log("OTP not matched")
    }
        
}

function resendCodeLog(){
    
    fetch(`/sendLogKey?email=${USEREMAIL}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            USERNEWOTP = data.otp;
            localStorage.setItem("USERNEWOTP", data.otp);
            window.location.href = '/logKey'; 
        })
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("continueBTNLog").addEventListener("click", ContinueLog);
    document.getElementById("sendAGLog").addEventListener("click", resendCodeLog);
    
});