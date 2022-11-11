document.addEventListener('DOMContentLoaded', function(){
    const PRODUCT_INFO_URL ="https://japceibal.github.io/emercado-api/products/"+ localStorage.getItem('Product') +".json";
    const PRODUCT_INFO_COMMENTS_URL ='https://japceibal.github.io/emercado-api/products_comments/'+ localStorage.getItem('Product') +'.json';

    fetch(PRODUCT_INFO_URL)
    .then(response => response.json())
    .then(data => {
        imgs = data.images;
        datos = data
        crearCuerpo(data);
        fetch(PRODUCT_INFO_COMMENTS_URL)
        .then(response => response.json())
        .then(info => {
            crearComentarios(info);

          /*  *****///empieza///***** */

          let containerSlider = document.createElement('div')
containerSlider.style = ` 
    width: 90%;
    max-width: 765px;
    margin: auto;
    overflow: hidden;
    box-shadow: 0 0 0 10px #fff,
                0 15px 50px;
    position: relative;
    border-radius: 3px;`

let slider = document.createElement('div')
slider.id = 'slider'
slider.classList.add('slider')
slider.style = `
    display: flex;
    width: 400%;
    height: 400px;
    margin-left: -100%;`

document.querySelector('#carruselImg').appendChild(containerSlider)
containerSlider.appendChild(slider)

        agregarContenido(data);

        let sliderSection = document.querySelectorAll('.slider-section')
        let sliderSectionLast = sliderSection[sliderSection.length-1]
    
        const btnLeft = document.getElementById('slider-left')
        btnLeft.addEventListener('click',function(){Back();})
 

        const btnRight = document.getElementById('slider-right')
        btnRight.addEventListener('click',Next)
    
        slider.insertAdjacentElement('afterbegin', sliderSectionLast)

function agregarContenido(data){
    for (let i = 0; i < data.images.length; i++) {
        slider.innerHTML += `
            <div id='imagen-${i}' class='slider-section' style'width: 100%;'>
                <img src=${data.images[i]} style=' display: block; width: 100%; height: 100%; object-fit: cover;'>
            </div>`
    }
    slider.innerHTML += `
    <div class="slider-btn slider-left" id="slider-left" style=' left: 10px; position: absolute; width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.7); top: 50%; transform: translateY(-50%); font-size: 30px; font-weight: bold; font-family: monospace; text-align: center; border-radius: 50%; cursor: pointer;'>&#60</div>

    <div class="slider-btn slider-right" id="slider-right" style=' right: 10px; position: absolute; width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.7); top: 50%; transform: translateY(-50%); font-size: 30px; font-weight: bold; font-family: monospace; text-align: center; border-radius: 50%; cursor: pointer;'>&#62</div>`
}

function Next(){
    let sliderSectionFirst = document.querySelectorAll('.slider-section')[0]
    slider.style.marginLeft = '-200%'
    slider.style.transition = 'all 0.3s'
    setTimeout(function(){
        slider.style.transition = '0.0s'
        slider.insertAdjacentElement('beforeend', sliderSectionFirst)
        slider.style.marginLeft = '-100%'
    }, 500);
}

function Back(){
    let sliderSection = document.querySelectorAll('.slider-section')
    let sliderSectionLast = sliderSection[sliderSection.length-1]
    slider.style.marginLeft = '0%'
    slider.style.transition = 'all 0.3s'
    setTimeout(function(){
        slider.style.transition = '0.0s'
        slider.insertAdjacentElement('afterbegin', sliderSectionLast)
        slider.style.marginLeft = '-100%'
    }, 500);
}
        //********* */termina/* *********//
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
        <div id ='encavezado' style="display: flex;justify-content: space-between;flex-direction: row;flex-wrap: wrap;align-items: center;">
            <div class=" p-4" style='padding-left: 0px!important;'>
                <h2> ${data.name}</h2>
            </div>
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
        <div style="display: flex;flex-direction: column;gap: 50px;margin-bottom: 53px;margin-top: 26px;">
        <div id='products-img' class="col-3" style="display:flex;flex-direction: row;align-items: center;max-width: 100px;gap: 5px;"> </div>
        <div id="carruselImg" style="max-width: 700px;"></div>
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
        <div id="relacionados" style="display: flex;flex-direction: row;flex-wrap: wrap;gap: 5px;"> </div>`
    
    class Compras {
    constructor(currency,image,name,unitCost, count){
            this.count = count;
            this.currency = currency;
            this.id = '';
            this.image = image;
            this.name = name;
            this.unitCost = unitCost;
        };
    };
    let div = document.createElement('div');
    div.id = 'boton-Comprar';
    div.addEventListener('click',agregarCarrito);
    
    let carrito = []
    if(localStorage.getItem('Compras') != null)
    {carrito = JSON.parse(localStorage.getItem('Compras'));}

    let p = document.createElement('p');
    p.textContent = 'Comprar';

    function agregarCarrito(){
        let nombre = data.name
        nombre = new Compras (`${data.currency}`,`${imgs[0]}`,`${data.name}`,`${data.cost}`, 1)

        p.innerHTML = `✔`
        div.style = 'border-radius:50px; width:41px; margin-right:70px;'
        setTimeout(function() { 
            p.textContent = 'Comprar';
            div.style = 'border-radius: 8px;'
        },500);

        if(localStorage.getItem('Compras') != null){
            for (let i = 0; i < JSON.parse(localStorage.getItem('Compras')).length; i++) {
                if(JSON.parse(localStorage.getItem('Compras'))[i].name === `${data.name}`){
                    console.log(carrito[i])
                    carrito[i].count += 1
                    localStorage.setItem('Compras', (JSON.stringify(carrito))); 

                    console.log(carrito[i].count)
                    return
                };
            };
        };

        if (localStorage.getItem('Compras') != null) {
            carrito = JSON.parse(localStorage.getItem('Compras'));
            carrito.push(nombre);
            localStorage.setItem('Compras', (JSON.stringify(carrito))); 
        } else {
            console.log(carrito)
            carrito.push(nombre);
            localStorage.setItem('Compras', (JSON.stringify(carrito)));
        }

    };

    let divEncavezado = document.getElementById('encavezado');
    divEncavezado.appendChild(div);
    div.appendChild(p);


    for (let i = 0; i < imgs.length; i++) {
        let imgSelect = document.createElement('img');
        imgSelect.src = data.images[i];
        imgSelect.alt = data.description;
        imgSelect.classList.add('img-thumbnail');
        imgSelect.classList.add('hover-carrusel');
        imgSelect.style.borderRadius ="8px"
        imgSelect.id = `img-${i}`
    
        imgSelect.addEventListener('click',()=>{
            
            slider.insertAdjacentElement('afterbegin', document.getElementById(`imagen-${i}`))
            slider.style.marginLeft = '0%'
            slider.style.transition = 'all 0.3s'
            setTimeout(function(){
                let sliderSection = document.querySelectorAll('.slider-section')
                let sliderSectionLast = sliderSection[sliderSection.length-1]
                slider.style.transition = '0.0s'
                slider.insertAdjacentElement('afterbegin', sliderSectionLast)
                slider.style.marginLeft = '-100%'
            }, 500);

        })
        document.getElementById('products-img').appendChild(imgSelect);
    };
    for (let i = 0; i < datos.relatedProducts.length; i++) {
        let divRelated = document.createElement('div')
        divRelated.id = datos.relatedProducts[i].name
        divRelated.style=" display: flex; flex-direction: column; align-items: center;";
        divRelated.addEventListener('click',()=>{
            localStorage.setItem('Product', datos.relatedProducts[i].id);
            window.location.reload()
        })

       let imageRelated = document.createElement('img');
        imageRelated.src = datos.relatedProducts[i].image;
        imageRelated.style.width = "228px"
        divRelated.classList.add('img-thumbnail');
        divRelated.classList.add('hover-related')
        
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

    //if((fecha.getMonth() + 1).length != 2){ mes = '0' + mes};
    //if(fecha.getDate().length != 2){ dia = '0' + dia};

    if (input.value != '' ){
        liContenedor.innerHTML += `
            <li class='newClasProducts'>
                <h7> <b>${usuariolocalStorage}</b> `+` - `+` ${fecha.getFullYear() + '-' + (mes) + '-' + (dia) + ' ' + fecha.toLocaleTimeString()} `+` - `+` ${stars}</h7>
                <p>${input.value}</p>
            </li>`;  
    };

    input.value = '';
};