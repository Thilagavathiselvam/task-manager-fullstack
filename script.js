const API_URL = "http://localhost:8080/tasks";

let editId = null;

window.onload = function () {
    loadTasks();

    const searchBox = document.getElementById("searchTask");

    if(searchBox){
        searchBox.addEventListener("keyup", loadTasks);
    }
};

// Add or Update Task
function addTask() {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;
    const dueDate = document.getElementById("dueDate").value;

    if(title === "" || description === ""){
        alert("Please fill all fields");
        return;
    }

    const task = {
        title,
        description,
        status,
        dueDate
    };

    // CREATE
    if(editId === null){

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })

        .then(response => response.json())

        .then(() => {

            alert("Task Added Successfully");

            clearForm();
            loadTasks();
        });

    }

    // UPDATE
    else{

        fetch(API_URL + "/" + editId, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(task)

        })

        .then(response => response.json())

        .then(() => {

            alert("Task Updated Successfully");

            editId = null;

            clearForm();
            loadTasks();
        });
    }
}

// Load Tasks
function loadTasks() {

    fetch(API_URL)

    .then(response => response.json())

    .then(tasks => {

        const search =
        document.getElementById("searchTask")
        ? document.getElementById("searchTask").value.toLowerCase()
        : "";

        let output = "";

        tasks.forEach(task => {

            if(
                task.title.toLowerCase().includes(search)
                ||
                task.description.toLowerCase().includes(search)
            ){

                let badgeColor = "secondary";

                if(task.status === "Completed"){
                    badgeColor = "success";
                }

                if(task.status === "Pending"){
                    badgeColor = "warning";
                }

                if(task.status === "In Progress"){
                    badgeColor = "info";
                }

                output += `

                <div class="card shadow mb-3">

                    <div class="card-body">

                        <h4>${task.title}</h4>

                        <p>${task.description}</p>

                        <span class="badge bg-${badgeColor}">
                            ${task.status}
                        </span>

                        <p class="mt-2">
                            📅 Due Date:
                            ${task.dueDate}
                        </p>

                        <button
                            class="btn btn-warning btn-sm me-2"
                            onclick="editTask(
                                ${task.id},
                                '${task.title}',
                                '${task.description}',
                                '${task.status}',
                                '${task.dueDate}'
                            )">

                            Edit

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="deleteTask(${task.id})">

                            Delete

                        </button>

                    </div>

                </div>

                `;
            }

        });

        document.getElementById("taskList").innerHTML = output;

    });
}

// Edit Task
function editTask(id, title, description, status, dueDate) {

    editId = id;

    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("status").value = status;
    document.getElementById("dueDate").value = dueDate;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Delete Task
function deleteTask(id) {

    if(confirm("Are you sure you want to delete this task?")) {

        fetch(API_URL + "/" + id, {
            method: "DELETE"
        })

        .then(() => {

            alert("Task Deleted Successfully");

            loadTasks();
        });
    }
}

// Clear Form
function clearForm() {

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("status").value = "Pending";
    document.getElementById("dueDate").value = "";
}