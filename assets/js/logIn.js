export function CLEAR(event){
    event.preventDefault();
    let password = document.getElementById("Password");
    let email = document.getElementById("Email");
    password.value="";
    email.value="";
}
let USERNEWOTP = 0
export function LOGIN(event){
    event.preventDefault();
    let password = document.getElementById("Password");
    let email = document.getElementById("Email");
    const USERPASSWORD = password.value;
    let USEREMAIL = email.value;
    if(USEREMAIL=='admin@approval.com' && USERPASSWORD=='sheri'){
        fetch('/adminFor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
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
    else{
        fetch(`/checkUser?userEmail=${USEREMAIL}&userPassword=${USERPASSWORD}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
        let validation = data.checkValid;
        if(validation==='Success'){
            console.log("I ran");
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
                localStorage.setItem("usermail", USEREMAIL);
                window.location.href = '/logKey'; 
            })
            
            
        }
    })
}
    
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("Clear").addEventListener("click", CLEAR);
    document.getElementById("logIn").addEventListener("click", LOGIN);
    
});