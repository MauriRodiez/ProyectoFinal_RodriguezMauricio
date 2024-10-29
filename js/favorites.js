const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const favoritesContainer = document.getElementById('favorites-container');

if (favorites.length === 0) {
    favoritesContainer.innerHTML = '<p>No tienes favoritos.</p>';
} else {
    favorites.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');
        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>Precio: $${item.price.toFixed(2)}</p>
            <button class="btn btn-favorite" onclick="toggleFavorite(${item.id})">
                ❤️
            </button>
        `;
        favoritesContainer.appendChild(itemCard);
    });
}

function toggleFavorite(id) {
    const itemIndex = favorites.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        favorites.splice(itemIndex, 1); 
    }
    localStorage.setItem('favorites', JSON.stringify(favorites)); 
    window.location.reload(); 
}
