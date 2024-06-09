
let USEREMAIL = localStorage.getItem("usermail");
let USERNEWOTP = localStorage.getItem("USERNEWOTP");
let userPosition = localStorage.getItem("userPosition");

function ContinueLog(event) {
    event.preventDefault();
    let inputOTP = document.getElementById("key");
    const takeOTP = inputOTP.value;
    let UserEmail = USEREMAIL;
    if (USERNEWOTP === takeOTP) {

        fetch(`/getUserInfo?UserEmail=${UserEmail}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let Pos = data.userPosition;
            if(Pos==='Employee'){
                fetch('/employeeFor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    if (response.redirected) {
                        window.location.href = response.url;
                    } else {
                        // Handle non-redirected response
                        console.log('Failed to redirect to admin view');
                    }
                })
                .catch(error => console.error('Error:', error));
            }
            if(Pos==='Manager'){
                fetch('/managerFor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    if (response.redirected) {
                        window.location.href = response.url;
                    } else {
                        // Handle non-redirected response
                        console.log('Failed to redirect to admin view');
                    }
                })
                .catch(error => console.error('Error:', error));
            }
        });

        // // success point
        // fetch('/checkPosition', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ userEmail: UserEmail })
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok ' + response.statusText);
        //     }
        // })
        // .catch(error => {
        //     console.error('There was a problem with the fetch operation:', error);
        // });
    } else {
        console.log("OTP not matched");
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