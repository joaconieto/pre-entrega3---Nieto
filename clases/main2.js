import {ShopItem} from './clases.js';

window.onload = () => {
    console.log('pagina recargada')
};

let shopItemsArray = []; // productos disponible para comprar
let shoppingcart = []; // Carro de compras
let total = 0; // Valor total de la factura

// Crear los objetos disponibles en la tienda
// let shopItems = document.querySelectorAll('.shop-item');
// shopItems = [...shopItems];

// shopItems.forEach((shopItem, index)=>{
//     let description = shopItem.childNodes[1].innerText;
//     let img = shopItem.childNodes[3].src.substring(21);
//     let price = parseFloat(shopItem.childNodes[5].childNodes[1].innerText.substring(1));

//     // Creo un arreglo con todos los productos disponibles para comprar. A partir de la clase.
//     let products = new ShopItem(index, img, description, price, 1)    
//     shopItemsArray.push(products)
    
// })

// let json = JSON.stringify(shopItemsArray)
// console.log(json);

console.log("Hola2")

// consumir objetos a partir de JSON
fetch('http://127.0.0.1:5500/clases/datos.json')

// fetch('https://api.escuelajs.co/api/v1/products')
.then(data => data.text())
.then(json => {
    
    shopItemsArray = JSON.parse(json)
    console.log(shopItemsArray)

    //Agregar quantity a los objetos
    shopItemsArray.forEach(item =>{
        item.quantity = 1;
    })
    console.log(shopItemsArray)



    //selecciono la tienda
    let store = document.querySelector('.shop-items');
    
    for(let i = 0; i<=3; i++){
        store.innerHTML += `
        <div class="shop-item">
            <span class="shop-item-title">${shopItemsArray[i].title}</span>
            <img class="shop-item-image" src="${shopItemsArray[i].images[0]}">
            <div class="shop-item-details">
                <span class="shop-item-price">$${shopItemsArray[i].price}</span>
                <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
            </div>
        </div>`
    }

    // Selecciono el carro de compras
    let cart = document.querySelector('.cart-items');

    /*--------------------------Agregar productos al carro--------------------------*/
    let addBtn = document.querySelectorAll('.shop-item-button');
    addBtn = [...addBtn];

    addBtn.forEach((singleAddBtn, index) => {
        singleAddBtn.addEventListener('click', event=>{  
            
            // consulto si el item existe para aumentar su cantidad
            console.log(shoppingcart)
            let itemRepeated = shoppingcart.find(item => item.id == index)
            console.log(itemRepeated);
            if (itemRepeated != undefined){
                itemRepeated.quantity += 1;
                console.log('click')
            }else{
                // agrego el elemento al carro en caso de que no exista
                shoppingcart.push(shopItemsArray[index]);
            }
            console.log(shoppingcart)
            total = getTotal()
            drawItems()
        })
    } )

    // Dibujo los articulos dentro del carro
    function drawItems(){
        cart.innerHTML = '';
        shoppingcart.forEach(cartItem =>{
            cart.innerHTML += `
            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${cartItem.images[0]}" width="100" height="100">
                    <span class="cart-item-title">${cartItem.title}</span>
                </div>
                <span class="cart-price cart-column">$${cartItem.price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" min="1" type="number" value="${cartItem.quantity}">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>
            </div>
            `
        })

        /*---------------Imprimir total en pantalla------------- */
        let totalContainer = document.querySelector('.cart-total-price');
        
        totalContainer.innerText = `$${total}`;
        updateNumberOfItems()
        removeItems()
    }


    /*--------------------------Remover productos del carro--------------------------*/
    function removeItems(){
        let removeItemsCartButtons = document.getElementsByClassName('btn-danger');
        removeItemsCartButtons = [...removeItemsCartButtons]

        removeItemsCartButtons.forEach(element => {
            element.addEventListener('click', (event)=>{ 
                // conseguir el ID del objeto dentro del arreglo
                let itemName = event.target.parentElement.parentElement.childNodes[1].innerText;
                let actualObject = shoppingcart.find(item => item.title == itemName);
                actualObject.quantity = 1;
                let actualIndex = shoppingcart.findIndex(item => item == actualObject);
                // remover el objeto del arreglo shopppingcart
                shoppingcart.splice(actualIndex,1)
                // Dibujar
                total = getTotal()
                drawItems()
            }); 
        });
    }

    /*--------------Obtener valor total -------------*/
    function getTotal(){
        let sumTotal = 0;
        return shoppingcart.reduce((sum, item)=>{
            sumTotal = sum + item.price*item.quantity;
            sumTotal = parseFloat(sumTotal.toFixed(2));
            return sumTotal;
        },0)
    }

    // Actualizar numero de items
    function updateNumberOfItems(){
        
        let numericInputs = document.querySelectorAll('.cart-quantity-input');
        numericInputs = [...numericInputs]
        numericInputs.forEach(item => {
            item.addEventListener('click', event => {
                //conseguir el id del producto
                let productDescription = event.target.parentElement.parentElement.childNodes[1].innerText;
                let productWithId =  shopItemsArray.find(item => item.title == productDescription)
                
                //actualizar el objeto item
                productWithId.quantity = parseInt(event.target.value)

                //actualizar el precio total
                total = getTotal()

                //dibujar
                drawItems()
            });
        })
    }
});
