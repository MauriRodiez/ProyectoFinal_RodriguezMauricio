const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.getElementById('cart-container');
const totalPriceElement = document.getElementById('total-price');
const discountContainer = document.getElementById('discount-container');

let totalPrice = 0;
const hasWomenProducts = cart.some(item => item.category === "women's clothing");

if (cart.length === 0) {
    cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
} else {
    cart.forEach((item, index) => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');
        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>Precio: $${item.price.toFixed(2)}</p>
            <button class="btn btn-favorite" onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartContainer.appendChild(itemCard);
        totalPrice += item.price;
    });
}

totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

if (hasWomenProducts) {
    discountContainer.style.display = 'block';
}

document.getElementById('purchase-button').addEventListener('click', () => {
    // Muestra el mensaje de compra exitosa
    Toastify({
        text: "¡Compra realizada con éxito!",
        duration: 3000, 
        gravity: "top", 
        position: 'right', 
        backgroundColor: "#4CAF50", 
    }).showToast();

    localStorage.removeItem('cart'); 
    setTimeout(() => {
        window.location.href = 'index.html'; 
    }, 3000); 
});

document.getElementById('cancel-button').addEventListener('click', () => {
    localStorage.removeItem('cart'); 
    window.location.reload(); 
});

function removeFromCart(index) {
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    window.location.reload(); 
}
