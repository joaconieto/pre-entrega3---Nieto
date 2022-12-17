let cart; /* Todos los articulos de los carros */

function getTotalItems(){
    return cart = document.querySelector('.cart-items');
}

/*----------------Remover articulos------------------------- */

updateCartTotal()
let removeItemsCartButtons = cart.getElementsByClassName('btn-danger');
removeItemsCartButtons = [...removeItemsCartButtons]
removeItemsCartButtons.forEach(element => {
    element.addEventListener('click', (event)=>{
        let buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateNumberOfElements()
        console.log(updateCartTotal())
    }); 
});


function updateNumberOfElements(){
    
    numericInputs = document.querySelectorAll('.cart-quantity-input');
    numericInputs = [...numericInputs]

    /*-------------------------Doble Remover articulos---------------- */
    removeItemsCartButtons = document.getElementsByClassName('btn-danger');
    removeItemsCartButtons = [...removeItemsCartButtons]
    removeItemsCartButtons.forEach(element => {
        element.addEventListener('click', (event)=>{
            let buttonClicked = event.target;
            buttonClicked.parentElement.parentElement.remove();
            updateNumberOfElements()
            updateCartTotal()
            console.log(updateCartTotal())
        }); 
    });

    /*---Actualizar numero de items cuando se presiona el input numerico-------*/
    numericInputs.forEach(item => {
        item.addEventListener('click', event => {
            // updateNumberOfElements()
            updateCartTotal()
        });
        item.addEventListener('keydown', event => {
            // updateNumberOfElements()
            updateCartTotal()
        });
    })
    
}


function updateCartTotal(){
    cart = getTotalItems();
    let listaActualizada = cart.getElementsByClassName('cart-row');
    listaActualizada = [...listaActualizada]
 

    let total = 0;
    let todosLosArticulos = [];
    listaActualizada.forEach((item, index) => {
            // if (index != 0){
                let precio = parseFloat(item.childNodes[3].innerText.substring(1));
                let cant = parseFloat(item.childNodes[5].childNodes[1].value);
                total = precio*cant + total;
                total = parseFloat(total.toFixed(2));

                //Actualico el arreglo todosLosArticulos con todos los nombres
                let names = (item.childNodes[1].childNodes[3].innerText)
                todosLosArticulos.push(names)

            // }
    })

    /*---------------Imprimir total en pantalla------------- */
    let totalContainer = document.querySelector('.cart-total-price');
    
    totalContainer .innerText = `$${total}`;
    return todosLosArticulos;
}

/*---------------------------Actualizar numero de items----------------------------------*/
let numericInputs = document.querySelectorAll('.cart-quantity-input');
numericInputs = [...numericInputs]
numericInputs.forEach(item => {
    item.addEventListener('click', event => {
        // updateNumberOfElements()
        updateCartTotal()
    });
    item.addEventListener('keydown', event => {
        // updateNumberOfElements()
        updateCartTotal()
    });
})



/*--------------------------Agregar productos al carro--------------------------*/
let addBtn = document.querySelectorAll('.shop-item-button');
addBtn = [...addBtn];

addBtn.forEach(singleAddBtn => {
    singleAddBtn.addEventListener('click', event=>{
        
        let priceItem = parseFloat(event.target.parentElement.childNodes[1].innerText.substring(1));
        let imgItem = event.target.parentElement.parentElement.childNodes[3].src;
        let nameItem = event.target.parentElement.parentElement.childNodes[1].innerText;
        
        //Verificar si el item se encuentra en el carro de compras
        // let todosLosArticulos = updateCartTotal()
        // console.log(updateCartTotal())
        // console.log(todosLosArticulos)
        
        cart.innerHTML += `
        <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imgItem}" width="100" height="100">
                <span class="cart-item-title">${nameItem}</span>
            </div>
            <span class="cart-price cart-column">$${priceItem}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" min="1" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        </div>
        `
        // updateNumberOfElements()
        updateCartTotal()
        cart = getTotalItems();
    })
} )
