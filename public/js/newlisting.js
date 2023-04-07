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
    const listingCoverLink = document.getElementById('listing-cover').value.trim();
    const listingCoverFile = document.getElementById('uploaded_file').files;
    /* adjustments for multer */
    // NEED WORK!!!! NOT WORKING!!!!

    /*
    if (!listingCoverLink) {
        const listingCoverUse = listingCoverFile;
    } else {
        const listingCoverUse = listingCoverLink;
    };
    const listingCover = listingCoverUse; */

    let isLink = null;

    if (!listingCoverLink && listingCoverFile.length === 0) {
        // warning: must include either Link or File for album artwork
    } else if (listingCoverLink && listingCoverFile.length != 1) {
        isLink = true;
    } else if (!listingCoverLink && listingCoverFile.length === 1) {
        isLink = false;
    } else {
        isLink = true;
    };

    if (!listingArtist || !listingAlbum || !listingFormat || !listingDesc || !listingDate || isLink === null || !listingCondition || !listingLabel || !listingPrice || !listingGenre) {
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
        if (isLink === true) {
            const response = await fetch('/api/listings', {
                method: 'POST',
                body: JSON.stringify({
                    // assigned constants can't work without being assigned to the model!!!
                    artist: listingArtist,
                    album_title: listingAlbum,
                    format: listingFormat,
                    description: listingDesc,
                    release_date: listingDate,
                    /* if isLink, cover_art = listingCoverLink */
                    cover_art: listingCoverLink,
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
        } else {
            /* formdata version for the multer file upload */
            let formData = new FormData();
            formData.append('artist', listingArtist);
            formData.append('album_title', listingAlbum);
            formData.append('format', listingFormat);
            formData.append('description', listingDesc);
            formData.append('release_date', listingDate);
            formData.append('condition', listingCondition);
            formData.append('label', listingLabel);
            formData.append('price', listingPrice);
            formData.append('genre', listingGenre);
            formData.append('uploaded_file', listingCoverFile[0]);
            const response = await fetch('/api/listings/uploads', {
                method: 'POST',
                body: formData,
                /* headers: {
                    'Content-Type': 'application/json',
                }, */
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
        
        /* need to copy the response section to create form data version for object file */
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
};

newListingForm.addEventListener('submit', newListingHandler);