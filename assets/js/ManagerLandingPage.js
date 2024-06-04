
document.addEventListener('DOMContentLoaded', () => {
const viewBox = document.querySelector(".viewBox");
const detailClass = document.querySelector(".containerViewRequestRaise");


fetch(`/viewSentRequests`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const requestsArray = Object.values(data);
    
        const content2 = requestsArray.map(request => {
            return `<li>Request ID: ${request.RequestID}</li>`;
        });
        viewBox.innerHTML = "<ul>" + content2.join('') + "</ul>";
    })
    .catch(error => {
        console.error('Fetch error: ', error);
    });



    const  checkDetail  = document.getElementById("checkDetail");
    const  clearDetail  = document.getElementById("clearDetail");
    const  sendStatuss  = document.getElementById("sendStatus");

    checkDetail.addEventListener('click', seeDetails);
    clearDetail.addEventListener('click', clearDetails);
    sendStatuss.addEventListener('click', sendStatus);
});

function clearDetails(event){
    event.preventDefault();
    let inputReqId = document.getElementById("takeRequestID");
    inputReqId.value="";
    const detailClass = document.querySelector(".DetailviewBox");
    if (detailClass) {
        const ulElements = detailClass.querySelectorAll('ul');
        const liElements = detailClass.querySelectorAll('li');
        ulElements.forEach(ul => ul.remove());
        liElements.forEach(li => li.remove());
    }
}

function seeDetails(event){
    event.preventDefault();
    let inputReqId = document.getElementById("takeRequestID");
    const requestID = inputReqId.value;
    const detailClass = document.querySelector(".DetailviewBox");
    fetch(`/raiseRequestDetail?id=${requestID}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                detailClass.innerHTML += `
                <ul>
                    <li>${data.RequestId}</li>
                    <li>${data.RequestDepart}</li>
                    <li>${data.RequestEmail}</li>
                    <li>${data.RequestDocument}</li>
                    <li>${data.RequestUploadTime}</li>

                </ul>
                
            `;
            })
}

function sendStatus(event){
    event.preventDefault();
    let ID = document.getElementById("takeRequestIDTOUPD");
    const updateID = ID.value;
    let SELECTSTATUS = document.getElementById("selectStatus");
    if(SELECTSTATUS.value==='1'){
        let status = "Approved";
        fetch(`/updateStatus?id=${updateID}&status=${status}`)
        .then({})
    }
    if(SELECTSTATUS.value==='2'){
        let status = "Rejected";
        fetch(`/updateStatus?id=${updateID}&status=${status}`)
        .then({})
    }

}
