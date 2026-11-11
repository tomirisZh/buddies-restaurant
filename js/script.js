/* ==========================================================================
<<<<<<< HEAD
   BUDDIES RESTAURANT - FINAL PROJECT COMPLETE JS & JQUERY CODE
   Team: Tomiris Zhumagazy, Merey Abdymanap, Yenlik Serikkali
   ========================================================================== */

$(document).ready(function () {

    /* ----------------------------------------------------------------------
       REQUIREMENT 3: LIGHT & DARK MODES WITH LOCALSTORAGE
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
       REQUIREMENT 5.1 & 5.2: AUTHENTICATION SIMULATION & FORM VALIDATION
       ---------------------------------------------------------------------- */
    
    // Check user login status on page load
    function checkAuthStatus() {
        const loggedUser = JSON.parse(localStorage.getItem('buddies_logged_user'));
        if (loggedUser) {
            $('#auth-forms-container').addClass('d-none');
            $('#profile-dashboard').removeClass('d-none');
            $('#profile-display-name').text(loggedUser.name);
            $('#profile-display-email').text(loggedUser.email);
            $('#profile-display-phone').text(loggedUser.phone || 'Not provided');
            $('#profile-created-date').text(loggedUser.createdDate || '18.11.2026');
            $('#nav-profile-link').text(`Account (${loggedUser.name.split(' ')[0]})`);
        } else {
            $('#auth-forms-container').removeClass('d-none');
            $('#profile-dashboard').addClass('d-none');
            $('#nav-profile-link').text('Profile / Login');
        }
    }
    checkAuthStatus();

    // Regex Validation Helpers (No HTML5 validation attributes used)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?77\d{9}$/; // Kazakh format +77XXXXXXXXX or 77XXXXXXXXX

    // Sign Up Submission
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
        } else if (!phoneRegex.test(phone)) {
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

    // Log In Submission
    $('#login-form').on('submit', function (e) {
=======
   BUDDIES RESTAURANT - UNIFIED JAVASCRIPT & JQUERY LOGIC
   Team: Tomiris Zhumagazy, Merey Abdymanap, Yenlik Serikkali
   ========================================================================== */

// --- DATA & APP OBJECT (Assignment 5) ---
const BuddiesRestaurantApp = {
    name: "Buddies Restaurant",
    location: "Astana, Kazakhstan",

    menuItems: [
        { id: 1, name: "Signature Ribeye Steak", category: "main", price: 12500, img: "images/dish1.jpg", desc: "Tender grilled beef served with garlic butter, rosemary, and seasonal roasted vegetables." },
        { id: 2, name: "Creamy Fettuccine Pasta", category: "main", price: 4800, img: "images/dish2.jpg", desc: "Homemade fettuccine with wild mushrooms, parmesan cheese, and creamy garlic sauce." },
        { id: 3, name: "Berry Cheesecake", category: "dessert", price: 2900, img: "images/dish3.jpg", desc: "Classic New York cheesecake topped with fresh mint leaves and wild forest berry syrup." },
        { id: 4, name: "Salmon Steak with Vegetables", category: "main", price: 9500, img: "images/стейк из лосося.jpg", desc: "Tender salmon steak grilled to perfection, served with fresh seasonal vegetables." },
        { id: 5, name: "Classic Beshbarmak", category: "main", price: 6500, img: "images/бешпармак.jpg", desc: "Traditional Kazakh dish made with tender boiled meat, thin homemade pasta sheets, and rich broth." },
        { id: 6, name: "Aperol Spritz Cocktail", category: "drinks", price: 3200, img: "images/коктейль.jpg", desc: "Classic refreshing cocktail with Aperol, Prosecco, soda water, and a slice of fresh orange." }
    ],

    facts: [
        "Did you know? Our Beshbarmak noodle dough is aged for 12 hours for maximum tenderness!",
        "Fact: We source all our organic vegetables from local farmers right here in Astana.",
        "Chef's Secret: Our Signature Ribeye Steak is wet-aged for 21 days before grilling.",
        "Fun Fact: Over 10,000 Aperol Spritz cocktails were served at Buddies Restaurant last year!"
    ]
};

// --- WEB AUDIO API SOUND EFFECTS ---
class SoundManager {
    constructor() { this.ctx = null; }
    init() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
    playClickSound() {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.1);
    }
}
const sounds = new SoundManager();

$(document).ready(function () {
    console.log("Buddies Restaurant JS & jQuery initialized.");

    // --- 1. SCROLL PROGRESS BAR (Assignment 6) ---
    if ($('#scroll-progress-bar').length === 0) {
        $('body').prepend('<div id="scroll-progress-container"><div id="scroll-progress-bar"></div></div>');
    }
    $(window).on('scroll', function () {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        $('#scroll-progress-bar').css('width', (scrollTop / docHeight) * 100 + '%');
    });

    // --- 2. TOAST NOTIFICATION SYSTEM (Assignment 6) ---
    if ($('#toast-container').length === 0) {
        $('body').append('<div id="toast-container"></div>');
    }
    window.showToast = function (message) {
        const toast = $(`<div class="custom-toast">${message}</div>`);
        $('#toast-container').append(toast);
        setTimeout(() => toast.addClass('show'), 50);
        setTimeout(() => { toast.removeClass('show'); setTimeout(() => toast.remove(), 300); }, 3000);
    };

    // --- 3. LIVE DATE AND TIME CLOCK (Assignment 4 & 5) ---
    function updateDateTime() {
        const now = new Date();
        $('#current-date-time').text(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // --- 4. DAY / NIGHT THEME SWITCHER (Assignment 5) ---
    $('#theme-toggle-btn').on('click', function () {
        $('body').toggleClass('dark-theme');
        const isDark = $('body').hasClass('dark-theme');
        $(this).text(isDark ? "🌙 Night" : "☀️ Day");
        $(this).toggleClass('btn-warning btn-outline-light');
    });

    // --- 5. DYNAMIC MENU RENDER & FILTERING ---
    function renderMenu(category) {
        const $container = $('#dynamic-menu-container');
        if ($container.length === 0) return;

        let items = [];
        switch (category) {
            case 'main': items = BuddiesRestaurantApp.menuItems.filter(i => i.category === 'main'); break;
            case 'dessert': items = BuddiesRestaurantApp.menuItems.filter(i => i.category === 'dessert'); break;
            case 'drinks': items = BuddiesRestaurantApp.menuItems.filter(i => i.category === 'drinks'); break;
            case 'all': default: items = [...BuddiesRestaurantApp.menuItems]; break;
        }

        const html = items.map(item => `
            <div class="col-12 col-md-6 col-lg-4 searchable-item">
                <div class="card h-100 shadow-sm">
                    <img src="images/placeholder.jpg" data-src="${item.img}" class="card-img-top lazy-load" alt="${item.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-brand">${item.name}</h5>
                        <p class="card-text text-muted flex-grow-1">${item.desc}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="fw-bold fs-5 text-brand">${item.price.toLocaleString()} ₸</span>
                            <button class="btn btn-brand btn-sm order-item-btn" data-item="${item.name}">Order</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        $container.html(html);
        lazyLoadImages();
    }

    renderMenu('all');

    $('.filter-btn').on('click', function () {
        $('.filter-btn').removeClass('active btn-brand').addClass('btn-outline-brand');
        $(this).addClass('active btn-brand').removeClass('btn-outline-brand');
        renderMenu($(this).data('category'));
    });

    // --- 6. REAL-TIME LIVE SEARCH (Assignment 6) ---
    $('#live-search-input').on('keyup', function () {
        const query = $(this).val().toLowerCase();
        $('.searchable-item').each(function () {
            const text = $(this).text().toLowerCase();
            $(this).toggle(text.includes(query));
        });
    });

    // --- 7. STAR RATING SYSTEM (Assignment 5) ---
    $('.star-rating .star').on('click', function () {
        const rating = $(this).data('value');
        $(this).parent().find('.star').each(function (idx) {
            $(this).css('color', idx < rating ? '#ffc107' : '#ccc');
        });
        $(this).parent().find('.rating-value').text(`(${rating}/5 Stars)`);
        showToast(`Thank you for rating us ${rating} stars! ⭐`);
    });

    // --- 8. FORM VALIDATION & LOADING SPINNER ---
    $('.custom-form, #order-form').on('submit', function (e) {
>>>>>>> bc8ddc8c8dc0ba18d8f66a7a10659377dfc18e33
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

<<<<<<< HEAD
    // Log Out
    $('#logout-btn').on('click', function () {
        localStorage.removeItem('buddies_logged_user');
        checkAuthStatus();
    });

    /* ----------------------------------------------------------------------
       REQUIREMENT 7: EXTERNAL API INTEGRATION (Open-Meteo Weather API)
       ---------------------------------------------------------------------- */
    async function fetchWeather() {
        const $loading = $('#weather-loading');
        const $content = $('#weather-content');
        const $error = $('#weather-error');

        if ($('#weather-widget-container').length === 0) return;

        try {
            // Astana Coordinates: lat 51.1694, lon 71.4491
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.1694&longitude=71.4491&current_weather=true');
            if (!response.ok) throw new Error('API Request Failed');
            
            const data = await response.json();
            const currentWeather = data.current_weather;

            $('#weather-temp').text(`${currentWeather.temperature} °C`);
            $('#weather-desc').text(`Wind Speed: ${currentWeather.windspeed} km/h | Weather Code: ${currentWeather.weathercode}`);

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
       REQUIREMENT 5.3: SEARCH & FILTERING WITH LOCALSTORAGE
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

    /* ----------------------------------------------------------------------
       REQUIREMENT 6 & JQUERY UI EFFECTS (Date, Scroll, Animations)
       ---------------------------------------------------------------------- */
    // Live Clock
    function updateClock() {
        const now = new Date();
        $('#current-date-time').text(now.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }));
    }
    setInterval(updateClock, 1000);
    updateClock();
=======
    // --- 9. LAZY LOADING IMAGES (Assignment 6) ---
    function lazyLoadImages() {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        $('img.lazy-load').each(function () {
            const $img = $(this);
            if ($img.attr('src') !== $img.attr('data-src')) {
                if ($img.offset().top < scrollTop + windowHeight + 150) {
                    $img.attr('src', $img.attr('data-src')).hide().fadeIn(600);
                }
            }
        });
    }

    // --- Task 5: Animated Number Counter ---
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
    $(window).on('scroll resize', lazyLoadImages);
    lazyLoadImages();

    // Click sound integration
    $('button, .btn, .nav-link').on('click', () => sounds.playClickSound());
>>>>>>> bc8ddc8c8dc0ba18d8f66a7a10659377dfc18e33
});