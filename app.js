// Mock Products Data
const products = [
    { id: 1, name: "Quantum Mechanical Keyboard", price: 189.00, category: "Peripherals", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop" },
    { id: 2, name: "Apex Wireless Gaming Mouse", price: 129.00, category: "Peripherals", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop" },
    { id: 3, name: "NeuralSound ANC Headset", price: 299.00, category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop" }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartDrawer = document.getElementById('cart-drawer');
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const checkoutTriggerBtn = document.getElementById('checkout-trigger-btn');

const checkoutModal = document.getElementById('checkout-modal');
const checkoutCloseBtn = document.getElementById('checkout-close-btn');
const checkoutOverlay = document.getElementById('checkout-overlay');
const checkoutTotalBtnText = document.getElementById('checkout-total-btn-text');
const checkoutForm = document.getElementById('checkout-form');

// Render Products
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-indigo-500/50 transition-all duration-300 flex flex-col">
            <div class="relative overflow-hidden aspect-video bg-slate-950">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <span class="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded text-indigo-400">
                    ${product.category}
                </span>
            </div>
            <div class="p-5 flex flex-col flex-grow justify-between">
                <div class="mb-4">
                    <h3 class="font-bold text-lg text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">${product.name}</h3>
                    <p class="text-xl font-mono font-bold mt-1 text-slate-200">$${product.price.toFixed(2)}</p>
                </div>
                <button onclick="addToCart(${product.id})" class="w-full bg-slate-950 hover:bg-indigo-600 border border-slate-800 hover:border-indigo-500 text-slate-300 hover:text-white py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                    <i class="fa-solid fa-plus text-xs"></i> Add To Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Cart Actions
window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    openCart();
};

function updateCart() {
    // Total Count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    // Subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    checkoutTotalBtnText.textContent = `$${subtotal.toFixed(2)}`;

    // Enable/Disable Checkout Button
    checkoutTriggerBtn.disabled = cart.length === 0;

    // Render Cart Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-12 text-slate-500 font-mono text-sm">
                <i class="fa-solid fa-box-open text-3xl mb-2 block text-slate-700"></i>
                Your cart is empty.
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="flex items-center gap-4 bg-slate-950/50 p-3 rounded-lg border border-slate-800/60">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded bg-slate-900">
                <div class="flex-grow min-w-0">
                    <h4 class="text-sm font-medium text-slate-200 truncate">${item.name}</h4>
                    <p class="text-xs font-mono text-slate-400 mt-0.5">${item.quantity} × $${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-slate-500 hover:text-rose-400 p-1.5 transition-colors">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        `).join('');
    }
}

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
};

// Drawer/Modal Toggles
function openCart() { cartDrawer.classList.remove('translate-x-full'); }
function closeCart() { cartDrawer.classList.add('translate-x-full'); }
function openCheckout() { closeCart(); checkoutModal.classList.remove('hidden'); }
function closeCheckout() { checkoutModal.classList.add('hidden'); }

cartToggleBtn.addEventListener('click', openCart);
cartCloseBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
checkoutTriggerBtn.addEventListener('click', openCheckout);
checkoutCloseBtn.addEventListener('click', closeCheckout);
checkoutOverlay.addEventListener('click', closeCheckout);

// Handle Submit
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order simulated successfully! Thank you for testing NextGen Store.');
    cart = [];
    updateCart();
    closeCheckout();
});

// Initial Load
renderProducts();
updateCart();