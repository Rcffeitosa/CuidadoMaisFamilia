// initialization
const RESPONSIVE_WIDTH = 1024;
let isHeaderCollapsed = true;
const collapseHeaderItems = document.getElementById("collapsed-header-items");
const collapseBtn = document.getElementById("collapse-btn");

function onHeaderClickOutside(e) {
    if (!collapseHeaderItems.contains(e.target) && !collapseBtn.contains(e.target)) {
        toggleHeader();
    }
}

function toggleHeader() {
    if (isHeaderCollapsed) {
        collapseHeaderItems.classList.add("show");
        collapseBtn.classList.remove("bi-list");
        collapseBtn.classList.add("bi-x");
        isHeaderCollapsed = false;
        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1);
    } else {
        collapseHeaderItems.classList.remove("show");
        collapseBtn.classList.remove("bi-x");
        collapseBtn.classList.add("bi-list");
        isHeaderCollapsed = true;
        window.removeEventListener("click", onHeaderClickOutside);
    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.classList.remove("show");
    } else {
        isHeaderCollapsed = true;
    }
}

window.addEventListener("resize", responsive);

// Animations
gsap.registerPlugin(ScrollTrigger);

// Common animation configuration
const fadeInUp = {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
};

// Hero section animation
gsap.from(".hero-title", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".hero-description", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
});

gsap.from(".hero-actions", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power3.out"
});

gsap.from(".hero-image", {
    x: 100,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
});

// Scroll animations for sections
const sections = [".features", ".testimonials", ".pricing", ".blog"];
sections.forEach(section => {
    gsap.from(`${section} .feature-card, ${section} .testimonial-card, ${section} .pricing-card, ${section} .blog-card`, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
        ...fadeInUp,
        stagger: 0.2
    });
});

// Numbers animation
const installs = document.getElementById("installs");
const hours = document.getElementById("hours");

// Newsletter form feedback
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = newsletterForm.querySelector('.newsletter-input');
        const email = input.value.trim();
        if (!email) return;
        // Mensagem de sucesso
        let msg = document.createElement('div');
        msg.textContent = 'Seu e-mail foi cadastrado com sucesso.';
        msg.style.marginTop = '1rem';
        msg.style.fontWeight = 'bold';
        msg.style.color = '#1976d2';
        msg.style.textAlign = 'center';
        newsletterForm.parentNode.appendChild(msg);
        // Imprime no console
        console.log('E-mail cadastrado:', email);
        // Limpa o campo
        input.value = '';
        // Remove mensagem após 5s
        setTimeout(() => { msg.remove(); }, 5000);
    });
}


function animateNumbers() {
    let installsCount = 0;
    let hoursCount = 0;
    const installsTarget = 1500;
    const hoursTarget = 6000;
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    const installsStep = installsTarget / steps;
    const hoursStep = hoursTarget / steps;

    const counter = setInterval(() => {
        installsCount += installsStep;
        hoursCount += hoursStep;

        if (installsCount >= installsTarget) {
            installsCount = installsTarget;
            hoursCount = hoursTarget;
            clearInterval(counter);
        }

        installs.textContent = Math.floor(installsCount);
        hours.textContent = Math.floor(hoursCount);
    }, interval);
}

// Start animation when numbers section is in view
const numbersSection = document.getElementById("numeros");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(numbersSection);