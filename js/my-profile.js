let email = document.getElementById('email-input')
email.value = localStorage.getItem('usuario')

let primerNombre = document.getElementById('primer-nombre')
let segundoNombre = document.getElementById('segundo-nombre')
let primerApellido = document.getElementById('primer-apellido')
let segundoApellido = document.getElementById('segundo-apellido')
let telefonoContacto = document.getElementById('telefono-contacto')
let guardarCambios = document.getElementById('guardar-cambios')
let imgUser = document.getElementById('img-user')
let loadImg = document.getElementById('load-img')
let imagenSource = ''

function mostrarImagen(e){
  imagenSource = e.target.result;

  imgUser.src = imagenSource;
}

function procesarArchivo(e){
   var imagen = e.target.files[0];
   var lector = new FileReader();

   lector.addEventListener('load', mostrarImagen);
   lector.readAsDataURL(imagen);
}

loadImg.addEventListener('change', procesarArchivo)

class Usuario {
    constructor(primerNombre,segundoNombre,primerApellido,segundoApellido, telefonoContacto,email,img){
            this.primerNombre = primerNombre ;
            this.segundoNombre = segundoNombre ;
            this.primerApellido = primerApellido ;
            this.segundoApellido = segundoApellido ;
            this.telefonoContacto = telefonoContacto ;
            this.email = email ;
            this.img = img ;
        };
    };

    primerNombre.addEventListener('input',()=>{
        if (primerNombre.value != '') {
            primerNombre.style.border = 'solid 1px grey'
        } else {
        primerNombre.style.border = 'solid 1px red'
        primerNombre.placeholder="Este campo es obligatorio"
        }
    })
    primerApellido.addEventListener('input',()=>{
        if (primerApellido.value != '') {
            primerApellido.style.border = 'solid 1px grey'
        } else {
        primerApellido.style.border = 'solid 1px red'
        primerApellido.placeholder="Este campo es obligatorio"
        }
    })
    email.addEventListener('input',()=>{
        if (email.value != '') {
            email.style.border = 'solid 1px grey'
        } else {
        email.style.border = 'solid 1px red'
        email.placeholder="Este campo es obligatorio"
        }
    })

guardarCambios.addEventListener('click',()=>{
    let user = '';

    if (primerNombre.value == '') {
        primerNombre.style.border = 'solid 1px red'
        primerNombre.placeholder="Este campo es obligatorio"
    } 
    if (primerApellido.value == '') {
        primerApellido.style.border = 'solid 1px red'
        primerApellido.placeholder="Este campo es obligatorio"

    } 
    if (email.value == '') {
        email.style.border = 'solid 1px red'
        email.placeholder="Este campo es obligatorio"

    } 
    if (primerNombre.value != '' && primerApellido.value != '' && email.value != ''){
        document.getElementById('compra-exitosa').style.display = 'flex'
        setTimeout(function() {document.getElementById('compra-exitosa').style.display = 'none'},500);

        primerNombre.style.border = 'solid 1px grey'
        primerApellido.style.border = 'solid 1px grey'
        email.style.border = 'solid 1px grey'
        primerNombre.placeholder=""
        primerApellido.placeholder=""
        email.placeholder=""

        user = new Usuario (`${primerNombre.value}`,`${segundoNombre.value}`,`${primerApellido.value}`,`${segundoApellido.value}`, `${telefonoContacto.value}`, `${email.value}`,`${imagenSource}`)
        console.log(user);
        localStorage.setItem('dataUser', (JSON.stringify(user)))
        console.log(JSON.parse(localStorage.getItem('dataUser')));
    }
})


if(JSON.parse(localStorage.getItem('dataUser')) != null){
    let datos = JSON.parse(localStorage.getItem('dataUser'))
    primerNombre.value = `${datos.primerNombre}`
    segundoNombre.value = `${datos.segundoNombre}`
    primerApellido.value = `${datos.primerApellido}`
    segundoApellido.value = `${datos.segundoApellido}`
    telefonoContacto.value = `${datos.telefonoContacto}`
    guardarCambios.value = `${datos.guardarCambios}`
    email.value = `${datos.email}`
    if (datos.img == '') {
        imgUser.src = './img/img_perfil.png'
    } else {
        imgUser.src = `${datos.img}`
    }
}

