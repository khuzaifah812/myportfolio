// ================= DOM ELEMENTS =================
const loader = document.getElementById("loader");
const navbar = document.querySelector(".navbar");
const themeBtn = document.getElementById("themeBtn");
const topBtn = document.getElementById("topBtn");
const typingElement = document.getElementById("typing");
const contactForm = document.getElementById("contactForm");

// ================= 1. LOADER =================
window.addEventListener("load", () => {
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }, 1000); 
});

// ================= 2. STICKY NAVBAR ON SCROLL =================
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Show/Hide Scroll to Top Button
    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

// ================= 3. SCROLL TO TOP =================
topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ================= 4. DARK MODE TOGGLE =================
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.innerHTML = `<i class="bi bi-sun"></i>`;
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeBtn.innerHTML = `<i class="bi bi-sun"></i>`; // Sun icon
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.innerHTML = `<i class="bi bi-moon-stars"></i>`; // Moon icon
    }
});

// ================= 5. TYPING ANIMATION =================
const texts = ["Web Developer", "UI/UX Designer", "Python Developer", "software engineer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting? 300 : 450;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 500; // Pause before typing next
    }

    setTimeout(type, speed);
}

document.addEventListener("DOMContentLoaded", () => {
    if (typingElement) setTimeout(type, 1000);
});

// ================= 6. SMOOTH SCROLL FOR NAV LINKS =================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 70, // Offset for navbar
            behavior: 'smooth'
        });

        // Close mobile menu after click
        const navbarCollapse = document.getElementById('navbar');
        if (navbarCollapse.classList.contains('show')) {
            new bootstrap.Collapse(navbarCollapse).toggle();
        }
    });
});

// ================= 7. CONTACT FORM VALIDATION =================
// ================= 7. CONTACT FORM SEND EMAIL WITH EMAILJS =================
(function() {
    emailjs.init("tylL4KuFLd-S9_AZW"); // <-- PASTE YOUR PUBLIC KEY HERE
})();

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const statusMsg = document.getElementById("formStatus");
    const submitBtn = contactForm.querySelector("button");
    
    submitBtn.innerHTML = "Sending...";
    submitBtn.disabled = true;
    statusMsg.style.color = "blue";

    // These 4 IDs must match what you set in EmailJS Template
    const templateParams = {
        from_name: contactForm.from_name.value,
        from_email: contactForm.from_email.value,
        subject: contactForm.subject.value,
        message: contactForm.message.value,
    };

    emailjs.send("service_rdwhm1n", "template_qdqogyb", templateParams) // <-- PASTE THESE 2 IDS
        .then(function(response) {
           statusMsg.style.color = "green";
           statusMsg.textContent = "✅ Message sent successfully! I'll reply soon.";
           contactForm.reset();
        }, function(error) {
           statusMsg.style.color = "red";
           statusMsg.textContent = "❌ Failed to send. Please try again.";
           console.log("FAILED...", error);
        })
        .finally(() => {
            submitBtn.innerHTML = "Send Message";
            submitBtn.disabled = false;
        });
});

// ================= 8. ANIMATE ON SCROLL EFFECT =================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card,.service-card,.project-card').forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
});