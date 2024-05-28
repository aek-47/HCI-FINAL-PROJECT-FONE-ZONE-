document.addEventListener('DOMContentLoaded', function () {
    const products = [
        { id: 1, name: "Iphone 11", price: 150, img: "iphone11.png" },
        { id: 2, name: "Iphone 12", price: 299, img: "iphone12.png" },
        { id: 3, name: "Iphone 13", price: 99, img: "iphone13.png" },
        { id: 4, name: "Iphone 14", price: 100, img: "iphone14.png" },
        { id: 5, name: "Iphone 15", price: 50, img: "iphone15.png"},
    ];

    let cart = [];

    function addProductToDOM(product) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button class="addToCart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        document.getElementById('products').appendChild(productDiv);
    }

    function updateCart() {
        const cartList = document.getElementById('cart');
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price} `;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.onclick = function() { removeFromCart(index); };
            removeBtn.className = 'remove-btn';
            li.appendChild(removeBtn);
            cartList.appendChild(li);
            total += item.price;
        });
        document.getElementById('total').textContent = `Total: $${total}`;
        document.getElementById('checkout-button').innerHTML = cart.length > 0 ? '<button onclick="checkout()" id="checkout-button">Checkout</button>' : '<p>Your cart is empty.</p>';
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    window.addToCart = function (productId) {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        updateCart();
    };

    window.checkout = function() {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        if (confirm("Do you want to proceed to checkout?")) {
            document.getElementById('billing-form').style.display = 'block';
        }
    };

    window.processPayment = function() {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const card = document.getElementById('card').value;
        const visa = document.getElementById('visa').value;

        if (name && address && phone && card && visa) {
            alert("Thank you for your purchase!");
            cart = []; // Clears the cart array
            updateCart(); // Update the UI after checkout
            document.getElementById('billing-form').style.display = 'none';
            document.getElementById('billing-info').reset();
        } else {
            alert("Please fill in all billing information.");
        }
    };

    products.forEach(addProductToDOM);
});

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].style.backgroundColor = "#bbb";
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].style.backgroundColor = "#717171";
}

