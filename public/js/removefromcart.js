const removeBtn = document.querySelectorAll('.cartRemoveBtn');

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
});