document.addEventListener('DOMContentLoaded', () => {
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

            [nameError, emailError, passError, confirmError].forEach(el => {
                if (el) el.textContent = '';
            });
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Full name is required.';
                isValid = false;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email address is required.';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address (e.g., user@domain.com).';
                isValid = false;
            }
            if (!passInput.value) {
                passError.textContent = 'Access code/password is required.';
                isValid = false;
            } else if (passInput.value.length < 6) {
                passError.textContent = 'Password must be at least 6 characters long.';
                isValid = false;
            }
            if (!passConfirmInput.value) {
                confirmError.textContent = 'Please confirm your password.';
                isValid = false;
            } else if (passInput.value !== passConfirmInput.value) {
                confirmError.textContent = 'Passwords do not match.';
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

const BuddiesRestaurantApp = {
    name: "Buddies Restaurant",
    location: "Astana, Kazakhstan",
    ratings: [],
    menuItems: [
        { id: 1, name: "Signature Ribeye Steak", category: "main", price: 12500, img: "images/dish1.jpg", desc: "Tender grilled beef served with garlic butter and vegetables." },
        { id: 2, name: "Creamy Fettuccine Pasta", category: "main", price: 4800, img: "images/dish2.jpg", desc: "Homemade fettuccine with wild mushrooms and parmesan." },
        { id: 3, name: "Berry Cheesecake", category: "dessert", price: 2900, img: "images/dish3.jpg", desc: "Classic New York cheesecake topped with fresh berries." },
        { id: 4, name: "Salmon Steak with Veggies", category: "main", price: 9500, img: "images/стейк из лосося.jpg", desc: "Grilled salmon steak with fresh seasonal greens." },
        { id: 5, name: "Classic Beshbarmak", category: "main", price: 6500, img: "images/бешпармак.jpg", desc: "Traditional Kazakh dish with tender meat and handmade noodles." },
        { id: 6, name: "Aperol Spritz Cocktail", category: "drinks", price: 3200, img: "images/коктейль.jpg", desc: "Refreshing prosecco cocktail with orange slice." }
    ],
    facts: [
        "Did you know? Our Beshbarmak noodle dough is aged for 12 hours for maximum tenderness!",
        "Fact: We source all our organic vegetables from local farmers near Astana.",
        "Chef's Secret: Our Ribeye Steak is aged for 21 days before grilling.",
        "Fun Fact: Over 10,000 Aperol Spritz cocktails were served at Buddies last year!"
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeBtn.textContent = isDark ? "🌙 Night" : "☀️ Day";
            themeBtn.className = isDark ? "btn btn-sm btn-warning" : "btn btn-sm btn-outline-light";
        });
    }

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

    const nameInput = document.getElementById('user-name-input');
    const greetingDisplay = document.getElementById('dynamic-greeting');
    const submitNameBtn = document.getElementById('submit-name-btn');

    if (submitNameBtn && nameInput && greetingDisplay) {
        submitNameBtn.addEventListener('click', () => {
            const val = nameInput.value.trim();
            const timeOfDayGreeting = getTimeOfDayGreeting();
            greetingDisplay.innerText = val ? `${timeOfDayGreeting}, ${val}! Welcome to Buddies.` : `${timeOfDayGreeting}, Guest!`;
            greetingDisplay.style.transform = "scale(1.05)";
            setTimeout(() => greetingDisplay.style.transform = "scale(1)", 300);
        });
    }

    const factBtn = document.getElementById('fetch-fact-btn');
    const factDisplay = document.getElementById('fact-display');
    if (factBtn && factDisplay) {
        factBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * BuddiesRestaurantApp.facts.length);
            factDisplay.textContent = BuddiesRestaurantApp.facts[randomIndex];
            factDisplay.style.opacity = 0;
            factDisplay.style.transition = "opacity 0.5s ease";
            setTimeout(() => factDisplay.style.opacity = 1, 50);
        });
    }

    const navLinks = Array.from(document.querySelectorAll('.navbar-nav .nav-link'));
    let currentFocusIndex = navLinks.findIndex(link => link.classList.contains('active'));
    if (currentFocusIndex === -1) currentFocusIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            if (document.activeElement.classList.contains('nav-link')) {
                e.preventDefault();
                if (e.key === 'ArrowRight') {
                    currentFocusIndex = (currentFocusIndex + 1) % navLinks.length;
                } else if (e.key === 'ArrowLeft') {
                    currentFocusIndex = (currentFocusIndex - 1 + navLinks.length) % navLinks.length;
                }
                navLinks[currentFocusIndex].focus();
            }
        }
    });

    const resetFormBtn = document.getElementById('reset-form-btn');
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            document.querySelectorAll('#order-form input, #order-form textarea').forEach(input => {
                input.value = '';
            });
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active', 'btn-brand'));
                filterBtns.forEach(b => b.classList.add('btn-outline-brand'));
                btn.classList.add('active', 'btn-brand');
                btn.classList.remove('btn-outline-brand');
                const category = btn.getAttribute('data-category');
                renderFilteredMenu(category);
            });
        });
    }

    function renderFilteredMenu(category) {
        const menuContainer = document.getElementById('dynamic-menu-container');
        if (!menuContainer) return;
        let filteredItems = [];
        switch (category) {
            case 'main':
                filteredItems = BuddiesRestaurantApp.menuItems.filter(item => item.category === 'main');
                break;
            case 'dessert':
                filteredItems = BuddiesRestaurantApp.menuItems.filter(item => item.category === 'dessert');
                break;
            case 'drinks':
                filteredItems = BuddiesRestaurantApp.menuItems.filter(item => item.category === 'drinks');
                break;
            case 'all':
            default:
                filteredItems = [...BuddiesRestaurantApp.menuItems];
                break;
        }

        const htmlContent = filteredItems.map(item => `
            <div class="col-12 col-md-6 col-lg-4 animate-card">
                <div class="card h-100 shadow-sm">
                    <img src="${item.img}" class="card-img-top" alt="${item.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-brand">${item.name}</h5>
                        <p class="card-text text-muted flex-grow-1">${item.desc}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="fw-bold fs-5 text-brand">${item.price.toLocaleString()} ₸</span>
                            <button class="btn btn-brand btn-sm">Order</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        menuContainer.innerHTML = htmlContent;
    }

    renderFilteredMenu('all');
    function getTimeOfDayGreeting() {
        const hour = new Date().getHours();
        let greeting = "";
        
        switch (true) {
            case (hour >= 5 && hour < 12):
                greeting = "Good Morning";
                break;
            case (hour >= 12 && hour < 18):
                greeting = "Good Afternoon";
                break;
            default:
                greeting = "Good Evening";
                break;
        }
        return greeting;
    }
});



$(document).ready(function() {
    console.log("jQuery is ready!");
    if ($('#scroll-progress-bar').length === 0) {
        $('body').prepend(`
            <div id="scroll-progress-container">
                <div id="scroll-progress-bar"></div>
            </div>
        `);
    }

    $(window).on('scroll', function() {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = (scrollTop / docHeight) * 100;
        $('#scroll-progress-bar').css('width', scrollPercent + '%');
    });

    if ($('#toast-container').length === 0) {
        $('body').append('<div id="toast-container"></div>');
    }

    window.showToast = function(message) {
        const toast = $(`<div class="custom-toast">${message}</div>`);
        $('#toast-container').append(toast);
        setTimeout(() => toast.addClass('show'), 50);
        setTimeout(() => {
            toast.removeClass('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    $('#live-search-input').on('keyup', function() {
        const query = $(this).val().toLowerCase();
        $('.searchable-item').each(function() {
            const text = $(this).text().toLowerCase();
            if (text.includes(query)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    const searchSuggestions = [
        "Signature Ribeye Steak", "Creamy Fettuccine Pasta", "Berry Cheesecake",
        "Salmon Steak with Vegetables", "Classic Beshbarmak", "Aperol Spritz Cocktail",
        "Table Reservation", "Contact Information", "Working Hours", "VIP Banquet Hall"
    ];

    const $searchInput = $('#autocomplete-search');
    if ($searchInput.length > 0) {
        $searchInput.attr('autocomplete', 'off');
        $searchInput.after('<div id="autocomplete-list" class="autocomplete-dropdown d-none"></div>');
        
        $searchInput.on('keyup', function() {
            const val = $(this).val().toLowerCase();
            const $list = $('#autocomplete-list');
            $list.empty();

            if (!val) {
                $list.addClass('d-none');
                return;
            }

            const matches = searchSuggestions.filter(item => item.toLowerCase().includes(val));
            if (matches.length > 0) {
                matches.forEach(match => {
                    $list.append(`<div class="autocomplete-item">${match}</div>`);
                });
                $list.removeClass('d-none');
            } else {
                $list.addClass('d-none');
            }
        });

        $(document).on('click', '.autocomplete-item', function() {
            $searchInput.val($(this).text());
            $('#autocomplete-list').addClass('d-none');
            showToast(`Selected: $(this).text()`);
        });

        $(document).on('click', function(e) {
            if (!$(e.target).closest('#autocomplete-search, #autocomplete-list').length) {
                $('#autocomplete-list').addClass('d-none');
            }
        });
    }

    $('#highlight-search-btn').on('click', function() {
        const keyword = $('#highlight-keyword').val().trim();
        const $targetArea = $('#highlightable-content');
        $targetArea.find('.highlight-mark').each(function() {
            $(this).replaceWith($(this).text());
        });

        if (!keyword) return;
        function highlightText(node, keyword) {
            if (node.nodeType === 3) {
                const regex = new RegExp(`(${keyword})`, 'gi');
                if (regex.test(node.nodeValue)) {
                    const replaced = node.nodeValue.replace(regex, '<span class="highlight-mark">$1</span>');
                    $(node).replaceWith(replaced);
                }
            } else if (node.nodeType === 1 && node.childNodes && !$(node).hasClass('highlight-mark')) {
                Array.from(node.childNodes).forEach(child => highlightText(child, keyword));
            }
        }
        $targetArea.each(function() {
            highlightText(this, keyword);
        });
        showToast(`Highlighted matches for "${keyword}"`);
    });

    let counterAnimated = false;
    function checkCounterAnimation() {
        const $counterSection = $('#stats-counter-section');
        if ($counterSection.length === 0) return;
        const oTop = $counterSection.offset().top - window.innerHeight + 100;
        if (!counterAnimated && $(window).scrollTop() > oTop) {
            counterAnimated = true;
            $('.counter-number').each(function() {
                const $this = $(this);
                const countTo = parseInt($this.attr('data-count'));
                $({ countNum: 0 }).animate({ countNum: countTo }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum + '+');
                    }
                });
            });
        }
    }
    $(window).on('scroll', checkCounterAnimation);
    checkCounterAnimation();

    $('.custom-form, #order-form').on('submit', function(e) {
        e.preventDefault();
        const $submitBtn = $(this).find('button[type="submit"]');
        const originalText = $submitBtn.html();
        $submitBtn.prop('disabled', true).html(`
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Please wait...
        `);

        setTimeout(() => {
            $submitBtn.prop('disabled', false).html(originalText);
            showToast("Form submitted successfully!");
            this.reset();
        }, 2000);
    });

    $('.copy-btn').on('click', function() {
        const textToCopy = $(this).attr('data-copy-text') || $(this).prev().text();
        const $btn = $(this);
        navigator.clipboard.writeText(textToCopy).then(() => {
            let $tooltip = $btn.find('.copy-tooltip');
            if ($tooltip.length === 0) {
                $tooltip = $('<span class="copy-tooltip">Copied to clipboard!</span>');
                $btn.append($tooltip);
            }
            $tooltip.fadeIn(200);
            $btn.html('✓ <span class="copy-tooltip" style="display:block;">Copied to clipboard!</span>');
            setTimeout(() => {
                $btn.html('📋 Copy <span class="copy-tooltip" style="display:none;">Copied to clipboard!</span>');
            }, 2000);
        });
    });

    const $lazyImages = $('img.lazy-load');
    function lazyLoadImages() {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        $lazyImages.each(function() {
            const $img = $(this);
            if ($img.attr('src') !== $img.attr('data-src')) {
                if ($img.offset().top < scrollTop + windowHeight + 150) {
                    $img.attr('src', $img.attr('data-src')).hide().fadeIn(600);
                }
            }
        });
    }
    $(window).on('scroll resize', lazyLoadImages);
    lazyLoadImages();
});

$(document).ready(function () {
    console.log("Buddies Restaurant JS & jQuery initialized successfully.");

    /* ----------------------------------------------------------------------
       1. LIGHT & DARK MODES WITH LOCALSTORAGE (Requirement 3)
       ---------------------------------------------------------------------- */
    const savedTheme = localStorage.getItem('buddies_theme') || 'light';
    if (savedTheme === 'dark') {
        $('body').addClass('dark-theme');
        $('#theme-toggle-btn').text('🌙 Night').removeClass('btn-outline-light').addClass('btn-warning');
    }

    $('#theme-toggle-btn').on('click', function () {
        $('body').toggleClass('dark-theme');
        const isDark = $('body').hasClass('dark-theme');
        localStorage.setItem('buddies_theme', isDark ? 'dark' : 'light');
        $(this).text(isDark ? '🌙 Night' : '☀️ Day')
               .toggleClass('btn-warning btn-outline-light');
    });

    /* ----------------------------------------------------------------------
       2. AUTHENTICATION & FORM SWITCHING (Requirement 5.1)
       ---------------------------------------------------------------------- */
    $('#show-login-btn').on('click', function(e) {
        e.preventDefault();
        $('#signup-wrapper').addClass('d-none');
        $('#login-wrapper').removeClass('d-none');
        $('.error-message').text('');
    });

    $('#show-signup-btn').on('click', function(e) {
        e.preventDefault();
        $('#login-wrapper').addClass('d-none');
        $('#signup-wrapper').removeClass('d-none');
        $('.error-message').text('');
    });

    function checkAuthStatus() {
        const loggedUser = JSON.parse(localStorage.getItem('buddies_logged_user'));
        if (loggedUser) {
            $('#auth-forms-container').addClass('d-none');
            $('#profile-dashboard').removeClass('d-none');
            $('#profile-display-name').text(loggedUser.name);
            $('#profile-display-email').text(loggedUser.email);
            $('#profile-display-phone').text(loggedUser.phone || 'Not provided');
            $('#profile-created-date').text(loggedUser.createdDate || 'Today');
            $('#nav-profile-link').text(`Account (${loggedUser.name.split(' ')[0]})`);
        } else {
            $('#auth-forms-container').removeClass('d-none');
            $('#profile-dashboard').addClass('d-none');
            $('#nav-profile-link').text('Profile');
        }
    }
    checkAuthStatus();

    /* ----------------------------------------------------------------------
       3. STRICT FORM VALIDATION WITHOUT HTML5 ATTRIBUTES (Requirement 5.2)
       ---------------------------------------------------------------------- */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?77\d{9}$/;

    // Sign Up Validation & LocalStorage Save
    $('#signup-form').on('submit', function (e) {
        e.preventDefault();
        let valid = true;
        $('.error-message').text('');

        const name = $('#signup-name').val().trim();
        const email = $('#signup-email').val().trim();
        const phone = $('#signup-phone').val().trim();
        const password = $('#signup-password').val();

        if (!name) {
            $('#signup-name-error').text('Full name is required.');
            valid = false;
        }

        if (!email) {
            $('#signup-email-error').text('Email is required.');
            valid = false;
        } else if (!emailRegex.test(email)) {
            $('#signup-email-error').text('Invalid email format (e.g. user@domain.com).');
            valid = false;
        }

        if (!phone) {
            $('#signup-phone-error').text('Phone number is required.');
            valid = false;
        } else if (!phoneRegex.test(phone))
            {
            $('#signup-phone-error').text('Phone must match format: +77XXXXXXXXX.');
            valid = false;
        }

        if (!password) {
            $('#signup-password-error').text('Password is required.');
            valid = false;
        } else if (password.length < 6) {
            $('#signup-password-error').text('Password must be at least 6 characters.');
            valid = false;
        }

        if (valid) {
            const users = JSON.parse(localStorage.getItem('buddies_users')) || [];
            const existingUser = users.find(u => u.email === email);

            if (existingUser) {
                $('#signup-email-error').text('An account with this email already exists.');
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
        }
    });

    // Log In Validation & Check
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        let valid = true;
        $('#login-email-error, #login-password-error').text('');

        const email = $('#login-email').val().trim();
        const password = $('#login-password').val();

        if (!email) {
            $('#login-email-error').text('Email is required.');
            valid = false;
        }
        if (!password) {
            $('#login-password-error').text('Password is required.');
            valid = false;
        }

        if (valid) {
            const users = JSON.parse(localStorage.getItem('buddies_users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('buddies_logged_user', JSON.stringify(user));
                alert(`Welcome back, ${user.name}!`);
                checkAuthStatus();
            } else {
                $('#login-password-error').text('Invalid email or password.');
            }
        }
    });

    // Log Out
    $('#logout-btn').on('click', function () {
        localStorage.removeItem('buddies_logged_user');
        checkAuthStatus();
    });

    /* ----------------------------------------------------------------------
       4. EXTERNAL API INTEGRATION (Open-Meteo Weather API) (Requirement 7)
       ---------------------------------------------------------------------- */
    async function fetchWeather() {
        const $loading = $('#weather-loading');
        const $content = $('#weather-content');
        const $error = $('#weather-error');

        if ($('#weather-widget-container').length === 0) return;

        try {
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.1694&longitude=71.4491&current_weather=true');
            if (!response.ok) throw new Error('API Request Failed');
            
            const data = await response.json();
            const currentWeather = data.current_weather;

            $('#weather-temp').text(`${currentWeather.temperature} °C`);
            $('#weather-desc').text(`Astana Wind Speed: ${currentWeather.windspeed} km/h`);

            $loading.addClass('d-none');
            $content.removeClass('d-none');
        } catch (err) {
            console.error(err);
            $loading.addClass('d-none');
            $error.removeClass('d-none');
        }
    }
    fetchWeather();

    /* ----------------------------------------------------------------------
       5. SEARCH & FILTERING WITH LOCALSTORAGE (Requirement 5.3)
       ---------------------------------------------------------------------- */
    const savedFilter = localStorage.getItem('buddies_menu_filter') || 'all';
    
    function applyMenuFilter(category) {
        localStorage.setItem('buddies_menu_filter', category);
        $('.filter-btn').removeClass('active btn-brand').addClass('btn-outline-brand');
        $(`.filter-btn[data-category="${category}"]`).addClass('active btn-brand').removeClass('btn-outline-brand');

        if (category === 'all') {
            $('.menu-item-card').show(300);
        } else {
            $('.menu-item-card').hide();
            $(`.menu-item-card[data-category="${category}"]`).show(300);
        }
    }

    $('.filter-btn').on('click', function () {
        const category = $(this).attr('data-category');
        applyMenuFilter(category);
    });

    applyMenuFilter(savedFilter);

    // Live Search Filter
    $('#live-search-input').on('keyup', function() {
        const query = $(this).val().toLowerCase();
        $('.searchable-item').each(function() {
            const text = $(this).text().toLowerCase();
            if (text.includes(query)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    /* ----------------------------------------------------------------------
       6. UI EFFECTS, CLOCK & SPINNERS (Requirement 6)
       ---------------------------------------------------------------------- */
    function updateClock() {
        const now = new Date();
        $('#current-date-time').text(now.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }));
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Form submit loading simulation
    $('.custom-form, #order-form').on('submit', function(e) {
        e.preventDefault();
        const $submitBtn = $(this).find('button[type="submit"]');
        const originalText = $submitBtn.html();

        $submitBtn.prop('disabled', true).html(`
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Processing...
        `);

        setTimeout(() => {
            $submitBtn.prop('disabled', false).html(originalText);
            alert("Action completed successfully!");
            this.reset();
        }, 1500);
    });
});