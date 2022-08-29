document.addEventListener('DOMContentLoaded', function(){
    const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/cats_products/"+ localStorage.getItem('catID') +".json";

    fetch(PRODUCT_INFO_URL)
    .then(response => response.json())
    .then(data => {
        arrayFilter = data;
        array = data;
        header(data);
        createItemsearch();
        product (array.products);
    });
});
let array;

let headContainer = document.createElement('div');
headContainer.classList.add('text-center')
headContainer.classList.add('p-4')

let container = document.createElement ('div')
container.classList.add('container')
container.id = 'main-products'

let containerProducts = document.createElement ('div')
container.classList.add('container')
container.id = 'container-products'

let mainProducts = document.getElementById('main-products')
mainProducts.appendChild(headContainer);
mainProducts.appendChild(container);


function createItemsearch() {  

 let contentSearch = document.createElement('div')
 container.appendChild(contentSearch);
 contentSearch.innerHTML = `
    <div class="row">
        <div class="col text-end" id="div-head-searchs">
            <div>
            <input type="search" name="searchProducts" id="searchInput"> 
            </div>
            <div class="btn-group btn-group-toggle mb-4" data-bs-toggle="buttons">
                <input type="radio" class="btn-check" name="options" id="sortAsc">
                <label class="btn btn-light" for="sortAsc"><i class="fas fa-sort-amount-down mr-1"></i>$</label>
                <input type="radio" class="btn-check" name="options" id="sortDesc">
                <label class="btn btn-light" for="sortDesc"><i class="fas fa-sort-amount-up mr-1"></i>$</label>
                <input type="radio" class="btn-check" name="options" id="sortByCount" checked="">
                <label class="btn btn-light" for="sortByCount"><i class="fas fa-sort-amount-down mr-1"></i>Rel.</label>
            </div>
        </div>
    </div> 

    <div class="row">
        <div class="col-lg-6 offset-lg-6 col-md-12 mb-1 container">
            <div class="row container p-0 m-0">
                <div class="col">
                <p class="font-weight-normal text-end my-2">Precio</p>
                </div>
                <div class="col">
                <input class="form-control" type="number" placeholder="min." id="rangeFilterCountMin">
                </div>
                <div class="col">
                <input class="form-control" type="number" placeholder="máx." id="rangeFilterCountMax">
                </div>
                <div class="col-3 p-0">
                    <div class="btn-group" role="group">
                        <button class="btn btn-light btn-block" id="rangeFilterCount">Filtrar</button>
                        <button class="btn btn-link btn-sm" id="clearRangeFilter">Limpiar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    let divHeadSearchs = document.getElementById('div-head-searchs');
    divHeadSearchs.style.display = 'flex';
    divHeadSearchs.style.flexDirection = 'row';
    divHeadSearchs.style.justifyContent = 'flex-end';
    divHeadSearchs.style.alignItems = 'baseline';
    divHeadSearchs.style.gap = '15px';
    container.appendChild(containerProducts);
    let newarray = array.products;
    let filterSearch = document.getElementById ('searchInput')
    
    filterSearch.addEventListener('keyup', search);
    function search(){
        newarray = [];
        for (names of arrayFilter.products){
            if (names.name.toLowerCase().includes(filterSearch.value.toLowerCase())){
                 newarray.push(names)
                 product(newarray)
            }
        }
        filtrador ()
    }


    let filterMayorMenor = document.getElementById('sortAsc')
    filterMayorMenor.addEventListener('click', function(){
        newarray.sort(function(a, b){
        if (a.cost < b.cost){ return 1;}
        if (a.cost > b.cost){ return -1;}
        return 0
        });   
        filtrador ()
    });

    let filterMenorMayor = document.getElementById('sortDesc')
    filterMenorMayor.addEventListener('click', function(){
        newarray.sort(function(a, b){
        if (a.cost < b.cost){ return -1;}
        if (a.cost > b.cost){ return 1;}
        return 0
        });
        filtrador ()
    });

    let filterRelevancia = document.getElementById('sortByCount')
    filterRelevancia.addEventListener('click', function(){
        newarray.sort(function(a, b){
        if (a.soldCount < b.soldCount){ return 1;}
        if (a.soldCount > b.soldCount){ return -1;}
        return 0
        });
        filtrador ()
    });

    let filtradorMin = document.getElementById('rangeFilterCountMin')
    let filtradorMax = document.getElementById('rangeFilterCountMax')
    let botonFilter = document.getElementById ('rangeFilterCount')
    let resetBoton = document.getElementById('clearRangeFilter')
    function filtrador (){
        let min;
        if (filtradorMin.value !== '' && filtradorMin.value !== undefined) {
            min = filtradorMin.value;
        } else {
        min = -Infinity;
        };
        let max;
        if (filtradorMax.value !== '' && filtradorMax.value !== undefined) {
            max = filtradorMax.value;
        } else {
            max = Infinity;
        };
        let variableArray = newarray.filter(productos => productos.cost >= min && productos.cost <= max);
        
        product(variableArray)
    };
    botonFilter.addEventListener('click', filtrador)
    
    resetBoton.addEventListener('click', function(){
        filtradorMax.value = '';
        filtradorMin.value = '';
        filterSearch.value = '';
        search()
    });

};





function header(product){
    let titleHead = document.createElement('h2');
    titleHead.textContent = 'Productos';

    let paragraphHead = document.createElement('p');
    paragraphHead.classList.add('lead')
    paragraphHead.textContent = 'Verás aquí todas los productos de la categoría '+ product.catName +'.';

    headContainer.appendChild(titleHead);
    headContainer.appendChild(paragraphHead);
}

function product(date){
    containerProducts.innerHTML = ''
    for (let i = 0; i <= date.length-1; i++) {
    createLetter(date,i);
    }
}

function createLetter (list,number) {

    let card = document.createElement('div');
    card.classList.add('list-group-item');
    card.classList.add('list-group-item-action');
    card.classList.add('cursor-active');

    let content = document.createElement('div');
    content.classList.add('row');
 
    let containerImg = document.createElement('div');
    containerImg.classList.add('col-3');

    let img = document.createElement('img');
    img.classList.add('img-thumbnail');
    img.src = list[number].image;
    img.alt = list[number].description;

    let titleContainer = document.createElement('div');
    titleContainer.classList.add('col');

    let containerTitle = document.createElement('div');
    containerTitle.classList.add('d-flex');
    containerTitle.classList.add('w-100');
    containerTitle.classList.add('justify-content-between');
 
    let title = document.createElement('h4');
    title.textContent = list[number].name +' - ' + list[number].currency + list[number].cost;
    title.classList.add('mb-1');
    title.classList.add('title-products')

    let cantidad = document.createElement('small');
    cantidad.textContent = list[number].soldCount + ' ' + 'vendidos';
    cantidad.classList.add('text-muted');
  
    let description = document.createElement('p');
    description.classList.add('mb-1');
    description.textContent = list[number].description;

    containerProducts.appendChild(card);
    card.appendChild(content);
    content.appendChild(containerImg);
    containerImg.appendChild(img);
    content.appendChild(titleContainer);
    titleContainer.appendChild(containerTitle);  
    containerTitle.appendChild(title);
    containerTitle.appendChild(cantidad);
    titleContainer.appendChild(description);
}