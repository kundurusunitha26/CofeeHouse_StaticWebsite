/* =================================================
   LOGIN / SIGNUP
================================================= */

function showLogin() {

    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signupForm").style.display = "none";

    document.getElementById("loginTab").classList.add("active");
    document.getElementById("signupTab").classList.remove("active");

    document.getElementById("loginMessage").innerText = "";
    document.getElementById("signupMessage").innerText = "";
}


function showSignup() {

    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";

    document.getElementById("loginTab").classList.remove("active");
    document.getElementById("signupTab").classList.add("active");

    document.getElementById("loginMessage").innerText = "";
    document.getElementById("signupMessage").innerText = "";
}


/* =================================================
   SIGNUP
================================================= */

function signupUser(event) {

    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phone = document.getElementById("signupPhone").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;

    const message = document.getElementById("signupMessage");

    if (password !== confirmPassword) {

        message.style.color = "red";
        message.innerText = "Passwords do not match.";

        return;
    }

    if (password.length < 6) {

        message.style.color = "red";
        message.innerText = "Password must contain at least 6 characters.";

        return;
    }

    const user = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };

    localStorage.setItem("coffeeHouseUser", JSON.stringify(user));

    message.style.color = "green";
    message.innerText = "Account created successfully!";

    document.getElementById("signupForm").reset();

    setTimeout(function () {

        showLogin();

        document.getElementById("loginEmail").value = email;

    }, 1200);

}


/* =================================================
   LOGIN
================================================= */

function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const message = document.getElementById("loginMessage");

    const savedUser = localStorage.getItem("coffeeHouseUser");

    if (!savedUser) {

        message.style.color = "red";
        message.innerText = "No account found. Please Signup first.";

        return;
    }

    const user = JSON.parse(savedUser);

    if (email === user.email && password === user.password) {

        message.style.color = "green";
        message.innerText = "Login successful!";

        localStorage.setItem("coffeeHouseLoggedIn", "true");

        setTimeout(function () {

            document.getElementById("authPage").style.display = "none";
            document.getElementById("mainWebsite").style.display = "block";

            window.scrollTo(0, 0);

        }, 700);

    } else {

        message.style.color = "red";
        message.innerText = "Invalid email or password.";

    }

}


/* =================================================
   LOGOUT
================================================= */

function logoutUser() {

    localStorage.removeItem("coffeeHouseLoggedIn");

    document.getElementById("mainWebsite").style.display = "none";
    document.getElementById("authPage").style.display = "flex";

    document.getElementById("loginForm").reset();

    showLogin();

}


/* =================================================
   CHECK LOGIN
================================================= */

window.addEventListener("load", function () {

    const loggedIn = localStorage.getItem("coffeeHouseLoggedIn");

    if (loggedIn === "true") {

        document.getElementById("authPage").style.display = "none";
        document.getElementById("mainWebsite").style.display = "block";

    } else {

        document.getElementById("authPage").style.display = "flex";
        document.getElementById("mainWebsite").style.display = "none";

    }

});


/* =================================================
   COFFEE MENU - 9 ITEMS / 3 PAGES
================================================= */

const coffeeItems = [

    {
        name: "Cappuccino",
        description: "Rich espresso with steamed milk and soft foam.",
        price: 150,
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Cold Coffee",
        description: "Creamy chilled coffee for a refreshing taste.",
        price: 130,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Chocolate Mocha",
        description: "Smooth coffee blended with rich chocolate.",
        price: 180,
        image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Caramel Latte",
        description: "Smooth latte with delicious caramel flavour.",
        price: 170,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Vanilla Latte",
        description: "Creamy latte with a sweet vanilla flavour.",
        price: 160,
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Hazelnut Coffee",
        description: "Delicious coffee with a rich hazelnut flavour.",
        price: 190,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Filter Coffee",
        description: "Traditional South Indian filter coffee.",
        price: 100,
        image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Iced Mocha",
        description: "Cold coffee with chocolate and ice.",
        price: 180,
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=85"
    },

    {
        name: "Espresso",
        description: "Strong and bold coffee with a rich aroma.",
        price: 120,
        image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=700&q=85"
    }

];


/* =================================================
   MENU PAGINATION SETTINGS
================================================= */

let currentMenuPage = 1;

const itemsPerPage = 3;

const totalPages = Math.ceil(
    coffeeItems.length / itemsPerPage
);


/* =================================================
   DISPLAY MENU
================================================= */

function displayMenu(page) {

    const menuContainer = document.getElementById("menuContainer");

    if (!menuContainer) return;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = coffeeItems.slice(startIndex, endIndex);

    menuContainer.innerHTML = "";

    currentItems.forEach(function (coffee) {

        const card = document.createElement("div");
        card.className = "coffee-card";

        const image = document.createElement("img");

        image.src = coffee.image;
        image.alt = coffee.name;
        image.loading = "lazy";

        image.onerror = function () {
            this.src = "https://placehold.co/600x400?text=Coffee";
        };


        const info = document.createElement("div");
        info.className = "coffee-info";

        const heading = document.createElement("h3");
        heading.textContent = coffee.name;

        const description = document.createElement("p");
        description.textContent = coffee.description;


        const priceOrder = document.createElement("div");
        priceOrder.className = "price-order";

        const price = document.createElement("strong");
        price.textContent = "₹" + coffee.price;


        const button = document.createElement("button");

        button.type = "button";
        button.textContent = "Order Now";

        button.addEventListener("click", function () {

            selectCoffee(coffee.name, coffee.price);

        });


        priceOrder.appendChild(price);
        priceOrder.appendChild(button);

        info.appendChild(heading);
        info.appendChild(description);
        info.appendChild(priceOrder);

        card.appendChild(image);
        card.appendChild(info);

        menuContainer.appendChild(card);

    });


    document.getElementById("pageInfo").textContent =
        "Page " + currentMenuPage + " of " + totalPages;

    document.getElementById("prevBtn").disabled =
        currentMenuPage === 1;

    document.getElementById("nextBtn").disabled =
        currentMenuPage === totalPages;

}


/* =================================================
   CHANGE MENU PAGE
================================================= */

function changeMenuPage(direction) {

    const newPage = currentMenuPage + direction;

    if (newPage < 1 || newPage > totalPages) {
        return;
    }

    currentMenuPage = newPage;

    displayMenu(currentMenuPage);

    document.getElementById("menu").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =================================================
   LOAD MENU
================================================= */

document.addEventListener("DOMContentLoaded", function () {

    displayMenu(currentMenuPage);

});


/* =================================================
   COFFEE ORDER
================================================= */

let selectedCoffee = "";
let selectedPrice = 0;


function selectCoffee(coffeeName, price) {

    selectedCoffee = coffeeName;
    selectedPrice = price;

    document.getElementById("selectedCoffee").innerText =
        "Selected: " + coffeeName;

    document.getElementById("selectedPrice").innerText =
        "Price: ₹" + price;

    document.getElementById("orderMessage").innerText = "";

    document.getElementById("orderSection").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =================================================
   PLACE ORDER
================================================= */

function placeOrder() {

    const tableNumber =
        document.getElementById("tableNumber").value.trim();

    const customerName =
        document.getElementById("customerName").value.trim();

    const coffeeCount =
        document.getElementById("coffeeCount").value;

    const message =
        document.getElementById("orderMessage");


    if (selectedCoffee === "") {

        message.innerText = "Please select a coffee flavour first.";
        return;

    }

    if (tableNumber === "") {

        message.innerText = "Please enter your table number.";
        return;

    }

    if (customerName === "") {

        message.innerText = "Please enter your name.";
        return;

    }

    if (coffeeCount === "" || Number(coffeeCount) < 1) {

        message.innerText = "Please enter a valid quantity.";
        return;

    }


    const quantity = Number(coffeeCount);
    const total = selectedPrice * quantity;

    message.innerHTML =
        "☕ <strong>Thank You for Ordering!</strong><br>" +
        "Your order has been placed successfully.<br>" +
        "Coffee: " + selectedCoffee + "<br>" +
        "Quantity: " + quantity + "<br>" +
        "Total: ₹" + total;


    document.getElementById("tableNumber").value = "";
    document.getElementById("customerName").value = "";
    document.getElementById("coffeeCount").value = "";

}


/* =================================================
   CONTACT
================================================= */

function contactUs() {

    alert("Thank you for contacting Coffee House! ☕");

}
/* =================================================
   CUSTOMER COFFEE REVIEWS
================================================= */

const reviewForm = document.getElementById("reviewForm");
const reviewsContainer = document.getElementById("reviewsContainer");

let customerReviews = JSON.parse(
    localStorage.getItem("customerReviews")
) || [];


/* Display Reviews */

function displayReviews() {

    reviewsContainer.innerHTML = "";

    customerReviews.forEach(function(review) {

        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");

        const name = document.createElement("h4");
        name.textContent = review.name;

        const coffee = document.createElement("div");
        coffee.classList.add("coffee-title");
        coffee.textContent = review.coffee;

        const stars = document.createElement("div");
        stars.classList.add("stars");
        stars.textContent =
            "★".repeat(review.rating) +
            "☆".repeat(5 - review.rating);

        const message = document.createElement("p");
        message.textContent = review.message;

        reviewCard.appendChild(name);
        reviewCard.appendChild(coffee);
        reviewCard.appendChild(stars);
        reviewCard.appendChild(message);

        reviewsContainer.appendChild(reviewCard);

    });

}


/* Submit Review */

reviewForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("reviewName").value.trim();
    const coffee = document.getElementById("coffeeName").value;
    const message = document.getElementById("reviewMessage").value.trim();

    const selectedRating = document.querySelector(
        'input[name="rating"]:checked'
    );

    if (!selectedRating) {
        alert("Please select a star rating!");
        return;
    }

    const review = {
        name: name,
        coffee: coffee,
        rating: Number(selectedRating.value),
        message: message
    };

    customerReviews.unshift(review);

    localStorage.setItem(
        "customerReviews",
        JSON.stringify(customerReviews)
    );

    displayReviews();

    reviewForm.reset();

    alert("Thank you for sharing your coffee experience!");

});


/* Load Saved Reviews */

displayReviews();