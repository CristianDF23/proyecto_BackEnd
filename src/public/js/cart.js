document.querySelectorAll('.btnDelete').forEach(button => {
    button.addEventListener('click', async () => {
        const id = button.getAttribute('data-id');
        try {
            const response = await fetch(`/api/carts/65d2b4a56d5497649e2a2284/product/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log('El recurso fue eliminado exitosamente');
            } else {
                console.error('No se pudo eliminar el recurso:');
            }
        } catch (error) {
            // Manejar errores de red u otros errores
            console.error('Error al eliminar el recurso:', error);
        }
    });
});