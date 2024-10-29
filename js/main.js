
const productApiUrl = 'https://fakestoreapi.com/products';

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Función para obtener productos
async function fetchProducts() {
    try {
        const response = await fetch(productApiUrl);
        const products = await response.json();
        displayItems(products, 'product-container');
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

// Función para actualizar la cantidad en el carrito y favoritos
function updateCounts() {
    document.getElementById('cart-count').textContent = cart.length;
    document.getElementById('favorites-count').textContent = favorites.length;
}

// Función para mostrar productos
function displayItems(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');

        const itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemImage.alt = item.title;
        itemCard.appendChild(itemImage);

        const itemTitle = document.createElement('h3');
        itemTitle.textContent = item.title;
        itemCard.appendChild(itemTitle);

        const itemPrice = document.createElement('p');
        itemPrice.classList.add('item-price');
        itemPrice.textContent = `$${item.price.toFixed(2)}`;
        itemCard.appendChild(itemPrice);

        const itemDescription = document.createElement('p');
        itemDescription.textContent = item.description;
        itemCard.appendChild(itemDescription);

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Agregar al carrito';
        addToCartButton.classList.add('btn', 'btn-add-cart');
        addToCartButton.addEventListener('click', () => {
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart)); 
            updateCounts();
        });
        itemCard.appendChild(addToCartButton);

        // Botón de "Favorito" con corazón
        const favoriteButton = document.createElement('button');
        favoriteButton.classList.add('btn', 'btn-favorite');
        favoriteButton.textContent = favorites.some(favItem => favItem.id === item.id) ? '❤️' : '🤍';
        favoriteButton.addEventListener('click', () => {
            if (favorites.some(favItem => favItem.id === item.id)) {
                favorites = favorites.filter(favItem => favItem.id !== item.id);
                favoriteButton.textContent = '🤍'; 
            } else {
                favorites.push(item);
                favoriteButton.textContent = '❤️'; 
            }
            localStorage.setItem('favorites', JSON.stringify(favorites)); 
            updateCounts();
        });
        itemCard.appendChild(favoriteButton);

        container.appendChild(itemCard);
    });
}

fetchProducts();
updateCounts();
