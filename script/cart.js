document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsDiv = document.getElementById('cart-items');
    let totalAmountSpan = document.getElementById('total-amount');
    let totalAmount = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty.</td></tr>';
        totalAmountSpan.textContent = 'R 0.00'; // Set total amount to R 0.00 when cart is empty
    } else {
        cartItemsDiv.innerHTML = '';
        cart.forEach(item => {
            let itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;

            cartItemsDiv.innerHTML += `
                <tr>
                    <td>
                        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;">
                        ${item.name}
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary quantity-decrease" data-id="${item.id}">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary quantity-increase" data-id="${item.id}">+</button>
                    </td>
                    <td>R ${item.price}</td>
                    <td>R ${itemTotal}</td>
                    <td>
                        <button class="btn btn-danger remove-item" data-id="${item.id}">Remove</button>
                    </td>
                </tr>
            `;
        });

        totalAmountSpan.textContent = `R ${totalAmount.toFixed(2)}`;
    }

    document.querySelectorAll('.quantity-decrease').forEach(button => {
        button.addEventListener('click', (event) => {
            updateQuantity(event.target.getAttribute('data-id'), -1);
        });
    });

    document.querySelectorAll('.quantity-increase').forEach(button => {
        button.addEventListener('click', (event) => {
            updateQuantity(event.target.getAttribute('data-id'), 1);
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            removeFromCart(event.target.getAttribute('data-id'));
        });
    });
}

function updateQuantity(id, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.map(item => {
        if (item.id == id) {
            item.quantity += delta;
            if (item.quantity < 1) item.quantity = 1;
        }
        return item;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function updateCart() {
    let itemQuantityInputs = document.querySelectorAll('.item-quantity');

    itemQuantityInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            let index = parseInt(e.target.dataset.index);
            let newQuantity = parseInt(e.target.value);
            updateQuantity(index, newQuantity - JSON.parse(localStorage.getItem('cart'))[index].quantity);
        });
    });
}
