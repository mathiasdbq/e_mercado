let container = document.getElementById('container-cart')

let valorCarrito = JSON.parse(localStorage.getItem('Compras'))

fetch(CART_INFO_URL + '25801.json')
    .then(response => response.json())
    .then(data => {

        crearEncavezado();

        valorCarrito.push(data.articles[0])
        localStorage.setItem('Compras', (JSON.stringify(valorCarrito)));

        if(localStorage.getItem('Compras') != null){
            for (let i = 0; i < JSON.parse(localStorage.getItem('Compras')).length; i++) {
                agregar(JSON.parse(localStorage.getItem('Compras'))[i])
            };
        };

        evaluarTotal()
    });  

function crearEncavezado(){
    let encavezado = document.createElement('div')
    encavezado.innerHTML = `
        <div style='padding:30px;'>
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
                    </tr>
                </table>
            </div>
            <div style="display: flex;justify-content: flex-end;margin-right: 10%;gap: 10px;">
                <p style="font-weight: bold;">Total:</p>
                <p> USD</p>
                <p id='total'> </p>
            </div>
            <div style="border-top: solid 1px #CFD4DA;padding-top: 24px;">
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

function agregar(data){
    let total = document.getElementById('total')

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
            if(input.value < 1) {return}
            p3.textContent = input.value * data.unitCost

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
            let div3 = document.createElement('div')
        div1.appendChild(div2)
        div2.appendChild(div3)
    td5.appendChild(div1)

    let tr = document.createElement('tr')
        tr.style.borderBottom = 'solid 1px black'
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)


    let boton = document.createElement('button')
    boton.style = `
        border: 0;
        background-color: transparent;
        margin-left: 15px;
        color: red;`
    boton.textContent = 'x'

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
            </tr>`
        for (let i = 0; i < JSON.parse(localStorage.getItem('Compras')).length; i++) {
            agregar(JSON.parse(localStorage.getItem('Compras'))[i])
        };

        evaluarTotal()
    });
    div3.appendChild(boton)

    let tabla = document.getElementById('contenido-tabla')
    tabla.appendChild(tr)
};

function evaluarTotal() {
    let dato = 0 
        for (let i = 0; i < document.getElementsByClassName('p3').length; i++) {  
            if (document.getElementsByClassName('moneda')[i].textContent === 'UYU') {
                dato = dato + parseInt(document.getElementsByClassName('p3')[i].textContent) / 40, 'ahora en dolares'
            } else {
                dato = dato + parseInt(document.getElementsByClassName('p3')[i].textContent)
            };
        };
    console.log(dato);
    total.textContent = dato
};