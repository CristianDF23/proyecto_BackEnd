//BOTON PARA ELIMINAR UN PRODUCTO DEL CARRITO
document.querySelectorAll('.btnDelete').forEach(button => {
    button.addEventListener('click', async () => {
        const pid = button.getAttribute('data-id');
        try {
            const response = await fetch(`/api/carts/65dbceb484d330ff7b488911/products/${pid}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log('El producto fue eliminado exitosamente');
                window.location.reload();
            } else {
                console.error('No se pudo eliminar el producto');
            }
        } catch (error) {
            // Manejar errores de red u otros errores
            console.error('Error al eliminar el producto:', error);
        }
    });
});
//BOTON PARA VACIAR CARRITO
const btnCartEmpty = document.getElementById('btnCartEmpty')
btnCartEmpty.addEventListener('click', async () => {
    try {
        const response = await fetch(`/api/carts/deleteAllProducts/65dbceb484d330ff7b488911`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Carrito vaciado exitosamente');
            window.location.reload();
        } else {
            console.error('No se pudo eliminar vaciar el carrito');
        }
    } catch (error) {
        // Manejar errores de red u otros errores
        console.error('Error al vaciar el carrito:', error);
    }
});
