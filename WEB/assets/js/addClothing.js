const add_clothing_form = document.getElementById('newClothingForm');
add_clothing_form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission to handle it with JavaScript

    // Get form data
    const formData = new FormData(add_clothing_form);
    const clothingData = {
        name: formData.get('name'),
        color: formData.get('color'),
        c_type: formData.get('type'),
        c_heat: formData.get('heat'),
        c_rain: formData.get('rain'),
    };

    addClothe(clothingData)
        .then(responseData => {
            // Redirect to the login page after successful signup
            window.location.href = 'dressing.html';
        })
        .catch(error => {
            // Handle any errors that occurred during signup
            console.error('Signup error: ' + error);
        });
});

function addClothe(clothingDatas) {
    var token = localStorage.getItem('token');
    // Convert the user data object into a query string
    const queryString = Object.entries(clothingDatas)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    // Make an API request to send the user's information
    const apiUrl = `http://localhost:8083/clothes?${queryString}`; //  'http://localhost:8083/clothes?name=clotheTEST&color=blue&c_type=SHOES&c_heat=COLD&c_rain=BIGRAIN' \
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    return fetch(apiUrl, {
        method: 'POST',
        headers: headers
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse and return the response data if successful
            } else {
                throw new Error('Error during clothe addding: ' + response.status);
            }
        });
}

document.getElementById("cancelButton").addEventListener("click", function() {
    history.back(); // Retourne sur la page précédente
});

document.getElementById('profile-btn').addEventListener('click', function () {
    checkTokenAndRedirect();
    window.location.href = 'profile.html';
});