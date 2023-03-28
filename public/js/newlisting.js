const newListingForm = document.getElementById('new-listing-form');

const newListingHandler = async (event) => {
    event.preventDefault();

    const listingArtist = document.getElementById('listing-artist').value.trim();
    const listingAlbum = document.getElementById('listing-title').value.trim();
    const listingFormat = document.getElementById('listing-format').value.trim();
    const listingDesc = document.getElementById('listing-desc').value.trim();
    const listingDate = document.getElementById('listing-release').value.trim();
    const listingCover = document.getElementById('listing-cover').value.trim();
    const listingCondition = document.getElementById('listing-condition').value.trim();
    const listingLabel = document.getElementById('listing-label').value.trim();
    const listingPrice = document.getElementById('listing-price').value.trim();
    const listingGenre = document.getElementById('listing-genre').value.trim();

    if (!listingArtist || !listingAlbum || !listingFormat || !listingDesc || !listingDate || !listingCover || !listingCondition || !listingLabel || !listingPrice || !listingGenre) {
        const listingStatus = document.createElement('h2');
        listingStatus.classList.add('listing-status');
        document.querySelector('listing-status').style.display = 'flex';
        listingStatus.textContent = 'All fields must be filled!';
        listingStatus.style.color = 'red';
        setTimeout(() => {
            document.querySelector('listing-status').style.display = 'none';
        }, 3000);
    } else {
        const response = await fetch('/api/listings', {
            method: 'POST',
            body: JSON.stringify({
                listingArtist,
                listingAlbum,
                listingFormat,
                listingDesc,
                listingDate,
                listingCover,
                listingCondition,
                listingLabel,
                listingPrice,
                listingGenre,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const listingStatus = document.createElement('h2');
            listingStatus.classList.add('listing-status');
            document.querySelector('listing-status').style.display = 'flex';
            listingStatus.textContent = 'Listing Added Successfully!';
            listingStatus.style.color = 'green';
            setTimeout(() => {
                document.location.replace('/profile');
            }, 3000);
        } else {
            alert(response.statusText)
        }
    }
};

newListingForm.addEventListener('submit', newListingHandler);