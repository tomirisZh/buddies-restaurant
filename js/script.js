document.addEventListener('DOMContentLoaded', () => {

    /* --- TASK 5: Live Date & Time Display --- */
    const dateTimeDisplay = document.getElementById('current-date-time');
    function updateDateTime() {
        if (!dateTimeDisplay) return;
        const now = new Date();
        const options = {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        };
        dateTimeDisplay.textContent = now.toLocaleDateString('en-US', options);
    }
    if (dateTimeDisplay) {
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }

    /* --- TASK 4: Background Color Toggle --- */
    const bgToggleBtn = document.getElementById('change-bg-btn');
    const colors = ['#fdfbf7', '#f4ece1', '#e8f0fe', '#e6f4ea', '#fce8e6', '#fff8f0'];
    let currentColorIndex = 0;
    if (bgToggleBtn) {
        bgToggleBtn.addEventListener('click', () => {
            currentColorIndex = (currentColorIndex + 1) % colors.length;
            document.body.style.backgroundColor = colors[currentColorIndex];
            document.body.style.transition = 'background-color 0.5s ease';
        });
    }

    /* --- TASK 1: Form Validation (Menu Page) --- */
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const nameInput = document.getElementById('full-name');
            const emailInput = document.getElementById('email');
            const passInput = document.getElementById('access-code');
            const passConfirmInput = document.getElementById('confirm-code');

            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const passError = document.getElementById('pass-error');
            const confirmError = document.getElementById('confirm-error');

            [nameError, emailError, passError, confirmError].forEach(el => { if (el) el.textContent = ''; });

            if (!nameInput.value.trim()) {
                if (nameError) nameError.textContent = 'Full name is required.';
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                if (emailError) emailError.textContent = 'Email address is required.';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                if (emailError) emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            if (!passInput.value) {
                if (passError) passError.textContent = 'Access code is required.';
                isValid = false;
            } else if (passInput.value.length < 6) {
                if (passError) passError.textContent = 'Code must be at least 6 characters.';
                isValid = false;
            }

            if (!passConfirmInput.value) {
                if (confirmError) confirmError.textContent = 'Please confirm your code.';
                isValid = false;
            } else if (passInput.value !== passConfirmInput.value) {
                if (confirmError) confirmError.textContent = 'Codes do not match.';
                isValid = false;
            }

            if (isValid) {
                const successMsg = document.getElementById('form-success-msg');
                if (successMsg) {
                    successMsg.classList.remove('d-none');
                    orderForm.reset();
                    setTimeout(() => successMsg.classList.add('d-none'), 5000);
                }
            }
        });
    }

    /* --- TASK 2: Accordion Logic (Yenlik) --- */
    const accordionHeaders = document.querySelectorAll('.custom-accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const body = accordionItem.querySelector('.custom-accordion-body');
            const isOpen = accordionItem.classList.contains('active');

            document.querySelectorAll('.custom-accordion-item').forEach(item => {
                item.classList.remove('active');
                const itemBody = item.querySelector('.custom-accordion-body');
                if (itemBody) itemBody.style.maxHeight = null;
            });

            if (!isOpen) {
                accordionItem.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    /* --- TASK 3: Popup Modal Logic (Yenlik) --- */
    const openPopupBtn = document.getElementById('open-popup-btn');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const popupOverlay = document.getElementById('popup-overlay');

    if (openPopupBtn && popupOverlay && closePopupBtn) {
        openPopupBtn.addEventListener('click', () => popupOverlay.classList.add('active'));
        closePopupBtn.addEventListener('click', () => popupOverlay.classList.remove('active'));
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) popupOverlay.classList.remove('active');
        });
    }
});