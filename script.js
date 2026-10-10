const services = [
  { id: 1, name: "Stain Removal", price: 500, image: "assests/stain.jpg" },
  { id: 2, name: "Dry Cleaning", price: 200, image: "assests/clean.jpg" },
  {
    id: 3,
    name: "Leather & Suede Cleaning",
    price: 990,
    image: "assests/washing.jpg",
  },
  { id: 4, name: "Ironing", price: 120, image: "assests/ironing.jpg" },
  {
    id: 5,
    name: "Wash & Fold",
    price: 140,
    image: "assests/wash%20and%20fold.jpg",
  },
  {
    id: 6,
    name: "Wedding Dress Cleaning",
    price: 1240,
    image: "assests/wedding%20clean.jpg",
  },
];

let currentServiceIndex = 0;
let cart = [];
let bookings = [];

const STORAGE_KEYS = {
  cart: "laundry_cart",
  bookings: "laundry_bookings",
  index: "laundry_currentIndex",
  user: "laundry_username",
};

function formatCurrency(amount) {
  return "₹ " + Number(amount || 0).toLocaleString("en-IN");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function calculateTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }
  return total;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings));
    localStorage.setItem(STORAGE_KEYS.index, String(currentServiceIndex));
  } catch (err) {
    console.warn("could not save state:", err);
  }
}

function loadState() {
  try {
    const rawCart = localStorage.getItem(STORAGE_KEYS.cart);
    cart = [];
    if (rawCart) {
      const savedCart = JSON.parse(rawCart);
      if (Array.isArray(savedCart)) {
        for (let i = 0; i < savedCart.length; i++) {
          const item = savedCart[i];
          if (item && item.id != null && typeof item.price === "number") {
            cart.push({
              id: item.id,
              name: typeof item.name === "string" ? item.name : "Service",
              price: item.price,
            });
          }
        }
      }
    }

    const rawBookings = localStorage.getItem(STORAGE_KEYS.bookings);
    bookings = [];
    if (rawBookings) {
      const savedBookings = JSON.parse(rawBookings);
      if (Array.isArray(savedBookings)) {
        bookings = savedBookings;
      }
    }

    const savedIndex = parseInt(localStorage.getItem(STORAGE_KEYS.index), 10);
    if (savedIndex >= 0 && savedIndex <= services.length) {
      currentServiceIndex = savedIndex;
    } else {
      currentServiceIndex = 0;
    }
  } catch (err) {
    cart = [];
    bookings = [];
    currentServiceIndex = 0;
  }
}

const serviceView = document.getElementById("service-view");
const serviceImage = document.getElementById("service-image");
const serviceName = document.getElementById("service-name");
const servicePrice = document.getElementById("service-price");
const serviceButtons = document.getElementById("service-buttons");
const allReviewed = document.getElementById("all-reviewed");

const cartBody = document.getElementById("cart-body");
const totalPriceEl = document.getElementById("total-price");

const bookForm = document.getElementById("book-form");
const nameInput = document.getElementById("f-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const errName = document.getElementById("err-name");
const errEmail = document.getElementById("err-email");
const errPhone = document.getElementById("err-phone");
const errCart = document.getElementById("err-cart");
const bookingSuccess = document.getElementById("booking-success");

function renderService() {
  if (currentServiceIndex >= services.length) {
    serviceView.hidden = true;
    serviceButtons.hidden = true;
    allReviewed.hidden = false;
    return;
  }

  allReviewed.hidden = true;
  serviceView.hidden = false;
  serviceButtons.hidden = false;

  const service = services[currentServiceIndex];
  serviceImage.src = service.image;
  serviceImage.alt = service.name;
  serviceName.textContent = service.name;
  servicePrice.textContent = formatCurrency(service.price);
}

function renderCart() {
  if (cart.length === 0) {
    cartBody.innerHTML =
      '<div class="cart-empty">' +
      '<div class="info-icon">&#9432;</div>' +
      '<div class="empty-title">No Items Added</div>' +
      '<div class="empty-subtitle">Add items to the cart from the services bar</div>' +
      "</div>";
  } else {
    let rowsHtml = "";
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      rowsHtml +=
        '<div class="cart-row">' +
        '<span class="col-sno">' +
        (i + 1) +
        "</span>" +
        '<span class="col-name">' +
        escapeHtml(item.name) +
        "</span>" +
        '<span class="col-price">' +
        formatCurrency(item.price) +
        "</span>" +
        '<span class="col-action">' +
        '<button type="button" class="remove-btn" data-id="' +
        item.id +
        '" aria-label="Remove ' +
        escapeHtml(item.name) +
        '">✕</button>' +
        "</span>" +
        "</div>";
    }
    cartBody.innerHTML = rowsHtml;
  }

  totalPriceEl.textContent = formatCurrency(calculateTotal());
}


function addItem() {
  const service = services[currentServiceIndex];
  if (!service) return;

  let alreadyInCart = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === service.id) {
      alreadyInCart = true;
    }
  }
  if (!alreadyInCart) {
    cart.push({ id: service.id, name: service.name, price: service.price });
  }

  saveState();
  renderCart();

  currentServiceIndex++;
  saveState();
  renderService();
}

function skipItem() {
  if (currentServiceIndex < services.length) {
    currentServiceIndex++;
    saveState();
    renderService();
  }
}

function removeItem(serviceId) {
  const id = Number(serviceId);
  const newCart = [];
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id !== id) {
      newCart.push(cart[i]);
    }
  }
  cart = newCart;
  saveState();
  renderCart();
}

function browseAgain() {
  currentServiceIndex = 0;
  saveState();
  renderService();
}

function setError(box, message) {
  if (box) box.textContent = message;
}

function clearErrors() {
  setError(errName, "");
  setError(errEmail, "");
  setError(errPhone, "");
  setError(errCart, "");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isValidPhone(value) {
  const digitsOnly = value.replace(/\D/g, "");
  return /^\+?[\d\s-]{10,15}$/.test(value) && digitsOnly.length >= 10;
}

function validateBookingForm() {
  clearErrors();
  let valid = true;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (name.length < 2) {
    setError(errName, "Please enter your full name.");
    valid = false;
  }

  if (!isValidEmail(email)) {
    setError(errEmail, "Please enter a valid email address.");
    valid = false;
  }

  if (!isValidPhone(phone)) {
    setError(errPhone, "Please enter a valid phone number (10-15 digits).");
    valid = false;
  }

  if (cart.length === 0) {
    setError(errCart, "Please add at least one service before booking.");
    valid = false;
  }

  return valid;
}

function generateBookingId() {
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return "LBK-" + Date.now().toString().slice(-6) + "-" + random;
}

function bookNow(event) {
  event.preventDefault();
  bookingSuccess.hidden = true;

  if (!validateBookingForm()) {
    return;
  }

  const booking = {
    id: generateBookingId(),
    date: new Date().toISOString(),
    customer: {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
    },
    services: cart.map((item) => ({ ...item })),
    total: calculateTotal(),
  };

  bookings.push(booking);
  saveState();

  bookingSuccess.hidden = false;

  cart = [];
  currentServiceIndex = 0;
  bookForm.reset();
  clearErrors();
  saveState();
  renderCart();
  renderService();
}


function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function initAuthDemo() {
  const usernameEl = document.getElementById("username");

  let storedName = null;
  try {
    storedName = localStorage.getItem(STORAGE_KEYS.user);
  } catch (err) {
    storedName = null;
  }
  if (usernameEl) usernameEl.textContent = storedName || "Guest";
}

function initEvents() {
  document.getElementById("add-btn").addEventListener("click", addItem);
  document.getElementById("skip-btn").addEventListener("click", skipItem);
  document
    .getElementById("browse-again")
    .addEventListener("click", browseAgain);

  bookForm.addEventListener("submit", bookNow);

  cartBody.addEventListener("click", (event) => {
    const btn = event.target.closest(".remove-btn");
    if (btn && cartBody.contains(btn)) {
      removeItem(btn.dataset.id);
    }
  });

  initNavigation();
  initAuthDemo();
}

function init() {
  loadState();
  renderService();
  renderCart();
  initEvents();
}

document.addEventListener("DOMContentLoaded", init);

