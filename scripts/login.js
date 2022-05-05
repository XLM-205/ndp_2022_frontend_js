function checkIfRoleIsChecked() {
    for(let radioBttn of document.getElementsByName("role")) {
        if (radioBttn.checked) {
            return true;
        }
    }
    return false;
}

function cadastrar() {
    if (checkIfRoleIsChecked() == false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Pelo menos um dos perfis tem que ser selecionado',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        return;
    }
    // If here, the form is valid
    // Grab form data
    let payload = {
        fullname: document.querySelector("#fullname").value,
        birthdate: document.querySelector("#birthdate").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
        role: (document.getElementsByName("role")[0].checked ? "dev" : "cliente"), 
    }

    // Send Payload to API
    fetch("https://626742f701dab900f1bcce82.mockapi.io/api/users", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(response => {
        Swal.fire({
            title: 'Sucesso',
            text: 'Usuario Cadastrado',
            icon: 'success',
            confirmButtonText: 'Ok!'
        }).then((result) => {
            if(result.isConfirmed) {
                // Redirect to project list
                localStorage.setItem("user.name", response.fullname);
                localStorage.setItem("user.id", response.id);
                localStorage.setItem("user.role", response.role === "dev" ? "Desenvolvedor" : "Cliente");
                window.location.href = "projects-list.html";
            }
        })
    })
    .catch(error => {
        console.log(error);
    });
}