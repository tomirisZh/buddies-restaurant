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
});