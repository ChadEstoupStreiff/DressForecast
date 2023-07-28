const signupForm = document.getElementById('signup_form');
signupForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission to handle it with JavaScript

    // Get form data
    const formData = new FormData(signupForm);
    const userData = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        gender: formData.get('gender'),
        country: formData.get('coutry'),
        city: formData.get('city')
    };

    // Call the signupUser function from auth.js
    signupUser(userData)
        .then(responseData => {
            // Redirect to the login page after successful signup
            window.location.href = 'login.html'; // Replace 'login.html' with the actual login page URL
        })
        .catch(error => {
            // Handle any errors that occurred during signup
            console.error('Signup error: ' + error);
        });
});
