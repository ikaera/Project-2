// cloning basic logic from Irakli's "saveheart" function, but for the CART

const cartBtn = document.querySelectorAll('.addCartBtn');

const cartFormHandler = async (event) => {
    event.preventDefault();

    const id = event.target.dataset.id;
    console.log(id);

    if (id) {
        const response = await fetch ('/api/cart', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        console.log(result);
    }
};

cartBtn.forEach((btn) => {
    btn.addEventListener('click', cartFormHandler);
});