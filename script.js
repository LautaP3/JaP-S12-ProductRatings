const URL = 'https://fakestoreapi.com/products'

document.addEventListener("DOMContentLoaded", function (e) {
    fetchData(URL)
})

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        showProducts(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function showProducts(products) {
    const productsList = document.getElementById('products');
    productsList.innerHTML = '';

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    products.forEach(product => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-group-item');

        const cutTitle = cutString(product.title, 20);
        const roundedRate = Math.round(product.rating.rate);

        listItem.innerHTML = `
            <h5>${cutTitle}</h5>
            <div>${formattedDate} ${stars(roundedRate)}</div>
        `;

        productsList.appendChild(listItem);
    });
}

function stars(cantidad) {
    const starContainer = document.createElement('div');
    starContainer.classList.add('stars');

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.classList.add('fa', 'fa-star');

        if (i <= cantidad) {
            star.classList.add('checked'); 
        }
        starContainer.appendChild(star);
    }

    return starContainer.outerHTML;
}

function cutString(string, maxLength) {
    if (string.length <= maxLength) {
        return string;
    } else {
        return string.slice(0, maxLength) + '...';
    }
}