// Inicia o do efeito de digitação
const typedText = document.getElementById("typed-text");
const phrases = ["Desenvolvedor Front-end", "UX Designer"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    const visibleText = currentPhrase.substring(0, charIndex);

    // Aplica texto visível
    typedText.textContent = visibleText;

    // Controle de digitação
    if (isDeleting) {
        if (charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, 40);
        } else {
            typedText.style.opacity = 0; // fade out
            setTimeout(() => {
                phraseIndex = (phraseIndex + 1) % phrases.length;
                isDeleting = false;
                typedText.style.opacity = 1; // fade in
                setTimeout(typeEffect, 200);
            }, 300);
        }
    } else {
        if (charIndex < currentPhrase.length) {
            charIndex++;
            setTimeout(typeEffect, 80);
        } else {
            setTimeout(() => (isDeleting = true), 1200);
            setTimeout(typeEffect, 1200);
        }
    }
}

// Navegação suave

document.addEventListener("DOMContentLoaded", typeEffect);

document.querySelectorAll('a.nav-link[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        const headerOffset = document.querySelector("header").offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    });
});

// Botão "Voltar ao Topo"

const backToTopBtn = document.getElementById("backToTop");

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTopBtn.style.display = "none";

// Efeito de preview

document.querySelectorAll(".project-preview").forEach((preview) => {
    const scrollImage = preview.querySelector(".scroll-image");

    preview.addEventListener("mouseenter", () => {
        scrollImage.style.transition = "none";
        scrollImage.style.transform = "translateY(0%)";

        // Força reflow para reiniciar a animação
        void scrollImage.offsetWidth;

        scrollImage.style.transition = "transform 10s linear";
        scrollImage.style.transform = "translateY(-50%)";
    });

    preview.addEventListener("mouseleave", () => {
        scrollImage.style.transition = "none";
        scrollImage.style.transform = "translateY(0%)";
    });
});
