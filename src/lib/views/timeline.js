// import { async } from 'regenerator-runtime';
import {
  postPage, getPost, deletePost, getAPost, updatePost, fnLikes, signOff,
} from '../controllers.js';
import { getAuth } from '../firebase/firebase-imports.js';

let editStatus = false;
window.editStatus = editStatus;
let id = '';
window.id = id;

export const timelinePage = () => {
  const viewTimeline = ` 
  <div id="container-feed"> 
    <div id='beginning'> 
      <img class= "nav-bar" id="btnMenu" src="img/menu.png" alt="menu">
      <img src="img/logo.png" alt="logo">
      <img class= "btn-signOut" src="img/logout.png" alt="Cerrar Sesión">
    </div>
    <div>
      <nav class= "main-nav">
        <ul class= "menu" id="menu">
          <li class="menu-item"><a class="menu-link" href="#">Cultura</a></li>
          <li class="menu-item"><a class="menu-link" href="#">Lugares</a></li>
          <li class="menu-item"><a class="menu-link" href="#">Salud</a></li>
          <li class="menu-item"><a class="menu-link" href="#">Tramites legales</a></li>
          <li class="menu-item"><a class="menu-link" href="#">Noticias</a></li>
        </ul>
      </nav>
      </div>
    <div id="container-share"> 
      <input type="text" placeholder="¿Qué nos vas a compartir hoy?" id="post">
      <div id= "btnPublicar">
        <button type="button" id="btn-post">Publicar</button>
      </div>
      <div id="showPost"></div>
    </div> 
  </div>
      `;
  const container = document.createElement('div');
  container.setAttribute('class', 'containerPrincipal');
  container.innerHTML = viewTimeline;

  const btnSignOff = container.querySelector('.btn-signOut');
  btnSignOff.addEventListener('click', () => {
    signOff();
  });

  // const btnMenu = document.querySelector('#btnMenu');
  // const menu = document.querySelector('menu');
  // btnMenu.addEventListener('click', () => {
  //   menu.classList.toggle('mostrar');
  // });

  const allPost = getPost();
  const showPost = container.querySelector('#showPost');
  allPost.then((response) => {
    response.forEach((element) => {
      const auth = getAuth();
      const user = JSON.parse(localStorage.getItem('user'));
      const userEmail = user.email;
      const imageName = element.data.likes.includes(userEmail) ? 'img/like.png' : 'img/dislike.png';
      showPost.innerHTML += ` 
        <div class= "containerPost">
           <img class ="userImage" src="${element.data.photo}"> 
          <div id = "listPost">
            <h3>${element.data.name}</h3>
            <p>${element.data.email}</p>
            <p>${element.data.post}</p>
          </div>
          <div id = "imgPost">
            <p id = "likes">${element.data.likes.length} </p>
            <img data-id = "${element.id}" class="btn-dislike" src= "${imageName}" alt="dislike" >
            <img data-id = "${element.id}" class="btn-delete" src= "img/eliminar.png" alt="eliminar" >
            <img data-id = "${element.id}" class="btn-edit" src= "img/editar.png" alt="editar" >
          </div>
        </div>
          `;
    });

    const btnlikes = showPost.querySelectorAll('.btn-dislike');
    btnlikes.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        console.log('boton likes', btn);
        fnLikes(dataset.id);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      });
    });

    const btnsDelete = showPost.querySelectorAll('.btn-delete');
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        deletePost(dataset.id);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    });

    const btnsEdit = showPost.querySelectorAll('.btn-edit');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const doc = await getAPost(e.target.dataset.id);
        const dataEdit = doc.data();
        container.querySelector('#post').value = dataEdit.post;

        editStatus = true;
        id = e.target.dataset.id;
        container.querySelector('#btn-post').innerText = 'Actualizar';
      });
    });
  });

  container.querySelector('#btn-post').addEventListener('click', () => {
    const post = container.querySelector('#post').value;
    console.log(post);
    if (!editStatus) {
      postPage(post);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      updatePost(id, { post });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    editStatus = false;
  });
  return container;
};
