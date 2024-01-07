class Product{
    constructor(name, id, price, imgURL){
        this.name=name;
        this.id=id;
        this.imgURL=imgURL;
        this.price=price;
    }

    
}

class shoppingCart{
    constructor(){
        this.items=[];
    }

    addItem(prod,qty){
        const existingItem=this.items.find((item)=> item.id===prod.id);

        if(existingItem) existingItem.qty+=qty;
        else this.items.push({product: prod, qty: qty})
    }

    removeItem(prodID){
        this.items = this.items.filter(item => item.product.id !== prodID);
    }

    calcTotal(){
        return this.items.reduce((total, item) => total + item.product.price * item.qty, 0);
    }

}

class UI {
    displayProducts(products) {
        const productListContainer = document.querySelector('.items');

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.innerHTML = `
                <p>${product.name}</p>
                <img src="${product.imgURL}" alt="${product.name}" />
                <p>Price: \$${product.price}</p>
                <label for="quantity${product.id}">Qty:</label>
                <input type="number" id="quantity${product.id}" name="quantity" min="1" max="5">
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productListContainer.appendChild(productElement);
        });
    }

  
    displayCart(cart) {
        const cartContainer = document.querySelector('.cart');
    
        cartContainer.innerHTML = `
            <div class="cart-title">Shopping cart</div>
            <div class="amount">Total: ${cart.calcTotal()}</div>
            <div>Items bought</div>
        `;
    
        cart.items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `<p>${item.product.name} - ${item.qty}</p>`;
            cartContainer.appendChild(cartItem);
        });
    }    
  
}

let products = [
    new Product('Monitor', 1, 200, 'assets/ab-testing.png'),
    new Product('RTX 4090', 2, 1500, 'assets/ab-testing.svg'),
    new Product('AMD Ryzen 9 5900X', 2, 400, 'assets/ab-testing.svg'),
    new Product('Motherboard', 2, 200, 'assets/ab-testing.svg'),
    new Product('Keyboard', 2, 50, 'assets/ab-testing.svg'),
    new Product('Mouse', 2, 10, 'assets/ab-testing.svg'),
];

function addToCart(productId) {
    const quantityInput = document.getElementById(`quantity${productId}`);
    
    if (!quantityInput) {
        console.error(`Quantity input not found for product with ID ${productId}`);
        return;
    }

    const quantity = parseInt(quantityInput.value);

    if (!isNaN(quantity) && quantity > 0) {
        const productToAdd = products.find(product => product.id === productId);
        app.shoppingCart.addItem(productToAdd, quantity);
        app.ui.displayCart(app.shoppingCart);
    } else {
        alert('Please enter a valid quantity.');
    }
}


class App {
    constructor() {
        this.prodList = products;
        this.shoppingCart = new shoppingCart();
        this.ui = new UI();
    }

    init() {
        this.ui.displayProducts(this.prodList);
        this.ui.displayCart(this.shoppingCart);
    }
}

const app = new App();
app.init();
