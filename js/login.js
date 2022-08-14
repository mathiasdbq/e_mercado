let formLogin = document.getElementById('form-login');
let loginEmail = document.getElementById('email-login');
let logincontrasena = document.getElementById('contrasena-login')
formLogin.addEventListener('submit',function(evento){

    let errorEmail = document.getElementById('texto-error-email')
    let errorContasena = document.getElementById('texto-error-contrasena')
        
    function error(contenido){
        if (contenido == 'email'){
            evento.preventDefault();
            errorEmail.style.display = 'block' ;
            errorEmail.innerHTML = 'ingresa tu e-mail' ;
            loginEmail.style.border = 'red solid 0.5px';
        } else if (contenido == 'contrasena') {
            evento.preventDefault();
            errorContasena.style.display = 'block' ;
            errorContasena.innerHTML = 'ingresa una contraseña' ;
            logincontrasena.style.border = 'red solid 0.5px';
        } else if (contenido == 'contrasenaCorta') {
            evento.preventDefault();
            errorContasena.style.display = 'block' ;
            errorContasena.innerHTML = 'ingresa una contraseña mayor a 8 caracteres' ;
            logincontrasena.style.border = 'red solid 0.5px';
        }
    };

    function noerror(contenido){
        if (contenido == 'email'){
            evento.preventDefault();
            errorEmail.style.display = 'none' ;
            loginEmail.style.border = 'solid 0.5px #CFD4DA';
        } else if (contenido == 'contrasena') {
            evento.preventDefault();
            errorContasena.style.display = 'none' ;
            logincontrasena.style.border = 'solid 0.5px #CFD4DA';
        }
    }

    if (loginEmail.value.length<7 && logincontrasena.value.length<1) {
        error('email')
        error('contrasena');  
    } else if (loginEmail.value.length<7 && logincontrasena.value.length > 1 && logincontrasena.value.length < 8){
        error('email')
        error('contrasenaCorta')  
    } else if(logincontrasena.value.length > 8 && loginEmail.value.length<7){
        error('email')
        noerror('contrasena')
    }else if(logincontrasena.value.length<1){
        error('contrasena');
        noerror('email')
    } else if( logincontrasena.value.length > 1 && logincontrasena.value.length < 8){
        error('contrasenaCorta') 
        noerror('email') 
    } else if (loginEmail.value.length > 7 && logincontrasena.value.length > 8){
        evento.preventDefault();
        window.location.href='./inicio.html';
    }
});



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBOsrZdx-UKdpQTgRQnJNJ9y3aJOhf5Zw",
  authDomain: "e-mercado-c377c.firebaseapp.com",
  projectId: "e-mercado-c377c",
  storageBucket: "e-mercado-c377c.appspot.com",
  messagingSenderId: "770866906632",
  appId: "1:770866906632:web:268c92f43f52c856a5b3bd",
  measurementId: "G-JNQEV8K2TM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

function logearseGoogle () {
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result)
    window.location.href='./inicio.html';
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...

    // signInWithRedirect(auth, provider);   
  });
};

let loginGoogle = document.getElementById('login-google')
loginGoogle.addEventListener('click', function(){loginGoogle.style.color ='#0B5ED7'})
loginGoogle.addEventListener('click', logearseGoogle)