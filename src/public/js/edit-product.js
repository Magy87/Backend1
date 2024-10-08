// document.addEventListener('click', async (e) => {
//     if (e.target && e.target.classList.contains("btn-delete")) {
//         const [, id] = e.target.id.split('-')
//         try {
//             await fetch(`/api/products/${id}`, {
//                 method: 'DELETE'
//             })
//         } catch (error) {
//             console.log(error)
//         }

//     }
// })
const deleteButtons = document.querySelectorAll('.btn-delete');

deleteButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        const productId = e.target.dataset.id; // Asume que el botón tiene un data-id con el ID del producto
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Producto eliminado');
                window.location.reload();
            } else {
                const error = await response.json();
                console.error(error);
            }
        } catch (error) {
            console.error('Error eliminando el producto:', error);
        }
    });
});
