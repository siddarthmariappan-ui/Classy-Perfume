const cartStorageKey = "classyPerfumeCart";

function readCart() {
    try {
        return JSON.parse(localStorage.getItem(cartStorageKey)) || [];
    } catch {
        return [];
    }
}

function writeCart(cart) {
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

function money(value) {
    return `₹${Number(value).toLocaleString("en-IN")}`;
}

function renderCart() {
    const cart = readCart();
    const container = document.getElementById("cart-items");
    const empty = document.getElementById("cart-empty");
    const summary = document.getElementById("cart-summary");

    if (!cart.length) {
        container.innerHTML = "";
        empty.hidden = false;
        summary.hidden = true;
        return;
    }

    empty.hidden = true;
    summary.hidden = false;
    container.innerHTML = cart.map(item => `
        <article class="cart-row">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>${money(item.price)} each</p>
                <div class="quantity-controls">
                    <button data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                    <span>${item.quantity}</span>
                    <button data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
                </div>
                <button class="remove-btn" data-action="remove" data-id="${item.id}">Remove</button>
            </div>
            <strong class="item-price">${money(item.price * item.quantity)}</strong>
        </article>
    `).join("");

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("cart-total").textContent = money(total);
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    document.getElementById("cart-items").addEventListener("click", event => {
        const button = event.target.closest("[data-action]");
        if (!button) return;
        const id = Number(button.dataset.id);
        let cart = readCart();
        const item = cart.find(product => product.id === id);
        if (!item) return;

        if (button.dataset.action === "increase") item.quantity += 1;
        if (button.dataset.action === "decrease") item.quantity -= 1;
        if (button.dataset.action === "remove" || item.quantity <= 0) {
            cart = cart.filter(product => product.id !== id);
        }
        writeCart(cart);
        renderCart();
    });
});
