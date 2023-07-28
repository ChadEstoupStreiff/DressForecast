window.onload = function () {
    var token = localStorage.getItem('token');
    console.log(token);

    // URL de l'API que vous souhaitez appeler
    const apiUrl = 'http://localhost:8083/clothes/week';

    // Headers que vous voulez envoyer avec la requête
    const headers = {
        'Content-Type': 'application/json', // Exemple d'en-tête avec le type de contenu JSON
        'Authorization': `Bearer ${token}`, // Exemple d'en-tête avec un jeton d'authentification
    };

    // Configuration de la requête
    const requestOptions = {
        method: 'GET', // Méthode HTTP (GET, POST, PUT, DELETE, etc.)
        headers: headers, // En-têtes à inclure dans la requête
    };

    // Appel de l'API en utilisant fetch
    fetch(apiUrl, requestOptions)
        .then(response => {
            // Vérification de la réponse de l'API
            if (!response.ok) {
                throw new Error('Erreur lors de la requête API');
            }
            return response.json(); // Renvoie les données de la réponse sous forme de JSON
        })
        .then(data => {
            const weekData = data.week
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