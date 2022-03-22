import { showChange } from  '../router.js';
export const timelinePage = () => {
    const viewTimeline = ` 
        <div id="hola"> 
        <h2> hola </h2>
        </div> 
        ` 
const container = document.createElement('div');
  container.setAttribute("class", "containerPrincipal")
  container.innerHTML = viewTimeline ;

//   container.querySelector(".btn-inciarSesion").addEventListener("click", () => {
//     showChange('#/muro');
//      const mail = container.querySelector('#mail').value;
//    const password = container.querySelector('#password').value;
//    console.log(mail,password);
//  });
  
 
 return container;
}