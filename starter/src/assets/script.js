
/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
let products = [];

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/
products = [
  {
    name: "Carton of Cherries",
    price: 4,
    quantity: 0,
    productId: 1010,
    image: "../images/cherry.jpg"
  },
  {
    name: "Carton of Strawberries",
    price: 5,
    quantity: 0,
    productId: 1020,
    image: "../images/strawberry.jpg"
  },
  {
    name: "Bag of Oranges",
    price: 10,
    quantity: 0,
    productId: 1030,
    image: "../images/orange.jpg"
  }
]

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */
let cart = [];

/* a helper function when retrieving products by their productId. */ 
function getProductByIdFromList(productId, productList) {
    return productList.find((product) => product.productId === productId);
}

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/


function addProductToCart(productId) {
  const productToAdd = getProductByIdFromList(productId, products)

  if (productToAdd) {
    const existingProduct = getProductByIdFromList(productId, cart)

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ ...productToAdd, quantity: 1 });
    }
    productToAdd.quantity++;
  }
}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/
function increaseQuantity(productId) {
  // Find the product in the products array based on productId
  const productToIncrease = getProductByIdFromList(productId, products)

  if (productToIncrease) {
    // Increase the quantity of the product
    productToIncrease.quantity++;

    // Increase the cart's quantity
    const cartProduct = getProductByIdFromList(productId, cart)
    if (cartProduct) {
      cartProduct.quantity++;
    }
  }
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
function decreaseQuantity(productId) {
  const productToDecrease = getProductByIdFromList(productId, products)

  if (productToDecrease) {
    productToDecrease.quantity = productToDecrease.quantity - 1;

    const cartProduct = getProductByIdFromList(productId, cart);
    if (cartProduct) {
      cartProduct.quantity = cartProduct.quantity - 1;

      // If the quantity in the cart reaches 0, remove the product from the cart
      if (cartProduct.quantity === 0) {
        const index = cart.indexOf(cartProduct);
        if (index !== -1) {
          cart.splice(index, 1);
        }
      }
    }
  }
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
function removeProductFromCart(productId) {
  // Find the product in the products array based on productId
  const productToRemove = getProductByIdFromList(productId, products)

  if (productToRemove) {
    productToRemove.quantity = 0;

    const cartProduct = getProductByIdFromList(productId, cart);

    if (cartProduct) {
      const index = cart.indexOf(cartProduct);
      if (index !== -1) {
        cart.splice(index, 1);
      }
    }
  }
}

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total of all products
  - cartTotal should return the sum of the products in the cart
*/
function cartTotal() {
  let total = 0;

  for (const cartProduct of cart) {
    const product = products.find(prod => prod.productId === cartProduct.productId);

    if (product) {
      total += product.price * cartProduct.quantity;
    }
  }

  return total;
}

/* Create a function called emptyCart that empties the products from the cart */
function emptyCart() {
  cart.length = 0;
}

/* Create a function named pay that takes in an amount as an argument
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
*/
// function pay(amount) {
//   const totalAmount = cartTotal();
//   const change = amount - totalAmount;

//   return change;
// }
// 
let totalPaid = 0;
let remaining = 0;
function pay(amount) {
    totalPaid += amount;

    remaining = totalPaid - cartTotal();
    if (remaining >= 0) {
        // If so, reset the `totalPaid` to zero to prepare it for the next
        // payment, as the current payment is enough to cover the `cartTotal`.
        totalPaid = 0;
        document.querySelector(".cart").innerHTML = 'Cart Empty'
    }

    // Return the remaining (negative if payment is less than the cartTotal)
    return remaining;
}
/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay, 
   emptyCart,
   /* Uncomment the following line if completing the currency converter bonus */
   // currency
}
