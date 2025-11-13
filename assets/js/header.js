document.addEventListener('DOMContentLoaded', function () {
    const defaultView = document.getElementById('nav-default-view');
    const searchView = document.getElementById('nav-search-view');
    const searchToggleButton = document.getElementById('search-toggle-btn');
    const closeSearchButton = document.getElementById('close-search-btn');
    const searchInput = searchView.querySelector('input');

    // Bấm nút tìm kiếm
    searchToggleButton.addEventListener('click', function () {
        defaultView.classList.add('d-none');
        searchView.classList.remove('d-none');
        searchInput.focus(); // Tự động trỏ vào ô nhập liệu
    });

    // Bấm nút đóng
    closeSearchButton.addEventListener('click', function () {
        searchView.classList.add('d-none');
        defaultView.classList.remove('d-none');
    });
});