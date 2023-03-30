const favoriteBtn = document.querySelectorAll('.addFavoriteBtn');

const favoriteFormHandler = async (event) => {
  event.preventDefault();

  // const name = document.querySelector('#username-signup').value.trim();
  // const email = document.querySelector('#email-signup').value.trim();
  // const password = document.querySelector('#password-signup').value.trim();

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
    // if (response.ok) {
    //   document.location.replace('/profile');
    // } else {
    //   alert(response.statusText);
    // }
  }
};

favoriteBtn.forEach((btn) => {
  btn.addEventListener('click', favoriteFormHandler);
});

// delete btn
const deleteBtn = document.querySelectorAll('.favRemoveBtn');

const deleteHandler = async (event) => {
  event.preventDefault();

  // const favId = window.location.toString().split('/')[
  //   window.location.toString().split('/').length - 1
  // ];
  const id = event.target.dataset.id;
  console.log(id);

  // if (id) {
  const response = await fetch(`/api/favorites/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await response.json();
  console.log('RESULT', result);
  // if (response.ok) {
  //   document.location.replace('/profile');
  // } else {
  //   alert(response.statusText);
  // }
};
// };
deleteBtn.forEach((btn) => {
  btn.addEventListener('click', deleteHandler);
});
