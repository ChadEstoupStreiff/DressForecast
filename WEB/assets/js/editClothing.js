var params = new URLSearchParams(window.location.search);
var get_name = params.get('name');
var color = params.get('color');
var c_type = params.get('c_type');
var c_heat = params.get('c_heat');
var c_rain = params.get('c_rain');

document.getElementById('name').value = get_name;
document.getElementById('color').value = color;
document.getElementById('type').value = c_type;
document.getElementById('heat').value = c_heat;
document.getElementById('rain').value = c_rain;


const add_clothing_form = document.getElementById('editClothingForm');
add_clothing_form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission to handle it with JavaScript

    // Get form data
    const formData = new FormData(add_clothing_form);
    const clothingDatas = {
        old_name: get_name,
        old_color: color,
        old_c_type: c_type,
        old_c_heat: c_heat,
        old_c_rain: c_rain,
        new_name: formData.get('name'),
        new_color: formData.get('color'),
        new_c_type: formData.get('type'),
        new_c_heat: formData.get('heat'),
        new_c_rain: formData.get('rain'),
    };

    editClothe(clothingDatas)
    .then(responseData => {
        // Redirect to the login page after successful signup
        window.location.href = 'dressing.html'; // Replace 'login.html' with the actual login page URL
    })
    .catch(error => {
        // Handle any errors that occurred during signup
        console.error('Signup error: ' + error);
    });
});


function editClothe(clothingDatas) {
    var token = localStorage.getItem('token');
    // Convert the user data object into a query string
    const queryString = Object.entries(clothingDatas)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    // Make an API request to send the user's information
    const apiUrl = `http://localhost:8083/clothes?${queryString}`; //  http://localhost:8083/clothes?old_name=casquette&old_color=red&old_c_type=HAT&old_c_heat=HOT&old_rain=NORAIN&new_name=casquetteV2&new_color=blue&new_c_type=HAT&new_c_heat=HOT&new_rain=NORAIN

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