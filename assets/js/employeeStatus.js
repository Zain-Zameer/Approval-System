document.addEventListener('DOMContentLoaded', () => {
const USEREMAIL = localStorage.getItem("USEREMAIL");

let showBox = document.querySelector(".resultsBox");
let showDraftBox = document.querySelector(".resultsDraftBox");
console.log(USEREMAIL)


let requestsRaise = [];
let draftRequests = [];

fetch(`/draftRequestsShow?email=${USEREMAIL}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        Object.keys(data).forEach(key => {
            draftRequests[key] = data[key];
        });
        console.log(draftRequests);

        const content2 = draftRequests.map(request => {
            return `<li>Request ID: ${request.DraftID}  ,  Status: ${request.DraftStatus}</li>`;
        });

        const showDraftBox = document.querySelector('.resultsDraftBox');
        showDraftBox.innerHTML = "<ul>" + content2.join('') + "</ul>";
    })
    .catch(error => {
        console.error('Fetch error: ', error);
    });

fetch(`/raiseRequestsShow?email=${USEREMAIL}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
   })
    .then(data => {
        
        Object.keys(data).forEach(key => {
            requestsRaise[key] = data[key];
        });
        console.log(requestsRaise);

        const content2 =  requestsRaise.map(request => {
            console.log(request)
            return `<li>Request ID: ${request.RequestID}  , Status: ${request.RequestStatus}</li>`;
        });
        showBox.innerHTML = "<ul>" + content2.join('') + "</ul>";

    })




});

    