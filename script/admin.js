// Product Constructor
function CreateItem(id, name, category, image, description, price, quantity) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.image = image;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
}

// Sample data for initialization
let item1 = new CreateItem(1, 'Floral Puffy Dress', 'Dresses', 'https://i.postimg.cc/FHMcD8zx/20240610-153941-removebg-preview.png', 'Floral Puffy Dress Green Cream', 200.00, 1);
let item2 = new CreateItem(2, 'Floral A-line Dress', 'Dresses', 'https://i.postimg.cc/ZqNPmZ2g/20240610-153540-removebg-preview.png', 'Floral A-line Dress Pink White', 250.00, 1);
let item3 = new CreateItem(3, 'Silver Necklace', 'Accessories', 'https://i.postimg.cc/W3Rnqt0T/96189ee8aec7cb7bb07561283f784bb8-removebg-preview-removebg-preview.png', 'Silver Necklace Purple Accessory', 60.00, 1);
let item4 = new CreateItem(4, 'Silver Bracelet', 'Accessories', 'https://i.postimg.cc/Wbb1cnxc/20240610-153618-removebg-preview-removebg-preview-removebg-preview.png', 'Silver Bracelet Pink Accessory', 50.00, 1);
let item5 = new CreateItem(5, 'Pink Butterfly Heel', 'Shoes', 'https://i.postimg.cc/rm8DHkk5/20240610-153700-removebg-preview.png', 'Pink High heel Butterfly', 250.00, 1);
let item6 = new CreateItem(6, 'Purple Butterfly Heel', 'Shoes', 'https://i.postimg.cc/wvv6JTz4/20240610-153618-removebg-preview-removebg-preview.png', 'Purple High heel Butterfly', 300.00, 1);
let item7 = new CreateItem(7, 'Silver Bracelet', 'Accessories', 'https://i.postimg.cc/NMpkJDWf/Untitled1-removebg-preview.png', 'Silver Bracelet Purple Accessory', 50.00, 1);
let item8 = new CreateItem(8, 'Floral Puffy Dress', 'Dresses', 'https://i.postimg.cc/xTWc2HQf/20240610-155942-removebg-preview.png', 'Floral Puffy Dress Green Pink Cream', 200.00, 1);
let item9 = new CreateItem(9, 'Pink Floral Heel', 'Shoes', 'https://i.postimg.cc/SRLdLqk3/Whats-App-Image-2024-06-13-at-16-15-27-c94f6619-removebg-preview.png', 'Pink High heel Floral', 220.00, 1);
let item10 = new CreateItem(10, 'Pink Floral Heel', 'Shoes', 'https://i.postimg.cc/HLpRcc2X/Whats-App-Image-2024-06-13-at-12-49-46-b9935eba-removebg-preview.png', 'Pink High heel Floral', 220.00, 1);
let item11 = new CreateItem(11, 'Pink Floral Heel', 'Shoes', 'https://i.postimg.cc/PJQ8x5Q3/Whats-App-Image-2024-06-13-at-12-49-45-c9b9642f-removebg-preview.png', 'Pink High heel Floral', 220.00, 1);
let item12 = new CreateItem(12, 'Pink Floral Heel', 'Shoes', 'https://i.postimg.cc/RVNxTbjh/Whats-App-Image-2024-06-13-at-12-49-46-f64f7c65-removebg-preview-1.png', 'Pink High heel Floral', 220.00, 1);

// Array to store items
let items = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12];

// Function to display products in the table
function displayProducts() {
    const productsTableBody = document.getElementById('productsTableBody');
    productsTableBody.innerHTML = '';

    items.forEach((product, index) => {
        const row = `
            <tr>
                <td><img src="${product.image}" alt="${product.name}" class="img-thumbnail"></td>
                <td>${product.name}</td>
                <td>R ${product.price.toFixed(2)}</td> <!-- Displaying price in Rands -->
                <td>
                    <button class="btn btn-info btn-sm" onclick="editProduct(${index})" id="edit-btn">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>
        `;
        productsTableBody.innerHTML += row;
    });
}


// Function to delete a product
function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        displayProducts();
    }
}

// Function to edit a product
// Function to edit a product
function editProduct(index) {
    const product = items[index];
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductImage').value = product.image;

    // Update submit event to save changes
    document.getElementById('editProductForm').onsubmit = function (e) {
        e.preventDefault();
        product.name = document.getElementById('editProductName').value;
        product.price = parseFloat(document.getElementById('editProductPrice').value);
        product.image = document.getElementById('editProductImage').value;

        localStorage.setItem('items', JSON.stringify(items));
        displayProducts();
        const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
        editProductModal.hide();
    };

    // Show modal for editing product
    const editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));
    editProductModal.show();

    // Handle modal close event
    editProductModal.addEventListener('hidden.bs.modal', function () {
        // Clear form and reset submit event
        document.getElementById('editProductForm').reset();
        document.getElementById('editProductForm').onsubmit = null;
    });
}


// Function to sort products by price
document.getElementById('sortProductsBtn').addEventListener('click', function () {
    items.sort((a, b) => a.price - b.price);
    localStorage.setItem('items', JSON.stringify(items));
    displayProducts();
});

// Initialize
displayProducts();

// Function to add a new product
document.getElementById('addProductBtn').addEventListener('click', function () {
    const addProductModal = new bootstrap.Modal(document.getElementById('addProductModal'));
    addProductModal.show();

    // Handle form submission for adding a product
    document.getElementById('addProductForm').onsubmit = function (e) {
        e.preventDefault();
        
        // Generate a unique ID for the new product
        const newProductId = items.length + 1;

        // Create a new product object
        const newProduct = new CreateItem(
            newProductId,
            document.getElementById('productName').value,
            'Uncategorized',  // You can add category input if needed
            document.getElementById('productImage').value,
            '',  // Optional: Add description input if needed
            parseFloat(document.getElementById('productPrice').value),
            1   // Default quantity
        );

        // Add the new product to the items array
        items.push(newProduct);

        // Update local storage
        localStorage.setItem('items', JSON.stringify(items));

        // Display updated products
        displayProducts();

        // Close the modal
        addProductModal.hide();

        // Reset the form
        document.getElementById('addProductForm').reset();
    };
});