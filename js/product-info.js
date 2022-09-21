document.addEventListener('DOMContentLoaded', function(){
    const PRODUCT_INFO_URL ="https://japceibal.github.io/emercado-api/products/"+ localStorage.getItem('Product') +".json";
    const PRODUCT_INFO_COMMENTS_URL ='https://japceibal.github.io/emercado-api/products_comments/'+ localStorage.getItem('Product') +'.json';

    fetch(PRODUCT_INFO_URL)
    .then(response => response.json())
    .then(data => {
        imgs = data.images;
        datos = data
        crearCuerpo(data);
        console.log(data.relatedProducts);
        fetch(PRODUCT_INFO_COMMENTS_URL)
        .then(response => response.json())
        .then(info => {
            crearComentarios(info);
        });
    });  
});
let datos;
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
        <div style="display: flex;align-items: center;flex-direction: column;">
        <div style="display: flex;flex-direction: column;gap: 10px;">
        <div id='products-img' class="col-3" style="display:flex;flex-direction: row;align-items: center;max-width: 100px;gap: 5px;"> </div>
        <div id="carruselImg" style="max-width: 700px;"><img src="${imgs[0]}" alt="" style="width: 100%;border-radius: 5px;"></img></div>
        </div>
        </div>
        <h3 class=" p-4" style='padding-left: 0px!important;'> Comentarios </h3>
        <div class="border rounded-3 cont">
            <ul class="list-group" id="contenedor"></ul>
        </div>
        <h3> Comentar </h3>
        <div style='display: flex; flex-direction: column; align-items: flex-start;'>
          
            <label for='puntuacion'>Puntuacion</label>
            <div class="rating-container">
                <input type="radio" name="rating" id="star5" class="star">
                <label class="labelStar" for="star5"><i class="fa fa-star"></i></label>

                <input type="radio" name="rating" id="star4" class="star">
                <label  class="labelStar"for="star4"><i class="fa fa-star"></i></label>

                <input type="radio" name="rating" id="star3" class="star">
                <label class="labelStar" for="star3"><i class="fa fa-star"></i></label>

                <input type="radio" name="rating" id="star2" class="star">
                <label class="labelStar" for="star2"><i class="fa fa-star"></i></label>

                <input type="radio" name="rating" id="star1" class="star">
                <label class="labelStar" for="star1"><i class="fa fa-star"></i></label>
            </div>

            <label for='coment'>Comentario</label>
            <textarea id='coment' name="comentarios" rows="4" cols="60" style='border-radius:7px; width:360px;'></textarea>
            <div id="textAlerta"></div>
          
            <button type="button" class="btn btn-primary my-3" id="agregar">Enviar</button>
        </div>
        <hr>
        <h3> Productos relacinados </h3>
        <div id="relacionados" style="display: flex;flex-direction: row;flex-wrap: wrap;"> </div>`

    for (let i = 0; i < imgs.length; i++) {
        let newdocument = document.createElement('img');
        newdocument.src = data.images[i];
        newdocument.alt = data.description;
        newdocument.classList.add('img-thumbnail');
        newdocument.classList.add('hover-gris');
        newdocument.style.borderRadius ="8px"
    
        newdocument.addEventListener('click',()=>{
           document.getElementById('carruselImg').innerHTML = `<img src="${data.images[i]}" alt="" style="width: 100%;border-radius: 5px;">`
        })
        document.getElementById('products-img').appendChild(newdocument);
    };
    for (let i = 0; i < datos.relatedProducts.length; i++) {
        let divRelated = document.createElement('div')
        divRelated.id = datos.relatedProducts[i].name
        divRelated.style=" display: flex; flex-direction: column; align-items: center;";
        divRelated.addEventListener('click',()=>{
            localStorage.setItem('Product', datos.relatedProducts[i].id);
            window.location.reload()
            console.log('tocastes'+ datos.relatedProducts[i].name, datos.relatedProducts[i].id)
        })

       let imageRelated = document.createElement('img');
        imageRelated.src = datos.relatedProducts[i].image;
        imageRelated.style.width = "228px"
        divRelated.classList.add('img-thumbnail');
        
        let tituloRelated = document.createElement('h7')
        tituloRelated.innerHTML = datos.relatedProducts[i].name
        
        divRelated.appendChild(imageRelated)
        divRelated.appendChild(tituloRelated)
        document.getElementById('relacionados').appendChild(divRelated);
    };

    liContenedor = document.getElementById('contenedor');
    document.getElementById('agregar').addEventListener('click', comentar);
};

function crearComentarios(data){
let stars;
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
    let stars;
    let star5 = document.getElementById('star5');
    let star4 = document.getElementById('star4');
    let star3 = document.getElementById('star3');
    let star2 = document.getElementById('star2');
    let star1 = document.getElementById('star1');
    let input = document.getElementById('coment');
    let textAlerta = document.getElementById('textAlerta')
    let usuariolocalStorage = localStorage.getItem('usuario');

    if (usuariolocalStorage == null){
        input.value = ''
        input.placeholder = 'deve iniciar secion para realizar un comentario'
        input.style.backgroundColor = '#EEEEEE'
    }

    if (star1.checked === false && star2.checked === false && star3.checked === false && star4.checked === false && star5.checked === false){
        textAlerta.innerHTML = 'por favor indique una puntuacion valida'
        textAlerta.style.color = 'red'   
        return 
    }
    else if(star1.checked){ stars = `<span class="fa fa-star checked"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span>`
        textAlerta.innerHTML = ''} 
    else if(star2.checked){stars = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span>`
        textAlerta.innerHTML = ''}
    else if(star3.checked){stars = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star noChequed"></span> <span class="fa fa-star noChequed"></span>`
        textAlerta.innerHTML = ''} 
    else if(star4.checked){stars = `<span class="fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class="fa fa-star  checked"></span> <span class="fa fa-star noChequed"></span>` 
        textAlerta.innerHTML = ''} 
    else if (star5.checked){stars = `<span class="fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class=" fa fa-star checked"></span> <span class="fa fa-star  checked"></span>`
        textAlerta.innerHTML = ''}

    if(fecha.getMonth() + 1 .length != 2){ mes = '0' + mes};
    if(fecha.getDate() .length != 2){ dia = '0' + dia};

    if (input.value != '' ){
        liContenedor.innerHTML += `
            <li class='newClasProducts'>
                <h7> <b>${usuariolocalStorage}</b> `+` - `+` ${fecha.getFullYear() + '-' + (mes) + '-' + (dia) + ' ' + fecha.toLocaleTimeString()} `+` - `+` ${stars}</h7>
                <p>${input.value}</p>
            </li>`;  
    };

    input.value = '';
};