// ================= FOOD DATA =================

const foods = [

    {
        name: "Chicken Biryani",
        restaurant: "Spice House",
        category: "Biryani",
        price: 220,
        rating: 4.6,
        description: "Aromatic basmati rice cooked with tender chicken and rich spices.",
        deliveryTime: "30-35 min",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
    },

    {
        name: "Cheese Pizza",
        restaurant: "Pizza Point",
        category: "Pizza",
        price: 299,
        rating: 4.5,
        description: "Crispy pizza topped with melted cheese and delicious Italian-style seasoning.",
        deliveryTime: "25-30 min",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002"
    },

    {
        name: "Classic Burger",
        restaurant: "Burger Hub",
        category: "Burger",
        price: 179,
        rating: 4.4,
        description: "Juicy classic burger with a soft bun, fresh vegetables and tasty sauce.",
        deliveryTime: "20-25 min",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },

    {
        name: "Chocolate Cake",
        restaurant: "Sweet Treats",
        category: "Dessert",
        price: 149,
        rating: 4.7,
        description: "Soft and rich chocolate cake made for a delicious sweet treat.",
        deliveryTime: "20-25 min",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
    },

    {
        name: "Mutton Biryani",
        restaurant: "Royal Biryani",
        category: "Biryani",
        price: 280,
        rating: 4.8,
        description: "Flavorful basmati rice cooked with tender mutton and aromatic spices.",
        deliveryTime: "35-40 min",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe"
    },

    {
        name: "Veg Pizza",
        restaurant: "Pizza Point",
        category: "Pizza",
        price: 249,
        rating: 4.3,
        description: "Fresh vegetable pizza topped with cheese and flavorful seasoning.",
        deliveryTime: "25-30 min",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
    }

];

// ================= CART =================

let cart =
    JSON.parse(localStorage.getItem("foodCart")) || [];


// ================= DISPLAY FOOD =================

function displayFoods(list = foods) {

    const container =
        document.getElementById("foodContainer");

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML = `
            <div class="col-12 text-center">
                <h4>No food found 😕</h4>
            </div>
        `;

        return;
    }

    list.forEach((food) => {

        const originalIndex =
            foods.indexOf(food);

        container.innerHTML += `

        <div class="col-md-6 col-lg-4">

            <div class="card food-card shadow-sm h-100">

                <div class="food-image">

                    <img
                        src="${food.image}"
                        alt="${food.name}"
                        class="img-fluid w-100">

                </div>

                <div class="card-body p-4">

                    <div class="d-flex justify-content-between">

                        <h5 class="fw-bold">
                            ${food.name}
                        </h5>

                        <span class="badge bg-success">
                            ⭐ ${food.rating}
                        </span>

                    </div>

                    <p class="text-secondary mb-2">
                        ${food.restaurant}
                    </p>

                    <p class="fw-bold fs-5">
                        ₹${food.price}
                    </p>

                    <div class="d-flex gap-2">

                        <button
                            class="btn btn-outline-danger w-50"
                            onclick="viewFoodDetails(${originalIndex})">

                            <i class="bi bi-eye"></i>
                            View Details

                        </button>

                        <button
                            class="btn btn-danger w-50"
                            onclick="addToCart(${originalIndex})">

                            <i class="bi bi-cart-plus"></i>
                            Add to Cart

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

}


// ================= ADD CART =================

function addToCart(index) {

    const food = foods[index];

    const existingItem = cart.find(
        item => item.name === food.name
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...food,
            quantity: 1
        });

    }

    updateCartCount();

    alert(`${food.name} added to cart!`);
}
// ================= FOOD DETAILS =================

function viewFoodDetails(index) {

    const food = foods[index];

    document.getElementById("detailsFoodName")
        .innerText = food.name;

    document.getElementById("detailsFoodTitle")
        .innerText = food.name;

    document.getElementById("detailsFoodImage")
        .src = food.image;

    document.getElementById("detailsFoodRestaurant")
        .innerText =
        "Restaurant: " + food.restaurant;

    document.getElementById("detailsFoodCategory")
        .innerText =
        "Category: " + food.category;
    document.getElementById("detailsFoodDescription")
        .innerText = food.description;

    document
        .getElementById("detailsFoodDelivery")
        .querySelector("strong")
        .innerText = food.deliveryTime;

    document.getElementById("detailsFoodPrice")
        .innerText =
        "₹" + food.price;

    document.getElementById("detailsFoodRating")
        .innerText =
        "⭐ " + food.rating;

    document.getElementById("detailsAddButton")
        .onclick = function () {
            addToCart(index);
        };

    const modal =
        new bootstrap.Modal(
            document.getElementById("foodDetailsModal")
        );

    modal.show();
}
// ================= OPEN CART =================

function openCart() {

    const cartItems =
        document.getElementById("cartItems");

    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p class="text-center">Your cart is empty.</p>`;

    } else {

        cartItems.innerHTML = "";

        let total = 0;

        cart.forEach((item, index) => {

            total += item.price * item.quantity;

            cartItems.innerHTML += `

                <div class="border-bottom py-3">

                    <div class="d-flex justify-content-between">

                        <strong>
                            ${item.name}
                        </strong>

                        <strong>
                            ₹${item.price * item.quantity}
                        </strong>

                    </div>

                    <small class="text-secondary">
                        ${item.restaurant}
                    </small>

                    <div class="mt-2">

                        <button
                            class="btn btn-sm btn-outline-danger"
                            onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <span class="mx-3 fw-bold">
                            ${item.quantity}
                        </span>

                        <button
                            class="btn btn-sm btn-outline-success"
                            onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                </div>

            `;
        });

        cartItems.innerHTML += `

            <div class="d-flex justify-content-between mt-4">

                <h5 class="fw-bold">Total</h5>

                <h5 class="fw-bold text-danger">
                    ₹${total}
                </h5>

            </div>

        `;
    }

    const modal =
        new bootstrap.Modal(
            document.getElementById("cartModal")
        );

    modal.show();
}

function changeQuantity(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCartCount();

    localStorage.setItem(
        "foodCart",
        JSON.stringify(cart)
    );

    openCart();
}
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    localStorage.setItem(
        "foodCart",
        JSON.stringify(cart)
    );

    window.location.href = "checkout.html";
}
// ================= REMOVE CART =================

function removeFromCart(index) {

    cart.splice(index, 1);
    localStorage.setItem("foodCart", JSON.stringify(cart));
    updateCartCount();

    openCart();
}


// ================= SEARCH =================

function searchFood() {

    const value =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const result = foods.filter(food =>

        food.name.toLowerCase().includes(value) ||

        food.restaurant.toLowerCase().includes(value) ||

        food.category.toLowerCase().includes(value)

    );

    displayFoods(result);

}


// ================= CATEGORY FILTER =================

function filterFood(category) {

    const result =
        foods.filter(food =>
            food.category === category
        );

    displayFoods(result);

    document
        .getElementById("restaurants")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= LOGIN =================

function openLogin() {

    const modal =
        new bootstrap.Modal(
            document.getElementById("loginModal")
        );

    modal.show();

}


// ================= LOGIN FORM =================

// ================= LOGIN FORM =================

function loginUser() {

    const name =
        document.getElementById("loginName").value.trim();

    if (name === "") {
        alert("Please enter your name");
        return;
    }

    localStorage.setItem("userName", name);

    alert("Login successful!");

    const modal =
        bootstrap.Modal.getInstance(
            document.getElementById("loginModal")
        );

    modal.hide();

    showUserName();
}


// ================= SHOW USER NAME =================

function showUserName() {

    const name =
        localStorage.getItem("userName");

    const userBtn =
        document.getElementById("userBtn");

    if (name && userBtn) {

        userBtn.innerHTML =
            '<i class="bi bi-person-circle"></i> Hi, ' + name;

    }
}

// ================= UPDATE CART COUNT =================

function updateCartCount() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cartCount").innerText = count;
}
// ================= INITIALIZE =================
updateCartCount();
displayFoods();
showUserName();
function loginUser() {

    const name =
        document.getElementById("loginName").value.trim();

    if (name === "") {
        alert("Please enter your name");
        return;
    }

    localStorage.setItem("userName", name);

    alert("Login successful!");

    const modal =
        bootstrap.Modal.getInstance(
            document.getElementById("loginModal")
        );

    modal.hide();
}