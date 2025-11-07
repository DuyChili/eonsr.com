document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Lấy các phần tử cần thiết
    const wrapper = document.getElementById('scrolling-wrapper');
    // Thoát nếu không tìm thấy khối cuộn (tránh lỗi)
    if (!wrapper) return; 

    const dots = document.querySelectorAll('.custom-scrollbar-nav .scroll-dot');
    const items = document.querySelectorAll('.scrolling-content-wrapper .scrolling-card');

    // 2. Hàm cập nhật thanh cuộn active
    function updateActiveDot() {
        // Chúng ta sẽ coi item là "active" khi nó vượt qua 1/3 khung nhìn
        const scrollThreshold = wrapper.scrollTop + (wrapper.offsetHeight / 3);
        
        let currentActiveIndex = 0;

        // Tìm item nào đang trong tầm nhìn
        items.forEach((item, index) => {
            // item.offsetTop là vị trí BẮT ĐẦU của item so với khối cuộn
            if (item.offsetTop <= scrollThreshold) {
                currentActiveIndex = index;
            }
        });

        // 3. Cập nhật class 'active' cho các thanh cuộn
        dots.forEach((dot, index) => {
            if (index === currentActiveIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // 4. Cho phép click vào thanh cuộn để nhảy section
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            // Cuộn đến item tương ứng
            if (items[index]) {
                // Sử dụng vị trí offsetTop để cuộn chính xác
                wrapper.scrollTo({
                    top: items[index].offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Lắng nghe sự kiện cuộn trên chính khối wrapper
    wrapper.addEventListener('scroll', updateActiveDot);

    // 6. Chạy 1 lần khi tải trang để active item đầu tiên
    updateActiveDot();
});