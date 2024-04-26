const form = document.querySelector('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

// Функция для отправки сообщения с данными о корзине и пользователе
function sendEmail() {
    // Получение содержимого корзины из localStorage
    var storedCartItems = JSON.parse(localStorage.getItem("cartItems"));

    // Формирование сообщения о товарах в корзине
    var cartItemsMessage = "Товары в корзине:\n";
    storedCartItems.forEach(function(item, index) {
        cartItemsMessage += `${index + 1}. Название: ${item.title}, Количество: ${item.quantity}\n`;
    });

    // Формирование основного сообщения с информацией о пользователе
    var bodyMessage = `Имя: ${name.value}\nПочта: ${email.value}\nНомер телефона: ${phone.value}\nСообщение: ${message.value}\n\n${cartItemsMessage}`;

    // Отправка сообщения по электронной почте
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "flare.shopkz@gmail.com",
        Password: "FBCB49EAFA73790A2E63D22EB69CF01238DA",
        To: "flare.shopkz@gmail.com",
        From: "flare.shopkz@gmail.com",
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message === "OK") {
                Swal.fire({
                    title: "Успешно!",
                    text: "Сообщение отправлено, скоро мы свяжемся с вами!",
                    icon: "success"
                });
            }
        }
    );
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    sendEmail();
});
