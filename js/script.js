/*
   Smart Water - Main JavaScript (ES6+)
  */

"use strict";

//  Dark Mode Toggle
const darkToggle = document.getElementById("darkToggle");
const body = document.body;

// Persist preference
if (localStorage.getItem("darkMode") === "true") {
  body.classList.add("dark-mode");
  if (darkToggle) darkToggle.textContent = "☀️";
}

if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    darkToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("darkMode", isDark);
  });
}

// Contact Form Validation 
function validateContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const message = document.getElementById("contactMessage");

    // Validate Name
    if (!name.value.trim() || name.value.trim().length < 2) {
      setInvalid(name, "Please enter your full name (at least 2 characters).");
      valid = false;
    } else {
      setValid(name);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      setInvalid(email, "Please enter a valid email address.");
      valid = false;
    } else {
      setValid(email);
    }

    // Validate Message
    if (!message.value.trim() || message.value.trim().length < 10) {
      setInvalid(message, "Message must be at least 10 characters.");
      valid = false;
    } else {
      setValid(message);
    }

    if (valid) {
      showAlert("contactForm", "✅ Thank you! Your message has been sent. We'll get back to you shortly.", "success");
      form.reset();
      form.querySelectorAll(".form-control").forEach(el => el.classList.remove("is-valid"));
    }
  });
}

//  Order Form Validation 
function validateOrderForm() {
  const form = document.getElementById("orderForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById("orderName");
    const phone = document.getElementById("orderPhone");
    const qty = document.getElementById("orderQty");
    const address = document.getElementById("orderAddress");

    if (!name.value.trim()) { setInvalid(name, "Full name is required."); valid = false; } else setValid(name);

    const phoneRegex = /^(\+254|0)[17]\d{8}$/;
    if (!phoneRegex.test(phone.value.trim())) {
      setInvalid(phone, "Enter a valid Kenyan phone number (e.g. +254712345678).");
      valid = false;
    } else setValid(phone);

    if (!qty.value || qty.value < 100 || qty.value > 10000) {
      setInvalid(qty, "Quantity must be between 100 and 10,000 litres.");
      valid = false;
    } else setValid(qty);

    if (!address.value.trim() || address.value.trim().length < 10) {
      setInvalid(address, "Please provide a detailed delivery address.");
      valid = false;
    } else setValid(address);

    if (valid) {
      showAlert("orderForm", "✅ Order placed successfully! You'll receive an SMS confirmation shortly.", "success");
      form.reset();
      form.querySelectorAll(".form-control, .form-select").forEach(el => el.classList.remove("is-valid"));
    }
  });
}

//  Gallery Filter 
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll(".gallery-filter .btn");
  const items = document.querySelectorAll(".gallery-item");
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("btn-primary"));
      filterBtns.forEach(b => b.classList.add("btn-outline-primary"));
      btn.classList.remove("btn-outline-primary");
      btn.classList.add("btn-primary");

      const filter = btn.dataset.filter;
      items.forEach(item => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "block";
          item.style.opacity = "0";
          setTimeout(() => { item.style.opacity = "1"; item.style.transition = "opacity 0.4s"; }, 10);
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

//  Back To Top 
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 400 ? "block" : "none";
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

//  Helpers 
function setInvalid(el, message) {
  el.classList.remove("is-valid");
  el.classList.add("is-invalid");
  let fb = el.nextElementSibling;
  if (!fb || !fb.classList.contains("invalid-feedback")) {
    fb = document.createElement("div");
    fb.className = "invalid-feedback";
    el.parentNode.insertBefore(fb, el.nextSibling);
  }
  fb.textContent = message;
}

function setValid(el) {
  el.classList.remove("is-invalid");
  el.classList.add("is-valid");
  const fb = el.nextElementSibling;
  if (fb && fb.classList.contains("invalid-feedback")) fb.textContent = "";
}

function showAlert(formId, message, type) {
  const form = document.getElementById(formId);
  let alert = document.getElementById(formId + "-alert");
  if (!alert) {
    alert = document.createElement("div");
    alert.id = formId + "-alert";
    form.insertBefore(alert, form.firstChild);
  }
  alert.className = `alert alert-${type} mt-2`;
  alert.textContent = message;
  setTimeout(() => { alert.remove(); }, 6000);
}

//  Init 
document.addEventListener("DOMContentLoaded", () => {
  validateContactForm();
  validateOrderForm();
  initGalleryFilter();
  initBackToTop();
});
