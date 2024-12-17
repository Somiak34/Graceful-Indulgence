(async function () {
    let dataCards = document.getElementById('data');
    let searchInput = document.getElementById("searchInput");


    let products = await fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => data.products)
        .catch(error => {
            console.error("Error fetching products:", error);
            return [];
        });

   
    const displayProducts = (productsToDisplay) => {
        let html = "";

        productsToDisplay.forEach((e) => {
            html += `
            <div class="item">
                <div class="item-img">
                    <img src="${e.images[0]}" alt="Product Image" />
                </div>
                <div class="item-content">
                    <h1>${e.title}</h1>
                    <p>${e.description}</p>
                    <p>${e.category}</p>
                    <h4>Price: <span>${e.price}</span> Rs</h4>
                    <div class="item-link">
                        <button onClick="addtocart('${e.id}')" class="btn">
                            <i class="fa-brands fa-opencart"></i> Add To Cart
                        </button>
                    </div>
                </div>
            </div>
            `;
        });

        dataCards.innerHTML = html;
    };

    window.addtocart = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {

            signupForm.style.opacity = 1;
            loginForm.classList.remove('show');
            alert("Please sign up to add items to the cart.");
            return;
        }

        let cartItems = JSON.parse(localStorage.getItem("data")) || [];
        const existingItem = cartItems.find((item) => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
            alert("Item already exists. Quantity updated.");
        } else {
            const newItem = { id: id, quantity: 1 };
            cartItems.push(newItem);
            alert("Item added to cart successfully.");
        }

        localStorage.setItem("data", JSON.stringify(cartItems));

     
        document.getElementById('quantity').innerHTML = `(${cartItems.length})`;
    };


    displayProducts(products);

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(query) || 
            product.category.toLowerCase().includes(query) || 
            product.description.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts);
    });
})();


    let signupForm = document.getElementById('signup-form');
    let loginForm = document.getElementById('login-form');
    const switchToLogin = document.getElementById('switch-to-login');
    const switchToSignup = document.getElementById('switch-to-signup');

    switchToLogin.addEventListener('click', () => {
        signupForm.style.opacity = 0;
        loginForm.classList.add('show');
    });


    switchToSignup.addEventListener('click', () => {
        loginForm.classList.remove('show');
        signupForm.style.opacity = 1;
    });


    const signupFormElement = document.getElementById('signup');
    signupFormElement.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email-signup').value;
        const password = document.getElementById('password-signup').value;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if (!emailRegex.test(email)) {
            alert('Invalid email format!');
            return;
        }

        if (!passwordRegex.test(password)) {
            alert('Password must be between 6 and 20 characters and contain at least one numeric digit, one uppercase letter, and one lowercase letter!');
            return;
        }

        const user = {
            username,
            email,
            password,
        };

        localStorage.setItem('user', JSON.stringify(user));

        alert('Signup successful!');
        signupForm.style.opacity = 0;
        loginForm.classList.add('show');
    });

    const loginFormElement = document.getElementById('login');
    loginFormElement.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email-login').value;
        const password = document.getElementById('password-login').value;

        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser) {
            alert('No user found! Please sign up first.');
            return;
        }

        if (email !== storedUser.email || password !== storedUser.password) {
            alert('Invalid email or password!');
            return;
        }

        alert('Login successful!')
        window.location.href = "collection.html"
    });

   