document.addEventListener('DOMContentLoaded', () => {
    
    let ResultsBox = document.querySelector(".resultsBox");
    let ManagerBox = document.querySelector(".managerBox");
    
    let EmployeesReqs = [];
    let ManagerStats = [];
    let Status = "Sent"
    fetch(`/showEmployeesRequests?status=${Status}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            Object.keys(data).forEach(key => {
                EmployeesReqs[key] = data[key];
            });
            console.log(EmployeesReqs)
            const content2 = EmployeesReqs.map(request => {
                return `<li>Request ID: ${request.RequestId}  ,  Email: ${request.RequestEmail}</li>`;
            });
    
            ResultsBox.innerHTML = "<ul>" + content2.join('') + "</ul>";
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        });

        let status2 = "Approved"
        fetch(`/showManagerstats?status=${status2}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            Object.keys(data).forEach(key => {
                ManagerStats[key] = data[key];
            });
            console.log(ManagerStats)
            const content2 = ManagerStats.map(request => {
                return `<li>Manager approved Request: ${request.RequestId}</li>`;
            });
    
            ManagerBox.innerHTML = "<ul>" + content2.join('') + "</ul>";
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        });
    

        let status3 = "Rejected"
        fetch(`/showManagerstats?status=${status3}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            Object.keys(data).forEach(key => {
                ManagerStats[key] = data[key];
            });
            console.log(ManagerStats)
            const content2 = ManagerStats.map(request => {
                return `<li>Manager Rejected Request: ${request.RequestId}</li>`;
            });
    
            ManagerBox.innerHTML += "<ul>" + content2.join('') + "</ul>";
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        });
    });
    
        