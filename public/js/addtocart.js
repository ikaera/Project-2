// cloning basic logic from Irakli's "saveheart" function, but for the CART

const cartBtn = document.querySelectorAll('.addCartBtn');

const cartFormHandler = async (event) => {
    event.preventDefault();

    const id = event.target.dataset.id;
    console.log("here is cart id", id);

    if (id) {
        console.log("====================================================");
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

// when this is noted out, the cart add works?!
/* const removeBtn = document.querySelectorAll('.cartRemoveBtn');

const deleteHandler = async (event) => {
    event.preventDefault();

    const id = event.target.dataset.id;
    console.log(id);

    const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    console.log('RESULT', result);
};

removeBtn.forEach((btn) => {
    btn.addEventListener('click', deleteHandler);
}); */

// need to add cart purchase set up
const checkoutBtn = document.querySelectorAll('.cartPurchaseBtn');