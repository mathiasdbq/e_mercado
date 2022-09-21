const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// usuario 
let liNav = document.getElementById('li-nav');
let hrefInicio = document.createElement ('ul');
hrefInicio.classList.add('submenu')
hrefInicio.style.marginTop = "12px"
liNav.classList.add('nav-link');
liNav.classList.add('ul-Nav-link');
liNav.style.cursor = ('pointer');
let usuariolocalStorage = localStorage.getItem('usuario');
liNav.innerHTML = `<a style="padding-right: 40px;">${usuariolocalStorage}</a>`
liNav.appendChild (hrefInicio);

if (localStorage.getItem('usuario')){

  let miCarrito = document.createElement ('li')
  let miCarritoA = document.createElement ('a')
  miCarritoA.href = './cart.html'
  miCarritoA.textContent = 'Mi carrito'
  miCarrito.appendChild(miCarritoA)
  miCarritoA.classList.add('nav-link');
  miCarrito.style.display = "none"

  let miPerfil = document.createElement ('li')
  let miPerfilA = document.createElement ('a')
  miPerfilA.href = './my-profile.html'
  miPerfilA.textContent = 'Mi perfil'
  miPerfil.appendChild(miPerfilA)
  miPerfilA.classList.add('nav-link');
  miPerfil.style.display = "none"

  let cerrarSesion = document.createElement ('li')
  cerrarSesion.textContent = 'Cerrar sesión'
  cerrarSesion.classList.add('nav-link');
  cerrarSesion.style.display = "none"
  cerrarSesion.addEventListener('click',()=>{
    localStorage.removeItem('usuario');
    window.location.href ='./index.html'})

    hrefInicio.appendChild(miCarrito)
    hrefInicio.appendChild(miPerfil)
    hrefInicio.appendChild(cerrarSesion)
    liNav.addEventListener('click',()=>{
      if(miCarrito.style.display === "block" && miPerfil.style.display === "block" && cerrarSesion.style.display === "block"){
        miCarrito.style.display = "none"
        miPerfil.style.display = "none"
        cerrarSesion.style.display = "none"
        liNav.style.backgroundColor = "transparent"
      } else {
      liNav.style.backgroundColor = "#5c636a"
      miCarrito.style.display = "block"
      miPerfil.style.display = "block"
      cerrarSesion.style.display = "block"
      }
    })
} else {
  liNav.innerHTML = `<a class="nav-link" href='./index.html' >iniciar secion</a>`;

  hrefInicio.appendChild(redireccionInicio)
};