const updateForm = document.getElementById('update-product-form');

updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(updateForm);
    const id = formData.get('id');

    try {
        const response = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert('Producto actualizado con éxito');
            window.location.href = '/';  // Redirige al usuario a la página de productos
        } else {
            console.error(data);
            alert('Error actualizando el producto');
        }
    } catch (error) {
        console.error(error);
        alert('Error de conexión al actualizar el producto');
    }
});
