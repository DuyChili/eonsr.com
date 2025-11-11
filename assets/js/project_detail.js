// Đợi DOM tải xong
document.addEventListener("DOMContentLoaded", function() {

    // Lấy thanh tiến trình
    const progressBar = document.getElementById("scrollProgressBar");

    // Lắng nghe sự kiện cuộn (scroll)
    window.addEventListener("scroll", function() {
        
        // 1. Tính toán khoảng cách đã cuộn
        // (Khoảng cách từ đỉnh trang xuống vị trí hiện tại)
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // 2. Tính toán tổng chiều cao có thể cuộn
        // (Tổng chiều cao nội dung - chiều cao màn hình)
        let scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Tránh lỗi chia cho 0 nếu nội dung không đủ dài
        if (scrollableHeight === 0) {
            progressBar.style.width = '0%';
            return;
        }

        // 3. Tính tỷ lệ phần trăm đã cuộn
        let scrollPercentage = (scrollTop / scrollableHeight) * 100;
        
        // 4. Cập nhật chiều rộng (width) của thanh tiến trình
        progressBar.style.width = scrollPercentage + '%';
    });
});