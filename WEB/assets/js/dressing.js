// API CONNEXION
const apiUrl = 'http://localhost:8083/clothes';
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
            tableBody.appendChild(categoryRow);

            categorizedClothing[category].forEach((clothing, index) => {
                const row = tableBody.insertRow();
                const nameCell = row.insertCell(0);
                const colorCell = row.insertCell(1);
                const typeCell = row.insertCell(2);
                const actionsCell = row.insertCell(3);

                nameCell.textContent = clothing.name;
                colorCell.textContent = clothing.color;
                typeCell.textContent = clothing.c_type;

                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.addEventListener("click", () => editClothing(index));
                actionsCell.appendChild(editButton);

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", () => deleteClothing(index));
                actionsCell.appendChild(deleteButton);
            });
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });

// Function to edit a clothing item (dummy function for now)
function editClothing(index) {
    console.log("Editing clothing item at index:", index);
}

// Function to delete a clothing item (dummy function for now)
function deleteClothing(index) {
    console.log("Deleting clothing item at index:", index);
}
