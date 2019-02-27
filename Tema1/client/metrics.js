const url = "http://localhost:8001/api/metrics";

loadData();

function loadData() {
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            let element = document.getElementById("result");
            element.textContent = response.loggedData;

            let errorsSpan = document.getElementById("errors-number");
            errorsSpan.textContent = `Number of errors on server: ${response.numberOfErrors}`;

            let reqSpan = document.getElementById("requests-number");
            reqSpan.textContent = `Number of requests to server: ${response.numberOfRequests}`;
        });
}

setInterval(loadData, 6000);