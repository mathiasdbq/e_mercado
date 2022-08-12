document.addEventListener('DOMContentLoaded', function(){
    const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";



    fetch(PRODUCT_INFO_URL)
    .then(response => response.json())
    .then(data => {
        header()
        product (data)
         })
});

function header(){
    let main = document.getElementById('cont-products');
    
    let headContainer = document.createElement('div');
    headContainer.classList.add('text-center')
    headContainer.classList.add('p-4')


    let titleHead = document.createElement('h2');
    titleHead.textContent = 'Productos';

    let paragraphHead = document.createElement('p');
    paragraphHead.classList.add('lead')
    paragraphHead.textContent = 'Verás aquí todas los productos de la categoría Autos.';

    main.appendChild(headContainer);
    headContainer.appendChild(titleHead);
    headContainer.appendChild(paragraphHead);
}

function product(date){
    for (let i = 0; i <= date.products.length-1; i++) {
    createLetter(date,i);
    }
}

function createLetter (list,number) {
    let container = document.getElementById('cont-products')

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
    img.src = list.products[number].image;
    img.alt = list.products[number].description;

    let titleContainer = document.createElement('div');
    titleContainer.classList.add('col');

    let containerTitle = document.createElement('div');
    containerTitle.classList.add('d-flex');
    containerTitle.classList.add('w-100');
    containerTitle.classList.add('justify-content-between');
 
    let title = document.createElement('h4');
    title.textContent = list.products[number].name;
    title.classList.add('mb-1');

    let cantidad = document.createElement('small');
    cantidad.textContent = list.products[number].soldCount;
    title.classList.add('text-muted');
  
    let description = document.createElement('p');
    description.classList.add('mb-1');
    description.textContent = list.products[number].description;

    container.appendChild(card);
    card.appendChild(content);
    content.appendChild(containerImg);
    containerImg.appendChild(img);
    content.appendChild(titleContainer);
    titleContainer.appendChild(containerTitle);  
    containerTitle.appendChild(title);
    containerTitle.appendChild(cantidad);
    titleContainer.appendChild(description);
}