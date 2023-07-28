// Sample clothing data in JSON format
const clothingData = [
    {
      "name": "pantalon vert",
      "color": "vert",
      "c_type": "PANTS",
      "c_heat": "MEDIUM",
      "c_rain": "NORAIN"
    },
    // Add more clothing items as needed
  ];
  
  // Function to populate the table with clothing data
  function populateTable() {
    const tableBody = document.getElementById("clothesTableBody");
  
    clothingData.forEach((clothing, index) => {
      const row = tableBody.insertRow();
      const categoryCell = row.insertCell(0);
      const nameCell = row.insertCell(1);
      const colorCell = row.insertCell(2);
      const typeCell = row.insertCell(3);
      const actionsCell = row.insertCell(4);
  
      categoryCell.textContent = clothing.c_type;
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
  
  // Function to edit a clothing item (dummy function for now)
  function editClothing(index) {
    console.log("Editing clothing item at index:", index);
  }
  
  // Function to delete a clothing item (dummy function for now)
  function deleteClothing(index) {
    console.log("Deleting clothing item at index:", index);
  }
  
  // Call the function to populate the table on page load
  populateTable();
  