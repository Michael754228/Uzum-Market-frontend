
import "./auth.js"
// import "./backend.js"
import "./catalog.js"
import "./favorites.js"

import "../onlyCSS/cart.css"
import "../onlyCSS/footer.css"
import "../onlyCSS/header.css"
import "../onlyCSS/home.css"
import "../onlyCSS/auth.css"
import "../onlyCSS/main.css"

import "../components/scripts/footer.js"
import "../components/scripts/header.js"
import { initCart } from "./cart.js"

document.addEventListener('DOMContentLoaded', () => {
    initCart()
});