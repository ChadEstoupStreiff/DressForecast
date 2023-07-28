window.onload = function () {
    // Appel de la fonction pour récupérer les données et les afficher sur la page
    //getDataFromAPI();

    const weekData = {
        "2023-07-28": {
            "feelslike": 20.6,
            "conditions": "Rain, Overcast",
            "precipprob": 85.7,
            "clothes": [
                {
                    "name": "Débardeur noir uni simple",
                    "color": "noir",
                    "c_type": "T-Shirt"
                },
                {
                    "name": "Pantalon camo militaire",
                    "color": "vert",
                    "c_type": "Pantalon"
                },
                {
                    "name": "Chaussures noire et blanche",
                    "color": "noir",
                    "c_type": "Chaussures"
                }
            ]
        },
        "2023-07-29": {
            "feelslike": 20.3,
            "conditions": "Rain, Partially cloudy",
            "precipprob": 76.2,
            "clothes": [
                {
                    "name": "Pantalon chad noir",
                    "color": "noir",
                    "c_type": "Pantalon"
                }
            ]
        },
        "2023-07-30": {
            "feelslike": 18.2,
            "conditions": "Partially cloudy",
            "precipprob": 19,
            "clothes": [
                {
                    "name": "Pantalon chad noir",
                    "color": "noir",
                    "c_type": "Pantalon"
                }
            ]
        },
        "2023-07-31": {
            "feelslike": 19.5,
            "conditions": "Rain,Partially cloudy",
            "precipprob": 76.2,
            "clothes": [
                {
                    "name": "Pantalon chad noir",
                    "color": "noir",
                    "c_type": "Pantalon"
                }
            ]
        },
        "2023-08-01": {
            "feelslike": 18.9,
            "conditions": "Rain, Overcast",
            "precipprob": 76.2,
            "clothes": [
                {
                    "name": "Pantalon chad noir",
                    "color": "noir",
                    "c_type": "Pantalon"
                }
            ]
        },
        "2023-08-02": {
            "feelslike": 17.3,
            "conditions": "Partially cloudy",
            "precipprob": 28.6,
            "clothes": [
                {
                    "name": "Pantalon chad noir",
                    "color": "noir",
                    "c_type": "Pantalon"
                }
            ]
        },
        "2023-08-03": {
            "feelslike": 19.8,
            "conditions": "Rain, Overcast",
            "precipprob": 66.7,
            "clothes": [
                {
                    "name": "Pantalon chad noir",
                    "color": "noir",
                    "c_type": "Pantalon"
                }
            ]
        }
    }

    todaysDate = Object.keys(weekData)[0];
    displaySelectedDate(todaysDate);
    updateContainerData(weekData[todaysDate]);
    updateClothesList(weekData[todaysDate]);

    // Remplir la liste des jours du calendrier
    const weekList = document.getElementById("weekList");
    for (const date in weekData) {
        const listItem = document.createElement("button"); // Utilisez des boutons au lieu de list items
        listItem.textContent = new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', month: 'numeric', day: 'numeric' }); // Affichez le jour de la semaine au lieu de la date complète
        listItem.setAttribute("data-date", date);
        weekList.appendChild(listItem);
    }

    // Gestionnaire d'événements pour les éléments de la liste du calendrier
    weekList.addEventListener("click", function (event) {
        const selectedDate = event.target.dataset.date;
        if (selectedDate) {
            displaySelectedDate(selectedDate);
            updateContainerData(weekData[selectedDate]);
            updateClothesList(weekData[selectedDate]);
        }
    });
}

// Fonction pour effectuer la requête à l'API
function getDataFromAPI() {
    fetch('http://localhost:8083/clothes/week')
        .then(response => response.json()) // Convertit la réponse en JSON
        .then(data => {

        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la requête API:', error);
        });
}

// Fonction pour afficher la date du jour sélectionné
function displaySelectedDate(selectedDate) {
    const datetimeDiv = document.getElementById('resultDate');
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = new Date(selectedDate).toLocaleDateString(undefined, options);
    datetimeDiv.textContent = formattedDate;
}

// Fonction pour mettre à jour les données du container principal
function updateContainerData(dayData) {
    document.getElementById("temperature").textContent = `${dayData.feelslike}°C`;
    document.getElementById("weatherConditions").textContent = dayData.conditions;
    document.getElementById("rainProb").textContent = `Rain prob. ${dayData.precipprob}%`;
}

// Fonction pour mettre à jour la liste des vêtements en fonction des données du jour
function updateClothesList(dayData) {
    const clothesList = document.querySelector(".clothes-list ul");
    clothesList.innerHTML = ""; // Clear the clothes list before appending new items

    for (const clothing of dayData.clothes) {
        const listItem = document.createElement("li");
        listItem.textContent = `${clothing.c_type} - ${clothing.name} (${clothing.color})`;
        clothesList.appendChild(listItem);
    }
}