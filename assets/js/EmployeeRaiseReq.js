const USEREMAIL = localStorage.getItem("USEREMAIL");


function CLEAR(event){
    event.preventDefault();
    let depart = document.getElementById("deptNumber");
    let email = document.getElementById("email");
    let file = document.getElementById("file");
    depart.value=""
    email.value=""
    file.value=""
}
function generateCustomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let customId = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        customId += characters[randomIndex];
    }
    return customId;
}
function sendReq(event){
    event.preventDefault();
    let depart = document.getElementById("deptNumber");
    let email = document.getElementById("email");
    let file = document.getElementById("file");
    let customID = generateCustomId();
    const DEPT = depart.value;
    const EMAIL = email.value;
    const FILE = file.value;
    let STATUS = "Sent";

    if(EMAIL===USEREMAIL){
        console.log("correct Email");

        fetch(`/sendReqData?department=${DEPT}&email=${EMAIL}&file=${FILE}&status=${STATUS}&id=${customID}`)
        .then({ 
        })
        window.location.href = '/EmployeeRaiseRequestSuccess';

    }
    else if(!USEREMAIL){
        console.log("Log In first please.");
    }
    else{
        console.log("Enter correct email.");
    }


}



document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("clearBtn").addEventListener("click", CLEAR);
    document.getElementById("requestBtn").addEventListener("click", sendReq);
    
});