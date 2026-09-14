// Service Booking Web App - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Cart state
    let cart = []; // Array of {name, price}
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountSpan = document.getElementById('total-amount');
    const bookingForm = document.getElementById('bookingForm');
    const serviceGrid = document.getElementById('serviceGrid');
    const generalAddToCartBtn = document.getElementById('generalAddToCart');
    const generalBookNowBtn = document.getElementById('generalBookNow');

    // Dummy services data
    const services = [
        { id: 1, name: 'Web Development', price: 150, img: 'https://via.placeholder.com/300x150?text=Web+Dev' },
        { id: 2, name: 'Graphic Design', price: 100, img: 'https://via.placeholder.com/300x150?text=Graphic+Design' },
        { id: 3, name: 'SEO Optimization', price: 120, img: 'https://via.placeholder.com/300x150?text=SEO' },
        { id: 4, name: 'Content Writing', price: 80, img: 'https://via.placeholder.com/300x150?text=Content' },
        { id: 5, name: 'Social Media Mgmt', price: 200, img: 'https://via.placeholder.com/300x150?text=Social+Media' },
        { id: 6, name: 'Mobile App Dev', price: 250, img: 'https://via.placeholder.com/300x150?text=Mobile+App' }
    ];

    // Render services to grid
    function renderServices() {
        serviceGrid.innerHTML = '';
        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.innerHTML = `
                <img src="${service.img}" alt="${service.name}">
                <h3>${service.name}</h3>
                <div class="price">$${service.price}</div>
                <button class="btn add-btn" data-id="${service.id}">Add Item</button>
                <button class="btn skip-btn" data-id="${service.id}">Skip Item</button>
            `;
            serviceGrid.appendChild(card);
        });

        // Add event listeners to buttons
        document.querySelectorAll('.add-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const service = services.find(s => s.id === id);
                addToCart(service);
            });
        });

        document.querySelectorAll('.skip-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Skip action: do nothing, could show a toast
                alert('Item skipped');
            });
        });
    });

    // Add item to cart
    function addToCart(service) {
        cart.push({ name: service.name, price: service.price });
        updateCartUI();
    }

    // Remove item from cart (not required but could be added)
    // We'll keep simple: no remove

    // Update cart UI
    function updateCartUI() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>No items have been added yet.</p>';
        } else {
            cartItemsContainer.innerHTML = '';
            cart.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <span>${item.name}</span>
                    <span>$${item.price}</span>
                `;
                cartItemsContainer.appendChild(itemDiv);
            });
        }

        // Update total
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalAmountSpan.textContent = `$${total.toFixed(2)}`;
    }

    // Booking form submit
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simple validation
        const inputs = bookingForm.querySelectorAll('input');
        let valid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = '#ccc';
            }
        });
        if (valid) {
            alert('Booking successful! Thank you.');
            bookingForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // General Add to Cart button (adds first service as example)
    generalAddToCartBtn.addEventListener('click', () => {
        if (services.length > 0) {
            addToCart(services[0]);
            alert(`Added "${services[0].name}" to cart via general button.`);
        }
    });

    // General Book Now button
    generalBookNowBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Add some items before booking.');
        } else {
            // Simulate booking
            alert(`Proceeding to checkout with ${
                cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)
            } total.`);
            // Optionally reset cart after booking
            // cart = [];
            // updateCartUI();
        }
    });

    // Initial render
    renderServices();
});