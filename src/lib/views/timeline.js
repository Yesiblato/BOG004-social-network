// import { showChange } from '../router.js';
// import { async } from 'regenerator-runtime';
import { postPage, getPost, deletePost, getAPost } from '../controllers.js';
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

  // container.querySelector('#btn-post').addEventListener('click', () => {
  //   const post = container.querySelector('#post').value;
  //   console.log(post);
  //   savePost(post);
  // });
  //
  const allPost = getPost();
  const showPost = container.querySelector('#showPost');
  allPost.then((response) => {
    // onGetPost(response);
    // console.log('getPost ',onGetPost());
    response.forEach((element) => {
      showPost.innerHTML += ` 
        <div class= "containerPost">
          <p>${element.id}</p>
          <p>${element.data.post}</p>
          <img data-id = "${element.id}" class="btn-delete" src= "img/eliminar.png" alt="eliminar" >
          <img data-id = "${element.id}" class="btn-edit" src= "img/editar.png" alt="editar" >
        </div>
          `;
    });

    const btnsDelete = showPost.querySelectorAll('.btn-delete');
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        deletePost(dataset.id);
      });
    });

    const btnsEdit = showPost.querySelectorAll('.btn-edit');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const doc = await getAPost(e.target.dataset.id);
        console.log(doc);
      });
    });
  });
  container.querySelector('#btn-post').addEventListener('click', () => {
    const post = container.querySelector('#post').value;
    console.log(post);
    postPage(post);
  });
  return container;
};
