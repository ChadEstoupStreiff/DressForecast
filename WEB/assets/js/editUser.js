let get_name;
let mail;
let password;
let sex;
let country;
let city;

window.onload = function () {
    // API CONNEXION
    const apiUrl = 'http://localhost:8083/user';
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
            get_name = data["name"];
            mail = data["mail"];
            sex = data["sex"];
            country = data["country"];
            city = data["city"];
            
            document.getElementById('name').value = get_name;
            document.getElementById('country').value = country;
            document.getElementById('city').value = city;
        })
        .catch(error => {
            // Gestion des erreurs
            console.error('Erreur:', error);
        });
}




const edit_user_form = document.getElementById('edit_user_form');
edit_user_form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission to handle it with JavaScript

    // Get form data
    const formData = new FormData(edit_user_form);
    const userData = {
        user_name: formData.get('name'),
        user_mail: mail,
        user_city: formData.get('city'),
        user_country: formData.get('country'),
        user_password: formData.get('password'),
        user_sex: sex,
    };
    editUser(userData)
    .then(responseData => {
        // Redirect to the login page after successful signup
        window.location.href = 'index.html'; // Replace 'login.html' with the actual login page URL
    })
    .catch(error => {
        // Handle any errors that occurred during signup
        console.error('Signup error: ' + error);
    });
});


function editUser(userData) {
    var token = localStorage.getItem('token');
    // Convert the user data object into a query string
    const queryString = Object.entries(userData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    // Make an API request to send the user's information
    const apiUrl = `http://localhost:8083/user?${queryString}`; //  http://localhost:8083/clothes?old_name=casquette&old_color=red&old_c_type=HAT&old_c_heat=HOT&old_rain=NORAIN&new_name=casquetteV2&new_color=blue&new_c_type=HAT&new_c_heat=HOT&new_rain=NORAIN

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    return fetch(apiUrl, {
        method: 'PUT',
        headers: headers
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse and return the response data if successful
            } else {
                throw new Error('Error during user editing: ' + response.status);
            }
        });
}
