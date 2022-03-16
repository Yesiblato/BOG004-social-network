export const loginPage = () => {
  const viewLogin = ` 
    <div id ="container-login">
      <img src="img/logo.png" alt="logo">
      <h2 id="title1">Latam</h2>
      <h2 id="title2">Sin Frontera</h2>
      <form id="login-form">
        <input type="text" placeholder="Correo" id="mail">
        <input type="password" placeholder="Contraseña" id="password">
        <button id="btn-inciarSesion">Iniciar sesión</button>
        <Button>Iniciar sesión con Google</Button>
        <a href="#/registrate"> ¿No tienes cuenta? Registrate </a>
      </form>
    </div>
    `;
  const container = document.createElement('div');
  container.innerHTML = viewLogin;

  // const mail = container.querySelector('#mail').value;
  // const password = container.querySelector('#password').value;

  return container;
};

// document.getElementById("btn-inciarSesion").addEventListener("click", dataLogin);
