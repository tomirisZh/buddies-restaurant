$(document).ready(function () {
    console.log("Buddies Restaurant JS initialized successfully.");

    // Theme Toggle Logic
    const savedTheme = localStorage.getItem('buddies_theme') || 'light';
    if (savedTheme === 'dark') {
        $('body').addClass('dark-theme');
        $('#theme-toggle-btn').text('🌙 Night').removeClass('btn-outline-light').addClass('btn-warning');
    }

    $('#theme-toggle-btn').on('click', function () {
        $('body').toggleClass('dark-theme');
        const isDark = $('body').hasClass('dark-theme');
        localStorage.setItem('buddies_theme', isDark ? 'dark' : 'light');
        $(this).text(isDark ? '🌙 Night' : '☀️ Day').toggleClass('btn-warning btn-outline-light');
    });

    // Scroll Progress Bar
    $(window).on('scroll', function () {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = (scrollTop / docHeight) * 100;
        $('#scroll-progress-bar').css('width', scrollPercent + '%');
    });

    // Weather Widget (Astana Live API - профиль беті мен басқа жерлер үшін)
    function loadWeather() {
        const $loading = $('#weather-loading');
        const $content = $('#weather-content');
        const $error = $('#weather-error');
        const $widget = $('#weather-widget');

        const url = 'https://api.open-meteo.com/v1/forecast?latitude=51.18&longitude=71.44&current_weather=true';

        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                if (data && data.current_weather) {
                    const temp = Math.round(data.current_weather.temperature);
                    const wind = data.current_weather.windspeed;

                    if ($loading.length) {
                        $('#weather-temp').text(`${temp > 0 ? '+' : ''}${temp}°C`);
                        $('#weather-desc').text(`Astana • Wind speed: ${wind} km/h`);
                        $loading.addClass('d-none');
                        $content.removeClass('d-none');
                    }
                    if ($widget.length) {
                        $widget.html(`🌤️ Astana: <strong>${temp}°C</strong>`);
                    }
                } else {
                    if ($loading.length) {
                        $loading.addClass('d-none');
                        $error.removeClass('d-none');
                    }
                }
            },
            error: function(err) {
                console.error("Weather load error:", err);
                if ($loading.length) {
                    $loading.addClass('d-none');
                    $error.removeClass('d-none');
                }
            }
        });
    }
    loadWeather();

    // Menu Data & Dynamic Rendering
    const menuItems = [
        { name: "Signature Ribeye Steak", category: "main", price: "12 500 ₸", desc: "Tender grilled beef served with garlic butter and vegetables.", img: "images/dish1.jpg" },
        { name: "Creamy Fettuccine Pasta", category: "main", price: "4 800 ₸", desc: "Homemade fettuccine with wild mushrooms and parmesan.", img: "images/dish2.jpg" },
        { name: "Berry Cheesecake", category: "dessert", price: "2 900 ₸", desc: "Classic New York cheesecake topped with fresh berries.", img: "images/dish3.jpg" },
        { name: "Classic Beshbarmak", category: "main", price: "6 500 ₸", desc: "Traditional Kazakh dish made with tender boiled meat, thin homemade pasta, and broth.", img: "images/бешпармак.jpg" },
        { name: "Salmon Steak", category: "main", price: "9 800 ₸", desc: "Tender salmon steak grilled to perfection, served with fresh seasonal vegetables.", img: "images/стейк из лосося.jpg" },
        { name: "Mojito Cocktail", category: "drinks", price: "1 800 ₸", desc: "Refreshing blend of mint, lime, rum, and sparkling soda.", img: "images/коктейль.jpg" }
    ];

    function renderMenu(items) {
        const $container = $('#dynamic-menu-container');
        if ($container.length === 0) return;
        $container.empty();
        items.forEach(item => {
            const cardHTML = `
                <div class="col-md-4 menu-item-card searchable-item" data-category="${item.category}">
                    <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                        <img src="${item.img}" class="card-img-top" alt="${item.name}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title text-brand fw-bold">${item.name}</h5>
                            <p class="card-text text-muted small flex-grow-1">${item.desc}</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="fw-bold fs-5 text-dark">${item.price}</span>
                                <a href="reservation.html" class="btn btn-brand btn-sm">Order Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $container.append(cardHTML);
        });
    }
    renderMenu(menuItems);

    // Menu Filtering & Search
    const savedFilter = localStorage.getItem('buddies_menu_filter') || 'all';
    function applyMenuFilter(category) {
        localStorage.setItem('buddies_menu_filter', category);
        $('.filter-btn').removeClass('active btn-brand').addClass('btn-outline-brand');
        $(`.filter-btn[data-category="${category}"]`).addClass('active btn-brand').removeClass('btn-outline-brand');
        if (category === 'all') {
            $('.menu-item-card, .searchable-item').show(300);
        } else {
            $('.menu-item-card, .searchable-item').hide();
            $(`.menu-item-card[data-category="${category}"], .searchable-item[data-category="${category}"]`).show(300);
        }
    }
    $('.filter-btn').on('click', function () {
        applyMenuFilter($(this).attr('data-category'));
    });
    applyMenuFilter(savedFilter);

    $('#live-search-input').on('keyup', function() {
        const query = $(this).val().toLowerCase();
        $('.menu-item-card, .searchable-item').each(function() {
            const text = $(this).text().toLowerCase();
            if (text.includes(query)) {
                $(this).show(200);
            } else {
                $(this).hide(200);
            }
        });
    });

    // Home Page Greet & Facts
    $('#greet-me-btn').on('click', function() {
        const name = $('#visitor-name-input').val().trim();
        const $output = $('#greet-output');
        if (name) {
            $output.text(`Hello, ${name}! Welcome to our cozy restaurant. Enjoy your exceptional dining experience!`).removeClass('d-none');
        } else {
            $output.text(`Hello, Guest! Welcome to our cozy restaurant. Enjoy your exceptional dining experience!`).removeClass('d-none');
        }
    });

    const culinaryFacts = [
        "Bon appétit! May your meal be as wonderful as your company.",
        "Good food, good mood! Enjoy every single delicious bite.",
        "Eat well, live well! Our signature dishes are prepared with absolute passion.",
        "As bolsyn! (Enjoy your meal!) May this traditional food bring you warmth and joy.",
        "The secret ingredient in all our recipes is love, fresh ingredients, and dedication.",
        "Good food is the foundation of genuine happiness and unforgettable evenings."
    ];

    $('#did-you-know-btn').on('click', function() {
        const randomFact = culinaryFacts[Math.floor(Math.random() * culinaryFacts.length)];
        $('#did-you-know-output').fadeOut(150, function() {
            $(this).text(randomFact).fadeIn(150);
        });
    });

    // Clock
    function updateClock() {
        const now = new Date();
        $('#current-date-time').text(now.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }));
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Counter Animation (Fixed for jQuery 4.0)
    $('.counter-number, .counter, [data-count]').each(function() {
        const $this = $(this);
        const countTo = parseInt($this.attr('data-count'), 10) || 250;
        
        $({ countNum: 0 }).animate({
            countNum: countTo
        }, {
            duration: 2000,
            easing: 'swing',
            step: function() {
                $this.text(Math.floor(this.countNum));
            },
            complete: function() {
                $this.text(countTo);
            }
        });
    });

    // Robust Copy Text Feature (.copy-btn)
    $(document).on('click', '.copy-btn', function() {
        let textToCopy = $(this).attr('data-copy');
        if (!textToCopy) {
            textToCopy = $(this).closest('.card, .border, div').find('p').first().text().trim();
        }

        const $btn = $(this);
        const originalText = $btn.text();

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showSuccess($btn, originalText);
            }).catch(() => {
                fallbackCopy(textToCopy, $btn, originalText);
            });
        } else {
            fallbackCopy(textToCopy, $btn, originalText);
        }
    });

    function fallbackCopy(text, $btn, originalText) {
        const $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val(text).select();
        try {
            document.execCommand("copy");
            showSuccess($btn, originalText);
        } catch (err) {
            console.error('Copy failed', err);
        }
        $temp.remove();
    }

    function showSuccess($btn, originalText) {
        $btn.text('Copied! ✓').removeClass('btn-secondary btn-outline-brand').addClass('btn-success');
        setTimeout(() => {
            $btn.text(originalText).removeClass('btn-success').addClass('btn-secondary btn-outline-brand');
        }, 1500);
    }

    // Form Validation & Reset Handling
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    $('#order-form').on('submit', function(e) {
        e.preventDefault();
        let valid = true;
        $('.error-message').text('');

        const fullName = $('#full-name').val().trim();
        const email = $('#email').val().trim();
        const resDate = $('#reservation-date').val();
        const guests = $('#guest-count').val();
        const pass = $('#access-code').val();
        const confirmPass = $('#confirm-code').val();

        if (!fullName) {
            $('#name-error').text('Full name is required.');
            valid = false;
        }
        if (!email) {
            $('#email-error').text('Email is required.');
            valid = false;
        } else if (!emailRegex.test(email)) {
            $('#email-error').text('Invalid email format (e.g. name@example.com).');
            valid = false;
        }
        if ($('#reservation-date').length && !resDate) {
            $('#date-error').text('Reservation date & time is required.');
            valid = false;
        }
        if ($('#guest-count').length && (!guests || guests < 1)) {
            $('#guests-error').text('Please enter a valid number of guests.');
            valid = false;
        }
        if ($('#access-code').length) {
            if (!pass) {
                $('#pass-error').text('Order code is required.');
                valid = false;
            } else if (pass.length < 6) {
                $('#pass-error').text('Code must be at least 6 characters.');
                valid = false;
            }
        }
        if ($('#confirm-code').length && pass !== confirmPass) {
            $('#confirm-error').text('Codes do not match.');
            valid = false;
        }

        if (valid) {
            const $form = $(this);
            const $submitBtn = $form.find('button[type="submit"]');
            const originalBtnText = $submitBtn.html();
            
            $submitBtn.prop('disabled', true).html(`<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...`);
            
            setTimeout(() => {
                $form[0].reset();
                $submitBtn.prop('disabled', false).html(originalBtnText);
                alert("Table booked & order successfully submitted!");
            }, 1500);
        }
    });

    $('#reset-form-btn').on('click', function() {
        if ($('#order-form').length) {
            $('#order-form')[0].reset();
        }
        $('.error-message').text('');
    });
});