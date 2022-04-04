// import { showChange } from '../router.js';
import { postPage, getPost } from '../controllers.js'; 
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
    <div id="showPost"></div>
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
   const allPost = getPost()
   const showPost = container.querySelector("#showPost");
   allPost.then((response) => {

   response.forEach(element => {
    showPost.innerHTML  += ` 
        <div class= "containerPost">
         <p>${element.id}</p>
         <p>${element.data.post}</p>
         <img src= "img/eliminar.png" alt="eliminar" >
        </div>
          ` 
   });
  })
  container.querySelector('#btn-post').addEventListener('click', () => {
    const post = container.querySelector('#post').value;
    console.log(post);
    postPage(post)

   });
    return container;
};
