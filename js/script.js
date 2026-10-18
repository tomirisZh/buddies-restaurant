document.addEventListener('DOMContentLoaded', () => {
//TASK 5: DISPLAY CURRENT DATE AND TIME (Tomiris)
    const dateTimeDisplay = document.getElementById('current-date-time');
    function updateDateTime() {
        if (!dateTimeDisplay) return;
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: true 
        };
        dateTimeDisplay.textContent = now.toLocaleDateString('en-US', options);
    }
    
    if (dateTimeDisplay) {
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }

//TASK 4: CHANGE BACKGROUND COLOR (Tomiris)
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

//TASK 1: FORM VALIDATION (Merey - menu.html)
    const orderForm = document.getElementById('order-form');

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Elements
            const nameInput = document.getElementById('full-name');
            const emailInput = document.getElementById('email');
            const passInput = document.getElementById('access-code');
            const passConfirmInput = document.getElementById('confirm-code');

            // Error displays
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const passError = document.getElementById('pass-error');
            const confirmError = document.getElementById('confirm-error');

            // Reset errors
            [nameError, emailError, passError, confirmError].forEach(el => {
                if (el) el.textContent = '';
            });

            // Name validation
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Full name is required.';
                isValid = false;
            }

            // Email validation (Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email address is required.';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address (e.g., user@domain.com).';
                isValid = false;
            }

            // Password / Access Code Length (Min 6 chars)
            if (!passInput.value) {
                passError.textContent = 'Access code/password is required.';
                isValid = false;
            } else if (passInput.value.length < 6) {
                passError.textContent = 'Password must be at least 6 characters long.';
                isValid = false;
            }

            // Password Confirmation check
            if (!passConfirmInput.value) {
                confirmError.textContent = 'Please confirm your password.';
                isValid = false;
            } else if (passInput.value !== passConfirmInput.value) {
                confirmError.textContent = 'Passwords do not match.';
                isValid = false;
            }

            // Successful Submission
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

//TASK 2: ACCORDION FOR FAQS (Yenlik - reservation.html)
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

//TASK 3: POPUP SUBSCRIPTION / CONTACT FORM (Yenlik)
    const openPopupBtn = document.getElementById('open-popup-btn');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const popupOverlay = document.getElementById('popup-overlay');

    if (openPopupBtn && popupOverlay && closePopupBtn) {
        openPopupBtn.addEventListener('click', () => {
            popupOverlay.classList.add('active');
        });
        closePopupBtn.addEventListener('click', () => {
            popupOverlay.classList.remove('active');
        });
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.classList.remove('active');
            }
        });
    }
});