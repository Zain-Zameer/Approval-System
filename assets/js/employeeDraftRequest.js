const USEREMAIL = localStorage.getItem("USEREMAIL");

function generateCustomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let customId = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        customId += characters[randomIndex];
    }
    return customId;
}

function CLEAR(event){
    event.preventDefault();
    let depart = document.getElementById("deptNumber");
    let email = document.getElementById("email");
    let file = document.getElementById("file");
    depart.value=""
    email.value=""
    file.value=""
}
function sendReq(event){
    event.preventDefault();
    let depart = document.getElementById("deptNumber");
    let email = document.getElementById("email");
    let file = document.getElementById("file");
    
    const DEPT = depart.value;
    const EMAIL = email.value;
    const FILE = file.value;
    let STATUS = "On Draft";
    let customID = generateCustomId();
    if(EMAIL===USEREMAIL){
        console.log("correct Email");

        fetch(`/sendReqDraft?department=${DEPT}&email=${EMAIL}&file=${FILE}&status=${STATUS}&id=${customID}`)
        .then({ 
        })
        window.location.href = '/requestAddedToDraftSuccessfully';

    }
    else if(!USEREMAIL){
        console.log("Log In first please.");
    }
    else{
        console.log("Enter correct email.");
    }


}

function sendDraft(event){
    event.preventDefault();
    let draftID = document.getElementById("draftNo");
    const ID = draftID.value;
    fetch(`/checkDraftID?id=${ID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let email = data.Email;
            let depart = data.departNo;
            let fileLocation = data.fileLocation;
            let reqID = data.Id;;
            let STATUS = "Sent";
            if(email===USEREMAIL){
                fetch(`/sendReqData?department=${depart}&email=${email}&file=${fileLocation}&status=${STATUS}&id=${reqID}`)
                .then({ 
                })

                fetch(`/removeDraft?email=${email}&id=${reqID}`)
                .then({ 
                })
                window.location.href = '/EmployeeRaiseRequestSuccess';

            }
            else{
                console.log("Email is incorrect.")
            }
        })
}

function deleteDraft(event){
    event.preventDefault();
    let draftID = document.getElementById("draftNo");
    const ID = draftID.value;
    fetch(`/checkDraftID?id=${ID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let email = data.Email;
            if(email===USEREMAIL){
                fetch(`/removeDraft?email=${email}&id=${ID}`)
                .then({ 
                })
                window.location.href = '/requestDraftDel';

            }
        })
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("clearBtn").addEventListener("click", CLEAR);
    document.getElementById("requestBtn").addEventListener("click", sendReq);
    document.getElementById("SendDraft").addEventListener("click", sendDraft);
    document.getElementById("DeleteDraft").addEventListener("click", deleteDraft);
    
});