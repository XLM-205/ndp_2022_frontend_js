let params = Object.fromEntries(new URLSearchParams(window.location.search));
const limitByUser = params.all ? false : true;
let list = [];

window.onload = function() {
    document.querySelector("#user-name").innerHTML = localStorage.getItem("user.name");
    document.querySelector("#user-role").innerHTML = localStorage.getItem("user.role");

    getProjects();
}

function getProjects() {
    fetch("https://626742f701dab900f1bcce82.mockapi.io/api/projects")
    .then(response => response.json())
    .then(response => {
        list = response;
        buildTable();
    })
}

function goToEdit(id) {
    window.location.href = `projects-create-edit.html?id=${id}`;
}

function deleteProject(id) {
    fetch(`https://626742f701dab900f1bcce82.mockapi.io/api/projects/${id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(response => {
        // Rebuild the table without the deleted entry
        list = list.filter(project => project.id != id);
        buildTable();
    })
}

function buildTable() {
    document.querySelector("#table-body").innerHTML = " ";
    let idClient = localStorage.getItem("user.id");
    if (limitByUser) {
        list = list.filter(el => el.idClient === idClient);
    }
    list.forEach(el => {
        let template = `
        <div class="row">
            <div class="title-description">
                <h6 class="title">${el.title}</h1>
                <p class="description">${el.description}</p>
            </div>
            <div class="price">R$ ${el.cost}</div>
            <div class="actions">
                <span class="edit material-icons" onclick="goToEdit(${el.id})">edit</span>
                <span class="delete material-icons" onclick="deleteProject(${el.id})">delete_outline</span>
            </div>
        </div>
        `

        document.querySelector("#table-body").insertAdjacentHTML("beforeend", template);
    });
}
