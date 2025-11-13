document.addEventListener('DOMContentLoaded', function () {
    // ---- PHẦN CODE CŨ CỦA BẠN (GIỮ NGUYÊN) ----
    const defaultView = document.getElementById('nav-default-view');
    const searchView = document.getElementById('nav-search-view');
    const searchToggleButton = document.getElementById('search-toggle-btn');
    const closeSearchButton = document.getElementById('close-search-btn');
    
    if (searchToggleButton) {
        const searchInput = searchView.querySelector('input');

        searchToggleButton.addEventListener('click', function () {
            defaultView.classList.add('d-none');
            searchView.classList.remove('d-none');
            searchView.classList.add('d-flex'); // Thêm d-flex để hiển thị
            searchInput.focus();
        });

        closeSearchButton.addEventListener('click', function () {
            searchView.classList.add('d-none');
            searchView.classList.remove('d-flex'); // Xóa d-flex
            defaultView.classList.remove('d-none');
        });
    }

    // ---- PHẦN CODE MỚI CHO MENU ĐA CẤP ----
    const offcanvas = document.getElementById('offcanvasNavbar');
    if (offcanvas) {
        const navLinks = offcanvas.querySelectorAll('.has-submenu, .btn-back');

        navLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                
                const targetPanelId = this.getAttribute('data-target-panel');
                const targetPanel = document.getElementById(targetPanelId);
                const currentPanel = this.closest('.offcanvas-panel');

                if (targetPanel && currentPanel) {
                    // Nếu là nút back
                    if(this.classList.contains('btn-back')) {
                        currentPanel.classList.remove('active'); // Panel hiện tại sẽ trượt ra (về bên phải)
                        targetPanel.classList.remove('is-leaving'); // Panel cha trở lại
                        targetPanel.classList.add('active');
                    } 
                    // Nếu là đi tới menu con
                    else {
                        currentPanel.classList.add('is-leaving'); // Panel hiện tại trượt sang trái
                        currentPanel.classList.remove('active');
                        targetPanel.classList.add('active'); // Panel con trượt vào
                    }
                }
            });
        });
    }
});