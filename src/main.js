import { showChange } from "./lib/router.js"
import { loginPage } from "./lib/views/login.js"

const beginning = () => {
    showChange(window.location.hash);
    window.addEventListener("hashchange", () => showChange(window.location.hash))
}
window.addEventListener("load", beginning)





