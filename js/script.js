/**
 * Smart Water – Main JavaScript
 * Milestone 2: First JavaScript feature — Form Validation
 *
 * Features implemented:
 *  1. Contact form validation (contact.html)
 *  2. Order form validation + live price estimate (order.html)
 *  3. Gallery filter + lightbox (gallery.html)
 *  4. Vendor table search + location filter (vendors.html)
 *
 * Author: Smart Water Dev Team
 * ES6+ — no external dependencies beyond Bootstrap 5
 */

'use strict';

/* ============================================================
   UTILITY HELPERS
   ============================================================ */

/**
 * Mark a field as valid — removes error state.
 * @param {HTMLElement} field
 */
function markValid(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}

/**
 * Mark a field as invalid — shows Bootstrap error styling.
 * @param {HTMLElement} field
 */
function markInvalid(field) {
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');
}

/**
 * Reset all validation classes on a field.
 * @param {HTMLElement} field
 */
function resetField(field) {
    field.classList.remove('is-valid', 'is-invalid');
}

/**
 * Show a feedback alert above / inside the form.
 * @param {string} elementId  – ID of the alert <div>
 * @param {string} type       – Bootstrap alert type: 'success' | 'danger'
 * @param {string} message    – Message text
 */
function showAlert(elementId, type, message) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.className = `alert alert-${type}`;
    el.textContent = message;
    el.style.display = 'block';
    // Auto-hide after 6 seconds
    setTimeout(() => { el.style.display = 'none'; }, 6000);
}

/**
 * Validate a Kenyan phone number.
 * Accepts: 07XX XXX XXX, 01XX XXX XXX (with or without spaces/dashes)
 * @param {string} phone
 * @returns {boolean}
 */
function isValidKenyanPhone(phone) {
    const cleaned = phone.replace(/[\s\-]/g, '');
    return /^(07|01)\d{8}$/.test(cleaned);
}

/**
 * Validate an email address.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}


/* ============================================================
   FEATURE 1 — CONTACT FORM VALIDATION
   Page: contact.html
   ============================================================ */

(function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return; // Not on contact page

    const fields = {
        name:    document.getElementById('contactName'),
        email:   document.getElementById('contactEmail'),
        phone:   document.getElementById('contactPhone'),
        subject: document.getElementById('contactSubject'),
        message: document.getElementById('contactMessage'),
    };

    /**
     * Validate a single contact field.
     * Returns true if valid, false if not.
     */
    function validateField(key) {
        const el = fields[key];
        if (!el) return true;

        const val = el.value.trim();

        switch (key) {
            case 'name':
                if (val.length < 2) { markInvalid(el); return false; }
                break;
            case 'email':
                if (!isValidEmail(val)) { markInvalid(el); return false; }
                break;
            case 'phone':
                // Phone is optional — only validate if provided
                if (val !== '' && !isValidKenyanPhone(val)) { markInvalid(el); return false; }
                break;
            case 'subject':
                if (val === '') { markInvalid(el); return false; }
                break;
            case 'message':
                if (val.length < 10) { markInvalid(el); return false; }
                break;
        }

        markValid(el);
        return true;
    }

    // Real-time validation: validate each field as the user types / changes
    Object.keys(fields).forEach(key => {
        const el = fields[key];
        if (!el) return;
        const eventType = (el.tagName === 'SELECT') ? 'change' : 'input';
        el.addEventListener(eventType, () => validateField(key));
    });

    // Full validation on submit
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent page reload

        const results = Object.keys(fields).map(key => validateField(key));
        const allValid = results.every(Boolean);

        if (!allValid) {
            showAlert('form-feedback', 'danger',
                '⚠️ Please fix the errors above before sending your message.');
            return;
        }

        // Simulate successful submission (no backend in this project)
        showAlert('form-feedback', 'success',
            '✅ Message sent! We will get back to you within 24 hours.');

        // Reset form fields and validation states after success
        form.reset();
        Object.values(fields).forEach(el => { if (el) resetField(el); });
    });
})();


/* ============================================================
   FEATURE 2 — ORDER FORM VALIDATION + LIVE PRICE ESTIMATE
   Page: order.html
   ============================================================ */

(function initOrderForm() {
    const form = document.getElementById('orderForm');
    if (!form) return; // Not on order page

    const fields = {
        name:     document.getElementById('orderName'),
        phone:    document.getElementById('orderPhone'),
        vendor:   document.getElementById('orderVendor'),
        quantity: document.getElementById('orderQuantity'),
        date:     document.getElementById('orderDate'),
        payment:  document.getElementById('orderPayment'),
        address:  document.getElementById('orderAddress'),
    };

    // Vendor prices per 1000L (must match the <option> text order)
    const vendorPrices = {
        'Aqua Fresh – Nairobi (KES 500/1000L)':           500,
        'Blue Springs – Kiambu (KES 550/1000L)':          550,
        'Pure Water Ltd – Nakuru (KES 480/1000L)':        480,
        'Crystal Clear Kenya – Nairobi (KES 520/1000L)':  520,
        'Maji Safi Distributors – Kiambu (KES 490/1000L)':490,
    };

    /**
     * Update the live price estimate box.
     */
    function updatePriceEstimate() {
        const estimateBox = document.getElementById('price-estimate');
        if (!estimateBox) return;

        const vendorVal   = fields.vendor   ? fields.vendor.value   : '';
        const quantityVal = fields.quantity ? fields.quantity.value : '';

        const pricePerK = vendorPrices[vendorVal];
        const qty       = parseFloat(quantityVal);

        if (!pricePerK || !qty || qty < 500) {
            estimateBox.style.display = 'none';
            return;
        }

        const total = (pricePerK / 1000) * qty;
        estimateBox.innerHTML =
            `💡 <strong>Estimated Cost:</strong> KES ${total.toLocaleString()} ` +
            `(${qty.toLocaleString()}L × KES ${pricePerK}/1,000L)`;
        estimateBox.style.display = 'block';
    }

    // Wire up live estimate on vendor/quantity change
    if (fields.vendor)   fields.vendor.addEventListener('change', updatePriceEstimate);
    if (fields.quantity) fields.quantity.addEventListener('input',  updatePriceEstimate);

    // Set minimum date on the delivery date field to today
    if (fields.date) {
        const today = new Date().toISOString().split('T')[0];
        fields.date.setAttribute('min', today);
    }

    /**
     * Validate a single order field.
     */
    function validateOrderField(key) {
        const el = fields[key];
        if (!el) return true;

        const val = el.value.trim();

        switch (key) {
            case 'name':
                if (val.length < 2) { markInvalid(el); return false; }
                break;
            case 'phone':
                if (!isValidKenyanPhone(val)) { markInvalid(el); return false; }
                break;
            case 'vendor':
                if (val === '') { markInvalid(el); return false; }
                break;
            case 'quantity':
                if (isNaN(parseFloat(val)) || parseFloat(val) < 500) {
                    markInvalid(el); return false;
                }
                break;
            case 'date':
                if (val === '') { markInvalid(el); return false; }
                break;
            case 'payment':
                if (val === '') { markInvalid(el); return false; }
                break;
            case 'address':
                if (val.length < 5) { markInvalid(el); return false; }
                break;
        }

        markValid(el);
        return true;
    }

    // Real-time validation
    Object.keys(fields).forEach(key => {
        const el = fields[key];
        if (!el) return;
        const eventType = (el.tagName === 'SELECT') ? 'change' : 'input';
        el.addEventListener(eventType, () => validateOrderField(key));
    });

    // Full validation on submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const results = Object.keys(fields).map(key => validateOrderField(key));
        const allValid = results.every(Boolean);

        if (!allValid) {
            showAlert('order-feedback', 'danger',
                '⚠️ Please fill in all required fields correctly before submitting.');
            return;
        }

        // Simulate successful order submission
        showAlert('order-feedback', 'success',
            '✅ Order received! Your vendor will contact you within 2 hours to confirm delivery.');

        form.reset();
        Object.values(fields).forEach(el => { if (el) resetField(el); });
        const estimateBox = document.getElementById('price-estimate');
        if (estimateBox) estimateBox.style.display = 'none';
    });
})();


/* ============================================================
   FEATURE 3 — GALLERY FILTER + LIGHTBOX
   Page: gallery.html
   ============================================================ */

(function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!filterBtns.length) return; // Not on gallery page

    const galleryItems = document.querySelectorAll('.gallery-item');

    /**
     * Filter gallery by category.
     * @param {string} filter – 'all' | 'delivery' | 'installation' | 'team'
     */
    function filterGallery(filter) {
        galleryItems.forEach(item => {
            const match = filter === 'all' || item.dataset.category === filter;
            item.style.display = match ? '' : 'none';
        });
    }

    // Filter button click handler
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Update active state
            filterBtns.forEach(b => {
                b.classList.remove('active', 'btn-primary');
                b.classList.add('btn-outline-primary');
            });
            this.classList.add('active', 'btn-primary');
            this.classList.remove('btn-outline-primary');

            filterGallery(this.dataset.filter);
        });
    });

    // Lightbox
    const lightbox    = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCap = document.getElementById('lightbox-caption');
    const closeBtn    = document.getElementById('lightbox-close');

    if (!lightbox) return;

    // Open lightbox when a gallery image is clicked
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', function () {
            lightboxImg.src     = this.src;
            lightboxImg.alt     = this.alt;
            lightboxCap.textContent = this.dataset.caption || '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });
    });

    // Close lightbox on close button click
    closeBtn.addEventListener('click', closeLightbox);

    // Close lightbox when clicking the dark overlay (not the image itself)
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
})();


/* ============================================================
   FEATURE 4 — VENDOR TABLE SEARCH + LOCATION FILTER
   Page: vendors.html
   ============================================================ */

(function initVendorFilter() {
    const searchInput    = document.getElementById('vendorSearch');
    const locationSelect = document.getElementById('locationFilter');
    if (!searchInput && !locationSelect) return; // Not on vendors page

    const tableRows = document.querySelectorAll('#vendorTable tbody tr');

    /**
     * Filter the vendor table based on search text and location.
     */
    function filterVendors() {
        const query    = searchInput    ? searchInput.value.toLowerCase().trim()    : '';
        const location = locationSelect ? locationSelect.value.toLowerCase().trim() : '';

        tableRows.forEach(row => {
            const rowText     = row.textContent.toLowerCase();
            const matchSearch = query    === '' || rowText.includes(query);
            const matchLoc    = location === '' || rowText.includes(location);
            row.style.display = (matchSearch && matchLoc) ? '' : 'none';
        });
    }

    if (searchInput)    searchInput.addEventListener('input',  filterVendors);
    if (locationSelect) locationSelect.addEventListener('change', filterVendors);
})();