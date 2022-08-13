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
    }

    function noerror(contenido){
        if (contenido == 'email'){
            evento.preventDefault();
            errorEmail.style.display = 'none' ;
            loginEmail.style.border = 'solid 0.5px #CFD4DA';
            } else if (contenido == 'contrasena') {
            evento.preventDefault();
            errorContasena.style.display = 'none' ;
            logincontrasena.style.border = 'solid 0.5px #CFD4DA';
            } else if (contenido == 'contrasenaCorta') {
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
        window.location.href='../index.html';
    }
});