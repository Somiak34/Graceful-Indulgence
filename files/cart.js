
document.addEventListener('DOMContentLoaded', function () {
  let cartTbody = document.getElementById('cart');
  let products = [];
  
  fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
          products = data.products;
          renderCartItems();
      })
      .catch(error => {
          console.error("Error fetching products:", error);
      });

  function renderCartItems() {
      const cartItems = JSON.parse(localStorage.getItem("data")) || [];
      cartTbody.innerHTML = ''; 

      cartItems.forEach((cartItem, index) => {
          const product = products.find(product => product.id == cartItem.id);
          if (product) {
              const row = document.createElement('tr');
              const totalPrice = product.price* cartItem.quantity;
              row.innerHTML = `
                  <td>${index + 1}</td>
                  <td><img src="${product.images[0]}" alt="" class="img" width="100px"></td>
                  <td class="title">${product.title}</td>
                  <td><input type="number" value="${cartItem.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
                  <td>Rs <span>${totalPrice.toFixed(2)}</span></td>
                  <td><button onclick="removeItem(${index})">Remove</button></td>
              `;
              cartTbody.appendChild(row);
          }
      });
  }

  window.updateQuantity = function (index, newQuantity) {
      const cartItems = JSON.parse(localStorage.getItem("data")) || [];
      cartItems[index].quantity = parseInt(newQuantity);
      localStorage.setItem('data', JSON.stringify(cartItems));
      renderCartItems();
  };

  window.removeItem = function (index) {
      const cartItems = JSON.parse(localStorage.getItem("data")) || [];
      cartItems.splice(index, 1);
      localStorage.setItem('data', JSON.stringify(cartItems));
      renderCartItems();
      alert("Item removed successfully");
  };
renderCartItems();
document.getElementById('quantity').innerHTML = `(${cartItems.length})`
});
