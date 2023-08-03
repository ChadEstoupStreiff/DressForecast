const signupForm = document.getElementById('signup_form');
var countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

// Fonction pour remplir la liste déroulante avec tous les pays
function fillSelectCountry() {
    const selectPays = document.getElementById("countryList");

    countryList.forEach(function (country) {
        const option = document.createElement("option");
        option.text = country;
        option.value = country;
        option.onclick = function() {
            document.getElementById('filter').value = this.text;
        }
        selectPays.add(option);
    });
}

document.getElementById('countryList').style.display = "none";

fillSelectCountry();


signupForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission to handle it with JavaScript

    // Get form data
    const formData = new FormData(signupForm);
    const userData = {
        user_mail: formData.get('email'),
        user_password: formData.get('password'),
        user_name: formData.get('username'),
        user_sex: formData.get('gender'),
        user_country: formData.get('filter'),
        user_city: formData.get('city')
    };

    // Call the signupUser function from auth.js
    signupUser(userData)
        .then(responseData => {
            // Redirect to the login page after successful signup
            if (responseData != null)
                window.location.href = 'login.html'; // Replace 'login.html' with the actual login page URL
        })
        .catch(error => {
            // Handle any errors that occurred during signup
            console.error('Signup error: ' + error);
        });
});

// Fonction pour afficher la liste déroulante lorsqu'elle est en focus
document.getElementById('filter').addEventListener('focus', function () {
    document.getElementById('countryList').size = 5;
});

document.getElementById('countryList').addEventListener('change', function () {
    document.getElementById('filter').value = this.value;
    document.getElementById('countryList').style.display = "none";
});

function filterList() {
    var input, filter, select, options, i, optionValue, visibleCount, filteredCountry;
    input = document.getElementById('filter');
    filter = input.value.toUpperCase();
    select = document.getElementById('countryList');
    options = select.getElementsByTagName('option');
    visibleCount = 0;
    filteredCountry = "";

    for (i = 0; i < options.length; i++) {
        optionValue = options[i].innerText || options[i].textContent;
        if (optionValue.toUpperCase().indexOf(filter) > -1) {
            options[i].style.display = "";
            visibleCount++;
            filteredCountry = optionValue;
        } else {
            options[i].style.display = "none";
        }
    }

    // Cacher la liste déroulante lorsque l'entrée est vide ou lorsqu'un pays est sélectionné
    if (filter.length === 0 || visibleCount === 0) {
        select.style.display = "none";
    } else {
        select.style.display = "block";
        select.size = (visibleCount < 5) ? visibleCount +1 : 5;
    }
}