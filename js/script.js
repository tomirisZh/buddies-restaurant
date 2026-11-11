/* ==========================================================================
   BUDDIES RESTAURANT - FINAL PROJECT & ASSIGNMENT COMPLETE JS CODE
   Team: Tomiris Zhumagazy, Merey Abdymanap, Yenlik Serikkali
   ========================================================================== */

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
            $('#nav-profile-link').text('Profile / Login');
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