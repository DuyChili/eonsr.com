document.addEventListener('DOMContentLoaded', () => {
    const mapFrame = document.getElementById('map-embed');
    const addressItems = document.querySelectorAll('.address-list li');

    // Function to update the map with a new URL
    function updateMap(url) {
        if (mapFrame && url) {
            mapFrame.src = url;
        }
    }

    // Set the initial map to the first (active) address in the list
    const initialAddressItem = document.querySelector('.address-list li.active');
    if (initialAddressItem) {
        const initialUrl = initialAddressItem.getAttribute('data-embed-url');
        updateMap(initialUrl);
    }

    // Add click event listeners to all address items
    addressItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the URL from the clicked item's data attribute
            const newUrl = this.getAttribute('data-embed-url');
            
            // Update the map's source
            updateMap(newUrl);

            // Update the 'active' class for styling
            addressItems.forEach(el => el.classList.remove('active'));
            this.classList.add('active');
        });
    });
});