/* ==========================================================================
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
                }
            }
        });
    }

    $(window).on('scroll resize', lazyLoadImages);
    lazyLoadImages();
});