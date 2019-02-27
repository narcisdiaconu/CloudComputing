const url = "http://localhost:8001/api/service/?";

fetch("http://localhost:8001/api/categories")
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        let select = document.getElementById("categories");
        response.categories.forEach((cat) => {
            let option = document.createElement("option");
            option.value = cat.id;
            option.textContent = cat.name;
            select.appendChild(option);
        });
    });

function getData() {
    let selector = document.getElementById("categories");
    let value = selector[selector.selectedIndex].value;
    let name = selector[selector.selectedIndex].textContent;
    let updatedUrl = `${url}categoryId=${value}`;

    fetch(updatedUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            let title = document.getElementById("received-data-title");
            title.textContent = `Events within ${parseInt(response.location.within)}km`;
            if (value !== "none") {
                title.textContent += ` for category ${name}`;
            }
            let div = document.getElementById("received-data-container");
            let ol = document.getElementById("received-data-list");
            ol.innerHTML = "";
            let index = 1;
            if (response.events.length === 0) {
                let p = document.createElement('p');
                p.textContent = "No events received.";
                ol.appendChild(p);
                return;
            }
            response.events.forEach((ev) => {
                let li = document.createElement("li");
                let name = document.createElement("p");
                name.style.fontWeight = '700';
                name.textContent = `${ev.name.text}`;
                li.appendChild(name);

                let description = document.createElement("p");
                description.style.fontStyle = 'italic';
                description.textContent = `${ev.description.text}`;
                li.appendChild(description);

                let startDate = document.createElement("p");
                let date = new Date(ev.start.local);
                startDate.style.fontSize = '15px';
                startDate.innerHTML = `Start date: <b>${date.toDateString()}</b> at <b>${date.toLocaleTimeString()}</b>`;
                li.appendChild(startDate);

                let endDate = document.createElement("p");
                date = new Date(ev.end.local);
                endDate.style.fontSize = '15px';
                endDate.innerHTML = `End date: <b>${date.toDateString()}</b> at <b>${date.toLocaleTimeString()}</b>`;
                li.appendChild(endDate);

                let url = document.createElement("a");
                url.href = ev.url;
                url.textContent = ev.url;
                li.appendChild(url);

                if (ev.logo !== null) {
                    let p = document.createElement("p");
                    let logo = document.createElement("img");
                    logo.src = ev.logo.url;
                    p.appendChild(logo);
                    li.appendChild(p);
                }

                ol.appendChild(li);
            });
        });
}