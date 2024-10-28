let cart = JSON.parse(localStorage.getItem('cart')) || [];
const iva = 0.22;

document.addEventListener("DOMContentLoaded", () => {
    renderProductList(products);  // Llama la función con el parámetro "products"
    renderCart();
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        const productId = parseInt(document.getElementById('product-select').value);
        const quantity = parseInt(document.getElementById('quantity-input').value);
        addToCart(productId, quantity);
    });
    document.getElementById('finalize-btn').addEventListener('click', finalizePurchase);
    setUpModalEvents();  // Inicializa eventos del modal
});

// Renderiza la lista de productos
function renderProductList(products) {
    const productList = document.getElementById('product-list');
    const productSelect = document.getElementById('product-select');
    productList.innerHTML = '';
    productSelect.innerHTML = '';

    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price}`;
        productList.appendChild(li);

        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} - $${product.price}`;
        productSelect.appendChild(option);
    });
}

// Agrega productos al carrito
function addToCart(productId, quantity) {
    if (!productId || quantity <= 0) {
        showModal("Por favor, selecciona un producto y una cantidad válida.");
        return;
    }

    const selectedProduct = products.find(product => product.id === productId);
    const productInCart = cart.find(item => item.id === selectedProduct.id);

    if (productInCart) {
        productInCart.quantity += quantity;
    } else {
        cart.push({ ...selectedProduct, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Renderiza el carrito en el DOM
function renderCart() {
    const cartList = document.getElementById('cart-list');
    const totalElement = document.getElementById('total');
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.textContent = "El carrito está vacío.";
        totalElement.textContent = '0.00';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - Cantidad: ${item.quantity}, Precio: $${(item.price * item.quantity).toFixed(2)}`;
        cartList.appendChild(li);
        total += item.price * item.quantity;
    });

    const totalWithTax = total * (1 + iva);
    totalElement.textContent = totalWithTax.toFixed(2);
}

// Finaliza la compra
function finalizePurchase() {
    if (cart.length === 0) {
        showModal("El carrito está vacío.");
        return;
    }

    let cartDetails = cart.map(item => `${item.name} - Cantidad: ${item.quantity}, Precio: $${(item.price * item.quantity).toFixed(2)}`).join('\n');
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalWithTax = total * (1 + iva);

    showModal(`Productos seleccionados:\n${cartDetails}\n\nTotal con IVA: $${totalWithTax.toFixed(2)}\n\n¿Deseas confirmar la compra?`, true);
}

// Muestra el modal personalizado
function showModal(message, isConfirm = false) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const confirmBtn = document.getElementById('modal-confirm');

    modalMessage.textContent = message;
    modal.classList.remove('hidden');

    if (isConfirm) {
        confirmBtn.classList.remove('hidden');
    } else {
        confirmBtn.classList.add('hidden');
    }
}

// Configura los eventos del modal
function setUpModalEvents() {
    const modal = document.getElementById('modal');
    const confirmBtn = document.getElementById('modal-confirm');
    const cancelBtn = document.getElementById('modal-cancel');

    cancelBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    confirmBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        cart = [];
        localStorage.removeItem('cart');
        renderCart();
        showNotification("¡Gracias! Tu compra se ha realizado correctamente.");
    });
}

// Función para mostrar la notificación
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.remove('hidden');
    notification.classList.add('show');

    // Oculta la notificación después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hidden');
    }, 3000);
}
