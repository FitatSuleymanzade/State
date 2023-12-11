const div = document.getElementById('productsList')
const btn = document.getElementById('pagi')

let page = 1
let limit = 3

async function getProducts() {
    let skip = (page = 1) * limit;
    try {
        const response = await axios.get(`https://655c30a1ab37729791aa03c7.mockapi.io/fi/products?page=${page}&limit=${limit}&skip=${skip}`);
        const data = await response.data;
        db = data

        db.forEach(item => {
            const box = document.createElement('div');
            box.className = 'boxDiv';
            box.innerHTML = `
                <p class='title'>${item.title}</p>
                <img src ='${item.image}' alt="">
                <button onclick="addToBasket(${item.id})">Add to basket</button>
            `;
            div.appendChild(box);
        });
        page++;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

btn.addEventListener('click', getProducts)

function addToBasket (id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push(db.find(item => item.id == id))
    localStorage.setItem('cart', JSON.stringify(cart))
}
window.onload = () => {
    getProducts()
}


