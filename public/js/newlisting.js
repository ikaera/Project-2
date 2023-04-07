const newListingForm = document.getElementById('new-listing-form');

const newListingHandler = async (event) => {
    event.preventDefault();

    const listingArtist = document.getElementById('listing-artist').value.trim();
    const listingAlbum = document.getElementById('listing-name').value.trim();
    const listingFormat = document.getElementById('listing-format').value.trim();
    const listingDesc = document.getElementById('listing-desc').value.trim();
    const listingDate = document.getElementById('listing-release').value.trim();
    const listingCondition = document.getElementById('listing-condition').value.trim();
    const listingLabel = document.getElementById('listing-label').value.trim();
    const listingPrice = document.getElementById('listing-price').value.trim();
    const listingGenre = document.getElementById('listing-genre').value.trim();
    const listingCover = document.getElementById('listing-cover').value.trim();
    /* adjustments for multer */
    // NEED WORK!!!! NOT WORKING!!!!
    /* let listingCover = document.getElementById('listing-cover').value.trim();

    if (listingCover = null) {
        listingCover = document.getElementById('uploaded_file').value;
    };
    */

    /* const listingCoverLink = document.getElementById('listing-cover').value.trim();
    const listingCoverFile = document.getElementById('uploaded_file').value;

    if (!listingCoverLink) {
        const listingCoverUse = listingCoverFile;
    } else {
        const listingCoverUse = listingCoverLink;
    };

    const listingCover = listingCoverUse; */

    if (!listingArtist || !listingAlbum || !listingFormat || !listingDesc || !listingDate || !listingCover || !listingCondition || !listingLabel || !listingPrice || !listingGenre) {
        /* improving the formatting so that the status is shown as an h2 within a form-group div, following the submit button*/
        const listingStatusEl = document.createElement('div');
        listingStatusEl.classList.add('form-group');
        listingStatusEl.classList.add('status-div');
        newListingForm.appendChild(listingStatusEl);
        // query selector can't work until AFTER something is appended onto the page!!!
        document.querySelector('.status-div').style.display = 'flex';
        const listingStatus = document.createElement('h2');
        listingStatus.classList.add('listing-status')
        listingStatus.textContent = 'All fields must be filled!';
        listingStatus.style.color = 'red';
        listingStatusEl.appendChild(listingStatus);
        setTimeout(() => {
            document.querySelector('.status-div').style.display = 'none';
        }, 3000);
    } else {
        const response = await fetch('/api/listings', {
            method: 'POST',
            body: JSON.stringify({
                // assigned constants can't work without being assigned to the model!!!
                artist: listingArtist,
                album_title: listingAlbum,
                format: listingFormat,
                description: listingDesc,
                release_date: listingDate,
                cover_art: listingCover,
                condition: listingCondition,
                label: listingLabel,
                price: listingPrice,
                genre: listingGenre,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            /* alert('Success'); */
            /* adjusting to the improved formatting above */
            const listingStatusEl = document.createElement('div');
            listingStatusEl.classList.add('form-group');
            listingStatusEl.classList.add('status-div');
            newListingForm.appendChild(listingStatusEl);
            document.querySelector('.status-div').style.display = 'flex';
            const listingStatus = document.createElement('h2');
            listingStatus.classList.add('listing-status')
            listingStatus.textContent = 'Listing Added Successfully!';
            listingStatus.style.color = 'green';
            listingStatusEl.appendChild(listingStatus);
            
            setTimeout(() => {
                document.location.replace('/profile');
            }, 3000);
        } else {
            alert(response.statusText)
        }
    }
};

newListingForm.addEventListener('submit', newListingHandler);