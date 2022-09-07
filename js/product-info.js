document.addEventListener('DOMContentLoaded', function(){
    const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/"+ localStorage.getItem('Product') +".json";
    const PRODUCT_INFO_COMMENTS_URL = 'https://japceibal.github.io/emercado-api/products_comments/'+ localStorage.getItem('Product') +'.json';

    fetch(PRODUCT_INFO_URL)
    .then(response => response.json())
    .then(data => {
        imgs = data.images;
        crearCuerpo(data);
        colocarImg(data);
    });

    
    fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(response => response.json())
    .then(data => {
        crearComentarios(data)
    });
});
let imgs;
let cuerpo = document.getElementById('container')
let items = []
let fecha = new Date()
    let mes = fecha.getMonth()+1;
    let dia = fecha.getDate();



function colocarImg (data){

    for (let i = 0; i < imgs.length; i++) {
        let newdocument = document.createElement('img')
        newdocument.src = data.images[i]
        newdocument.alt = data.description
        newdocument.classList.add('img-thumbnail')
        document.getElementById('products-img').appendChild(newdocument)

    };
};

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
            <textarea id='coment' name="comentarios" rows="4" cols="60" style='border-radius:7px; width:45%;'></textarea>
            <label for='puntuacion'>tu puntuacion</label>
            <select name="Puntuacion" id='puntuacion' style="width:80px; text-align: center;">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </select>
            <button type="button" class="btn btn-primary my-3" id="agregar">Enviar</button>
        </div>
        
        `    

        document.getElementById('agregar').addEventListener('click', comentar);
};

function crearComentarios(data){
    let liContenedor = document.getElementById('contenedor');
    let stars;
    items = data
        


    for (let i = 0; i < items.length; i++) {

        if(items[i].score == 1){ stars = `<span class="fa fa-star checked"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span>`} 
        else if(items[i].score == 2){stars = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span>`}
        else if(items[i].score == 3){stars = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span>`} 
        else if(items[i].score == 4){stars = `<span class="fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class="fa fa-star  checked"></span> <span class="fa fa-star noChequed"></span>` } 
        else{stars = `<span class="fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class="fa fa-star  checked"></span>`}
    
        liContenedor.innerHTML += `<li class='newClasProducts'>
        <h7> <b>${items[i].user}</b> `+` - `+` ${items[i].dateTime} `+` - `+` ${stars}</h7>
        <p>${items[i].description}</p>
    </li>`;
    };
}



function comentar(){
    let input = document.getElementById('coment');
    let liContenedor = document.getElementById('contenedor');
    let puntuacion = document.getElementById('puntuacion')
    let usuariolocalStorage = localStorage.getItem('usuario');
    let stars;

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

//fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDate() + ' ' + fecha.toLocaleTimeString()