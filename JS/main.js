let botonesRemover = document.querySelectorAll('.btn-danger');
botonesRemover = [...botonesRemover];

let botenesAgregar = document.querySelectorAll('.shop-item-button');
botenesAgregar = [...botenesAgregar]

botonesRemover.forEach(elementoaEliminar => {
    elementoaEliminar.addEventListener('click', event=>{
        event.target.parentElement.parentElement.remove();
     });
})


let contenedorItems = document.querySelector('.cart-items')

botenesAgregar.forEach(elementosaAgregar => {
    elementosaAgregar.addEventListener('click', ()=>{
        contenedorItems.innerHTML += `
            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="Images/Shirt.png" width="100" height="100">
                    <span class="cart-item-title">T-Shirt</span>
                </div>
                <span class="cart-price cart-column">$1.99</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" min="1" type="number" value="1">
                    <button id="primero" class="btn btn-danger" type="button">REMOVE</button>
                </div>
            </div>
        `
    })
})

// actualizar precio total

let precioTotal = document.querySelector('.cart-total-price')
let inputNumericos = document.querySelectorAll('.cart-quantity-input');
inputNumericos = [...inputNumericos];


let fila = contenedorItems.querySelectorAll('.cart-row');
fila = [...fila]

inputNumericos.forEach(item =>{
    item.addEventListener('click', ()=>{
        
        console.log(fila)
    })
    // item.addEventListener('keydown', ()=>{
    //     console.log('numero cambiado');
    // })
});






// let removeBtn = document.querySelector('#primero')
// removeBtn.addEventListener('click', ()=>{
//     console.log('Eliminado');
// });