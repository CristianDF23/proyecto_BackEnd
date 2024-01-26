const socket = io()

socket.on('allProds', (data) => {
    render(data)
})

const allProducts = (data) => {
    const prods = data.map(elem => {
        return (
            `
            <div class="container mt-5 d-flex gap-5 flex-wrap">
                <div class="card rounded-0" style="width: 18rem;">
                    <img src= ${elem.thumbnail} class="card-img-top" alt=>
                    <div class="card-body">
                        h5 class="card-title">${elem.title}</h5>
                        <p class="card-text">${elem.description}</p>
                        <p class="card-text">${elem.price}</p>
                        <a href="#" class="btn bg-danger text-white rounded-0 fs-6">Ver Producto</a>
                    </div>
                </div>
            </div>
            `
        )
    })
    document.getElementById("containerProds").innerHTML = prods
}
