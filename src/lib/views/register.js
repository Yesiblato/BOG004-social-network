export const registerPage = () => {
    const viewRegister = ` 
        <img src="img/logo.png" alt="logo">
        <h2 id="title1" >Latam</h2>
        <h2 id="title2">Sin Frontera</h2>
        <input type="text" placeholder="Correo electrónico" id="email">
        <input type="text" placeholder="Nombre" id="name">
        <input type="text" placeholder="Apellido" id="lastname">
        <input type="text" placeholder="Usuario" id="user">
        <input type="password" name="" placeholder="Contraseña" id="passwordRegister">
        <button id="btn-register">Registrate</button>
        <Button>Registrate con Google</Button>
        `
    const container = document.createElement("div");
    container.innerHTML = viewRegister;



    function registrarse() {
        
        const mail = container.querySelector("#email").value;
        const name = container.querySelector("#name").value;
        const lastname = container.querySelector("#lastname").value;
        const user = container.querySelector("#user").value;
        const password = container.querySelector("#passwordRegister").value;

        console.log(mail, name, lastname, user, password);
    }
    console.log(registrarse)
    const botonRegistrar = container.getElementById("#btn-register")
    console.log(botonRegistrar)
    botonRegistrar.addEventListener("click", registrarse())
    window.registrarse = registrarse

    
    return container;
}
