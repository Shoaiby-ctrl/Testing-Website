// js/app.js
document.addEventListener("DOMContentLoaded", function() {
    // NAVBAR toggle (mobile)
    const navToggle = document.getElementById("navToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    navToggle && navToggle.addEventListener("click", function() {
        if (!mobileMenu) return;
        mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
        mobileMenu.setAttribute("aria-hidden", mobileMenu.style.display !== "block");
    });

    // SLIDER logic
    const slides = Array.from(document.querySelectorAll(".slider .slide"));
    const prevBtn = document.querySelector(".slider-btn.prev");
    const nextBtn = document.querySelector(".slider-btn.next");
    const dotsContainer = document.querySelector(".slider-dots");

    if (slides.length === 0) return;

    // create dots
    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "slider-dot";
        dot.dataset.index = i;
        dot.type = "button";
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll(".slider-dot"));

    let current = 0;
    let autoTimer = null;
    const AUTO_DELAY = 5000;

    function showSlide(index) {
        slides.forEach((s, i) => {
            s.classList.toggle("is-active", i === index);
        });
        dots.forEach((d, i) => {
            d.classList.toggle("active", i === index);
        });
        current = index;
    }

    function nextSlide() {
        showSlide((current + 1) % slides.length);
    }

    function prevSlide() {
        showSlide((current - 1 + slides.length) % slides.length);
    }

    // attach events
    if (nextBtn) nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAuto();
    });
    if (prevBtn) prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAuto();
    });

    dots.forEach(d => {
        d.addEventListener("click", (e) => {
            const idx = Number(e.currentTarget.dataset.index);
            showSlide(idx);
            resetAuto();
        });
    });

    // initial show
    showSlide(0);

    function startAuto() {
        autoTimer = setInterval(nextSlide, AUTO_DELAY);
    }

    function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
    }

    startAuto();

    // accessibility: pause on hover
    const slider = document.querySelector(".slider");
    if (slider) {
        slider.addEventListener("mouseenter", () => clearInterval(autoTimer));
        slider.addEventListener("mouseleave", () => startAuto());
    }
});




// SIMPLE SEARCH FILTER SCRIPT


const searchInput = document.getElementById('searchInput');
const productGrid = document.getElementById('productGrid');
const products = productGrid.querySelectorAll('.product-card');

function filterProducts() {
    const searchValue = searchInput.value.toLowerCase();

    products.forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        const matchesSearch = name.includes(searchValue);

        product.style.display = matchesSearch ? 'block' : 'none';
    });
}

document.getElementById("searchButton").addEventListener("click", filterProducts);
searchInput.addEventListener("input", filterProducts);



//product Detail

function changeImage(img) {
    document.getElementById("mainImage").src = img.src;
}

function openTab(event, tabID) {
    document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));

    event.currentTarget.classList.add("active");
    document.getElementById(tabID).classList.add("active");
}