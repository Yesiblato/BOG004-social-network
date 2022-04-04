// import { showChange } from '../router.js';
// import { async } from 'regenerator-runtime';
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
    <div id="showPost"></div>
  </div> 
</div>
      `;
  const container = document.createElement('div');
  container.setAttribute('class', 'containerPrincipal');
  container.innerHTML = viewTimeline;

  // window.addEventListener('DOMContentLoaded', async () => {
  //   const querySnapshot = await getPost();
  //   console.log(querySnapshot);
  // });

  // container.querySelector('#btn-post').addEventListener('click', () => {
  //   const post = container.querySelector('#post').value;
  //   console.log(post);
  //   savePost(post);
  // });
  //
  container.querySelector('#btn-post').addEventListener('click', () => {
    const post = container.querySelector('#post').value;
    console.log(post);
    postPage(post).then((response) => {
      console.log('hiiii',  response);
      const showPost = container.querySelector("#showPost");
      response.forEach((element) => {
        showPost.innerHTML = ` 
          <h3>${element.usuario}</h3>
          <p>${element.post}</p>
             `;
      });
    });
    return container;
  });
};

  // container.querySelector(".btn-inciarSesion").addEventListener("click", () => {
  //      showChange('#/muro');
  //      const mail = container.querySelector('#mail').value;
  //      const password = container.querySelector('#password').value;
  //      console.log(mail,password);
  //  });
//   container.querySelector('#btn-post').addEventListener('click', () => {
//     const post = container.querySelector('#post').value;
//     console.log(post);
//     postPage(post).then((response) => {
//        console.log('hiiii',  response);
//        const showPost = container.querySelector("#showPost");
//        response.forEach((element) => {
//          showPost.innerHTML = ` 
//          <h3>${element.usuario}</h3>
//          <p>${element.post}</p>
//          ` 
//        })
//     }) 
//     // e.preventDefaul();

//    });
//     return container;
// }; 