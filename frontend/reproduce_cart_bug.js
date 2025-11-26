const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let token = '';
let productId = '';

async function run() {
    try {
        // 1. Login (assuming we have a user, or create one)
        const email = `test${Date.now()}@example.com`;
        const password = 'password123';

        console.log('Registering user...');
        try {
            await axios.post(`${API_URL}/auth/register`, {
                name: 'Test User',
                email,
                password,
                role: 'user'
            });
        } catch (e) {
            // If user exists, login
            console.log('Registration failed (might exist):', e.message);
        }

        console.log('Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email,
            password
        });
        token = loginRes.data.accessToken;
        console.log('Logged in. Token:', token ? 'Yes' : 'No');

        // 2. Get a product
        console.log('Fetching products...');
        const productsRes = await axios.get(`${API_URL}/products`);
        const product = productsRes.data.data[0]; // Get first product
        productId = product._id;
        const originalPrice = product.price;
        console.log(`Product ID: ${productId}, Price: ${originalPrice}`);

        // 3. Add to cart (Qty 1)
        console.log('Adding to cart (Qty 1)...');
        const addRes = await axios.post(`${API_URL}/carts/cart/item`, {
            product: productId,
            quantity: 1
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        let cartItem = addRes.data.data.items.find(i => i.product._id === productId);
        console.log(`Cart Item Price (Qty 1): ${cartItem.price}`);

        if (cartItem.price !== originalPrice) {
            console.error('ERROR: Price mismatch on add!');
        }

        // 4. Update quantity (Qty 2)
        console.log('Updating quantity (Qty 2)...');
        const updateRes = await axios.post(`${API_URL}/carts/cart/item`, {
            product: productId,
            quantity: 2
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        cartItem = updateRes.data.data.items.find(i => i.product._id === productId);
        console.log(`Cart Item Price (Qty 2): ${cartItem.price}`);

        if (cartItem.price !== originalPrice) {
            console.error('ERROR: Price changed on update!');
            console.error(`Expected: ${originalPrice}, Got: ${cartItem.price}`);
        } else {
            console.log('SUCCESS: Price remained constant.');
        }

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

run();
