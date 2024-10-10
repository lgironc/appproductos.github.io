class Product{
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('Lista-productos');
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="card text-center mb-4">
            <div class ="card-body">
                <strong>Nombre del Producto</strong>: ${product.name}
                <strong>Precio del Producto </strong>: ${product.price}
                <strong>Año del Producto </strong>: ${product.year}
                <a href="#" class="btn btn-danger" name="delete">
                Delete
                </a>
            </div>
        </div>
        `;
        productList.appendChild(element);
        this.resetForm();
    }

    resetForm(){
        document.getElementById('formulario-productos').reset();

    }
    deleteProduct(element) {
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado correctamente', 'info');
        }
    }

    showMessage (message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;  
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const app= document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 2000);
    }
}

//Eventos

document.getElementById('formulario-productos')
    .addEventListener('submit', function (e) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const product = new Product (name, price, year);

    const ui = new UI();

    if(name=== '' || price === '' || year === ''){
        return ui.showMessage('Complete campos faltantes', 'danger')
    }
    ui.addProduct(product);
    ui.showMessage('Producto agregado correctamente', 'success');

    e.preventDefault();
});

document.getElementById('Lista-productos').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteProduct(e.target);
});
