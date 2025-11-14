document.addEventListener('DOMContentLoaded', function() {
    // --- 1. SETUP ---
    const tabs = document.querySelectorAll('.service-tab');
    const contents = document.querySelectorAll('.service-content');
    const displayImage = document.getElementById('service-display-image');

    // --- 2. HÀM KÍCH HOẠT TAB ---
    function activateTab(tabToActivate) {
        if (!tabToActivate) return;
        const targetId = tabToActivate.getAttribute('data-tab');
        const targetContent = document.getElementById(targetId);
        if (!targetContent) return;

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tabToActivate.classList.add('active');
        targetContent.classList.add('active');

        const newImageSrc = targetContent.getAttribute('data-image');
        if (newImageSrc) {
            displayImage.style.backgroundImage = `url(${newImageSrc})`;
        }
    }

    // --- 3. HÀM TỰ ĐỘNG CHUYỂN TAB ---
    function cycleToNextTab() {
        const currentIndex = Array.from(tabs).findIndex(tab => tab.classList.contains('active'));
        const nextIndex = (currentIndex + 1) % tabs.length;
        activateTab(tabs[nextIndex]);
    }

    // --- 4. LẮNG NGHE SỰ KIỆN ---

    // A. Lắng nghe người dùng CLICK
    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            activateTab(this);
        });
        
        // B. Lắng nghe KHI ANIMATION KẾT THÚC trên từng tab
        tab.addEventListener('animationend', (event) => {
            // Chỉ hành động nếu animation kết thúc trên tab đang active
            if (tab.classList.contains('active')) {
                // SỬA LỖI QUAN TRỌNG: Lắng nghe đúng tên animation mới là 'fill-progress'
                if (event.animationName === 'fill-progress') {
                    cycleToNextTab();
                }
            }
        });
    });

    // --- 5. KHỞI ĐỘNG ---
    // Kích hoạt tab đầu tiên để đảm bảo hình ảnh và nội dung khớp khi tải trang
    if (tabs.length > 0) {
        activateTab(tabs[0]);
    }
});

const articles = [
    {
        title: "How an AI experiment put Pixel fan in the driver's seat",
        label: "Case Study",
        image: "https://cdn.tienphong.vn/images/11371a0e411b1c19f4e6d81a04045063cda36f08589115b878af02122855dfad2e0391a1cede72c8e86d95a909bdca637d87ef7bf618e445ef66321d1021292866154d174175ae7d8816f06b2e5a0477/anh-man-hinh-2025-11-05-luc-151917.png",
        icon: "fa-newspaper",
        tag: "Tiền Phong"
    },
    {
        title: "How an AI experiment put Pixel fan in the driver's seat",
        label: "Case Study",
        image: "https://img.cand.com.vn/resize/800x800/NewFiles/Images/2025/11/01/image001-1761959280130.jpg",
        icon: "fa-shield-alt",
        tag: "Công an Nhân Dân"
    },
    {
        title: "How an AI experiment put Pixel fan in the driver's seat",
        label: "Case Study",
        image: "https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2025/11/5/base64-17623291562971287808958.jpeg",
        icon: "fa-graduation-cap",
        tag: "Tuổi trẻ"
    },
    {
        title: "How an AI experiment put Pixel fan in the driver's seat",
        label: "Case Study",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070",
        icon: "fa-leaf",
        tag: "Hoa phượng đỏ"
    },
    {
        title: "How an AI experiment put Pixel fan in the driver's seat",
        label: "Case Study",
        image: "https://cdn.britannica.com/69/228369-050-0B18A1F6/Asian-Cup-Final-2019-Hasan-Al-Haydos-Qatar-Japan-Takumi-Minamino.jpg",
        icon: "fa-futbol",
        tag: "Bóng đá số"
    }
];

let currentIndex = 0;

// Hàm lấy ngẫu nhiên kiểu card
function getRandomCardType() {
    return Math.random() < 0.5 ? 'large' : 'small';
}

// Hàm tạo HTML card
function createCardHTML(article, cardType) {
    const styleAttr = cardType === 'large' 
        ? `style="background-image: url('${article.image}');"`
        : `style="--bg-image: url('${article.image}');"`;
    
    return `
        <article class="press-card press-card--${cardType}" ${styleAttr}>
            <div class="press-card__content">
                <p class="press-card__label">${article.label}</p>
                <h3 class="press-card__title">${article.title}</h3>
            </div>
            <div class="card-tag">
                <i class="fas ${article.icon}"></i><span>${article.tag}</span>
            </div>
        </article>
    `;
}

// Hàm render bài viết ban đầu
function renderArticles() {
    const container = document.getElementById('pressCardsContainer');
    container.innerHTML = '';

    // Row 1: 1 large card (col-lg-6) + 2 small cards (col-lg-6 with 2 col-md-6 inside)
    const row1Col = document.createElement('div');
    row1Col.className = 'col-lg-6';
    row1Col.innerHTML = createCardHTML(articles[0], 'large');
    row1Col.classList.add('fade-in');
    container.appendChild(row1Col);

    const row2Col = document.createElement('div');
    row2Col.className = 'col-lg-6';
    const row2Inner = document.createElement('div');
    row2Inner.className = 'row g-4';
    
    for (let i = 0; i < 2; i++) {
        const smallCol = document.createElement('div');
        smallCol.className = 'col-md-6';
        smallCol.innerHTML = createCardHTML(articles[i + 1], 'small');
        smallCol.classList.add('fade-in');
        row2Inner.appendChild(smallCol);
    }
    row2Col.appendChild(row2Inner);
    container.appendChild(row2Col);

    // Row 2: 2 large cards (col-lg-6 each)
    for (let i = 3; i < 5; i++) {
        const largeCol = document.createElement('div');
        largeCol.className = 'col-lg-6';
        largeCol.innerHTML = createCardHTML(articles[i], 'large');
        largeCol.classList.add('fade-in');
        container.appendChild(largeCol);
    }

    currentIndex = 5;
}

// Hàm thêm bài viết
function loadMoreArticles() {
    const container = document.getElementById('pressCardsContainer');

    // Thêm 4 large card + 1 div chứa 2 small card
    for (let i = 0; i < 4; i++) {
        const article = articles[currentIndex % articles.length];
        currentIndex++;

        const col = document.createElement('div');
        col.className = 'col-lg-6';
        col.innerHTML = createCardHTML(article, 'large');
        col.classList.add('fade-in');
        container.appendChild(col);
    }

    // Tạo div chứa 2 small card
    const smallCardsDiv = document.createElement('div');
    smallCardsDiv.className = 'col-lg-6';
    const smallCardsRow = document.createElement('div');
    smallCardsRow.className = 'row g-4';

    for (let i = 0; i < 2; i++) {
        const article = articles[currentIndex % articles.length];
        currentIndex++;

        const smallCol = document.createElement('div');
        smallCol.className = 'col-md-6';
        smallCol.innerHTML = createCardHTML(article, 'small');
        smallCol.classList.add('fade-in');
        smallCardsRow.appendChild(smallCol);
    }

    smallCardsDiv.appendChild(smallCardsRow);
    smallCardsDiv.classList.add('fade-in');
    container.appendChild(smallCardsDiv);
}

// Event listener cho nút load more
document.getElementById('loadMoreBtn').addEventListener('click', function(e) {
    e.preventDefault();
    loadMoreArticles();
});

// Render bài viết ban đầu
renderArticles(); 