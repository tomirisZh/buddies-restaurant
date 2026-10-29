// --- PART 3: OBJECTS, ARRAYS & METHODS ---
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

    translations: {
        en: {
            welcome: "Welcome to Buddies Restaurant!",
            subtitle: "Experience the finest dining with unforgettable tastes.",
            orderBtn: "Order Now",
            readMore: "Read More",
            readLess: "Read Less",
            themeDay: "Day",
            themeNight: "Night"
        },
        ru: {
            welcome: "Добро пожаловать в ресторан Buddies!",
            subtitle: "Ощутите изысканную кухню и незабываемый вкус.",
            orderBtn: "Заказать",
            readMore: "Читать далее",
            readLess: "Свернуть",
            themeDay: "День",
            themeNight: "Ночь"
        },
        kk: {
            welcome: "Buddies мейрамханасына кош келдиниздер!",
            subtitle: "Умытылмас дәм мен жоғары қызмет көрсету сапасы.",
            orderBtn: "Тапсырыс беру",
            readMore: "Толығырақ",
            readLess: "Жасыру",
            themeDay: "Күн",
            themeNight: "Түн"
        }
    },

    facts: [
        "Did you know? Our Beshbarmak noodle dough is aged for 12 hours for maximum tenderness!",
        "Fact: We source all our organic vegetables from local farmers near Astana.",
        "Chef's Secret: Our Ribeye Steak is aged for 21 days before grilling.",
        "Fun Fact: Over 10,000 Aperol Spritz cocktails were served at Buddies last year!"
    ]
};

// --- PART 3: SOUND EFFECTS (Web Audio API - Synthesized without external files) ---
class SoundManager {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playClickSound() {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    playStarSound() {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime); // Note A5
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
    }
}

const sounds = new SoundManager();

document.addEventListener('DOMContentLoaded', () => {

    // Attach click sound to all buttons
    document.querySelectorAll('button, .btn, .nav-link').forEach(btn => {
        btn.addEventListener('click', () => sounds.playClickSound());
    });

    /* ==========================================================================
       PART 1: DOM MANIPULATION AND STYLING
       ========================================================================== */

    // 1.1 STAR RATING SYSTEM (querySelectorAll + Style modification)
    const starContainers = document.querySelectorAll('.star-rating');
    starContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                sounds.playStarSound();
                const rating = index + 1;
                stars.forEach((s, idx) => {
                    if (idx < rating) {
                        s.classList.add('selected');
                        s.style.color = '#ffc107'; // Gold
                    } else {
                        s.classList.remove('selected');
                        s.style.color = '#ccc';
                    }
                });
                const ratingValueDisplay = container.querySelector('.rating-value');
                if (ratingValueDisplay) {
                    ratingValueDisplay.textContent = `(${rating}/5 Stars)`;
                }
            });
        });
    });

    // 1.2 DAY AND NIGHT THEME SWITCHER
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeBtn.textContent = isDark ? "🌙 Night" : "☀️ Day";
            themeBtn.className = isDark ? "btn btn-sm btn-warning" : "btn btn-sm btn-outline-light";
        });
    }

    // 1.3 READ MORE / READ LESS TOGGLE (Visibility & Content Manipulation)
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

    // 1.4 DYNAMIC GREETING BY NAME INPUT (getElementById + innerText)
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

    // 1.5 FETCH RANDOM FACT / QUOTE
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

    /* ==========================================================================
       PART 2: EVENT HANDLING
       ========================================================================== */

    // 2.1 KEYBOARD NAVIGATION FOR NAV MENU (keydown Arrow Keys)
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

    const langSelect = document.getElementById('language-selector');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            applyLanguageSwitch(lang);
        });
    }

    function applyLanguageSwitch(lang) {
        let dictionary;
        switch (lang) {
            case 'ru':
                dictionary = BuddiesRestaurantApp.translations.ru;
                break;
            case 'kk':
                dictionary = BuddiesRestaurantApp.translations.kk;
                break;
            case 'en':
            default:
                dictionary = BuddiesRestaurantApp.translations.en;
                break;
        }
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');
        if (heroTitle) heroTitle.textContent = dictionary.welcome;
        if (heroSubtitle) heroSubtitle.textContent = dictionary.subtitle;
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

    /* ==========================================================================
       PART 3: ADVANCED CONCEPTS & HIGHER-ORDER FUNCTIONS
       ========================================================================== */

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