// Đợi DOM tải xong
document.addEventListener("DOMContentLoaded", function() {

    // Lấy các phần tử cần thiết
    const progressBar = document.getElementById("scrollProgressBar");
    const header = document.querySelector('.navbar-header');
    const subnavDesktop = document.querySelector('.project-subnav');
    const subnavMobile = document.querySelector('.project-subnav-mobile');

    if (!header) {
        console.error("Không tìm thấy '.navbar-header'");
        return;
    }

    // (KHÔNG CẦN 'lastScrollTop' hay 'headerHeight' cho logic mới này)

    // Lắng nghe sự kiện cuộn (scroll)
    window.addEventListener("scroll", function() {
        
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // --- LOGIC MỚI: CHỈ HIỆN HEADER KHI Ở TRÊN CÙNG ---
        
        // Đặt một ngưỡng nhỏ (ví dụ: 10px) để tránh lỗi
        if (scrollTop > 10) { 
            // Đang cuộn (không ở trên cùng): Ẩn Header, Đẩy Subnav lên
            header.classList.add('header-hidden');
            
            if (subnavDesktop) subnavDesktop.classList.add('subnav-sticky-top');
            if (subnavMobile) subnavMobile.classList.add('subnav-sticky-top');

        } else {
            // Đã ở trên cùng: Hiện Header, Hạ Subnav xuống
            header.classList.remove('header-hidden');
            
            if (subnavDesktop) subnavDesktop.classList.remove('subnav-sticky-top');
            if (subnavMobile) subnavMobile.classList.remove('subnav-sticky-top');
        }
        
        // --- LOGIC THANH TIẾN TRÌNH (GIỮ NGUYÊN) ---
        if (progressBar) {
            let scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            if (scrollableHeight === 0) {
                progressBar.style.width = '0%';
            } else {
                let scrollPercentage = (scrollTop / scrollableHeight) * 100;
                progressBar.style.width = scrollPercentage + '%';
            }
        }
    });
});