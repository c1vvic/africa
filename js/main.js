document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    setTimeout(function() {
        preloader.classList.add('hide');
    }, 1500);

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const nav = document.querySelector('.nav');
    
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('nav__link')) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

// Modal for ordering fruits
const orderButtons = document.querySelectorAll('.fruit__btn, .order-btn');
const orderModal = document.getElementById('orderModal');
const modalClose = document.querySelector('.modal__close');
const fruitTypeInput = document.getElementById('fruitType');

// Open modal with animation
orderButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (this.classList.contains('fruit__btn')) {
            const fruitName = this.getAttribute('data-fruit');
            fruitTypeInput.value = fruitName;
        }
        
        orderModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});
// Обработчики модального окна
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('orderModal');
    const form = document.getElementById('orderForm');
    const cardInput = document.getElementById('paymentCard');
    const warning = document.querySelector('.form__warning');

    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Закрытие по клику вне области
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Валидация карты
    cardInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
        if(this.value.length > 0) {
            warning.classList.add('active');
        } else {
            warning.classList.remove('active');
        }
    });

    // Отправка формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Валидация карты
        const cardNumber = cardInput.value.replace(/\s/g, '');
        if(cardNumber.length > 0 && !/^\d{16}$/.test(cardNumber)) {
            alert('Некорректный номер карты!');
            return;
        }

        // Анимация успеха
        const successHTML = `
            <div class="modal__success">
                <i class="fas fa-check-circle success-check"></i>
                <h3>Заказ оформлен!</h3>
                <p>Спасибо за ваш заказ! Мы свяжемся с вами в течение 15 минут.</p>
            </div>
        `;
        
        document.querySelector('.modal__content').innerHTML = successHTML;
        setTimeout(closeModal, 2000);
    });
});

function closeModal() {
    document.getElementById('orderModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}
});
// Обновите JavaScript
document.getElementById('paymentCard').addEventListener('input', function(e) {
    const warning = document.querySelector('.form__warning');
    this.value = this.value.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ') || '';
    
    if(this.value.length >= 4) {
        warning.classList.add('active');
        this.parentElement.classList.add('shake');
        setTimeout(() => this.parentElement.classList.remove('shake'), 500);
    } else {
        warning.classList.remove('active');
    }
});
