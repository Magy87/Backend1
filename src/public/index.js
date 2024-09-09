
const socket = io();
const realTimeProducts = document.getElementById("realTimeProducts");

socket.emit('products');

socket.on("products", (data) => {
    realTimeProducts.innerHTML = "";

    data.forEach(item => {
        const element = document.createElement("div");
        element.classList.add('product-card');
        element.innerHTML = `
            <h3 class="product-title">${item.title}</h3>
            <div class="product-details">
                <span class="product-price">$${item.price}</span>
                <span class="product-stock">Stock: ${item.stock}</span>
            </div>
            <button id="${item.id}" class="buy-button deleteItem">Eliminar</button>
        `;
        realTimeProducts.appendChild(element);
    });
});

const formCreateProduct = document.getElementById("formCreateProduct")

formCreateProduct.addEventListener("submit", async (e) => {
    e.preventDefault()
    const title = document.getElementById("title").value
    const price = document.getElementById("price").value
    const stock = document.getElementById("stock").value
    const code = document.getElementById("code").value
    const product = {
        title,
        price,
        stock,
        code
    }
    await fetch('http:/localhost:8080/api/products', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    socket.emit('products')
    formCreateProduct.reset()
})

document.addEventListener('click', async function(event){
    if (event.target && event.target.classList.contains('deletItem')){
        const id= event.target.id
        try{
            await fetch ('http://localhost:8080/api/products/${id}',{
                method : 'DELETE',
                headers:{
                    'Content-type': 'application/json'
                },
            })
            socket.emit('products')
        }catch(error){
                console.error('Error de conexion:', error)
            }
        }
    })

