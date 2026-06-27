let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const wishlistItems = document.getElementById("wishlistItems");
const totalPrice = document.getElementById("totalPrice");

updateCart();
updateWishlist();

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 2000);
}

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", function () {

        const card =
            this.closest(".product-card");

        const name =
            card.querySelector("h3").innerText;

        const priceText =
            card.querySelector(".price").innerText;

        const price =
            parseInt(
                priceText.replace(/[₹,]/g, "")
            );

        cart.push({
            name,
            price
        });

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        updateCart();

        showToast("✅ Added to Cart");

    });

});

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        const li =
            document.createElement("li");

        li.innerHTML = `
            ${item.name} - ₹${item.price.toLocaleString()}
            <button onclick="removeCartItem(${index})">
                ❌
            </button>
        `;

        cartItems.appendChild(li);

    });

    cartCount.textContent =
        cart.length;

    totalPrice.textContent =
        total.toLocaleString();

}

function removeCartItem(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();

}


document.querySelectorAll(".wishlist-btn")
.forEach(button => {

    button.addEventListener("click", function () {

        const card =
            this.closest(".product-card");

        const name =
            card.querySelector("h3").innerText;

        wishlist.push(name);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        updateWishlist();

        showToast("❤️ Added to Wishlist");

    });

});


function updateWishlist() {

    wishlistItems.innerHTML = "";

    wishlist.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        wishlistItems.appendChild(li);

    });

}

const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

    const value =
        searchInput.value.toLowerCase();

    const cards =
        document.querySelectorAll(
            ".product-card"
        );

    cards.forEach(card => {

        const name =
            card.querySelector("h3")
            .innerText
            .toLowerCase();

        if (name.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});

document
.querySelectorAll(".filter-btn")
.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const category =
                this.dataset.category;

            const cards =
                document.querySelectorAll(
                    ".product-card"
                );

            cards.forEach(card => {

                if (
                    category === "all" ||
                    card.dataset.category === category
                ) {

                    card.style.display =
                        "block";

                } else {

                    card.style.display =
                        "none";

                }

            });

        }
    );

});


const modal =
document.getElementById(
    "productModal"
);

const modalTitle =
document.getElementById(
    "modalTitle"
);

const modalDescription =
document.getElementById(
    "modalDescription"
);

const closeBtn =
document.querySelector(".close");

document
.querySelectorAll(".details-btn")
.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const card =
                this.closest(
                    ".product-card"
                );

            modalTitle.innerText =
                card.querySelector("h3")
                .innerText;

            modalDescription.innerText =
                card.querySelector("p:not(.price)")
                .innerText;

            modal.style.display =
                "block";

        }
    );

});

closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {

    if (e.target === modal) {
        modal.style.display = "none";
    }

};

const themeBtn =
document.getElementById(
    "themeBtn"
);

if (
    localStorage.getItem(
        "theme"
    ) === "dark"
) {

    document.body.classList.add(
        "dark-mode"
    );

}

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );

        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            localStorage.setItem(
                "theme",
                "dark"
            );

        } else {

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    }
);

document
.getElementById(
    "applyCoupon"
)
.addEventListener(
    "click",
    () => {

        const code =
            document
            .getElementById(
                "couponInput"
            )
            .value;

        let total =
            cart.reduce(
                (sum, item) =>
                    sum + item.price,
                0
            );

        if (
            code.toUpperCase() ===
            "SAVE10"
        ) {

            total =
                total -
                total * 0.10;

            totalPrice.textContent =
                Math.round(
                    total
                ).toLocaleString();

            showToast(
                "🎉 10% Discount Applied"
            );

        } else {

            showToast(
                "❌ Invalid Coupon"
            );

        }

    }
);

document
.getElementById(
    "checkoutBtn"
)
.addEventListener(
    "click",
    () => {

        if (
            cart.length === 0
        ) {

            alert(
                "Your cart is empty!"
            );

            return;
        }

        alert(
            "✅ Order Placed Successfully!"
        );

        cart = [];

        localStorage.removeItem(
            "cart"
        );

        updateCart();

    }
);

const topBtn =
document.getElementById(
    "topBtn"
);

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 300
        ) {

            topBtn.style.display =
                "block";

        } else {

            topBtn.style.display =
                "none";

        }

    }
);

topBtn.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);