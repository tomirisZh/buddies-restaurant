/* ==========================================================================
   Buddies Restaurant — единый скрипт
   ========================================================================== */


const BuddiesRestaurantApp = {
    name: "Buddies Restaurant",
    location: "Astana, Kazakhstan",
    ratings: [],

    menuItems: [
        {
            id: 1,
            name: "Signature Ribeye Steak",
            category: "main",
            price: 12500,
            img: "images/dish1.jpg",
            desc: "Tender grilled beef served with garlic butter and vegetables."
        },
        {
            id: 2,
            name: "Creamy Fettuccine Pasta",
            category: "main",
            price: 4800,
            img: "images/dish2.jpg",
            desc: "Homemade fettuccine with wild mushrooms and parmesan."
        },
        {
            id: 3,
            name: "Berry Cheesecake",
            category: "dessert",
            price: 2900,
            img: "images/dish3.jpg",
            desc: "Classic New York cheesecake topped with fresh berries."
        },
        {
            id: 4,
            name: "Salmon Steak with Veggies",
            category: "main",
            price: 9500,
            img: "images/стейк из лосося.jpg",
            desc: "Grilled salmon steak with fresh seasonal greens."
        },
        {
            id: 5,
            name: "Classic Beshbarmak",
            category: "main",
            price: 6500,
            img: "images/бешпармак.jpg",
            desc: "Traditional Kazakh dish with tender meat and handmade noodles."
        },
        {
            id: 6,
            name: "Aperol Spritz Cocktail",
            category: "drinks",
            price: 3200,
            img: "images/коктейль.jpg",
            desc: "Refreshing prosecco cocktail with orange slice."
        }
    ],

    facts: [
        "Did you know? Our Beshbarmak noodle dough is aged for 12 hours for maximum tenderness!",
        "Fact: We source all our organic vegetables from local farmers near Astana.",
        "Chef's Secret: Our Ribeye Steak is aged for 21 days before grilling.",
        "Fun Fact: Over 10,000 Aperol Spritz cocktails were served at Buddies last year!",
        "Bon appétit! May your meal be as wonderful as your company.",
        "Good food, good mood! Enjoy every single delicious bite.",
        "Eat well, live well! Our signature dishes are prepared with absolute passion.",
        "As bolsyn! (Enjoy your meal!) May this traditional food bring you warmth and joy.",
        "The secret ingredient in all our recipes is love, fresh ingredients, and dedication.",
        "Good food is the foundation of genuine happiness and unforgettable evenings."
    ]
};



/* ==========================================================================
   PART 1. VANILLA JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Смена цвета фона
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

    // Аккордеон
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

    // Popup
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

    // Read More / Read Less
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const extraText = btn.previousElementSibling;

            if (extraText && extraText.classList.contains('more-text')) {
                if (extraText.style.display === 'none' || !extraText.style.display) {
                    extraText.style.display = 'inline';
                    btn.textContent = 'Read Less';
                } else {
                    extraText.style.display = 'none';
                    btn.textContent = 'Read More';
                }
            }
        });
    });

    // Приветствие по имени
    const nameInput =
        document.getElementById('user-name-input') ||
        document.getElementById('visitor-name-input');

    const greetingDisplay =
        document.getElementById('dynamic-greeting') ||
        document.getElementById('greet-output');

    const submitNameBtn =
        document.getElementById('submit-name-btn') ||
        document.getElementById('greet-me-btn');

    if (submitNameBtn && nameInput && greetingDisplay) {
        submitNameBtn.addEventListener('click', () => {
            const val = nameInput.value.trim();
            const timeOfDayGreeting = getTimeOfDayGreeting();

            greetingDisplay.innerText = val
                ? `${timeOfDayGreeting}, ${val}! Welcome to Buddies. Enjoy your exceptional dining experience!`
                : `${timeOfDayGreeting}, Guest! Welcome to Buddies. Enjoy your exceptional dining experience!`;

            greetingDisplay.classList.remove('d-none');
            greetingDisplay.style.transform = "scale(1.05)";
            setTimeout(() => greetingDisplay.style.transform = "scale(1)", 300);
        });
    }

    function getTimeOfDayGreeting() {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) return "Good Morning";
        if (hour >= 12 && hour < 18) return "Good Afternoon";
        return "Good Evening";
    }

    // Случайный факт
    const factBtn =
        document.getElementById('fetch-fact-btn') ||
        document.getElementById('did-you-know-btn');

    const factDisplay =
        document.getElementById('fact-display') ||
        document.getElementById('did-you-know-output');

    if (factBtn && factDisplay) {
        factBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(
                Math.random() * BuddiesRestaurantApp.facts.length
            );

            factDisplay.textContent = BuddiesRestaurantApp.facts[randomIndex];
            factDisplay.classList.remove('d-none');
            factDisplay.style.opacity = 0;
            factDisplay.style.transition = "opacity 0.5s ease";

            setTimeout(() => factDisplay.style.opacity = 1, 50);
        });
    }

    // Навигация стрелками ← →
    const navLinks = Array.from(
        document.querySelectorAll('.navbar-nav .nav-link')
    );

    let currentFocusIndex = navLinks.findIndex(
        link => link.classList.contains('active')
    );

    if (currentFocusIndex === -1) currentFocusIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (
            (e.key === 'ArrowRight' || e.key === 'ArrowLeft') &&
            document.activeElement.classList.contains('nav-link') &&
            navLinks.length > 0
        ) {
            e.preventDefault();

            if (e.key === 'ArrowRight') {
                currentFocusIndex = (currentFocusIndex + 1) % navLinks.length;
            } else {
                currentFocusIndex =
                    (currentFocusIndex - 1 + navLinks.length) % navLinks.length;
            }

            navLinks[currentFocusIndex].focus();
        }
    });

    // Кнопка сброса формы бронирования
    const resetFormBtn = document.getElementById('reset-form-btn');

    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            const formEl = document.getElementById('order-form');

            if (formEl) {
                formEl.reset();

                formEl.querySelectorAll('.error-message').forEach(el => {
                    el.textContent = '';
                });
            }
        });
    }

});


/* ==========================================================================
   PART 2. jQuery
   ========================================================================== */

$(document).ready(function () {

    console.log("Buddies Restaurant JS & jQuery initialized successfully.");

    // =====================================================
    // 1. ТЁМНАЯ / СВЕТЛАЯ ТЕМА
    // =====================================================

    const savedTheme = localStorage.getItem('buddies_theme') || 'light';

    if (savedTheme === 'dark') {
        $('body').addClass('dark-theme');

        $('#theme-toggle-btn')
            .text('🌙 Night')
            .removeClass('btn-outline-light')
            .addClass('btn-warning');
    }

    $('#theme-toggle-btn').on('click', function () {
        $('body').toggleClass('dark-theme');

        const isDark = $('body').hasClass('dark-theme');

        localStorage.setItem('buddies_theme', isDark ? 'dark' : 'light');

        $(this)
            .text(isDark ? '🌙 Night' : '☀️ Day')
            .toggleClass('btn-warning btn-outline-light');
    });

    // =====================================================
    // 2. ПРОГРЕСС-БАР СКРОЛЛА
    // =====================================================

    if ($('#scroll-progress-bar').length === 0) {
        $('body').prepend(`
            <div id="scroll-progress-container">
                <div id="scroll-progress-bar"></div>
            </div>
        `);
    }

    $(window).on('scroll', function () {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();

        const scrollPercent = docHeight > 0
            ? (scrollTop / docHeight) * 100
            : 0;

        $('#scroll-progress-bar').css('width', scrollPercent + '%');
    });

    // =====================================================
    // 3. TOAST-УВЕДОМЛЕНИЯ
    // =====================================================

    if ($('#toast-container').length === 0) {
        $('body').append('<div id="toast-container"></div>');
    }

    window.showToast = function (message) {
        const toast = $(`<div class="custom-toast">${message}</div>`);

        $('#toast-container').append(toast);

        setTimeout(() => toast.addClass('show'), 50);

        setTimeout(() => {
            toast.removeClass('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };
        // =====================================================
    // 4. АВТОРИЗАЦИЯ И ПЕРЕКЛЮЧЕНИЕ ФОРМ
    // =====================================================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^7\d{10}$/;

    // Создание маленьких сообщений об ошибках
    function getAuthError(inputId, errorId) {
        let error = document.getElementById(errorId);

        if (!error) {
            const input = document.getElementById(inputId);
            if (!input) return null;

            error = document.createElement('small');
            error.id = errorId;
            error.className = 'auth-field-error';
            error.style.display = 'block';
            error.style.color = '#dc3545';
            error.style.fontSize = '12px';
            error.style.marginTop = '4px';

            input.insertAdjacentElement('afterend', error);
        }

        return error;
    }

    function showAuthError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const error = getAuthError(inputId, errorId);

        if (error) error.textContent = message;
        if (input) input.classList.add('is-invalid');
    }

    function clearAuthError(inputId, errorId) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);

        if (error) error.textContent = '';
        if (input) input.classList.remove('is-invalid');
    }

    // Очищаем ошибки при вводе
    const authFields = [
        ['signup-name', 'signup-name-error'],
        ['signup-email', 'signup-email-error'],
        ['signup-phone', 'signup-phone-error'],
        ['signup-password', 'signup-password-error'],
        ['login-email', 'login-email-error'],
        ['login-password', 'login-password-error']
    ];

    authFields.forEach(([inputId, errorId]) => {
        const input = document.getElementById(inputId);

        if (input) {
            getAuthError(inputId, errorId);

            input.addEventListener('input', () => {
                clearAuthError(inputId, errorId);
            });
        }
    });

    // ----- Регистрация -----
    $('#signup-form').off('submit').on('submit', function (e) {
        e.preventDefault();

        let valid = true;

        const name = ($('#signup-name').val() || '').trim();
        const email = ($('#signup-email').val() || '').trim();
        const phone = ($('#signup-phone').val() || '').trim();
        const password = $('#signup-password').val() || '';

        clearAuthError('signup-name', 'signup-name-error');
        clearAuthError('signup-email', 'signup-email-error');
        clearAuthError('signup-phone', 'signup-phone-error');
        clearAuthError('signup-password', 'signup-password-error');

        if (!name) {
            showAuthError('signup-name', 'signup-name-error',
                'Full name is required.');
            valid = false;
        }

        if (!email) {
            showAuthError('signup-email', 'signup-email-error',
                'Email is required.');
            valid = false;
        } else if (!emailRegex.test(email)) {
            showAuthError('signup-email', 'signup-email-error',
                'Please enter a valid email address.');
            valid = false;
        }

        const phoneDigits = phone.replace(/\D/g, '');

if (!phone) {
    showAuthError(
        'signup-phone',
        'signup-phone-error',
        'Phone number is required.'
    );
    valid = false;
} else if (!phoneRegex.test(phoneDigits)) {
    showAuthError(
        'signup-phone',
        'signup-phone-error',
        'Enter a valid Kazakhstan phone number (+7XXXXXXXXXX).'
    );
    valid = false;
}
        

        if (!password.trim()) {
            showAuthError('signup-password', 'signup-password-error',
                'Password is required.');
            valid = false;
        } else if (password.length < 6) {
            showAuthError('signup-password', 'signup-password-error',
                'Password must be at least 6 characters.');
            valid = false;
        }

        if (!valid) return;

        const users = JSON.parse(
            localStorage.getItem('buddies_users') || '[]'
        );

        const existingUser = users.find(
            user => user.email.toLowerCase() === email.toLowerCase()
        );

        if (existingUser) {
            showAuthError('signup-email', 'signup-email-error',
                'An account with this email already exists.');
            return;
        }

        const newUser = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            createdDate: new Date().toLocaleDateString()
        };

        users.push(newUser);

        localStorage.setItem('buddies_users', JSON.stringify(users));
        localStorage.setItem('buddies_logged_user', JSON.stringify(newUser));

        alert('Account created successfully!');
        checkAuthStatus();
    });

    // ----- Вход -----
    $('#login-form').off('submit').on('submit', function (e) {
        e.preventDefault();

        let valid = true;

        const email = ($('#login-email').val() || '').trim();
        const password = $('#login-password').val() || '';

        clearAuthError('login-email', 'login-email-error');
        clearAuthError('login-password', 'login-password-error');

        if (!email) {
            showAuthError('login-email', 'login-email-error',
                'Email is required.');
            valid = false;
        } else if (!emailRegex.test(email)) {
            showAuthError('login-email', 'login-email-error',
                'Please enter a valid email address.');
            valid = false;
        }

        if (!password.trim()) {
            showAuthError('login-password', 'login-password-error',
                'Password is required.');
            valid = false;
        }

        if (!valid) return;

        const users = JSON.parse(
            localStorage.getItem('buddies_users') || '[]'
        );

        const user = users.find(
            u => u.email.toLowerCase() === email.toLowerCase() &&
                 u.password === password
        );

        if (user) {
            localStorage.setItem(
                'buddies_logged_user',
                JSON.stringify(user)
            );

            alert(`Welcome back, ${user.name}!`);
            checkAuthStatus();
        } else {
            showAuthError('login-password', 'login-password-error',
                'Invalid email or password.');
        }
    });

    // ----- Выход -----
    $('#logout-btn').off('click').on('click', function () {
        localStorage.removeItem('buddies_logged_user');
        checkAuthStatus();
    });


    // =====================================================
    // 5. ФОРМА БРОНИРОВАНИЯ (#order-form)
    // ЭТА ФОРМА ОТДЕЛЬНА ОТ РЕГИСТРАЦИИ И ВХОДА
    // =====================================================

    const orderForm = document.getElementById('order-form');

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            const nameInput = document.getElementById('full-name');
            const emailInput = document.getElementById('email');
            const dateInput = document.getElementById('reservation-date');
            const guestsInput = document.getElementById('guest-count');
            const passInput = document.getElementById('access-code');
            const passConfirmInput = document.getElementById('confirm-code');

            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const dateError = document.getElementById('date-error');
            const guestsError = document.getElementById('guests-error');
            const passError = document.getElementById('pass-error');
            const confirmError = document.getElementById('confirm-error');

            [
                nameError,
                emailError,
                dateError,
                guestsError,
                passError,
                confirmError
            ].forEach(el => {
                if (el) el.textContent = '';
            });

            // Очищаем ошибки только внутри бронирования
            orderForm.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });

            if (nameInput && !nameInput.value.trim()) {
                if (nameError) {
                    nameError.textContent = 'Full name is required.';
                }
                isValid = false;
            }

            if (emailInput) {
                if (!emailInput.value.trim()) {
                    if (emailError) {
                        emailError.textContent = 'Email address is required.';
                    }
                    isValid = false;
                } else if (!emailRegex.test(emailInput.value.trim())) {
                    if (emailError) {
                        emailError.textContent =
                            'Please enter a valid email address.';
                    }
                    isValid = false;
                }
            }

            if (dateInput && !dateInput.value) {
                if (dateError) {
                    dateError.textContent =
                        'Reservation date & time is required.';
                }
                isValid = false;
            }

            if (guestsInput &&
                (!guestsInput.value || Number(guestsInput.value) < 1)) {
                if (guestsError) {
                    guestsError.textContent =
                        'Please enter a valid number of guests.';
                }
                isValid = false;
            }

            if (passInput) {
                if (!passInput.value) {
                    if (passError) {
                        passError.textContent =
                            'Access code/password is required.';
                    }
                    isValid = false;
                } else if (!/^\d{8,}$/.test(passInput.value)) {
                    if (passError) {
                        passError.textContent =
                            'Code must contain at least 8 digits (numbers only).';
                    }
                    isValid = false;
                }
            }

            if (passConfirmInput) {
                if (!passConfirmInput.value) {
                    if (confirmError) {
                        confirmError.textContent =
                            'Please confirm your password.';
                    }
                    isValid = false;
                } else if (
                    passInput &&
                    passInput.value !== passConfirmInput.value
                ) {
                    if (confirmError) {
                        confirmError.textContent = 'Passwords do not match.';
                    }
                    isValid = false;
                }
            }

            if (isValid) {
                const $submitBtn = $(orderForm).find(
                    'button[type="submit"]'
                );

                const originalText = $submitBtn.html();

                $submitBtn.prop('disabled', true).html(`
                    <span class="spinner-border spinner-border-sm me-2"
                          role="status" aria-hidden="true"></span>
                    Processing...
                `);

                setTimeout(() => {
                    $submitBtn.prop('disabled', false).html(originalText);
                    orderForm.reset();

                    const successMsg =
                        document.getElementById('form-success-msg');

                    if (successMsg) {
                        successMsg.classList.remove('d-none');

                        setTimeout(() => {
                            successMsg.classList.add('d-none');
                        }, 5000);
                    }

                    showToast(
                        "Table booked & order successfully submitted!"
                    );
                }, 1500);
            }
        });
    }


    // Остальные custom-form, кроме бронирования и авторизации
    $('.custom-form')
        .not('#order-form, #signup-form, #login-form')
        .on('submit', function (e) {
            e.preventDefault();

            const $submitBtn = $(this).find('button[type="submit"]');
            const originalText = $submitBtn.html();

            $submitBtn.prop('disabled', true).html(`
                <span class="spinner-border spinner-border-sm me-2"
                      role="status" aria-hidden="true"></span>
                Please wait...
            `);

            setTimeout(() => {
                $submitBtn.prop('disabled', false).html(originalText);
                showToast("Form submitted successfully!");
                this.reset();
            }, 2000);
        });


    // =====================================================
    // 6. ПОГОДА (Open-Meteo API, Астана)
    // =====================================================

    async function fetchWeather() {
        const $loading = $('#weather-loading');
        const $content = $('#weather-content');
        const $error = $('#weather-error');
        const $widget = $('#weather-widget');

        if (
            $('#weather-widget-container').length === 0 &&
            $widget.length === 0
        ) {
            return;
        }

        try {
            const response = await fetch(
                'https://api.open-meteo.com/v1/forecast?latitude=51.1694&longitude=71.4491&current_weather=true'
            );

            if (!response.ok) {
                throw new Error('API Request Failed');
            }

            const data = await response.json();
            const currentWeather = data.current_weather;

            if (!currentWeather) {
                throw new Error('No weather data');
            }

            const temp = Math.round(currentWeather.temperature);

            $('#weather-temp').text(
                `${temp > 0 ? '+' : ''}${temp} °C`
            );

            $('#weather-desc').text(
                `Astana Wind Speed: ${currentWeather.windspeed} km/h`
            );

            if ($widget.length) {
                $widget.html(`🌤️ Astana: <strong>${temp}°C</strong>`);
            }

            $loading.addClass('d-none');
            $content.removeClass('d-none');

        } catch (err) {
            console.error("Weather load error:", err);
            $loading.addClass('d-none');
            $error.removeClass('d-none');
        }
    }

    fetchWeather();


    // =====================================================
    // 7. МЕНЮ: ДИНАМИЧЕСКИЙ РЕНДЕР + ФИЛЬТР
    // =====================================================

    function renderFilteredMenu(category) {
        localStorage.setItem('buddies_menu_filter', category);

        $('.filter-btn')
            .removeClass('active btn-brand')
            .addClass('btn-outline-brand');

        $(`.filter-btn[data-category="${category}"]`)
            .addClass('active btn-brand')
            .removeClass('btn-outline-brand');

        const menuContainer =
            document.getElementById('dynamic-menu-container');

        if (!menuContainer) {
            if (category === 'all') {
                $('.menu-item-card').show(300);
            } else {
                $('.menu-item-card').hide();
                $(`.menu-item-card[data-category="${category}"]`).show(300);
            }
            return;
        }

        let filteredItems = [];

        switch (category) {
            case 'main':
                filteredItems = BuddiesRestaurantApp.menuItems.filter(
                    item => item.category === 'main'
                );
                break;

            case 'dessert':
                filteredItems = BuddiesRestaurantApp.menuItems.filter(
                    item => item.category === 'dessert'
                );
                break;

            case 'drinks':
                filteredItems = BuddiesRestaurantApp.menuItems.filter(
                    item => item.category === 'drinks'
                );
                break;

            case 'all':
            default:
                filteredItems = [...BuddiesRestaurantApp.menuItems];
                break;
        }

        const htmlContent = filteredItems.map(item => `
            <div class="col-12 col-md-6 col-lg-4 animate-card menu-item-card searchable-item"
                 data-category="${item.category}">
                <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                    <img src="${item.img}" class="card-img-top"
                         alt="${item.name}"
                         style="height: 200px; object-fit: cover;">

                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-brand fw-bold">
                            ${item.name}
                        </h5>

                        <p class="card-text text-muted flex-grow-1">
                            ${item.desc}
                        </p>

                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="fw-bold fs-5 text-brand">
                                ${item.price.toLocaleString()} ₸
                            </span>

                            <a href="reservation.html"
                               class="btn btn-brand btn-sm">
                                Order Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        menuContainer.innerHTML = htmlContent;
    }

    $('.filter-btn').on('click', function () {
        renderFilteredMenu($(this).attr('data-category'));
    });

    renderFilteredMenu(
        localStorage.getItem('buddies_menu_filter') || 'all'
    );
        // =====================================================
    // 8. ЖИВОЙ ПОИСК + АВТОДОПОЛНЕНИЕ
    // =====================================================

    $('#live-search-input').on('keyup', function () {
        const query = $(this).val().toLowerCase();

        $('.searchable-item, .menu-item-card').each(function () {
            const text = $(this).text().toLowerCase();

            if (text.includes(query)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    const searchSuggestions = [
        "Signature Ribeye Steak",
        "Creamy Fettuccine Pasta",
        "Berry Cheesecake",
        "Salmon Steak with Vegetables",
        "Classic Beshbarmak",
        "Aperol Spritz Cocktail"
    ];

    const $searchInput = $('#live-search-input');

    if ($searchInput.length > 0) {

        if (!$searchInput.parent().hasClass('search-wrapper')) {
            $searchInput.wrap(
                '<div class="search-wrapper position-relative"></div>'
            );
        }

        if ($('#autocomplete-list').length === 0) {
            $searchInput.after(
                '<div id="autocomplete-list" class="autocomplete-dropdown d-none"></div>'
            );
        }

        $searchInput.attr('autocomplete', 'off');

        $searchInput.on('keyup', function () {
            const val = $(this).val().toLowerCase();
            const $list = $('#autocomplete-list');

            $list.empty();

            if (!val) {
                $list.addClass('d-none');
                return;
            }

            const matches = searchSuggestions.filter(
                item => item.toLowerCase().includes(val)
            );

            if (matches.length > 0) {
                matches.forEach(match => {
                    $list.append(
                        `<div class="autocomplete-item">${match}</div>`
                    );
                });

                $list.removeClass('d-none');
            } else {
                $list.addClass('d-none');
            }
        });

        $(document).on('click', '.autocomplete-item', function () {
            $searchInput.val($(this).text()).trigger('keyup');
            $('#autocomplete-list').addClass('d-none');
        });

        $(document).on('click', function (e) {
            if (
                !$(e.target).closest(
                    '#live-search-input, #autocomplete-list'
                ).length
            ) {
                $('#autocomplete-list').addClass('d-none');
            }
        });
    }


    // =====================================================
    // 9. ПОДСВЕТКА ТЕКСТА
    // =====================================================

    $('#highlight-search-btn').on('click', function () {
        const keyword = $('#highlight-keyword').val().trim();
        const $targetArea = $('#highlightable-content');

        $targetArea.find('.highlight-mark').each(function () {
            $(this).replaceWith($(this).text());
        });

        if (!keyword) return;

        // Экранируем специальные символы регулярного выражения
        const safeKeyword = keyword.replace(
            /[.*+?^${}()|[\]\\]/g,
            '\\$&'
        );

        function highlightText(node) {
            if (node.nodeType === 3) {
                const regex = new RegExp(`(${safeKeyword})`, 'gi');

                if (regex.test(node.nodeValue)) {
                    const replaced = node.nodeValue.replace(
                        regex,
                        '<span class="highlight-mark">$1</span>'
                    );

                    $(node).replaceWith(replaced);
                }

            } else if (
                node.nodeType === 1 &&
                node.childNodes &&
                !$(node).hasClass('highlight-mark')
            ) {
                Array.from(node.childNodes).forEach(child => {
                    highlightText(child);
                });
            }
        }

        $targetArea.each(function () {
            highlightText(this);
        });

        showToast(`Highlighted matches for "${keyword}"`);
    });


    // =====================================================
    // 10. АНИМАЦИЯ СЧЁТЧИКОВ
    // =====================================================

    let counterAnimated = false;

    function animateCounters() {
        $('.counter-number, .counter, [data-count]').each(function () {
            const $this = $(this);
            const countTo = parseInt($this.attr('data-count'), 10) || 250;

            $({ countNum: 0 }).animate(
                { countNum: countTo },
                {
                    duration: 2000,
                    easing: 'swing',

                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },

                    complete: function () {
                        $this.text(countTo + '+');
                    }
                }
            );
        });
    }

    function checkCounterAnimation() {
        if (counterAnimated) return;

        const $counterSection = $('#stats-counter-section');

        if ($counterSection.length === 0) {
            counterAnimated = true;
            animateCounters();
            return;
        }

        const oTop =
            $counterSection.offset().top - window.innerHeight + 100;

        if ($(window).scrollTop() > oTop) {
            counterAnimated = true;
            animateCounters();
        }
    }

    $(window).on('scroll', checkCounterAnimation);
    checkCounterAnimation();


    // =====================================================
    // 11. КОПИРОВАНИЕ ТЕКСТА (.copy-btn)
    // =====================================================

    function showCopySuccess($btn, originalHtml) {
        $btn.addClass('btn-success');

        $btn.html(
            '✓ <span class="copy-tooltip" style="display:block;">Copied to clipboard!</span>'
        );

        setTimeout(() => {
            $btn.removeClass('btn-success');
            $btn.html(originalHtml);
        }, 2000);
    }

    function fallbackCopy(text, $btn, originalHtml) {
        const $temp = $('<textarea>');

        $('body').append($temp);
        $temp.val(text).select();

        try {
            document.execCommand('copy');
            showCopySuccess($btn, originalHtml);
        } catch (err) {
            console.error('Copy failed', err);
        }

        $temp.remove();
    }

    $(document).on('click', '.copy-btn', function () {
        const $btn = $(this);
        const originalHtml = $btn.html();

        let textToCopy =
            $btn.attr('data-copy-text') ||
            $btn.attr('data-copy');

        if (!textToCopy) {
            textToCopy = $btn.prev().text().trim();
        }

        if (!textToCopy) {
            textToCopy = $btn
                .closest('.card, .border, div')
                .find('p')
                .first()
                .text()
                .trim();
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    showCopySuccess($btn, originalHtml);
                })
                .catch(() => {
                    fallbackCopy(textToCopy, $btn, originalHtml);
                });
        } else {
            fallbackCopy(textToCopy, $btn, originalHtml);
        }
    });


    // =====================================================
    // 12. LAZY LOAD КАРТИНОК
    // =====================================================

    const $lazyImages = $('img.lazy-load');

    function lazyLoadImages() {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        $lazyImages.each(function () {
            const $img = $(this);

            if ($img.attr('src') !== $img.attr('data-src')) {
                if (
                    $img.offset().top <
                    scrollTop + windowHeight + 150
                ) {
                    $img
                        .attr('src', $img.attr('data-src'))
                        .hide()
                        .fadeIn(600);
                }
            }
        });
    }

    $(window).on('scroll resize', lazyLoadImages);
    lazyLoadImages();


    // =====================================================
    // 13. ЧАСЫ
    // =====================================================

    function updateClock() {
        const now = new Date();

        $('#current-date-time').text(
            now.toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short'
            })
        );
    }

    setInterval(updateClock, 1000);
    updateClock();

});