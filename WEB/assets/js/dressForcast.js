window.onload = function () {
    // API CONNEXION
    const apiUrl = 'http://localhost:8083/clothes/week';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };

    // Requête
    const requestOptions = {
        method: 'GET',
        headers: headers,
    };

    // Appel de l'API en utilisant fetch
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('ERROR when request to api');
            }
            return response.json(); // Renvoie les données de la réponse sous forme de JSON
        })
        .then(data => {
            //Show today's date forcast first loaded
            const weekData = data.week
            todaysDate = Object.keys(weekData)[0];
            displaySelectedDate(todaysDate);
            updateContainerData(weekData[todaysDate]);
            updateClothesList(weekData[todaysDate]);

            // Remplir la liste des jours du calendrier
            const weekList = document.getElementById("weekList");
            for (const date in weekData) {
                const listItem = document.createElement("button"); // Utilisez des boutons au lieu de list items
                listItem.textContent = new Date(date).toLocaleDateString('en-EN', { weekday: 'long', month: 'numeric', day: 'numeric' }); // Affichez le jour de la semaine au lieu de la date complète
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
        })
        .catch(error => {
            // Gestion des erreurs
            console.error('Erreur:', error);
        });
}

// Fonction pour afficher la date du jour sélectionné
function displaySelectedDate(selectedDate) {
    const datetimeDiv = document.getElementById('resultDate');
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = new Date(selectedDate).toLocaleDateString('en-EN', options);
    datetimeDiv.textContent = formattedDate;
}

// Fonction pour mettre à jour les données du container principal
function updateContainerData(dayData) {
    document.getElementById("temperature").textContent = `${dayData.feelslike} °C`;
    document.getElementById("weatherConditions").textContent = dayData.conditions;
    document.getElementById("rainProb").textContent = `Rain prob. ${dayData.precipprob}%`;
}

// Fonction pour mettre à jour la liste des vêtements en fonction des données du jour
function updateClothesList(dayData) {
    const clothesList = document.querySelector(".clothes-list ul");
    clothesList.innerHTML = ""; // Clear the clothes list before appending new items

    for (const clothing of dayData.clothes) {
        if (clothing == 0)
            continue;
        const listItem = document.createElement("li");
        listItem.textContent = `${clothing.c_type} - ${clothing.name} (${clothing.color})`;
        clothesList.appendChild(listItem);
    }
}

document.getElementById('profile-btn').addEventListener('click', function () {
    checkTokenAndRedirect();
    window.location.href = 'profile.html';
});