let container = document.getElementById('container-cart')
let tablaTotal = document.createElement('tr')

fetch(CART_INFO_URL + '25801.json')
    .then(response => response.json())
    .then(data => {
        crearEncavezado();

        if(JSON.parse(localStorage.getItem('Compras')) == null || JSON.parse(localStorage.getItem('Compras')) == 0){
            let valorCarrito = []
            valorCarrito.push(data.articles[0])
            localStorage.setItem('Compras', (JSON.stringify(valorCarrito)));
        }else{
            let valor = true
            for (let i = 0; i < JSON.parse(localStorage.getItem('Compras')).length; i++) {
                if(JSON.parse(localStorage.getItem('Compras'))[i].name != data.articles[0].name){   
                    valor = false 
                } else {
                    valor = true
                }
            };

            if (valor == false){
                let valorCarrito = JSON.parse(localStorage.getItem('Compras'))
                valorCarrito.push(data.articles[0])
                localStorage.setItem('Compras', (JSON.stringify(valorCarrito)));
            };
        };


        agregarProductos();
        evaluarTotal()
    });  

function agregarProductos(){
    if(localStorage.getItem('Compras') != null){
        for (let i = 0; i < JSON.parse(localStorage.getItem('Compras')).length; i++) {
            agregar(JSON.parse(localStorage.getItem('Compras'))[i], i)
        };
    };

}

function crearEncavezado(){
    let encavezado = document.createElement('div')
    encavezado.innerHTML = `
        <div style='padding:30px; max-width: 1100px; margin: auto;'>
            <h1 style="text-align: center;">Carrito de compras</h1>
            <div>
                <h4>Artículos a comprar</h4>
            </div>
            <div style=" margin-bottom: 25px; ">
                <table class='tabla-carrito' style="width: 100%;" id='contenido-tabla'>
                    <tr>
                        <th style='width:120px'> </th>
                        <th>Nombre</th>
                        <th>Costos</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th> </th>
                    </tr>
                </table>
            </div>
            <div style="padding-top: 24px;">
                <h3>Tipo de envio</h3>
                <div>
                    <div>
                    <input type="radio" name="envio" id="15%">
                        <label for="15%">Premium 2 a 5 dias (15%)</label>
                    </div>
                    <div>
                        <input type="radio" name="envio" id="7%">
                        <label for="7%">Express 5 a 8 dias(7%)</label>
                    </div>
                    <div>
                        <input type="radio" name="envio" id="5%">
                        <label for="5%">Standard 12 a 15 dias(5%)</label>
                    </div>
                </div>
                <h3>Direccion de envio</h3>
                <div style="max-width: 520px; display: flex; flex-wrap: wrap; gap: 31px;">
                    <div>
                        <div>
                            <label for='calle-cart'>Calle</label>
                        </div>
                        <input type="text" name="" id="calle-cart" style="width: 300px;">
                    </div>
                    <div>
                        <div>
                        <label for='numero-cart'>Numero</label>
                        </div>
                        <input type="text" name="" id="numero-cart">
                    </div>
                    <div>
                        <div>
                        <label for='esquina-cart'>Esquina</label>
                        </div>
                        <input type="text" name="" id="esquina-cart" style="width: 300px;">
                    </div>
                </div>
            </div>
            
        </div>`;

    container.appendChild(encavezado)
}

function agregar(data, i){

    let td1 = document.createElement('td')
        let div = document.createElement('div')
        div.style.maxWidth = '100px'
            let img = document.createElement('img')
            img.classList.add('img-thumbnail')
            img.src = `${data.image}`;
            img.alt = `${data.name}`;
        div.appendChild(img)
    td1.appendChild(div)

    let td2= document.createElement('td')
        let p1 = document.createElement('p')
        p1.textContent = `${data.name}`
    td2.appendChild(p1)

    let td3 = document.createElement('td')
        let p2 = document.createElement('p')
        p2.textContent = `${data.currency}${data.unitCost}`
    td3.appendChild(p2)

    let td4 = document.createElement('td')
        let input = document.createElement('input')
        input.type = 'number'
        input.value = `${data.count}`
        input.style.maxWidth = '50px'
        input.addEventListener('click',()=>{    
            if(input.value < 0) {
                input.value = 0
                return
            };

            p3.textContent = input.value * data.unitCost

            let carrito = []
            carrito = JSON.parse(localStorage.getItem('Compras'));
            carrito[i].count = input.value
            localStorage.setItem('Compras', (JSON.stringify(carrito)));

            evaluarTotal()
        });
    td4.appendChild(input)

    let td5 = document.createElement('td')
        let div1 = document.createElement('div')
            let div2 = document.createElement('div')
                div2.style = `
                    display: flex;
                    gap: 5px;                
                    align-items: baseline;`
                let moneda = document.createElement('p')
                moneda.classList.add('moneda')
                moneda.textContent = data.currency
                let p3 = document.createElement('p')
                p3.classList.add('p3')
                p3.textContent = input.value * data.unitCost
            div2.appendChild(moneda)
            div2.appendChild(p3)
        div1.appendChild(div2)
    td5.appendChild(div1)

    let td6 = document.createElement('td')
        let div3 = document.createElement('div')
        td6.appendChild(div3)

    let tr = document.createElement('tr')
        tr.style.borderBottom = 'solid 1px black'
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)


    let boton = document.createElement('button')
    boton.style = `
    border: solid white 1px;
    background: red;margin-left:15px;
    color: white;
    border-radius: 5px;`
    boton.textContent = 'Eliminar'

    boton.addEventListener('click',()=>{
        
        if(localStorage.getItem('Compras') != null){
            for (let i = 0; i < JSON.parse(localStorage.getItem('Compras')).length; i++) {
                if(JSON.parse(localStorage.getItem('Compras'))[i].name === data.name){
                    let lista = JSON.parse(localStorage.getItem('Compras'))
                    lista.splice(i, 1);
                    localStorage.setItem('Compras', (JSON.stringify(lista)));
                };
            };
        };

        tabla.innerHTML = `  
            <tr>
                <th style='width:120px'> </th>
                <th>Nombre</th>
                <th>Costos</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th> </th>
            </tr>`

        agregarProductos();
        evaluarTotal()
    });
    div3.appendChild(boton)

    let tabla = document.getElementById('contenido-tabla')
    tabla.appendChild(tr)


    
    document.getElementById('contenido-tabla').insertAdjacentElement('beforeend', tablaTotal)
};


function evaluarTotal() {

    let valorTotal = 0 
        for (let i = 0; i < document.getElementsByClassName('p3').length; i++) {  
            if (document.getElementsByClassName('moneda')[i].textContent === 'UYU') {
                valorTotal += parseInt(document.getElementsByClassName('p3')[i].textContent) / 40 // transforma a dolares 'mas o menos'
            } else {
                valorTotal += parseInt(document.getElementsByClassName('p3')[i].textContent)
            };
        };
    console.log(valorTotal);

    
    tablaTotal.innerHTML =`
    <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <div style='display:flex; gap:10px;'><p> Total: USD </p> <p>${valorTotal}</p></div> </td>
    <td> </td>
    </tr>`

    
};