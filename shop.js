const header = document.querySelector("header");

window.addEventListener ("scroll", function(){
    header.classList.toggle ("sticky", this.window.scrollY > 0);
})

let menu = document.querySelector('#menu-icon');
let navmenu = document.querySelector('.navmenu');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navmenu.classList.toggle('open');
}


// Select DOM elements 
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');

// Create cart array to store items
let cart = [
    {
      title: 'Product 1', 
      price: '$29.99',
      quantity: 1 
    },
    {
      title: 'Product 2',
      price: '$14.99', 
      quantity: 2
    }
  ];

// Button click event to add item to cart
addToCartBtns.forEach(btn => {
  btn.addEventListener('click', addToCart);
})

// Add item to cart
function addToCart(e){
  // Get product info
  let product = e.target.parentElement;
  let title = product.querySelector('h4').textContent;
  let price = product.querySelector('p').textContent;
  
  // Add product to cart array
  let item = {
    title: title, 
    price: price,
    quantity: 1
  }
  
  // Check if item already in cart
  let inCart = cart.filter(cartItem => cartItem.title === title).length > 0;
  
  if(inCart){
    // Item already in cart, update quantity
    cart = cart.map(cartItem => {
      if(cartItem.title === title){
        cartItem.quantity++;
      }
      return cartItem;
    })
  } else {
    // Item not in cart, add new item
    cart.push(item);
  }

  // Display cart items
  displayCartItems();
  
  // Show cart total
  showCartTotal();
}

// Calculate and show cart total
function showCartTotal(){
  let total = cart.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0)

  cartTotal.innerText = `Total: $${total}`;
}

// Display cart items 
function displayCartItems(){
  cartItems.innerHTML = '';
  
  cart.forEach(item => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <h4>${item.title}</h4>
        <p>${item.price} x ${item.quantity} = $${item.price * item.quantity}</p>
      </div>  
    `;
  });
}
