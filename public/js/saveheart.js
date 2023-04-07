const favoriteBtn = document.querySelectorAll('.addFavoriteBtn');

const favoriteFormHandler = async (event) => {
  event.preventDefault();

  const id = event.target.dataset.id;
  console.log(id);

  if (id) {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    console.log(result);
  }
};

favoriteBtn.forEach((btn) => {
  btn.addEventListener('click', favoriteFormHandler);
});

// delete btn
const deleteBtn = document.querySelectorAll('.favRemoveBtn');

const deleteHandler = async (event) => {
  event.preventDefault();

  const id = event.target.dataset.id;
  console.log(id);

  const response = await fetch(`/api/favorites/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: { 'Content-Type': 'application/json' },
  });

  // copied over from removefromcart so that any time an item is removed from cart, the page automatically refreshes
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText)
  }

  /* const result = await response.json();
  console.log('RESULT', result); */

};

deleteBtn.forEach((btn) => {
  btn.addEventListener('click', deleteHandler);
});