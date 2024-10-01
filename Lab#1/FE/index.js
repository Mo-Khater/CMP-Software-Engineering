function fetchEmployees() {
  fetch("http://localhost:3000/api/v1/employee")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("dataTable");
      tableBody.innerHTML = "";
      const list = data.data;
      list.forEach((item) => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");
        deleteButton.dataset.id = item.id; // Store the ID on the button
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell);
        tableBody.appendChild(row);
      });

      attachDeleteListeners();
    })
    .catch((error) => console.error(error));
}

function attachDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".btn-danger");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      deleteEmployee.call(deleteButton);
    });
  });
}

fetchEmployees();

const submitButton = document.getElementsByClassName("btn-primary")[0];
if (submitButton) {
  submitButton.addEventListener("click", () => {
    createEmployee();
  });
}

function createEmployee() {
  const name = document.getElementById("name").value; // Get the value
  const id = document.getElementById("id").value; // Get the value
  fetch("http://localhost:3000/api/v1/employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      id,
    }),
  })
    .then(() => fetchEmployees())
    .catch((error) => {
      console.log(error);
    });
}

function deleteEmployee() {
  const id = this.dataset.id;
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      fetchEmployees();
    })
    .catch((error) => console.log(error));
}
