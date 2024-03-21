//BOTON PARA ELIMINAR UN PRODUCTO DEL CARRITO
document.querySelectorAll('.btnDelete').forEach(button => {
    button.addEventListener('click', async () => {
        const pid = button.getAttribute('data-id');
        const cid = button.getAttribute('data-cid')
        try {
            const response = await fetch(`/api/carts/${cid}/products/${pid}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log('El producto fue eliminado exitosamente');
                window.location.reload();
            } else {
                console.error('No se pudo eliminar el producto');
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    });
});
//BOTON PARA VACIAR CARRITO
const btnCartEmpty = document.getElementById('btnCartEmpty')
btnCartEmpty.addEventListener('click', async () => {
    const cid = btnCartEmpty.getAttribute('data-cid')
    try {
        const response = await fetch(`/api/carts/deleteAllProducts/${cid}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Carrito vaciado exitosamente');
            window.location.reload();
        } else {
            console.error('No se pudo vaciar el carrito');
        }
    } catch (error) {
        console.error('Error al vaciar el carrito:', error);
    }
});
