window.onload = function () {
    const weekData = {
        "2023-07-28": {
            "feelslike": 20.6,
            "conditions": "Rain, Overcast",
            "precipprob": 85.7
        },
        "2023-07-29": {
            "feelslike": 20.3,
            "conditions": "Rain, Partially cloudy",
            "precipprob": 76.2
        },
        "2023-07-30": {
            "feelslike": 18.2,
            "conditions": "Partially cloudy",
            "precipprob": 19
        },
        "2023-07-31": {
            "feelslike": 19.5,
            "conditions": "Rain,Partially cloudy",
            "precipprob": 76.2
        },
        "2023-08-01": {
            "feelslike": 18.9,
            "conditions": "Rain, Overcast",
            "precipprob": 76.2
        },
        "2023-08-02": {
            "feelslike": 17.3,
            "conditions": "Partially cloudy",
            "precipprob": 28.6
        },
        "2023-08-03": {
            "feelslike": 19.8,
            "conditions": "Rain, Overcast",
            "precipprob": 66.7
        }
    }

    todaysDate = Object.keys(weekData)[0];
    displaySelectedDate(todaysDate);
    updateContainerData(weekData[todaysDate]);

    // Remplir la liste des jours du calendrier
    const weekList = document.getElementById("weekList");
    for (const date in weekData) {
        const listItem = document.createElement("li");
        listItem.textContent = date;
        listItem.setAttribute("data-date", date);
        weekList.appendChild(listItem);
    }

    // Gestionnaire d'événements pour les éléments de la liste du calendrier
    weekList.addEventListener("click", function (event) {
        const selectedDate = event.target.dataset.date;
        if (selectedDate) {
            displaySelectedDate(selectedDate);
            updateContainerData(weekData[selectedDate]);
        }
    });
}

// Fonction pour effectuer la requête à l'API
function getDataFromAPI() {
    fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Paris?unitGroup=metric&include=days&key=QFTXUNVHMMAJBHEWDHG7XERWX&contentType=json')
        .then(response => response.json()) // Convertit la réponse en JSON
        .then(data => {
            
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la requête API:', error);
        });
}

// Appel de la fonction pour récupérer les données et les afficher sur la page
//getDataFromAPI();

// Fonction pour afficher la date du jour sélectionné
function displaySelectedDate(selectedDate) {
    const datetimeDiv = document.getElementById('resultDate');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(selectedDate).toLocaleDateString(undefined, options);
    datetimeDiv.textContent = formattedDate;
}

// Fonction pour mettre à jour les données du container principal
function updateContainerData(dayData) {
    document.getElementById("temperature").textContent = `${dayData.feelslike}°C`;
    document.getElementById("weatherConditions").textContent = dayData.conditions;
    document.getElementById("rainProb").textContent = `Rain ${dayData.precipprob}%`;
}