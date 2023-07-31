//API
let headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
};

<<<<<<< HEAD

// Requête
const requestOptions = {
    method: 'GET',
    headers: headers,
};
=======
window.onload = function () {
    getClothing();
}
>>>>>>> 093b5049a707d1c40b4faea40796c3f238f9a27a

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

<<<<<<< HEAD
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

=======
            data.forEach((clothing) => {
                const category = clothing.c_type;
                if (!categorizedClothing[category]) {
                    categorizedClothing[category] = [];
                }
                categorizedClothing[category].push(clothing);
>>>>>>> 093b5049a707d1c40b4faea40796c3f238f9a27a
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
                    editButton.addEventListener("click", () => editClothing(index));
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
function editClothing(index) {
    var url = 'edit_clothe.html?' + encodeURIComponent('name') + '=' + encodeURIComponent(index["name"]) 
    + '&' + encodeURIComponent('color') + '=' + encodeURIComponent(index["color"])
    + '&' + encodeURIComponent('c_type') + '=' + encodeURIComponent(index["c_type"])
    + '&' + encodeURIComponent('c_heat') + '=' + encodeURIComponent(index["c_heat"])
    + '&' + encodeURIComponent('c_rain') + '=' + encodeURIComponent(index["c_rain"]);
    window.location.href = url;

    console.log("Editing clothing item at index:", index);
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
            //getClothing();
            if (data) {
                alert("Clothing deleted with success");
            } else {
                alert("Failure : Clothing can't be deleted");
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}