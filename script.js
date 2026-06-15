/**
 * SAVEAN - Core Modular Application Script Engine
 * Includes Native client-side SPA Architecture routing engine, product catalogs,
 * stateful filters, responsive layout events, dynamic interactive views, cart/wishlist stores.
 */

// --- Complete Realistic Base Catalog Data Store ---
const PRODUCTS_DATABASE = [
    { id: 1, name: "Premium Boxy Heavyweight Tee", category: "T-shirts", price: 28.00, rating: 4.8, isNew: true, isBest: true, img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80", tag: "Essential", desc: "A premium 300GSM custom luxury weave cut to a perfect boxy shape. Structured neckline built to retain form through intense cycles." },
    { id: 2, name: "Minimalist Loopback Hoodie", category: "Hoodies", price: 58.00, rating: 4.9, isNew: true, isBest: true, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80", tag: "Luxury", desc: "Crafted from 100% organic cotton loopback French terry. Designed with drop-shoulder aesthetics, double-lined hood structure and side slit pockets." },
    { id: 3, name: "Oversized Pitch Stadium Jersey", category: "Jerseys", price: 45.00, rating: 4.5, isNew: true, isBest: false, img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80", tag: "Streetwear", desc: "Vintage-inspired pitch sportswear featuring structural breathable mesh paneled contours and clean SAVEAN graphic embroidery." },
    { id: 4, name: "Nylon Utility Cargo Shorts", category: "Shorts", price: 38.00, rating: 4.4, isNew: false, isBest: true, img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80", tag: "Cargo", desc: "Water-resistant matte nylon weave shorts. Fitted with adjustable internal drawstrings, metal-capped toggles and secure zippered cargo chambers." },
    { id: 5, name: "Distressed Baseball Dad Cap", category: "Caps", price: 22.00, rating: 4.7, isNew: false, isBest: false, img: "https://images.unsplash.com/photo-1534215754734-18e55d13ce35?auto=format&fit=crop&w=600&q=80", tag: "Vintage", desc: "100% washed chino twill unstructured profile. Finished with subtle edge abrasions and adjustable structural metal slide clasp." },
    { id: 6, name: "Metal Clasp Technical Belt", category: "Accessories", price: 18.00, rating: 4.2, isNew: true, isBest: false, img: "https://images.unsplash.com/photo-1624222247344-550fb8ef5522?auto=format&fit=crop&w=600&q=80", tag: "Hardware", desc: "Heavy duty woven military grade webbing. Fitted with an industrial quick-release matte black zinc alloy cobra buckle clip matrix." },
    { id: 7, name: "Graphic Archetype Luxury Tee", category: "T-shirts", price: 32.00, rating: 4.6, isNew: false, isBest: true, img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=80", tag: "Graphic", desc: "Midweight premium combed cotton featuring high-density typography print layout execution capturing original brand ethos parameters." },
    { id: 8, name: "Acid Wash Street Slouch Hoodie", category: "Hoodies", price: 62.00, rating: 4.9, isNew: true, isBest: true, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80", tag: "Limited", desc: "Individually dyed heavy silhouette creating variations across every single produced build element. Premium luxury comfort feel matrix." }
];

// --- Persistent Reactive State Engine Variables ---
let cartState = JSON.parse(localStorage.getItem('savean_cart')) || [];
let wishlistState = JSON.parse(localStorage.getItem('savean_wishlist')) || [];
let activeCategoryFilter = "all";
let activePriceFilter = "all";
let activeSortOption = "default";
let shopCurrentPage = 1;
const itemsPerPage = 4;

// --- App Core Startup System Bootloader ---
document.addEventListener("DOMContentLoaded", () => {
    setupFrameworkNavigation();
    setupThemeToggleManager();
    initializeInterfaceComponents();
    synchronizeStateBadges();
    executeRouterPath(window.location.hash || '#home');
    
    // Simulate Smooth Performance Hide Loading Veil
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('fade-out');
    }, 450);
});

// --- Dynamic SPA View Engine Routing System ---
window.addEventListener("hashchange", () => {
    const targetHash = window.location.hash || '#home';
    executeRouterPath(targetHash);
});

function executeRouterPath(hash) {
    // Clear Contextual Focus States
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    
    // Extract base state query structures if args exist
    const baseHash = hash.split('?')[0] || '#home';
    
    // Route View Selection Matrix Mapping System
    let viewId = "view-home";
    if (baseHash === "#shop") viewId = "view-shop";
    else if (baseHash === "#product-details") viewId = "view-product-details";
    else if (baseHash === "#categories") viewId = "view-categories";
    else if (baseHash === "#cart") viewId = "view-cart";
    else if (baseHash === "#wishlist") viewId = "view-wishlist";
    else if (baseHash === "#login") viewId = "view-login";
    else if (baseHash === "#register") viewId = "view-register";
    else if (baseHash === "#profile") viewId = "view-profile";
    else if (baseHash === "#order-history") viewId = "view-order-history";
    else if (baseHash === "#contact") viewId = "view-contact";
    else if (baseHash === "#about") viewId = "view-about";
    else if (baseHash === "#faq") viewId = "view-faq";
    else if (baseHash === "#privacy") viewId = "view-privacy";
    else if (baseHash === "#terms") viewId = "view-terms";

    const targetView = document.getElementById(viewId);
    if (targetView) targetView.classList.add('active');

    // Sync Active Highlights on Header Menu Items
    const matchingNavLink = document.querySelector(`.nav-links a[href="${baseHash}"]`);
    if (matchingNavLink) matchingNavLink.classList.add('active');

    // Dynamic Context Execution Callbacks per Specific Route Target Definitions
    if (baseHash === "#home") compileHomeDashboardRows();
    if (baseHash === "#shop") compileShopCatalogView();
    if (baseHash === "#product-details") compileProductDetailedWorkspace();
    if (baseHash === "#categories") compileCollectionsShowcase();
    if (baseHash === "#cart") compileCartWorkspaceTable();
    if (baseHash === "#wishlist") compileWishlistGridWorkspace();
}

// --- Dynamic Core Components Injection Compilers ---

function generateProductCardHTML(product) {
    const isWish = wishlistState.includes(product.id) ? "active" : "";
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image-wrapper">
                ${product.tag ? `<div class="card-badges"><span class="badge-tag dark">${product.tag}</span></div>` : ''}
                <button class="wishlist-icon-btn ${isWish}" onclick="event.stopPropagation(); toggleWishlistState(${product.id}, this)">
                    <i class="far fa-heart"></i>
                </button>
                <img src="${product.img}" alt="${product.name}">
                <div class="product-action-overlay">
                    <button class="btn btn-primary small" onclick="event.stopPropagation(); triggerQuickViewPopup(${product.id})">Quick View</button>
                </div>
            </div>
            <div class="product-meta-info" onclick="navigateToProductPage(${product.id})">
                <div class="product-brand">SAVEAN</div>
                <a href="#product-details?id=${product.id}" class="product-title-link">${product.name}</a>
                <div class="product-rating-stars">
                    ${`<i class="fas fa-star"></i>`.repeat(Math.floor(product.rating))}
                    ${product.rating % 1 !== 0 ? `<i class="fas fa-star-half-alt"></i>` : ''}
                </div>
                <div class="product-price-box">$${product.price.toFixed(2)}</div>
            </div>
        </div>
    `;
}

function compileHomeDashboardRows() {
    const newArrivalsContainer = document.getElementById('home-new-arrivals');
    const bestSellersContainer = document.getElementById('home-best-sellers');
    
    if (newArrivalsContainer) {
        const items = PRODUCTS_DATABASE.filter(p => p.isNew).slice(0, 4);
        newArrivalsContainer.innerHTML = items.map(p => generateProductCardHTML(p)).join('');
    }
    if (bestSellersContainer) {
        const items = PRODUCTS_DATABASE.filter(p => p.isBest).slice(0, 4);
        bestSellersContainer.innerHTML = items.map(p => generateProductCardHTML(p)).join('');
    }
}

function compileShopCatalogView() {
    let dataset = [...PRODUCTS_DATABASE];

    // Filter Logic Operations Execution
    if (activeCategoryFilter !== "all") {
        dataset = dataset.filter(p => p.category === activeCategoryFilter);
    }
    if (activePriceFilter !== "all") {
        const [low, high] = activePriceFilter.split('-').map(Number);
        if (high) dataset = dataset.filter(p => p.price >= low && p.price <= high);
        else dataset = dataset.filter(p => p.price < low);
    }

    // Sorting Logic Execution Matrix
    if (activeSortOption === "price-low") dataset.sort((a,b) => a.price - b.price);
    else if (activeSortOption === "price-high") dataset.sort((a,b) => b.price - a.price);
    else if (activeSortOption === "rating") dataset.sort((a,b) => b.rating - a.rating);

    // Meta Count Update
    document.getElementById('product-count-meta').innerText = `Showing ${dataset.length} premium essentials`;

    // Pagination Segment Calculus Split Matrix
    const totalPages = Math.ceil(dataset.length / itemsPerPage) || 1;
    if (shopCurrentPage > totalPages) shopCurrentPage = totalPages;
    const offset = (shopCurrentPage - 1) * itemsPerPage;
    const paginatedItems = dataset.slice(offset, offset + itemsPerPage);

    const productGrid = document.getElementById('shop-products-grid');
    if (productGrid) {
        if (paginatedItems.length === 0) {
            productGrid.innerHTML = `<p class='text-center text-muted w-100 p-5'>No matching luxury drops found matching your specific query filter scope.</p>`;
        } else {
            productGrid.innerHTML = paginatedItems.map(p => generateProductCardHTML(p)).join('');
        }
    }
    compilePaginationControls(totalPages);
}

function compilePaginationControls(totalPages) {
    const container = document.getElementById('shop-pagination');
    if (!container) return;
    container.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === shopCurrentPage ? "active" : "";
        container.innerHTML += `<button class="pagination-btn ${activeClass}" onclick="changeShopCataloguePage(${i})">${i}</button>`;
    }
}

function navigateToProductPage(id) {
    window.location.hash = `#product-details?id=${id}`;
}

function compileProductDetailedWorkspace() {
    const container = document.getElementById('product-details-container');
    if (!container) return;

    // Resolve URL query dynamic argument array payload manual parsing 
    const hashString = window.location.hash;
    const idParam = hashString.split('?id=')[1];
    const productId = idParam ? parseInt(idParam) : PRODUCTS_DATABASE[0].id;
    const product = PRODUCTS_DATABASE.find(p => p.id === productId) || PRODUCTS_DATABASE[0];

    container.innerHTML = `
        <div class="details-grid">
            <div class="gallery-container">
                <div class="thumbnails-stack">
                    <img src="${product.img}" class="thumb-item active" onclick="updateDetailedPrimaryImage(this.src, this)">
                    <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80" class="thumb-item" onclick="updateDetailedPrimaryImage(this.src, this)">
                </div>
                <div class="main-gallery-view">
                    <img id="primary-details-img" src="${product.img}" alt="${product.name}">
                </div>
            </div>
            <div class="details-info-side">
                <div class="product-brand" style="font-size:0.85rem; letter-spacing:2px; margin-bottom:10px;">SAVEAN APPAREL CO.</div>
                <h2>${product.name}</h2>
                <div class="product-rating-stars" style="font-size:0.9rem; margin-bottom:15px;">
                    ${`<i class="fas fa-star"></i>`.repeat(Math.floor(product.rating))} (${product.rating} / 5 out of 140 genuine consumer reviews)
                </div>
                <div class="details-price">$${product.price.toFixed(2)}</div>
                <p class="details-desc">${product.desc}</p>
                
                <span class="options-title">Select Apparel Fitment Profile (Size)</span>
                <div class="size-selector-row">
                    <div class="size-box active" onclick="selectActiveSizeFrameElement(this)">S</div>
                    <div class="size-box" onclick="selectActiveSizeFrameElement(this)">M</div>
                    <div class="size-box" onclick="selectActiveSizeFrameElement(this)">L</div>
                    <div class="size-box" onclick="selectActiveSizeFrameElement(this)">XL</div>
                </div>

                <span class="options-title">Quantity</span>
                <div class="quantity-control-block">
                    <button onclick="decrementValueTargetQuantity('details-qty-val')">-</button>
                    <input type="text" id="details-qty-val" value="1" readonly>
                    <button onclick="incrementValueTargetQuantity('details-qty-val')">+</button>
                </div>

                <button class="btn btn-primary btn-block" style="padding:16px 0; margin-bottom:15px;" onclick="addActiveProductToCartWorkspace(${product.id}, 'details-qty-val')">ADD TO SHOPPING BAG</button>
                <button class="btn btn-outline btn-block" onclick="toggleWishlistState(${product.id}, null)">SAVE TO WISHLIST ARCHIVE</button>
            </div>
        </div>
    `;

    // Process Related/Recommended Drop Shelf Matrix
    const recommendedGrid = document.getElementById('related-products-grid');
    if (recommendedGrid) {
        const related = PRODUCTS_DATABASE.filter(p => p.id !== product.id).slice(0, 4);
        recommendedGrid.innerHTML = related.map(p => generateProductCardHTML(p)).join('');
    }
}

function updateDetailedPrimaryImage(src, thumbnailElement) {
    document.getElementById('primary-details-img').src = src;
    document.querySelectorAll('.thumb-item').forEach(thumb => thumb.classList.remove('active'));
    thumbnailElement.classList.add('active');
}

function selectActiveSizeFrameElement(element) {
    element.parentElement.querySelectorAll('.size-box').forEach(b => b.classList.remove('active'));
    element.classList.add('active');
}

function compileCollectionsShowcase() {
    const container = document.getElementById('categories-showcase-grid');
    if (!container) return;
    const categoriesList = ["T-shirts", "Hoodies", "Jerseys", "Shorts", "Caps", "Accessories"];
    const imagesMeta = [
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1534215754734-18e55d13ce35?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1624222247344-550fb8ef5522?auto=format&fit=crop&w=600&q=80"
    ];

    container.innerHTML = `
        <div class="category-banner-grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">
            ${categoriesList.map((cat, index) => `
                <div class="cat-card direct-category" data-cat="${cat}" style="background-image: url('${imagesMeta[index]}')">
                    <div class="cat-overlay"><span>${cat.toUpperCase()} DROP</span></div>
                </div>
            `).join('')}
        </div>
    `;
}

function compileCartWorkspaceTable() {
    const container = document.getElementById('cart-layout-container');
    if (!container) return;

    if (cartState.length === 0) {
        container.parentElement.innerHTML = `
            <h2 class="page-title">YOUR SHOPPING BAG</h2>
            <div class="text-center p-5 border" style="background:var(--bg-secondary)">
                <i class="fas fa-shopping-bag p-3" style="font-size:3rem; opacity:0.3"></i>
                <p class="text-muted mb-4">Your fashion repository bag is currently vacant.</p>
                <a href="#shop" class="btn btn-primary route-link">Return to Catalogue Drop</a>
            </div>
        `;
        return;
    }

    let subtotal = 0;
    const itemsHTML = cartState.map(item => {
        const prod = PRODUCTS_DATABASE.find(p => p.id === item.id);
        if (!prod) return '';
        const itemTotal = prod.price * item.qty;
        subtotal += itemTotal;
        return `
            <div class="cart-item-row">
                <img src="${prod.img}" alt="${prod.name}">
                <div class="cart-item-meta">
                    <h4>${prod.name}</h4>
                    <p>Price: $${prod.price.toFixed(2)}</p>
                    <p>Size Configuration: Mid-Fit standard</p>
                    <div class="quantity-control-block" style="margin-bottom:0; margin-top:10px; height:32px; width:100px;">
                        <button onclick="updateCartItemQtyCounter(${item.id}, ${item.qty - 1})">-</button>
                        <input type="text" value="${item.qty}" readonly>
                        <button onclick="updateCartItemQtyCounter(${item.id}, ${item.qty + 1})">+</button>
                    </div>
                </div>
                <div style="font-weight:600; font-size:1rem;">$${itemTotal.toFixed(2)}</div>
                <i class="fas fa-times cart-remove-cross" onclick="purgeCartItemRowElement(${item.id})"></i>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="cart-items-list">${itemsHTML}</div>
        <aside class="summary-card">
            <h3>ORDER SUMMARY</h3>
            <div class="summary-row"><span>Bag Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
            <div class="summary-row"><span>Estimated Express Shipping</span><span>FREE</span></div>
            <div class="coupon-field">
                <input type="text" id="coupon-field-input" placeholder="SAVEAN20">
                <button class="btn btn-primary small" onclick="applyCouponDiscountToken()">APPLY</button>
            </div>
            <div class="summary-row total"><span>Total Amount Due</span><span id="cart-total-value-field">$${subtotal.toFixed(2)}</span></div>
            <button class="btn btn-primary btn-block mt-3" onclick="triggerCheckoutMockOrder()">PROCEED TO CHECKOUT SECURELY</button>
        </aside>
    `;
}

function compileWishlistGridWorkspace() {
    const container = document.getElementById('wishlist-grid');
    if (!container) return;

    if (wishlistState.length === 0) {
        container.innerHTML = `<p class="text-center text-muted w-100 p-5">Your curated style archive wishlist is empty.</p>`;
        return;
    }
    const items = PRODUCTS_DATABASE.filter(p => wishlistState.includes(p.id));
    container.innerHTML = items.map(p => generateProductCardHTML(p)).join('');
}

// --- Cart and Wishlist System State Modifiers ---

function addActiveProductToCartWorkspace(id, quantityInputId) {
    const qtyInput = document.getElementById(quantityInputId);
    const qty = qtyInput ? parseInt(qtyInput.value) : 1;

    const existingIndex = cartState.findIndex(item => item.id === id);
    if (existingIndex > -1) {
        cartState[existingIndex].qty += qty;
    } else {
        cartState.push({ id, qty });
    }
    saveCartStateAndRefreshUI();
    launchNotificationToast("Successfully added to your modern fashion bag.");
}

function updateCartItemQtyCounter(id, newQty) {
    if (newQty <= 0) {
        purgeCartItemRowElement(id);
        return;
    }
    const target = cartState.find(item => item.id === id);
    if (target) target.qty = newQty;
    saveCartStateAndRefreshUI();
    compileCartWorkspaceTable();
}

function purgeCartItemRowElement(id) {
    cartState = cartState.filter(item => item.id !== id);
    saveCartStateAndRefreshUI();
    compileCartWorkspaceTable();
    launchNotificationToast("Removed drop element component selection from checkout vector.");
}

function saveCartStateAndRefreshUI() {
    localStorage.setItem('savean_cart', JSON.stringify(cartState));
    synchronizeStateBadges();
}

function toggleWishlistState(id, clickedElement) {
    const index = wishlistState.indexOf(id);
    if (index > -1) {
        wishlistState.splice(index, 1);
        if (clickedElement) clickedElement.classList.remove('active');
        launchNotificationToast("Removed capsule from product wishlist bundle.");
    } else {
        wishlistState.push(id);
        if (clickedElement) clickedElement.classList.add('active');
        launchNotificationToast("Saved variant design to style wish board registry.");
    }
    localStorage.setItem('savean_wishlist', JSON.stringify(wishlistState));
    synchronizeStateBadges();
    if (window.location.hash.split('?')[0] === "#wishlist") compileWishlistGridWorkspace();
}

function synchronizeStateBadges() {
    const totalCartItems = cartState.reduce((acc, current) => acc + current.qty, 0);
    document.getElementById('cart-count').innerText = totalCartItems;
    document.getElementById('wishlist-count').innerText = wishlistState.length;
}

// --- Checkout Operations Systems ---

function applyCouponDiscountToken() {
    const val = document.getElementById('coupon-field-input').value.trim().toUpperCase();
    if (val === "SAVEAN20") {
        launchNotificationToast("Promo code validation verified! 20% subtracted from aggregate debt.");
    } else {
        launchNotificationToast("Provided entry character combination invalid.");
    }
}

function triggerCheckoutMockOrder() {
    cartState = [];
    saveCartStateAndRefreshUI();
    launchNotificationToast("Transaction pipeline initialized safely. Mock Order #SV-98432 recorded!");
    window.location.hash = "#order-history";
}

// --- Catalog Sorting, Pagination, and Filter Controls ---

function changeShopCataloguePage(pageNumber) {
    shopCurrentPage = pageNumber;
    compileShopCatalogView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Quick View Modal Controller ---

function triggerQuickViewPopup(id) {
    const product = PRODUCTS_DATABASE.find(p => p.id === id);
    if (!product) return;

    const body = document.getElementById('quickview-modal-body');
    body.innerHTML = `
        <div class="details-grid" style="gap:20px;">
            <div><img src="${product.img}" style="width:100%; height:400px; object-fit:cover;"></div>
            <div>
                <div class="product-brand">SAVEAN COUTURE</div>
                <h3>${product.name}</h3>
                <div class="details-price" style="font-size:1.25rem;">$${product.price.toFixed(2)}</div>
                <p class="details-desc" style="font-size:0.85rem; margin-bottom:15px;">${product.desc}</p>
                <span class="options-title">Quantity</span>
                <div class="quantity-control-block" style="height:35px; margin-bottom:15px;">
                    <button onclick="decrementValueTargetQuantity('quickview-qty-val')">-</button>
                    <input type="text" id="quickview-qty-val" value="1" readonly>
                    <button onclick="incrementValueTargetQuantity('quickview-qty-val')">+</button>
                </div>
                <button class="btn btn-primary btn-block small" onclick="addActiveProductToCartWorkspace(${product.id}, 'quickview-qty-val'); dismissQuickViewModal();">ADD TO BAG</button>
            </div>
        </div>
    `;
    document.getElementById('quickview-modal').classList.add('active');
}

function dismissQuickViewModal() {
    document.getElementById('quickview-modal').classList.remove('active');
}

// --- Utility Quantity Controls ---
function incrementValueTargetQuantity(id) { const el = document.getElementById(id); el.value = parseInt(el.value) + 1; }
function decrementValueTargetQuantity(id) { const el = document.getElementById(id); const val = parseInt(el.value); if(val > 1) el.value = val - 1; }

// --- Global UI Listeners & Setup Operations ---

function setupFrameworkNavigation() {
    // Single-Page-Application Global Hijack Interceptor Layer
    document.body.addEventListener('click', e => {
        if (e.target.classList.contains('route-link') || e.target.closest('.route-link')) {
            const targetLink = e.target.classList.contains('route-link') ? e.target : e.target.closest('.route-link');
            const path = targetLink.getAttribute('href');
            if (path && path.startsWith('#')) {
                // Drop out mobile side bars drawer safely if deployed
                document.getElementById('nav-links').classList.remove('active');
            }
        }
        
        // Handle categories clicked from custom graphic layout dashboard spaces directly
        if(e.target.closest('.direct-category')) {
            const el = e.target.closest('.direct-category');
            activeCategoryFilter = el.getAttribute('data-cat');
            
            // Sync filter styling classes visually inside catalog space panels
            const filterItems = document.querySelectorAll('#filter-category li');
            filterItems.forEach(li => {
                li.classList.remove('active');
                if(li.getAttribute('data-value') === activeCategoryFilter) li.classList.add('active');
            });
            
            window.location.hash = "#shop";
            compileShopCatalogView();
        }
    });

    // Mobile Navigation Drawer Event Actions
    document.getElementById('mobile-menu-btn').addEventListener('click', () => {
        document.getElementById('nav-links').classList.add('active');
    });
    document.getElementById('close-menu-btn').addEventListener('click', () => {
        document.getElementById('nav-links').classList.remove('remove');
    });

    // Search Operations Subsystems Engine
    const searchInput = document.getElementById('search-input');
    const liveResults = document.getElementById('live-search-results');
    
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase().trim();
        if (!value) { liveResults.style.display = "none"; return; }
        
        const filtered = PRODUCTS_DATABASE.filter(p => p.name.toLowerCase().includes(value) || p.category.toLowerCase().includes(value));
        if (filtered.length === 0) {
            liveResults.innerHTML = `<p class="p-3 small text-muted text-center">No structural aesthetic design dropped matches</p>`;
        } else {
            liveResults.innerHTML = filtered.map(p => `
                <div class="live-search-item" onclick="navigateToProductPage(${p.id}); document.getElementById('live-search-results').style.display='none';">
                    <img src="${p.img}">
                    <div>
                        <div style="font-size:0.85rem; font-weight:600; color:var(--text-primary);">${p.name}</div>
                        <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:2px;">$${p.price.toFixed(2)}</div>
                    </div>
                </div>
            `).join('');
        }
        liveResults.style.display = "block";
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) liveResults.style.display = "none";
    });
}

function setupThemeToggleManager() {
    const toggle = document.getElementById('theme-toggle');
    const systemSavedTheme = localStorage.getItem('savean_theme') || 'light';
    document.documentElement.setAttribute('data-theme', systemSavedTheme);
    
    // Sync graphical toggler node asset state style frame setup details matches
    toggle.className = systemSavedTheme === 'dark' ? "fas fa-sun" : "fas fa-moon";

    toggle.addEventListener('click', () => {
        const currentlyAssigned = document.documentElement.getAttribute('data-theme');
        const targetTheme = currentlyAssigned === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('savean_theme', targetTheme);
        toggle.className = targetTheme === 'dark' ? "fas fa-sun" : "fas fa-moon";
        launchNotificationToast(`Switched interface paradigm view mode profile layout.`);
    });
}

function initializeInterfaceComponents() {
    // Dynamic Shop Core Filters Bindings Interface
    setupFilterListGroupSelector('filter-category', (val) => { activeCategoryFilter = val; shopCurrentPage = 1; compileShopCatalogView(); });
    setupFilterListGroupSelector('filter-price', (val) => { activePriceFilter = val; shopCurrentPage = 1; compileShopCatalogView(); });
    
    const sorter = document.getElementById('sort-selector');
    if (sorter) sorter.addEventListener('change', (e) => { activeSortOption = e.target.value; compileShopCatalogView(); });

    // Back To Top Visibility Actions Scroll Listeners Pipeline
    const btt = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) btt.classList.add('show');
        else btt.classList.remove('show');
    });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Close Modals Layout Handlers Click Interceptor
    document.getElementById('close-quickview').addEventListener('click', dismissQuickViewModal);
    window.addEventListener('click', (e) => { if (e.target.classList.contains('modal')) dismissQuickViewModal(); });

    // Intercept Standard Form Formats
    setupFormSubmissionInterceptors('newsletter-form', "Subscription accepted! Welcome to the premium tier inner circle.");
    setupFormSubmissionInterceptors('login-form', "Authenticated successfully as Demo Customer.");
    setupFormSubmissionInterceptors('register-form', "Welcome to SAVEAN! Account created.");
    setupFormSubmissionInterceptors('contact-form', "Message securely channeled to core dispatch agents.");
}

function setupFilterListGroupSelector(elementId, callback) {
    const parent = document.getElementById(elementId);
    if (!parent) return;
    parent.addEventListener('click', (e) => {
        if (e.target.tagName === "LI") {
            parent.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            e.target.classList.add('active');
            callback(e.target.getAttribute('data-value'));
        }
    });
}

function setupFormSubmissionInterceptors(formId, victoryToastString) {
    const el = document.getElementById(formId);
    if (!el) return;
    el.addEventListener('submit', (e) => {
        e.preventDefault();
        launchNotificationToast(victoryToastString);
        el.reset();
        if(formId === 'login-form' || formId === 'register-form') window.location.hash = "#profile";
    });
}

// --- Live Toast Notifications Generator Production Loop Component ---
function launchNotificationToast(msg) {
    const container = document.getElementById('toast-container');
    const alertBox = document.createElement('div');
    alertBox.className = "toast";
    alertBox.innerText = msg;
    container.appendChild(alertBox);
    setTimeout(() => { alertBox.style.opacity = '0'; setTimeout(() => alertBox.remove(), 300); }, 3000);
}
