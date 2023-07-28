// Fonction pour afficher les températures pour chaque jour
function displayTemperatures(daysData) {
    const temperaturesDiv = document.createElement('div');
    for (const day of daysData) {
        const date = day.datetime;
        const temperature = day.feelslike;
        const temperatureString = `<p>${date}: ${temperature}°C</p>`;
        temperaturesDiv.innerHTML += temperatureString;
    }
    document.body.appendChild(temperaturesDiv);
}

// Fonction pour effectuer la requête à l'API
function getDataFromAPI() {
    fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Paris?unitGroup=metric&include=days&key=QFTXUNVHMMAJBHEWDHG7XERWX&contentType=json')
        .then(response => response.json()) // Convertit la réponse en JSON
        .then(data => {
            // Manipule les données JSON et les affiche sur la page
            const resultDiv = document.getElementById('resultAPI');
            //resultDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';

            // Appel de la fonction pour afficher les températures pour chaque jour
            displayTemperatures(data.days);
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la requête API:', error);
        });
}

// Fonction pour afficher la date et l'heure actuelles
function displayDateTime() {
    const datetimeDiv = document.getElementById('resultDT');
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
    datetimeDiv.textContent = formattedDate;
}
