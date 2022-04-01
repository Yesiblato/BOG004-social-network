// import { showChange } from '../router.js';
import { postPage } from '../controllers.js'; 
export const timelinePage = () => {
  const viewTimeline = ` 
  <div> 
  <div id='beginning'> 
    <img src="img/logo.png" alt="logo">
    <img src="img/signOff.png" alt="Cerrar Sesión">
  </div>
  <div> 
    <input type="text" placeholder="¿Qué nos vas a compartir hoy?" id="post">
    <button type="button" id="btn-post">Publicar</button>
  </div> 
</div>
      `;
  const container = document.createElement('div');
  container.setAttribute('class', 'containerPrincipal');
  container.innerHTML = viewTimeline;

  // container.querySelector(".btn-inciarSesion").addEventListener("click", () => {
  //      showChange('#/muro');
  //      const mail = container.querySelector('#mail').value;
  //      const password = container.querySelector('#password').value;
  //      console.log(mail,password);
  //  });
  container.querySelector('#btn-post').addEventListener('click', () => {
    const post = container.querySelector('#post').value;
    console.log(post);
    postPage(post);
  });

  return container;
};
