 import {showChange} from "./lib/router.js" 

const beginning = () => {
    showChange(window.location.hash);
    window.addEventListener("hashchange", () => showChange(window.location.hash))
}
window.addEventListener("load", beginning)

//import { myFunction } from './lib/index.js';

//myFunction();
