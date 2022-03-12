export const registerPage= () => {
    const viewRegister = ` 
    <h2 id="title1" >Latam</h2>
    <h2 id="title2">Sin Frontera</h2>
     `
     const container = document.createElement("div");
     container.innerHTML= viewRegister;
     return container;
}