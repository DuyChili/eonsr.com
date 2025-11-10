// Global variables for the map and marker
let map;
let marker;

// This function is called when the Google Maps script loads
function initMap() {
    // The initial location to show (first address)
    const initialLocation = { lat: 10.7849, lng: 106.7434 };

    // Create the map, centered on the initial location
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: initialLocation,
        disableDefaultUI: true, // Hides default controls like zoom, street view
    });

    // Create a single marker on the map
    marker = new google.maps.Marker({
        position: initialLocation,
        map: map,
    });

    // Add click listeners to each address
    setupAddressClickListeners();
}

function setupAddressClickListeners() {
    const addressItems = document.querySelectorAll(".address-list li");

    addressItems.forEach(item => {
        item.addEventListener("click", function() {
            // Get the coordinates from the data attributes
            const lat = parseFloat(this.getAttribute("data-lat"));
            const lng = parseFloat(this.getAttribute("data-lng"));
            const newPosition = { lat: lat, lng: lng };

            // Move the map and marker to the new position
            map.panTo(newPosition);
            marker.setPosition(newPosition);

            // Update the 'active' class for styling
            // First, remove 'active' from all items
            addressItems.forEach(el => el.classList.remove("active"));
            // Then, add 'active' to the clicked item
            this.classList.add("active");
        });
    });
}