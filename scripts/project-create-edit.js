let params = Object.fromEntries(new URLSearchParams(window.location.search));
const screenType = params.id ? 'edit' : 'create';

window.onload = function() {
    setScreenTypeTexts();
    fillInputs();    
}

function setScreenTypeTexts() {
    let header = document.getElementById('main-title');
    let bttn = document.getElementById('action-button');
    switch(screenType) {
        case 'edit':
            header.innerText = "Editar projeto";
            bttn.innerText = "Salvar";
            break;
        case 'create':
        default:
            header.innerText = "Vamos cadastrar seu novo projeto!";
            bttn.innerText = "Cadastrar";
            break;
    }
}

function fillInputs() {
    if (screenType === 'edit') {
        fetch(`https://626742f701dab900f1bcce82.mockapi.io/api/projects/${params.id}`)
        .then(response => response.json())
        .then(project => {
            document.querySelector("#title").value = project.title;
            document.querySelector("#totalCost").value = project.cost;
            document.querySelector("#description").value = project.description;
        });
    }
}

function cadastrarEditar() {
    let payload = {
        title: document.querySelector("#title").value,
        cost: document.querySelector("#totalCost").value,
        description: document.querySelector("#description").value,
        idClient: localStorage.getItem("user.id"),
    }

    fetch(`https://626742f701dab900f1bcce82.mockapi.io/api/projects/${screenType === "edit" ? params.id : ""}`, {
            method: screenType === "create" ? "POST" : "PUT",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(response => {
            
            window.location.href="projects-list.html";
        })
        .catch(error => {
            console.log(error);
        });
}