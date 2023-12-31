document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('logout-btn').addEventListener('click', function () {
        disconnectUser();
    });

    fetchUserData()
});

document.getElementById('logout-btn').addEventListener('click', function () {
    disconnectUser();
});

function fetchUserData() {
    checkTokenAndRedirect();
    const accessToken = localStorage.getItem('token');

    return fetch('http://localhost:8083/user', {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error during login: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('user-name').textContent = data.name;
            document.getElementById('user-email').textContent = data.mail;
            document.getElementById('user-gender').textContent = data.sex;
            document.getElementById('user-country').textContent = data.country;
            document.getElementById('user-city').textContent = data.city;
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}