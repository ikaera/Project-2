const removeBtn = document.querySelectorAll('.cartRemoveBtn');

const deleteHandler = async (event) => {
    event.preventDefault();

    const id = event.currentTarget.dataset.id;
    console.log(id);

    const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        /* console.log('trying to delete')
        setTimeout(() => {
            document.location.replace('/mycart');
        }, 3000); */
        document.location.reload();
    } else {
        alert(response.statusText);
    }

    /* const result = await response.json();
    console.log('RESULT', result); */
    
};

removeBtn.forEach((btn) => {
    btn.addEventListener('click', deleteHandler);
});