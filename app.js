let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
showSlide(slideIndex);

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'flex' : 'none';
    });
}

function moveSlide(step) {
    slideIndex = (slideIndex + step + slides.length) % slides.length;
    showSlide(slideIndex);
}

setInterval(() => {
    moveSlide(1);
}, 10000);

window.addEventListener('scroll', () => {
    const sections = [
        { id: 'header-title', liId: 'home-link' },
        { id: 'services', liId: 'services-link' },
        { id: 'sobre', liId: 'about-link' }
    ];

    let currentSection = null;

    sections.forEach(section => {
        const sectionElement = document.getElementById(section.id);
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section;
        }
    });

    if (currentSection) {
        document.querySelectorAll('li').forEach(li => {
            li.classList.remove('item-selected');
        });

        document.getElementById(currentSection.liId).classList.add('item-selected');
    }
});
const menuLinks = document.querySelectorAll('.menu a[href^="#"]');

function getDistanceFromTheTop(element) {
    const id = element.getAttribute("href");
    return document.querySelector(id).offsetTop;
}

// function nativeScroll(distanceFromTheTop) {
//   window.scroll({
//     top: distanceFromTheTop,
//     behavior: "smooth",
//   });
// }

function scrollToSection(event) {
    event.preventDefault();
    const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90;
    smoothScrollTo(0, distanceFromTheTop);
}

menuLinks.forEach((link) => {
    link.addEventListener("click", scrollToSection);
});

function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== "undefined" ? duration : 400;

    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1)
            return (distance / 2) * time * time * time * time + from;
        return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const newX = easeInOutQuart(time, startX, distanceX, duration);
        const newY = easeInOutQuart(time, startY, distanceY, duration);
        if (time >= duration) {
            clearInterval(timer);
        }
        window.scroll(newX, newY);
    }, 1000 / 60);
}
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });
});


const nav = document.querySelector(".nav");
const btnMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".menu");
const menuLinks2 = menu.querySelectorAll("a"); // Declaração única

function handleButtonClick(event) {
    if (event.type === "touchstart") event.preventDefault();
    event.stopPropagation();
    nav.classList.toggle("active");
    handleClickOutside(menu, () => {
        nav.classList.remove("active");
        setAria();
    });
    setAria();
}

function handleClickOutside(targetElement, callback) {
    const html = document.documentElement;
    function handleHTMLClick(event) {
        if (!targetElement.contains(event.target)) {
            targetElement.removeAttribute("data-target");
            html.removeEventListener("click", handleHTMLClick);
            html.removeEventListener("touchstart", handleHTMLClick);
            callback();
        }
    }
    if (!targetElement.hasAttribute("data-target")) {
        html.addEventListener("click", handleHTMLClick);
        html.addEventListener("touchstart", handleHTMLClick);
        targetElement.setAttribute("data-target", "");
    }
}

function setAria() {
    const isActive = nav.classList.contains("active");
    btnMenu.setAttribute("aria-expanded", isActive);
    if (isActive) {
        btnMenu.setAttribute("aria-label", "Fechar Menu");
    } else {
        btnMenu.setAttribute("aria-label", "Abrir Menu");
    }
}

// Fecha o menu quando um link é clicado
function handleLinkClick() {
    if (nav.classList.contains("active")) {
        nav.classList.remove("active");
        setAria();
    }
}

// Adiciona o event listener de clique a todos os links do menu
menuLinks2.forEach(link => {
    link.addEventListener("click", handleLinkClick);
});

btnMenu.addEventListener("click", handleButtonClick);
btnMenu.addEventListener("touchstart", handleButtonClick);