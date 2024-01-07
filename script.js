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

    }

    calcTotal(){

    }

}

class UI {
    displayProducts(products) {
        const productListContainer = document.querySelector('.items');

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.innerHTML = `
                <p>${product.name}</p>
                <img src="${product.imageURL}" alt="${product.name}" />
                <p>${product.price}</p>
                <input type=""
                <label for="quantity">Qty:</label>
                <input type="number" id="quantity" name="quantity" min="1" max="5">
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productListContainer.appendChild(productElement);
        });

    }
  
    displayCart(cart) {
        const cartContainer=document.querySelector('.cart');

        cartContainer.innerHTML=`
        <div class="cart-title">Shopping cart</div>
        <div class="amount">Total: ${cart.total}</div>
        <div>Items bought</div>`;

        const cartItems=document.querySelectorAll('cart-item');
        cartItems.forEach(item=>{
            item.innerHTML=`
                <p>${item.name}- ${item.qty}`;
            cartContainer.appendChild(item)
        });      
    }
  
}

let products = [
    new Product('Product 1', 1, 100, 'assets/ab-testing.svg'),
    new Product('Product 2', 2, 200, 'assets/ab-testing.svg'),
    // Add more products as needed
];

class App {
    constructor() {
        this.prodList = products;
        this.shoppingCart = new shoppingCart();
        this.ui = new UI();
    }

    init() {
        this.ui.displayProducts(this.prodList);
        this.ui.displayCart(this.shoppingCart);
        // Other initialization logic
    }
}

const app = new App();
app.init();
