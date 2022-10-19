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
            <div style="margin-top: 50px;">
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
            <div style="border-bottom: 1px solid #CFD4DA;padding-top: 24px;padding-bottom: 30px;">
                <h3>Tipo de envio</h3>
                <div>
                    <div>
                    <input type="radio" name="envio" id="15%" checked>
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
                        <img src="./img/alert_logo.svg" id='error-calle' style="display: none;position: absolute;translate: 273px 2px;">
                        <input type="text" name="" id="calle-cart" style="width: 300px;">
                        <p style="color:red;margin: 0; display:none;" id="calle-cart-p">Ingresa una calle</p>
                        
                    </div>
                    <div>
                        <div>
                            <label for='numero-cart'>Numero</label>
                        </div>
                        <img src="./img/alert_logo.svg" id='error-numero' style="position: absolute;display: none;translate: 161px 2px;">
                        <input type="text" name="" id="numero-cart">
                        <p style="color:red;margin: 0; display:none;" id="numero-cart-p">Ingresa un número</p>
                        
                    </div>
                    <div>
                        <div>
                            <label for='esquina-cart'>Esquina</label>
                        </div>
                        <img src="./img/alert_logo.svg" id='error-esquina' style="display: none;position: absolute;translate: 273px 2px;">
                        <input type="text" name="" id="esquina-cart" style="width: 300px;">
                        <p style="color:red;margin: 0; display:none;" id="esquina-cart-p">Ingresa una esquina</p>
                        
                    </div>
                </div>
            </div>
            <div id='total-carrito' style="margin-top: 50px;">
                <h3>Costos</h3>
                <div id='cartas-total-carrito'>
                    <div>
                        <div>
                            <p>Subtotal</p>
                            <p>Costo unitario del producto por cantidad</p>
                        </div>
                        <div >
                            <p>USD <spam id='subtotal-compras'>costo</spam></p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>Costos de envio</p>
                            <p>segun el tipo de envio</p>
                        </div>
                        <div>
                            <p>USD <spam id='Costos-envio'>costo</spam></p>
                        </div>
                    </div>
                    <div style='border-bottom: 0px;'>
                        <div>
                            <p>Total ($)</p>
                        </div>
                        <div style="color: black;font-weight: 600;">
                            <p>USD <spam id='costo-total'></spam></p>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 50px;">
                <h3> Forma de pago</h3>
                <p>
                    <spam id='seleccion-de-pago'> No ha seleccionado </spam>
                    <a id='seleccionar-pago' style="cursor:pointer; color: #0d6efd;text-decoration: underline;">Seleccionar</a>
                </p>
                <p style="color:red;margin: 0; display:none;" id='seleccion-de-pago-p'> Debe seleccionar una forma de pago </p>
            </div>
            <input type="submit" value="Finalizar compra" class='boton-azul' style="width: 100%;" id='finalizar-compra'>
            <div id='metodos-pago' style="display: none;">
                <div id='div-metodos-pago'>
                    <div style="border-bottom: solid 1px #CFD4DA;padding: 12px 10px;">
                        <h4> Forma de pago</h4>
                    </div>
                    <div style= 'padding: 0px 20px;'>
                        <div>
                            <div style="border-bottom: solid 1px #CFD4DA;padding: 15px 0px;">
                                <input type="radio" name="pago" id="tarjeta-credito" checked>
                                <label for="tarjeta-credito">Tarjeta de credito</label>
                            </div>
                            <div style="display: flex;flex-wrap: wrap;column-gap: 35px;row-gap: 15px;padding-top: 15px;">
                                <div>
                                    <div>
                                        <label for='numero-tarjeta'>Número de tarjeta</label>
                                    </div>
                                    <input type="text" name="" id="numero-tarjeta" style="max-width: 200px;">
                                </div>
                                <div>
                                    <div>
                                        <label for='codigo-seg'>Codigo de seg.</label>
                                    </div>
                                    <input type="text" name="" id="codigo-seg" style="max-width: 120px;">
                                </div>
                                <div>
                                    <div>
                                        <label for='vencimiento'>Vencimiento (MM/AA)</label>
                                    </div>
                                    <input type="text" name="" id="vencimiento" style="max-width: 200px;">
                                </div>
                            </div>
                        </div>
                        <div style="border-bottom: solid 1px #CFD4DA; padding: 15px 0px;">
                            <input type="radio" name="pago" id="transferencia-bancaria">
                            <label for="transferencia-bancaria">Transferencia bancaria</label>
                        </div>
                        <div style="border-bottom: solid 1px #CFD4DA; padding: 15px 0px;">
                            <div>
                                <label for='num-cuenta'>Número de cuenta</label>
                            </div>
                            <input type="text" name="" id="num-cuenta" disabled>
                        </div>
                        <div style="display: flex;justify-content: flex-end;">
                            <input type="submit" value="Cerrar" class='boton-azul' id='cerrar'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id='compra-exitosa' style="display: none;">
        <div style="background-color: #d1e7dd;color: #216346;padding: 20px;border-radius: 5px; width:60%;">
            <p style="margin: 0;">¡Has comprado con éxito!</p>
        </div>
        </div>`;
        
    container.appendChild(encavezado)
    let seleccionDePago = document.getElementById('seleccion-de-pago')
    document.getElementById('15%').addEventListener('click',evaluarTotal)
    document.getElementById('7%').addEventListener('click',evaluarTotal)
    document.getElementById('5%').addEventListener('click',evaluarTotal)
    document.getElementById('tarjeta-credito').addEventListener('click', ()=> {
        document.getElementById('num-cuenta').disabled = true;
        document.getElementById('numero-tarjeta').disabled = false;
        document.getElementById('codigo-seg').disabled = false;
        document.getElementById('vencimiento').disabled = false;  
    });

    document.getElementById('transferencia-bancaria').addEventListener('click', ()=> {
        document.getElementById('num-cuenta').disabled = false;
        document.getElementById('numero-tarjeta').disabled = true;
        document.getElementById('codigo-seg').disabled = true;
        document.getElementById('vencimiento').disabled = true;  
    });

    document.getElementById('seleccionar-pago').addEventListener('click',()=>{
        document.getElementById('metodos-pago').style=`display: flex;`
    });

    document.getElementById('cerrar').addEventListener('click',()=>{
        if(document.getElementById('num-cuenta').disabled == true &&  document.getElementById('numero-tarjeta').value == '' && document.getElementById('codigo-seg').value ==''&& document.getElementById('vencimiento').value == '' ){
            document.getElementById('metodos-pago').style=`display: none;`
            return
        } else if (document.getElementById('num-cuenta').disabled == false && document.getElementById('num-cuenta').value == ''){
            document.getElementById('metodos-pago').style=`display: none;`
            return
        };

        if( document.getElementById('tarjeta-credito').checked){
            seleccionDePago.innerHTML = 'Tarjeta de credito'
        } else if (document.getElementById('transferencia-bancaria').checked){
            seleccionDePago.innerHTML = 'Transferencia bancaria'
        };
        document.getElementById('metodos-pago').style=`display: none;`
    });

    let calleCart = document.getElementById('calle-cart');
    let numeroCart = document.getElementById('numero-cart');
    let esquinaCart = document.getElementById('esquina-cart');
    document.getElementById('finalizar-compra').addEventListener('click', ()=>{
    
        let valorCero = 0;
        for (let i = 0; i < document.querySelectorAll('td > input').length; i++) {
            if (document.querySelectorAll('td > input')[i].value == 0) {
                valorCero = [i]
            };
        };

        if(calleCart.value == '' || numeroCart.value == '' || esquinaCart.value == '' || seleccionDePago.textContent == ' No ha seleccionado ' ||document.querySelectorAll('td > input')[valorCero].value == 0){
           
            if(calleCart.value == ''){
                calleCart.style.border = 'solid red 1px'
                document.getElementById('calle-cart-p').style.display = 'block'
                document.getElementById('error-calle').style.display = 'block'
            } else {                
                calleCart.style.border = 'solid grey 1px'
                document.getElementById('calle-cart-p').style.display = 'none'
                document.getElementById('error-calle').style.display = 'none'
            };

            if (numeroCart.value == ''){
                numeroCart.style.border = 'solid red 1px'
                document.getElementById('numero-cart-p').style.display = 'block'
                document.getElementById('error-numero').style.display = 'block'
            } else {
                numeroCart.style.border = 'solid grey 1px'
                document.getElementById('numero-cart-p').style.display = 'none'
                document.getElementById('error-numero').style.display = 'none'
            };

            if(esquinaCart.value == ''){
                esquinaCart.style.border = 'solid red 1px'
                document.getElementById('esquina-cart-p').style.display = 'block'
                document.getElementById('error-esquina').style.display = 'block'
            } else {
                esquinaCart.style.border = 'solid grey 1px'
                document.getElementById('esquina-cart-p').style.display = 'none'
                document.getElementById('error-esquina').style.display = 'none'
            };

            if (seleccionDePago.textContent == ' No ha seleccionado ') {
                document.getElementById('seleccion-de-pago-p').style.display = 'block'
            }else{
                document.getElementById('seleccion-de-pago-p').style.display = 'none'
            };

        } else { 
            calleCart.style.border = 'solid grey 1px'
            document.getElementById('calle-cart-p').style.display = 'none'
            document.getElementById('error-calle').style.display = 'none'
            numeroCart.style.border = 'solid grey 1px'

            document.getElementById('numero-cart-p').style.display = 'none'
            document.getElementById('error-numero').style.display = 'none'
            esquinaCart.style.border = 'solid grey 1px'

            document.getElementById('esquina-cart-p').style.display = 'none'
            document.getElementById('error-esquina').style.display = 'none'

            document.getElementById('seleccion-de-pago-p').style.display = 'none'

            document.getElementById('compra-exitosa').style = `display: flex;position: fixed;top: 43vh;justify-content: center;width: 100%;`

            setTimeout(function() {document.getElementById('compra-exitosa').style = `display: none;`},5000);
            
        };
    });
};

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
        input.addEventListener('input',()=>{    
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
                    align-items: baseline;
                    font-weight: 600;`
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
    border: solid red 1px;
    background: white;
    margin-left:15px;
    color: white;
    border-radius: 5px; 
    padding: 5px 10px;`
    boton.innerHTML = `<i class="fa-solid fa-trash-can" style='color:red;'></i>`

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
    let subTotal = document.getElementById('subtotal-compras')
    let costosEnvio = document.getElementById('Costos-envio')
    let costoTotal = document.getElementById('costo-total')
    let uno = document.getElementById('15%')
    let dos = document.getElementById('7%')
    let tres = document.getElementById('5%')
    let chekeado = 0;

    let valorTotal = 0 
        for (let i = 0; i < document.getElementsByClassName('p3').length; i++) {  
            if (document.getElementsByClassName('moneda')[i].textContent === 'UYU') {
                valorTotal += parseInt(document.getElementsByClassName('p3')[i].textContent) / 40 // transforma a dolares 'mas o menos'
            } else {
                valorTotal += parseInt(document.getElementsByClassName('p3')[i].textContent)
            };
        };
    
    if (uno.checked){
        chekeado = 15
    } else if (dos.checked) {
        chekeado = 7
    } else if (tres.checked) {
        chekeado = 5
    }


    console.log(valorTotal);
    subTotal.innerHTML = Math.round(valorTotal)
    costosEnvio.innerHTML = Math.round((parseFloat(subTotal.textContent)) * (chekeado/100))
    costoTotal.innerHTML = Math.round(parseFloat(subTotal.textContent) + parseFloat(costosEnvio.textContent))
    console.log(chekeado)

    
};