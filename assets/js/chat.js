document.addEventListener('DOMContentLoaded', function() {

    // 1. Lấy các phần tử
    const welcomeContainer = document.getElementById('chat-welcome-container');
    const chatContainer = document.getElementById('chat-interface-container');
    
    const welcomeTextarea = document.getElementById('welcome-textarea');
    const welcomeSendBtn = document.getElementById('welcome-send-btn');
    
    const chatTextarea = document.getElementById('chat-textarea');
    const chatSendBtn = document.getElementById('chat-send-btn');
    
    const chatHistoryScroll = document.getElementById('chat-history-scroll');

    // Mảng chứa các textarea
    const textareas = [welcomeTextarea, chatTextarea];

    // 2. Hàm tự động co giãn Textarea
    function autoResizeTextarea(el) {
        el.style.height = 'auto'; // Reset
        // Cần 2px để tránh scrollbar xuất hiện ngắn
        el.style.height = (el.scrollHeight + 2) + 'px'; 
    }

    textareas.forEach(textarea => {
        if(textarea) {
            textarea.addEventListener('input', () => autoResizeTextarea(textarea));
            
            // Xử lý gửi bằng phím Enter
            textarea.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if(textarea.id === 'welcome-textarea') {
                        handleSendMessage(welcomeTextarea);
                    } else {
                        handleSendMessage(chatTextarea);
                    }
                }
            });
        }
    });

    // 3. Xử lý sự kiện click nút Gửi
    if(welcomeSendBtn) {
        welcomeSendBtn.addEventListener('click', () => handleSendMessage(welcomeTextarea));
    }
    if(chatSendBtn) {
        chatSendBtn.addEventListener('click', () => handleSendMessage(chatTextarea));
    }

    // 4. Hàm xử lý gửi tin nhắn
    function handleSendMessage(textarea) {
        const text = textarea.value.trim();
        if (text === "") return;

        // Thêm tin nhắn của người dùng vào giao diện
        addMessageToHistory(text, 'user');
        textarea.value = "";
        autoResizeTextarea(textarea); // Reset chiều cao sau khi gửi

        // 5. Logic chuyển đổi giao diện (nếu đang ở màn hình chào)
        if (welcomeContainer && !welcomeContainer.classList.contains('d-none')) {
            welcomeContainer.classList.add('d-none');
            chatContainer.classList.remove('d-none');
            // Chuyển focus sang ô chat mới
            chatTextarea.focus();
        }

        // 6. Giả lập AI trả lời
        simulateAiResponse();
    }

    // 7. Hàm thêm tin nhắn vào lịch sử
    function addMessageToHistory(text, type) {
        if (!chatHistoryScroll) return;

        const messageWrapper = document.createElement('div');
        messageWrapper.className = `chat-message ${type}`;
        
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerText = text; // Dùng innerText để tránh lỗi XSS

        messageWrapper.appendChild(bubble);
        chatHistoryScroll.appendChild(messageWrapper);

        // Tự động cuộn xuống dưới cùng
        chatHistoryScroll.scrollTop = chatHistoryScroll.scrollHeight;
    }

    // 8. Hàm giả lập AI
    function simulateAiResponse() {
        // Lấy tin nhắn mẫu từ thiết kế
        const mockResponse = "Gemini is better at understanding how to help with everyday tasks, but it’s also better at free-flowing chats or brainstorms. When you want to have an even more free-flowing conversation, you can say, “Hey Google, let’s chat,” to talk to Gemini Live. \n\nNow the hotword is gone: You can talk, you can pause, you can interrupt, you can pivot, you can follow up — just like you would with a person. \n\nFor example, you can figure out dinner from scratch by simply listing the ingredients you have on hand: “I have spinach, eggs, feta, and some bread... what can I make?” Then, you can refine the idea in real-time with follow-ups like, “Great. Now, what’s a keto-friendly version?” and add another constraint like, “It also has to be something my kids will actually eat.”";
        
        setTimeout(() => {
            addMessageToHistory(mockResponse, 'ai');
        }, 1000); // Giả lập độ trễ 1 giây
    }

});