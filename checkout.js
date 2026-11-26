const checkoutCartKey = "classyPerfumeCart";

function checkoutReadCart() {
    try {
        return JSON.parse(localStorage.getItem(checkoutCartKey)) || [];
    } catch {
        return [];
    }
}

function checkoutMoney(value) {
    return `₹${Number(value).toLocaleString("en-IN")}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const cart = checkoutReadCart();
    const form = document.getElementById("checkout-form");
    const content = document.getElementById("checkout-content");

    if (!cart.length) {
        content.innerHTML = `<section class="checkout-card"><h2>Your cart is empty</h2><p>Please add a perfume before checkout.</p><br><a class="gold-button" href="index.html#products">Explore Perfumes</a></section>`;
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("checkout-items").innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} × ${item.quantity}</span>
            <strong>${checkoutMoney(item.price * item.quantity)}</strong>
        </div>
    `).join("");
    document.getElementById("checkout-total").textContent = checkoutMoney(total);

    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const formData = new FormData(form);
        const orderNumber = `CP${Date.now().toString().slice(-7)}`;
        document.getElementById("success-message").textContent =
            `Order ${orderNumber} has been recorded as a demo order for ${formData.get("name")}. Payment method: ${formData.get("payment")}. No payment was processed.`;
        localStorage.removeItem(checkoutCartKey);
        content.hidden = true;
        document.getElementById("order-success").hidden = false;
    });
});
