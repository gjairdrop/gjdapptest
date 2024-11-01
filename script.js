let cart = [];

// Thêm sản phẩm vào giỏ hàng
function addToCart(service, price) {
    cart.push({ service, price });
    renderCart();
    showNotification(`${service} đã được thêm vào giỏ hàng!`);
}

// Hiển thị nội dung giỏ hàng
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const total = document.getElementById('total');
    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.service}: ${item.price.toLocaleString()} VNĐ`;
        
        // Thêm nút xóa
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Xóa';
        deleteButton.onclick = () => removeFromCart(index);
        
        li.appendChild(deleteButton);
        cartItems.appendChild(li);
        totalPrice += item.price;
    });

    total.textContent = `Tổng cộng: ${totalPrice.toLocaleString()} VNĐ`;
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
    showNotification(`Sản phẩm đã được xóa khỏi giỏ hàng!`);
}

// Chuyển hướng đến trang thanh toán
function checkout() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn trống!");
        return;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', cart.reduce((acc, item) => acc + item.price, 0));

    window.location.href = 'pay.html';
}

// Hoàn tất thanh toán
function completePayment() {
    alert("Thanh toán thành công!");
    cart = [];
    localStorage.removeItem('cart');
    localStorage.removeItem('totalPrice');
    window.location.href = 'index.html';
}

// Tải thông tin giỏ hàng lên trang thanh toán
document.addEventListener("DOMContentLoaded", function() {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedTotalPrice = localStorage.getItem('totalPrice') || 0;

    const cartItems = document.getElementById('cart-items');
    const total = document.getElementById('total');

    storedCart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.service}: ${item.price.toLocaleString()} VNĐ`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Xóa';
        deleteButton.onclick = () => removeFromCart(index);
        
        li.appendChild(deleteButton);
        cartItems.appendChild(li);
    });

    total.textContent = `Tổng cộng: ${storedTotalPrice.toLocaleString()} VNĐ`;
});

// Quay lại trang chính
function goBack() {
    window.location.href = 'index.html';
}

// Xử lý tải lên hình ảnh
let uploadedImageData = '';

function uploadImage() {
    const input = document.getElementById('imageUpload');
    const uploadedImageContainer = document.getElementById('uploadedImageContainer');

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImageData = e.target.result;

            const img = document.createElement('img');
            img.src = uploadedImageData;
            img.alt = 'Hình Ảnh Đã Tải Lên';
            img.style.maxWidth = '300px';
            img.style.marginTop = '10px';

            uploadedImageContainer.innerHTML = '';
            uploadedImageContainer.appendChild(img);
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        alert("Vui lòng chọn một tệp hình ảnh.");
    }
}

// Hiển thị thông báo cho người dùng
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    notification.style.animation = 'slideIn 0.5s forwards';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

// Animation cho thông báo
const style = document.createElement('style');
style.innerHTML = `
@keyframes slideIn {
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
`;
document.head.appendChild(style);
