

function cambiarDatosPerfil(){
    const form = document.getElementById("formulario");
    form.addEventListener("submit", function(event){
        event.preventDefault();
        const nombre = document.getElementById("inputName").value;
        const email = document.getElementById("email").value;
        const dni = parseInt(document.getElementById("inputDNI").value);

        document.getElementById("nombre-exit").textContent = nombre;
        document.getElementById("email-exit").textContent = email;
        document.getElementById("dni-exit").textContent = dni;
    })
}

cambiarDatosPerfil();