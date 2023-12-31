//API
let headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
};

window.onload = function () {
    getClothing();
}

function getClothing() {
    //API Request config
    let apiUrl = 'http://localhost:8083/clothes',
        requestOptions = {
            method: 'GET',
            headers: headers,
        };

    //Request API with fetch
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('ERROR when request to api');
            }
            return response.json(); // Renvoie les données de la réponse sous forme de JSON
        })
        .then(data => {
            const categorizedClothing = {};
            const tableBody = document.getElementById("clothesTableBody");

            data.forEach((clothing) => {
                const category = clothing.c_type;
                if (!categorizedClothing[category]) {
                    categorizedClothing[category] = [];
                }
                categorizedClothing[category].push(clothing);
            });

            for (const category in categorizedClothing) {
                const categoryRow = document.createElement("tr");
                const categoryCell = document.createElement("td");
                categoryCell.colSpan = 5;
                categoryCell.textContent = category;
                categoryRow.appendChild(categoryCell);
                categoryRow.classList.add("categoryRow");
                tableBody.appendChild(categoryRow);

                categorizedClothing[category].forEach((clothing, index) => {
                    const row = tableBody.insertRow();
                    const nameCell = row.insertCell(0);
                    const colorCell = row.insertCell(1);
                    const actionsCell = row.insertCell(2);

                    nameCell.textContent = clothing.name;
                    colorCell.textContent = clothing.color;

                    // Inside the fetch block after creating the "Edit" and "Delete" buttons
                    const editButton = document.createElement("button");
                    editButton.classList.add("edit-button");
                    const editIcon = document.createElement("i");
                    editIcon.classList.add("fas", "fa-edit", "button-icon");
                    editButton.appendChild(editIcon);
                    editButton.addEventListener("click", () => editClothing(clothing));
                    actionsCell.appendChild(editButton);

                    const deleteButton = document.createElement("button");
                    deleteButton.classList.add("delete-button");
                    const deleteIcon = document.createElement("i");
                    deleteIcon.classList.add("fas", "fa-trash-alt", "button-icon");
                    deleteButton.appendChild(deleteIcon);
                    deleteButton.addEventListener("click", () => deleteClothing(clothing));
                    actionsCell.appendChild(deleteButton);
                });
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

// Function to edit a clothing item (dummy function for now)
function editClothing(clothing) {
    var url = 'edit_cloth.html?' + encodeURIComponent('name') + '=' + encodeURIComponent(clothing["name"])
        + '&' + encodeURIComponent('color') + '=' + encodeURIComponent(clothing["color"])
        + '&' + encodeURIComponent('c_type') + '=' + encodeURIComponent(clothing["c_type"])
        + '&' + encodeURIComponent('c_heat') + '=' + encodeURIComponent(clothing["c_heat"])
        + '&' + encodeURIComponent('c_rain') + '=' + encodeURIComponent(clothing["c_rain"]);
    window.location.href = url;

    console.log("Editing clothing item at index:", clothing);
}

// Function to delete a clothing item (dummy function for now)
function deleteClothing(clothing) {
    //API Request config
    let apiUrl = `http://localhost:8083/clothes?name=${clothing.name}&color=${clothing.color}&c_type=${clothing.c_type}&c_heat=${clothing.c_heat}&c_rain=${clothing.c_rain}`,
        requestOptions = {
            method: 'DELETE',
            headers: headers,
        };

    // Appel de l'API en utilisant fetch
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('[DELETE] ERROR when request to api');
            }
            return response.json(); // Renvoie les données de la réponse sous forme de JSON
        })
        .then(data => {
            if (data) {
                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

document.getElementById('profile-btn').addEventListener('click', function () {
    checkTokenAndRedirect();
    window.location.href = 'profile.html';
});