/* ====================================
   MENU MOBILE
==================================== */

const menuButton = document.querySelector('.menu-mobile');
const nav = document.querySelector('.nav');

if (menuButton && nav) {

    menuButton.addEventListener('click', () => {

        nav.classList.toggle('active');

        menuButton.innerHTML =
            nav.classList.contains('active')
                ? '✕'
                : '☰';


    });

}

/* ====================================
   FECHAR MENU AO CLICAR NO LINK
==================================== */

const navLinks = document.querySelectorAll('.nav a');

navLinks.forEach(link => {

    link.addEventListener('click', () => {

        nav.classList.remove('active');

        if (menuButton) {
            menuButton.innerHTML = '☰';
        }

    });

});

/* ====================================
   HEADER SCROLL EFFECT
==================================== */

const header = document.querySelector('.header');

if (header) {

    header.style.background = 'rgba(0, 0, 0, 0.98)';
    header.style.boxShadow = 'none';

}

/* ====================================
   SCROLL SUAVE
==================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        e.preventDefault();

        if (targetId === '#inicio') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) return;

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    });

});

/* ====================================
   ANIMAÇÃO AO ROLAR
==================================== */

const animatedElements = document.querySelectorAll(
    '.card, .service-card, .step, .depoimento, .post-card, .gallery-grid img'
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('show');

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

animatedElements.forEach(element => {

    element.classList.add('hidden');
    observer.observe(element);

});

/* ====================================
   BOTÃO WHATSAPP DESTACADO
==================================== */

const whatsappButton = document.querySelector('.whatsapp-float');

if (whatsappButton) {

    setInterval(() => {

        whatsappButton.classList.add('pulse');

        setTimeout(() => {
            whatsappButton.classList.remove('pulse');
        }, 1200);

    }, 5000);

}

/* ====================================
   REVELAÇÃO HERO
==================================== */

window.addEventListener('load', () => {

    document.body.classList.add('loaded');

});

/* ====================================
   CONTADOR DE ESTATÍSTICAS
==================================== */

const counters = document.querySelectorAll('.stat-item h3');

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const text = counter.innerText.trim();
        const isPercent = text.includes('%');
        const hasPlus = text.startsWith('+');
        const target = Number(text.replace(/\D/g, '')) || 0;
        let current = 0;

        const duration = 1200;
        const stepTime = Math.max(Math.floor(duration / Math.max(target, 1)), 15);
        const increment = Math.max(Math.ceil(target / (duration / stepTime)), 1);

        const formatValue = (value) => {
            const prefix = hasPlus ? '+' : '';
            const suffix = isPercent ? '%' : '';
            return `${prefix}${value}${suffix}`;
        };

        const updateCounter = () => {

            current += increment;

            if (current >= target) {
                counter.innerText = formatValue(target);
                return;
            }

            counter.innerText = formatValue(current);
            requestAnimationFrame(updateCounter);

        };

        updateCounter();
        counterObserver.unobserve(counter);

    });

}, {
    threshold: 0.2
});

counters.forEach(counter => counterObserver.observe(counter));

/* ====================================
   FORMULÁRIO DE SOLICITAÇÃO WHATSAPP
==================================== */

const solicitacaoForm = document.querySelector('#solicitacao-form');
const telefoneInput = document.querySelector('#telefone');

if (telefoneInput) {

    telefoneInput.addEventListener('input', (event) => {

        let value = event.target.value.replace(/\D/g, '');

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        if (value.length <= 2) {
            event.target.value = value;
            return;
        }

        if (value.length <= 6) {
            event.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            return;
        }

        if (value.length <= 10) {
            event.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
            return;
        }

        event.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;

    });

}

if (solicitacaoForm) {

    solicitacaoForm.addEventListener('submit', (event) => {

        event.preventDefault();

        const nome = document.querySelector('#tutor-nome')?.value?.trim() || 'Não informado';
        const nomeCao = document.querySelector('#cao-nome-raca')?.value?.trim() || 'Não informado';
        const objetivo = document.querySelector('#objetivo')?.value?.trim() || 'Não informado';
        const telefone = document.querySelector('#telefone')?.value?.trim() || 'Não informado';
        const email = document.querySelector('#email')?.value?.trim() || 'Não informado';

        const mensagem = `Olá! Gostaria de solicitar uma avaliação.%0A%0ANome do tutor: ${encodeURIComponent(nome)}%0ANome e raça do cão: ${encodeURIComponent(nomeCao)}%0AObjetivo da avaliação: ${encodeURIComponent(objetivo)}%0ATelefone: ${encodeURIComponent(telefone)}%0AE-mail: ${encodeURIComponent(email)}`;

        const numeroWhatsApp = '5511997666851';
        const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

        const novaJanela = window.open(url, '_blank', 'noopener,noreferrer');

        if (!novaJanela) {
            window.location.href = url;
        }
    });

}