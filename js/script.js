/* ==========================================================================
<<<<<<< HEAD
   BUDDIES RESTAURANT - UNIFIED JAVASCRIPT & JQUERY LOGIC
   Responsible for JS Logic: Merey Abdymanap
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

$(document).ready(function() {
    console.log("Buddies Restaurant JS & jQuery initialized by Merey.");

    // --- 1. SCROLL PROGRESS BAR (Assignment 6) ---
    if ($('#scroll-progress-bar').length === 0) {
        $('body').prepend('<div id="scroll-progress-container"><div id="scroll-progress-bar"></div></div>');
    }
    $(window).on('scroll', function() {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        $('#scroll-progress-bar').css('width', (scrollTop / docHeight) * 100 + '%');
    });

    // --- 2. TOAST NOTIFICATION SYSTEM (Assignment 6) ---
    if ($('#toast-container').length === 0) {
        $('body').append('<div id="toast-container"></div>');
    }
    window.showToast = function(message) {
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
    $('#theme-toggle-btn').on('click', function() {
        $('body').toggleClass('dark-theme');
        const isDark = $('body').hasClass('dark-theme');
        $(this).text(isDark ? "🌙 Night" : "☀️ Day");
        $(this).toggleClass('btn-warning btn-outline-light');
    });

    // --- 5. DYNAMIC MENU RENDER & FILTERING (Assignment 5 - Switch & Higher-Order Functions) ---
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

    $('.filter-btn').on('click', function() {
        $('.filter-btn').removeClass('active btn-brand').addClass('btn-outline-brand');
        $(this).addClass('active btn-brand').removeClass('btn-outline-brand');
        renderMenu($(this).data('category'));
    });

    // --- 6. REAL-TIME LIVE SEARCH (Assignment 6) ---
    $('#live-search-input').on('keyup', function() {
        const query = $(this).val().toLowerCase();
        $('.searchable-item').each(function() {
            const text = $(this).text().toLowerCase();
            $(this).toggle(text.includes(query));
        });
    });

    // --- 7. STAR RATING SYSTEM (Assignment 5) ---
    $('.star-rating .star').on('click', function() {
        const rating = $(this).data('value');
        $(this).parent().find('.star').each(function(idx) {
            $(this).css('color', idx < rating ? '#ffc107' : '#ccc');
        });
        $(this).parent().find('.rating-value').text(`(${rating}/5 Stars)`);
        showToast(`Thank you for rating us ${rating} stars! ⭐`);
    });

    // --- 8. FORM VALIDATION & LOADING SPINNER (Assignment 4 & 6) ---
    $('#order-form').on('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        const name = $('#full-name').val().trim();
        const email = $('#email').val().trim();
        const pass = $('#access-code').val();
        const confirm = $('#confirm-code').val();

        $('#name-error').text(!name ? 'Full name is required.' : '');
        $('#email-error').text(!email || !email.includes('@') ? 'Valid email is required.' : '');
        $('#pass-error').text(!pass || pass.length < 6 ? 'Password must be at least 6 chars.' : '');
        $('#confirm-error').text(pass !== confirm ? 'Passwords do not match.' : '');

        if (!name || !email || !pass || pass !== confirm || pass.length < 6) {
            isValid = false;
        }

        if (isValid) {
            const $btn = $(this).find('button[type="submit"]');
            const orig = $btn.html();
            $btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span> Submitting...');
            
            setTimeout(() => {
                $btn.prop('disabled', false).html(orig);
                showToast("🎉 Pre-order submitted successfully!");
                this.reset();
            }, 1500);
        }
    });

    $('#reset-form-btn').on('click', function() {
        $('#order-form')[0].reset();
        $('.error-message').text('');
        showToast("Form cleared.");
    });

    // --- 9. LAZY LOADING IMAGES (Assignment 6) ---
    function lazyLoadImages() {
        $('img.lazy-load').each(function() {
            const $img = $(this);
            if ($img.attr('src') !== $img.attr('data-src')) {
                if ($img.offset().top < $(window).scrollTop() + $(window).height() + 200) {
                    $img.attr('src', $img.attr('data-src')).hide().fadeIn(500);
=======
   BUDDIES RESTAURANT - ASSIGNMENT 6 JQUERY LOGIC
   Team: Tomiris Zhumagazy, Merey Abdymanap, Yenlik Serikkali
   ========================================================================== */

$(document).ready(function () {
    console.log("jQuery is ready!");

    // --- Task 4: Colorful and Stylized Scroll Progress Bar ---
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
        const scrollPercent = (scrollTop / docHeight) * 100;
        $('#scroll-progress-bar').css('width', scrollPercent + '%');
    });

    // --- Task 7: Notification System (Toast Helper) ---
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

    // --- Task 1: Real-time Search and Live Filter ---
    $('#live-search-input').on('keyup', function () {
        const query = $(this).val().toLowerCase();
        $('.searchable-item').each(function () {
            const text = $(this).text().toLowerCase();
            if (text.includes(query)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // --- Task 2: Autocomplete Search Suggestions ---
    const searchSuggestions = [
        "Signature Ribeye Steak", "Creamy Fettuccine Pasta", "Berry Cheesecake",
        "Salmon Steak with Vegetables", "Classic Beshbarmak", "Aperol Spritz Cocktail",
        "Table Reservation", "Contact Information", "Working Hours", "VIP Banquet Hall"
    ];

    const $searchInput = $('#autocomplete-search');
    if ($searchInput.length > 0) {
        $searchInput.attr('autocomplete', 'off');
        $searchInput.after('<div id="autocomplete-list" class="autocomplete-dropdown d-none"></div>');

        $searchInput.on('keyup', function () {
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

        $(document).on('click', '.autocomplete-item', function () {
            $searchInput.val($(this).text());
            $('#autocomplete-list').addClass('d-none');
            showToast(`Selected: ` + $(this).text());
        });

        $(document).on('click', function (e) {
            if (!$(e.target).closest('#autocomplete-search, #autocomplete-list').length) {
                $('#autocomplete-list').addClass('d-none');
            }
        });
    }

    // --- Task 3: Search Highlighting ---
    $('#highlight-search-btn').on('click', function () {
        const keyword = $('#highlight-keyword').val().trim();
        const $targetArea = $('#highlightable-content');

        $targetArea.find('.highlight-mark').each(function () {
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

        $targetArea.each(function () {
            highlightText(this, keyword);
        });
        showToast(`Highlighted matches for "${keyword}"`);
    });

    // --- Task 5: Animated Number Counter ---
    let counterAnimated = false;
    function checkCounterAnimation() {
        const $counterSection = $('#stats-counter-section');
        if ($counterSection.length === 0) return;

        const oTop = $counterSection.offset().top - window.innerHeight + 100;
        if (!counterAnimated && $(window).scrollTop() > oTop) {
            counterAnimated = true;
            $('.counter-number').each(function () {
                const $this = $(this);
                const countTo = parseInt($this.attr('data-count'));
                $({ countNum: 0 }).animate({ countNum: countTo }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum + '+');
                    }
                });
            });
        }
    }
    $(window).on('scroll', checkCounterAnimation);
    checkCounterAnimation();

    // --- Task 6: Loading Spinner on Submit ---
    $('.custom-form, #order-form').on('submit', function (e) {
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

    // --- Task 8: Copied to Clipboard Button ---
    $('.copy-btn').on('click', function () {
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

    // --- Task 9: Image Lazy Loading ---
    const $lazyImages = $('img.lazy-load');
    function lazyLoadImages() {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        $lazyImages.each(function () {
            const $img = $(this);
            if ($img.attr('src') !== $img.attr('data-src')) {
                if ($img.offset().top < scrollTop + windowHeight + 150) {
                    $img.attr('src', $img.attr('data-src')).hide().fadeIn(600);
>>>>>>> 71f80c26d69b6acf85a7a310b65b1b79d7099bef
                }
            }
        });
    }
<<<<<<< HEAD
    $(window).on('scroll resize', lazyLoadImages);
    lazyLoadImages();

    // Click sound integration
    $('button, .btn, .nav-link').on('click', () => sounds.playClickSound());
=======

    $(window).on('scroll resize', lazyLoadImages);
    lazyLoadImages();
>>>>>>> 71f80c26d69b6acf85a7a310b65b1b79d7099bef
});