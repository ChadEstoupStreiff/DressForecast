// Fonction pour effectuer la requête à l'API
function getDataFromAPI() {
    fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Paris?unitGroup=metric&include=days&key=QFTXUNVHMMAJBHEWDHG7XERWX&contentType=json')
        .then(response => response.json()) // Convertit la réponse en JSON
        .then(data => {
            // Appel de la fonction pour afficher les températures pour chaque jour
            displayDatas(data.days[0]);
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la requête API:', error);
        });
}

// Appel de la fonction pour récupérer les données et les afficher sur la page
getDataFromAPI();

// Fonction pour afficher les températures pour chaque jour
function displayDatas(dayData) {
    const temperature = document.getElementById('temperature');
    const weatherConditions = document.getElementById('weatherConditions');
    const rainProbability = document.getElementById('rainProb');
    temperature.textContent = `${dayData.temp}°C`;
    weatherConditions.textContent = dayData.conditions;
    rainProbability.textContent = `Rain ${dayData.precipprob}%`;
}

// Fonction pour afficher la date et l'heure actuelles
function displayDateTime() {
    const datetimeDiv = document.getElementById('resultDate');
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
    datetimeDiv.textContent = formattedDate;
}

// Appel de la fonction pour afficher la date et l'heure actuelles au chargement de la page
displayDateTime();