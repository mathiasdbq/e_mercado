document.addEventListener('DOMContentLoaded', function(){
    const PRODUCT_INFO_URL ="https://japceibal.github.io/emercado-api/products/"+ localStorage.getItem('Product') +".json";
    const PRODUCT_INFO_COMMENTS_URL ='https://japceibal.github.io/emercado-api/products_comments/'+ localStorage.getItem('Product') +'.json';

    fetch(PRODUCT_INFO_URL)
    .then(response => response.json())
    .then(data => {
        imgs = data.images;
        crearCuerpo(data);

        fetch(PRODUCT_INFO_COMMENTS_URL)
        .then(response => response.json())
        .then(info => {
            crearComentarios(info);
        });
    });  
});
let imgs;
let cuerpo = document.getElementById('container');
let items = [];
let fecha = new Date();
let mes = fecha.getMonth()+1;
let dia = fecha.getDate();
let liContenedor;

function crearCuerpo(data){
    cuerpo.innerHTML = 
        `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div class=" p-4" style='padding-left: 0px!important;'>
            <h2> ${data.name}</h2>
        </div>
        <hr>
        <h4> precio </h4>
        <p>${data.currency} `+` ${data.cost}</p>
        <h4>Descripcion</h4>
        <p>${data.description}</p>
        <h4>categoria</h4>
        <p>${data.category}</p>
        <h4>cantidad de vendidos</h4>
        <p>${data.soldCount}</p>
        <h4>imagenes ilustrativas</h4>
        <div id='products-img' class="col-3" style='display:flex;'> </div>
        
        <h3 class=" p-4" style='padding-left: 0px!important;'> Comentarios </h3>
        <div class="border rounded-3 cont">
            <ul class="list-group" id="contenedor"></ul>
        </div>
        <h3> Comentar </h3>
        <div style='display: flex; flex-direction: column; align-items: flex-start;'>
            <label for='coment'>Tu opinion</label>
            <textarea id='coment' name="comentarios" rows="4" cols="60" style='border-radius:7px; width:360px;'></textarea>
            <label for='puntuacion'>tu puntuacion</label>
            <select name="Puntuacion" id='puntuacion' style="width:80px; text-align: center;">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </select>
            <button type="button" class="btn btn-primary my-3" id="agregar">Enviar</button>
        </div>`

    for (let i = 0; i < imgs.length; i++) {
        let newdocument = document.createElement('img');
        newdocument.src = data.images[i];
        newdocument.alt = data.description;
        newdocument.classList.add('img-thumbnail');
        document.getElementById('products-img').appendChild(newdocument);
    };

    liContenedor = document.getElementById('contenedor');
    document.getElementById('agregar').addEventListener('click', comentar);
};

function crearComentarios(data){

    for (let i = 0; i < data.length; i++) {

        if(data[i].score == 1){ stars = `<span class="fa fa-star checked"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span>`}
        else if(data[i].score == 2){stars = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span>`}
        else if(data[i].score == 3){stars = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span>`} 
        else if(data[i].score == 4){stars = `<span class="fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class="fa fa-star  checked"></span> <span class="fa fa-star noChequed"></span>` } 
        else{stars = `<span class="fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class="fa fa-star  checked"></span>`};
    
        liContenedor.innerHTML += `
            <li class='newClasProducts'>
                <h7> <b>${data[i].user}</b> `+` - `+` ${data[i].dateTime} `+` - `+` ${stars}</h7>
                <p>${data[i].description}</p>
            </li>`;
    };
};



function comentar(){
    let input = document.getElementById('coment');
    let puntuacion = document.getElementById('puntuacion');
    let usuariolocalStorage = localStorage.getItem('usuario');

    if (usuariolocalStorage == null){
        input.value = ''
        input.placeholder = 'deve iniciar secion para realizar un comentario'
        input.style.backgroundColor = '#EEEEEE'
    }

    if(puntuacion.value == 1){ stars = `<span class="fa fa-star checked"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span>`} 
    else if(puntuacion.value == 2){stars = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span>`}
    else if(puntuacion.value == 3){stars = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span>`} 
    else if(puntuacion.value == 4){stars = `<span class="fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class="fa fa-star  checked"></span> <span class="fa fa-star noChequed"></span>` } 
    else{stars = `<span class="fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class="fa fa-star  checked"></span>`}

    if(fecha.getMonth() + 1 .length != 2){ mes = '0' + mes};
    if(fecha.getDate() .length != 2){ dia = '0' + dia};

    if (input.value != ''){
        liContenedor.innerHTML += `
            <li class='newClasProducts'>
                <h7> <b>${usuariolocalStorage}</b> `+` - `+` ${fecha.getFullYear() + '-' + (mes) + '-' + (dia) + ' ' + fecha.toLocaleTimeString()} `+` - `+` ${stars}</h7>
                <p>${input.value}</p>
            </li>`;  
    };

    input.value = '';
};