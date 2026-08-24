// =========================================
// FOOD HUB SHOPPING CART
// =========================================

let cart = [];


// Get elements
const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const clearCart = document.getElementById("clearCart");
const checkoutBtn = document.getElementById("checkoutBtn");


// =========================================
// OPEN CART
// =========================================

cartBtn.addEventListener("click", () => {

  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");

});


// =========================================
// CLOSE CART
// =========================================

function closeCartSidebar() {

  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");

}

closeCart.addEventListener("click", closeCartSidebar);

cartOverlay.addEventListener("click", closeCartSidebar);


// =========================================
// ADD TO CART
// =========================================

const orderButtons =
  document.querySelectorAll(".order-btn");

orderButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const card =
      button.closest(".food-card");

    const name =
      card.querySelector(".food-title h3").textContent;

    const priceText =
      card.querySelector(".food-title span").textContent;

    const price =
      parseFloat(priceText.replace("$", ""));


    // Check if item already exists

    const existingItem =
      cart.find(item => item.name === name);


    if (existingItem) {

      existingItem.quantity++;

    } else {

      cart.push({
        name: name,
        price: price,
        quantity: 1
      });

    }


    updateCart();

    // Open cart automatically

    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");

  });

});


// =========================================
// UPDATE CART
// =========================================

function updateCart() {

  cartItems.innerHTML = "";


  if (cart.length === 0) {

    cartItems.innerHTML =
      `<p class="empty-cart">
        Your cart is empty.
      </p>`;

    cartCount.textContent = "0";
    cartTotal.textContent = "0";

    return;
  }


  let total = 0;
  let itemCount = 0;


  cart.forEach((item, index) => {

    total += item.price * item.quantity;

    itemCount += item.quantity;


    const cartItem =
      document.createElement("div");

    cartItem.classList.add("cart-item");


    cartItem.innerHTML = `

      <div class="cart-item-info">

        <h4>${item.name}</h4>

        <p>
          $${item.price} × ${item.quantity}
        </p>

      </div>


      <div class="quantity-controls">

        <button onclick="decreaseQuantity(${index})">
          −
        </button>

        <span>
          ${item.quantity}
        </span>

        <button onclick="increaseQuantity(${index})">
          +
        </button>

      </div>

    `;


    cartItems.appendChild(cartItem);

  });


  cartCount.textContent = itemCount;

  cartTotal.textContent =
    total.toFixed(2);

}


// =========================================
// INCREASE QUANTITY
// =========================================

function increaseQuantity(index) {

  cart[index].quantity++;

  updateCart();

}


// =========================================
// DECREASE QUANTITY
// =========================================

function decreaseQuantity(index) {

  cart[index].quantity--;


  if (cart[index].quantity <= 0) {

    cart.splice(index, 1);

  }


  updateCart();

}


// =========================================
// CLEAR CART
// =========================================

clearCart.addEventListener("click", () => {

  cart = [];

  updateCart();

});


// =========================================
// PLACE ORDER
// =========================================

checkoutBtn.addEventListener("click", () => {

  if (cart.length === 0) {

    alert("Your cart is empty! Please add a dish first.");

    return;
  }


  alert(
    "🎉 Thank you for your order!\n\n" +
    "Your Food Hub order has been received."
  );


  cart = [];

  updateCart();

  closeCartSidebar();

});

// =========================================
// MENU FILTER + SEARCH
// =========================================

const filterButtons =
  document.querySelectorAll(".filter-btn");

const foodCards =
  document.querySelectorAll(".food-card");

const searchInput =
  document.getElementById("searchInput");

const noResults =
  document.getElementById("noResults");

let selectedCategory = "all";


// =========================================
// CATEGORY FILTER
// =========================================

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    // Remove active class

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    // Add active class

    button.classList.add("active");

    selectedCategory =
      button.dataset.category;

    filterMenu();

  });

});


// =========================================
// SEARCH
// =========================================

searchInput.addEventListener("input", () => {

  filterMenu();

});


// =========================================
// FILTER FUNCTION
// =========================================

function filterMenu() {

  const searchTerm =
    searchInput.value
      .toLowerCase()
      .trim();

  let visibleCount = 0;


  foodCards.forEach(card => {

    const category =
      card.dataset.category;

    const name =
      card
        .querySelector(".food-title h3")
        .textContent
        .toLowerCase();


    const categoryMatch =
      selectedCategory === "all" ||
      category === selectedCategory;


    const searchMatch =
      name.includes(searchTerm);


    if (categoryMatch && searchMatch) {

      card.classList.remove("hidden");

      card.classList.add("show");

      visibleCount++;

    } else {

      card.classList.add("hidden");

      card.classList.remove("show");

    }

  });


  // Show no-results message

  if (visibleCount === 0) {

    noResults.classList.add("visible");

  } else {

    noResults.classList.remove("visible");

  }

}

// =========================================
// FOOD RECOMMENDER
// =========================================

const foodOptions =
  document.querySelectorAll(".food-option");

const recommendBtn =
  document.getElementById("recommendBtn");

const recommendationResult =
  document.getElementById("recommendationResult");


let userPreference = "";
let userMood = "";
let userHunger = "";


// =========================================
// OPTION SELECTION
// =========================================

foodOptions.forEach(option => {

  option.addEventListener("click", () => {

    // Preference

    if (option.dataset.type) {

      document
        .querySelectorAll("[data-type]")
        .forEach(btn => {
          btn.classList.remove("selected");
        });

      option.classList.add("selected");

      userPreference =
        option.dataset.type;
    }


    // Mood

    if (option.dataset.mood) {

      document
        .querySelectorAll("[data-mood]")
        .forEach(btn => {
          btn.classList.remove("selected");
        });

      option.classList.add("selected");

      userMood =
        option.dataset.mood;
    }


    // Hunger

    if (option.dataset.hunger) {

      document
        .querySelectorAll("[data-hunger]")
        .forEach(btn => {
          btn.classList.remove("selected");
        });

      option.classList.add("selected");

      userHunger =
        option.dataset.hunger;
    }

  });

});


// =========================================
// RECOMMENDATION
// =========================================

recommendBtn.addEventListener("click", () => {

  // Check selections

  if (
    !userPreference ||
    !userMood ||
    !userHunger
  ) {

    recommendationResult.innerHTML = `

      <h3>✨ Almost There!</h3>

      <p>
        Please answer all three questions
        so we can find the perfect dish for you.
      </p>

    `;

    recommendationResult.classList.add("show");

    return;
  }


  let recommendation;


  // =======================================
  // VEGETARIAN
  // =======================================

  if (userPreference === "veg") {

    if (userMood === "sweet") {

      recommendation = {
        name: "🍯 Gulab Jamun",
        description:
          "A warm and delicious Indian dessert that's perfect when you're craving something sweet.",
        price: "$7"
      };

    }

    else if (userMood === "light") {

      recommendation = {
        name: "🥭 Mango Lassi",
        description:
          "A refreshing and creamy mango drink that's perfect for a light and refreshing choice.",
        price: "$6"
      };

    }

    else if (userMood === "spicy") {

      recommendation = {
        name: "🌶️ Paneer Tikka",
        description:
          "Grilled paneer with aromatic spices — a delicious choice for a spicy vegetarian craving.",
        price: "$12"
      };

    }

    else {

      recommendation = {
        name: "🫓 Butter Naan",
        description:
          "Soft, buttery and comforting — perfect with your favorite Indian curry.",
        price: "$5"
      };

    }

  }


  // =======================================
  // NON-VEGETARIAN
  // =======================================

  else {

    if (userMood === "sweet") {

      recommendation = {
        name: "🍫 Chocolate Brownie",
        description:
          "A rich chocolate brownie for the perfect sweet ending.",
        price: "$8"
      };

    }

    else if (userMood === "light") {

      recommendation = {
        name: "🍗 Chicken Tikka",
        description:
          "Tender grilled chicken that's flavorful without being too heavy.",
        price: "$14"
      };

    }

    else if (userMood === "spicy") {

      recommendation = {
        name: "🍗 Chicken Tikka",
        description:
          "Juicy grilled chicken packed with aromatic spices and bold flavor.",
        price: "$14"
      };

    }

    else {

      recommendation = {
        name: "🍛 Butter Chicken",
        description:
          "Our rich and creamy Butter Chicken is the perfect comfort food.",
        price: "$18"
      };

    }

  }


  // =======================================
  // VERY HUNGRY
  // =======================================

  // =======================================
// VERY HUNGRY
// =======================================

// Hunger should only change the recommendation
// when the mood is NOT sweet.

if (
  userHunger === "very" &&
  userMood !== "sweet"
) {

  if (userPreference === "veg") {

    recommendation = {
      name: "🍚 Veg Biryani",
      description:
        "Aromatic basmati rice packed with vegetables and delicious Indian spices.",
      price: "$15"
    };

  } else {

    recommendation = {
      name: "🍚 Hyderabadi Biryani",
      description:
        "A hearty plate of fragrant basmati rice and flavorful spices.",
      price: "$15"
    };

  }

}

  // =======================================
  // SHOW RESULT
  // =======================================

  recommendationResult.innerHTML = `

    <h3>
      ✨ We Recommend
    </h3>

    <h3>
      ${recommendation.name}
    </h3>

    <p>
      ${recommendation.description}
    </p>

    <div class="recommendation-price">
      ${recommendation.price}
    </div>

  `;


  recommendationResult.classList.add("show");

});

// =========================================
// DARK MODE
// =========================================

const themeToggle =
  document.getElementById("themeToggle");


themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode");


  if (
    document.body.classList.contains("dark-mode")
  ) {

    themeToggle.textContent = "☀️";

  } else {

    themeToggle.textContent = "🌙";

  }

});

// =========================================
// RESERVATION FORM
// =========================================

const reservationForm =
    document.getElementById("reservationForm");

const reservationSuccess =
    document.getElementById("reservationSuccess");

const successMessage =
    document.getElementById("successMessage");

const newReservation =
    document.getElementById("newReservation");


reservationForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const date =
        document.getElementById("date").value;

    const guests =
        document.getElementById("guests").value;


    // =====================================
    // VALIDATION
    // =====================================

    if (
        !name ||
        !email ||
        !date ||
        !guests
    ) {

        alert(
            "Please fill in all reservation details."
        );

        return;
    }


    // =====================================
    // EMAIL VALIDATION
    // =====================================

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert(
            "Please enter a valid email address."
        );

        return;
    }


    // =====================================
    // DATE VALIDATION
    // =====================================

    const selectedDate =
        new Date(date);

    const today =
        new Date();

    today.setHours(0, 0, 0, 0);


    if (selectedDate < today) {

        alert(
            "Please select a future date."
        );

        return;
    }


    // =====================================
    // SHOW SUCCESS MESSAGE
    // =====================================

    successMessage.innerHTML = `
        Thank you, <strong>${name}</strong>! 🎉
        Your table for <strong>${guests}</strong>
        has been requested for
        <strong>${date}</strong>.
    `;


    reservationForm.style.display = "none";

    reservationSuccess.classList.add("show");


    // Scroll to confirmation

    reservationSuccess.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// =========================================
// MAKE ANOTHER RESERVATION
// =========================================

newReservation.addEventListener("click", () => {

    reservationForm.reset();

    reservationSuccess.classList.remove("show");

    reservationForm.style.display = "grid";

});

// =========================================
// MOBILE NAVIGATION
// =========================================

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");


    if (
        navLinks.classList.contains("active")
    ) {

        menuToggle.textContent = "✕";

    } else {

        menuToggle.textContent = "☰";

    }

});


// =========================================
// CLOSE MENU AFTER CLICKING LINK
// =========================================

const navigationLinks =
    navLinks.querySelectorAll("a");


navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

    });

});