const socket = io();

socket.on('updateProducts', (products) => {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpiar la lista

    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - ${product.price}`;
        productList.appendChild(li);
    });
});

document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const product = {
        title: document.getElementById('productTitle').value,
        description: document.getElementById('productDescription').value,
        code: document.getElementById('productCode').value,
        price: document.getElementById('productPrice').value,
        stock: document.getElementById('productStock').value,
        category: document.getElementById('productCategory').value,
    };

    socket.emit('newProduct', product);

    // Limpiar formulario
    document.getElementById('productTitle').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productCode').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productStock').value = '';
    document.getElementById('productCategory').value = '';
});
