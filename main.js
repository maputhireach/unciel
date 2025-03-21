// Cart data
let cart = [];
let total = 0;

// Function to toggle cart visibility
function toggleCart() {
  const cart = document.getElementById("cart");
  cart.classList.toggle("active");
}

// Function to add an item to the cart
function addToCart(name, price) {
  // Add the item to the cart array
  cart.push({ name, price });

  // Update the total
  total += price;

  // Update the cart display
  updateCartDisplay();

  // Show the notification
  showNotification(`${name} has been added to the cart!`);
}

// Function to show a notification in the middle of the screen
function showNotification(message) {
  // Create the notification element
  const notification = document.createElement("div");
  notification.textContent = message;

  // Add a class for styling and animation
  notification.classList.add("notification");

  // Style the notification
  notification.style.position = "fixed";
  notification.style.top = "50%"; // Center vertically
  notification.style.left = "50%"; // Center horizontally
  notification.style.transform = "translate(-50%, -50%)"; // Adjust for exact center
  notification.style.backgroundColor = "grey";
  notification.style.color = "white";
  notification.style.padding = "15px 25px";
  notification.style.borderRadius = "5px";
  notification.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  notification.style.zIndex = "1000"; // Ensure it's above other elements
  notification.style.fontSize = "16px";
  notification.style.textAlign = "center";

  // Add the notification to the body
  document.body.appendChild(notification);

  // Remove the notification after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Function to update the cart display
function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  const removeAllButton = document.querySelector(".remove-all");
  const cartNotification = document.getElementById("cart-notification"); // Notification badge

  // Clear the cart display
  cartItems.innerHTML = "";

  // Add each item to the cart
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button onclick="removeFromCart(${index}, event)">Remove</button>
    `;
    cartItems.appendChild(li);
  });

  function removeFromCart(index, event) {
    event.stopPropagation(); // Prevent event bubbling
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCartDisplay();
  }

  // Update the total price
  totalElement.textContent = total.toFixed(2);

  // Update the cart notification badge
  if (cartNotification) {
    cartNotification.textContent = cart.length; // Set the number of items
  }

  // Show/hide the "Remove All" button
  if (cart.length > 0) {
    removeAllButton.style.display = "none";
  } else {
    removeAllButton.style.display = "none";
  }
}

// Function to remove an item from the cart
// Function to remove an item from the cart
function removeFromCart(index, event) {
  event.stopPropagation(); // Prevent event bubbling
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCartDisplay();
}

// Function to remove all items from the cart
// Ensure this function is defined globally

// Click event listener to close the cart when clicking outside
document.addEventListener("click", (event) => {
  const cart = document.getElementById("cart");
  const cartIcon = document.querySelector(".cart-icon");

  // Close cart when clicking outside
  if (
    !cart.contains(event.target) && // Click is outside the cart
    !cartIcon.contains(event.target) && // Click is not on the cart icon
    !event.target.closest("#cart-items button") && // Click is not on a "Remove" button
    !event.target.closest(".remove-all") // Click is not on the "Remove All" button
  ) {
    cart.classList.remove("active");
  }
});

// Initialize Swiper
var swiper = new Swiper(".swiper-container", {
  slidesPerView: 3, // Number of slides visible at once
  spaceBetween: 10, // Space between slides
  navigation: {
    nextEl: ".swiper-button-next", // Next arrow
    prevEl: ".swiper-button-prev", // Previous arrow
  },
  loop: true, // Enable infinite loop
});

// Banner slider functionality
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".banner-slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Auto transition every 5 seconds
  setInterval(nextSlide, 5000);

  // Initial slide
  showSlide(currentSlide);
});

// Function to toggle menu visibility
function toggleMenu() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("active");
}

// Promo code functionality
const promoCode = "mareach"; // Example promo code
const discountPercentage = 10; // Example: 10% discount

function applyPromoCode() {
  const promoInput = document.getElementById("promo-code");
  const applyButton = document.querySelector(".promo-code-section button");
  const totalElement = document.getElementById("total");

  const enteredCode = promoInput.value.trim();
  let total = calculateTotal(); // Get total before applying discount

  if (isNaN(total) || total <= 0) {
    alert(
      "Your cart is empty or invalid. Add items before applying a promo code."
    );
    return;
  }

  if (enteredCode === promoCode) {
    const discount = (total * discountPercentage) / 100;
    const discountedTotal = total - discount;

    // Update global total variable
    total = discountedTotal;

    // Update the UI with new total
    if (totalElement) {
      totalElement.textContent = `$${discountedTotal.toFixed(2)}`;
    } else {
      console.error("Element with id 'total' not found.");
    }

    // Disable input and button after applying promo
    promoInput.disabled = true;
    applyButton.disabled = true;

    alert(`Promo code applied! You saved $${discount.toFixed(2)}.`);
  } else {
    alert("Invalid promo code. Please try again.");
  }
}

// Function to calculate total
function calculateTotal() {
  if (!Array.isArray(cart) || cart.length === 0) {
    console.error("Cart is empty or not an array!");
    return 0;
  }

  let total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  return total;
}

// Function to toggle the menu visibility
function toggleMenu() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("active");
}

// Add event listener to the hamburger icon
document.getElementById("hamburger").addEventListener("click", toggleMenu);
