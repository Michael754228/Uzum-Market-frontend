

import "./data.js"
import "./auth.js"
import "./backend.js"
import "./catalog.js"
import "./favorites.js"
import "./product.js"
import { initCart } from "./cart.js";

import "../onlyCSS/cart.css"
import "../onlyCSS/catalog.css"
import "../onlyCSS/footer.css"
import "../onlyCSS/header.css"
import "../onlyCSS/home.css"
import "../onlyCSS/main.css"
import "../onlyCSS/product.css"

import "../components/scripts/footer.js"
import "../components/scripts/header.js"


document. addEventListener('DOMContentLoaded', () => {
    initCart()
});


