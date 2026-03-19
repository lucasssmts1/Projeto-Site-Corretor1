// ===================================
// NAVEGAÇÃO E MENU MOBILE
// ===================================

const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll da navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu mobile toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fechar menu ao clicar em link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ===================================
// SCROLL SUAVE
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// ANIMAÇÕES DE SCROLL
// ===================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todos os elementos com animação
document.querySelectorAll('.fade-in-scroll').forEach(element => {
    observer.observe(element);
});

// ===================================
// BOTÃO VOLTAR AO TOPO
// ===================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// FORMULÁRIO DE CONTATO
// ===================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Capturar dados do formulário
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        mensagem: document.getElementById('mensagem').value
    };
    
    // Aqui você pode integrar com um serviço de email ou API
    console.log('Dados do formulário:', formData);
    
    // Simular envio
    alert('Obrigado pelo contato! Retornaremos em breve.');
    contactForm.reset();
    
    // Opcional: Integração com serviços de email
    // Exemplos: EmailJS, Formspree, etc.
    // emailjs.send('service_id', 'template_id', formData);
});

// ===================================
// FORMULÁRIO DE NEWSLETTER
// ===================================

const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    console.log('Newsletter inscrito:', email);
    alert('Obrigado por se inscrever! Você receberá imóveis exclusivos em seu e-mail.');
    newsletterForm.reset();
});

// ===================================
// MÁSCARA DE TELEFONE
// ===================================

const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
    }
    
    e.target.value = value;
});

// ===================================
// PARALLAX HERO SECTION
// ===================================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ===================================
// CONTADOR DE ESTATÍSTICAS
// ===================================

const stats = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateStats = () => {
    if (hasAnimated) return;
    
    stats.forEach(stat => {
        const target = stat.textContent.trim();
        const isNumber = target.match(/\d+/);
        
        if (isNumber) {
            const number = parseInt(isNumber[0]);
            const suffix = target.replace(number, '').trim();
            let current = 0;
            const increment = number / 50;
            
            const updateCount = () => {
                current += increment;
                
                if (current < number) {
                    stat.textContent = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCount();
        }
    });
    
    hasAnimated = true;
};

// Observar seção de estatísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// SCROLL INDICATOR HERO
// ===================================

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const nextSection = document.querySelector('.sobre');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ===================================
// LAZY LOADING DE IMAGENS
// ===================================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// PREVENÇÃO DE ENVIO MÚLTIPLO DE FORMULÁRIO
// ===================================

const forms = document.querySelectorAll('form');

forms.forEach(form => {
    let isSubmitting = false;
    
    form.addEventListener('submit', (e) => {
        if (isSubmitting) {
            e.preventDefault();
            return false;
        }
        
        isSubmitting = true;
        
        // Resetar após 3 segundos
        setTimeout(() => {
            isSubmitting = false;
        }, 3000);
    });
});

// ===================================
// ACTIVE LINK NA NAVEGAÇÃO
// ===================================

const sections = document.querySelectorAll('section[id]');

const highlightNavLink = () => {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNavLink);

// ===================================
// CONSOLE LOG INFORMATIVO
// ===================================

console.log('%c🏠 Prestígio Imóveis', 'font-size: 24px; color: #C9A961; font-weight: bold;');
console.log('%cSite desenvolvido com excelência para imóveis de luxo', 'font-size: 14px; color: #3E2723;');
console.log('%c✨ Exclusividade em cada detalhe', 'font-size: 12px; color: #6B6B6B; font-style: italic;');

// ===================================
// INICIALIZAÇÃO
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Site carregado com sucesso! ✨');
    
    // Adicionar classe para animações iniciais
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
