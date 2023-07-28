// Fonction pour vérifier si le token est initialisé
function checkTokenAndRedirect() {
    // Vérifie si le token est présent dans le localStorage
    var token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
    }
    // if (token && token != "null") {
    //     window.location.href = 'index.html';
    // } else {
    //     window.location.href = 'login.html';
    // }
}

function loginUser(userData) {
    // Convert the user data object into a query string
    const queryString = Object.entries(userData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    // Make an API request to send the user's information
    const apiUrl = `http://localhost:8083/auth?${queryString}`;

    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error during login: ' + response.status);
            }
        });
}

function signupUser(userData) {
    // Convert the user data object into a query string
    const queryString = Object.entries(userData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    // Make an API request to send the user's information
    const apiUrl = `http://localhost:8083/user?${queryString}`;

    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse and return the response data if successful
            } else {
                throw new Error('Error during signup: ' + response.status);
            }
        });
}

function disconnectUser() {
    localStorage.removeItem('token'); // Remove the token from localStorage
    checkTokenAndRedirect(); // Redirect to the login page after disconnection
}