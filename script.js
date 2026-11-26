const perfumes = [
    { id: 1, name: "Bella Vita Luxury 4 X 20 ML", brand: "Bella Vita", description: "Men Gift Set | Best Perfume for Man | Long Lasting EDP", price: 599, category: ["Men", "Casual", "Premium"], image: "https://bellavitaorganic.com/cdn/shop/files/front_2.jpg?v=1736851564&width=1000" },
    { id: 2, name: "Pheromo Hypnosis 3.0", brand: "Pheromo", description: "Luxury Cologne Fragrance For Men | Original New Formulation | 50ml", price: 1499, category: ["Men", "Party"], image: "https://p16-oec-general-useast8.ttcdn-us.com/tos-useast8-i-rt0ujvrtvp-tx2/49d147d155754a6b9c7c80246d70bc88~tplv-fhlh96nyum-crop-webp%3A2000%3A2000.webp?dr=12190&from=2378011839&idc=useast5&ps=933b5bde&shcp=e1be8f53&shp=8dbd94bf&t=555f072d" },
    { id: 3, name: "Beardo Godfather 100ml", brand: "Beardo", description: "Aromatic, Spicy Perfume For Men | Long Lasting Fragrance", price: 1399, category: ["Men", "Party"], image: "https://beardo.in/cdn/shop/files/Beardo_Godfather_EDP_A__Banner_2160_x_2160_02.jpg?v=1776097673" },
    { id: 4, name: "Wild Stone Edge", brand: "Wild Stone", description: "Fresh aquatic fragrance for confident everyday wear", price: 499, category: ["Men", "Work", "Casual"], image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80" },
    { id: 5, name: "Fogg Impressio", brand: "Fogg", description: "Long-lasting fragrance for daily use", price: 399, category: ["Men", "Work", "Casual"], image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80" },
    { id: 6, name: "Skinn by Titan Raw", brand: "Skinn", description: "Crisp and refreshing fragrance for modern occasions", price: 1895, category: ["Men", "Work", "Wedding"], image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80" },
    { id: 7, name: "Yardley English Rose", brand: "Yardley", description: "Elegant floral fragrance for women", price: 650, category: ["Women", "Casual", "Work"], image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=700&q=80" },
    { id: 8, name: "Engage L'amante", brand: "Engage", description: "A playful fragrance for parties and special moments", price: 599, category: ["Women", "Party"], image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=700&q=80" },
    { id: 9, name: "Ajmal Wisal", brand: "Ajmal", description: "A rich floral fragrance for celebrations", price: 2499, category: ["Women", "Wedding", "Premium"], image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80" },
    { id: 10, name: "Calvin Klein CK One", brand: "Calvin Klein", description: "Clean unisex fragrance for day and night", price: 3299, category: ["Unisex", "Work", "Casual"], image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80" },
    { id: 11, name: "Davidoff Cool Water", brand: "Davidoff", description: "Fresh aquatic scent for everyday confidence", price: 2799, category: ["Unisex", "Work", "Casual"], image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80" },
    { id: 12, name: "Versace Bright Crystal", brand: "Versace", description: "Bright floral fragrance for elegant occasions", price: 5999, category: ["Women", "Party", "Wedding", "Premium"], image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=700&q=80" },
    { id: 13, name: "Armaf Club De Nuit", brand: "Armaf", description: "Bold signature scent for evening wear", price: 3499, category: ["Men", "Party", "Wedding", "Premium"], image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=700&q=80" }
];

const cartKey = "classyPerfumeCart";

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(cartKey)) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = getCart().reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll("#nav-cart-count").forEach(element => {
        element.textContent = count;
    });
}

function renderProducts(category = "All", searchTerm = "") {
    const list = document.getElementById("product-list");
    if (!list) return;

    const filtered = perfumes.filter(perfume => {
        const matchesCategory = category === "All" || perfume.category.includes(category);
        const text = `${perfume.name} ${perfume.brand} ${perfume.description}`.toLowerCase();
        return matchesCategory && text.includes(searchTerm.toLowerCase());
    });

    list.innerHTML = filtered.map(perfume => `
        <article class="box">
            <img src="${perfume.image}" alt="${perfume.name}" loading="lazy">
            <h3>${perfume.name}</h3>
            <p>${perfume.description}</p>
            <h3 class="price">₹${perfume.price.toLocaleString("en-IN")}</h3>
            <button class="cart-btn" data-add="${perfume.id}">Add to Cart</button>
        </article>
    `).join("");

    const emptyMessage = document.getElementById("no-products");
    if (emptyMessage) emptyMessage.hidden = filtered.length !== 0;
}

function addToCart(id) {
    const product = perfumes.find(item => item.id === Number(id));
    if (!product) return;

    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    const button = document.querySelector(`[data-add="${id}"]`);
    if (button) {
        button.textContent = "Added ✓";
        setTimeout(() => button.textContent = "Add to Cart", 1000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    const intro = document.getElementById("intro-screen");
    if (intro && !sessionStorage.getItem("classyIntroShown")) {
        sessionStorage.setItem("classyIntroShown", "yes");
        window.setTimeout(() => intro.classList.add("hide"), 2600);
        window.setTimeout(() => intro.remove(), 3600);
    } else if (intro) {
        intro.remove();
    }

    const menuButton = document.getElementById("menu-toggle");
    const menu = document.getElementById("nav-menu");
    if (menuButton && menu) {
        menuButton.addEventListener("click", () => {
            const isOpen = menu.classList.toggle("open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
        });
        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    if (document.getElementById("product-list")) {
        let activeCategory = "All";
        renderProducts();

        document.getElementById("product-list").addEventListener("click", event => {
            const button = event.target.closest("[data-add]");
            if (button) addToCart(button.dataset.add);
        });

        document.getElementById("product-search").addEventListener("input", event => {
            renderProducts(activeCategory, event.target.value.trim());
        });

        document.getElementById("category-list").addEventListener("click", event => {
            const button = event.target.closest("[data-category]");
            if (!button) return;
            activeCategory = button.dataset.category;
            document.querySelectorAll(".category-btn").forEach(item => item.classList.remove("active"));
            button.classList.add("active");
            renderProducts(activeCategory, document.getElementById("product-search").value.trim());
        });
    }
});
