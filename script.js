document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('data-container');

    // Hàm format giá tiền
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    // Hàm render dữ liệu
    window.renderData = (data) => {
        container.innerHTML = ''; // Xóa nội dung cũ

        if (!data || data.length === 0) {
            container.innerHTML = '<p class="loading">Không có dữ liệu để hiển thị.</p>';
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Xử lý hình ảnh (lấy ảnh đầu tiên hoặc ảnh placeholder)
            let imageUrl = 'https://placehold.co/600x400?text=No+Image';
            if (item.images && item.images.length > 0) {
                // Clean up image URL if it contains brackets/quotes sometimes seen in bad data
                let cleanUrl = item.images[0].replace(/[\[\]"]/g, '');
                if (cleanUrl.startsWith('http')) {
                    imageUrl = cleanUrl;
                }
            }

            // Tạo HTML cho card
            card.innerHTML = `
                <div class="card-image">
                    <span class="id-badge">#${item.id}</span>
                    <img src="${imageUrl}" alt="${item.title}" onerror="this.src='https://placehold.co/600x400?text=Error'">
                    <span class="category-badge">${item.category ? item.category.name : 'Uncategorized'}</span>
                </div>
                <div class="card-content">
                    <h2 class="card-title" title="${item.title}">${item.title}</h2>
                    <p class="card-price">${formatPrice(item.price)}</p>
                    <p class="card-description">${item.description}</p>
                </div>
            `;
            
            container.appendChild(card);
        });
    };

    // Kiểm tra xem biến products có tồn tại không (từ data.js)
    if (typeof products !== 'undefined') {
        renderData(products);
    } else {
        container.innerHTML = '<p class="loading">Không tìm thấy dữ liệu (data.js).</p>';
    }
});
