/* ==========================================================================
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
});