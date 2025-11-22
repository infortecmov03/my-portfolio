// js/main.js - Sistema Principal do Site
class MainApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupDateTime();
        this.setupMobileMenu();
        this.setupSections();
        this.setupTypeWriter();
        this.setupScrollProgress();
        this.setupButtons();
    }

    setupNavigation() {
        // Navegação suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    setupDateTime() {
        function updateDateTime() {
            const now = new Date();
            const date = now.toLocaleDateString('pt-BR', { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
            });
            const time = now.toLocaleTimeString('pt-BR');
            
            const dateEl = document.getElementById('currentDate');
            const timeEl = document.getElementById('currentTime');
            
            if (dateEl) dateEl.textContent = date;
            if (timeEl) timeEl.textContent = time;
        }
        
        setInterval(updateDateTime, 1000);
        updateDateTime();
    }

    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');

        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });

            // Fechar menu ao clicar nos links
            document.querySelectorAll('.mobile-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                });
            });
        }
    }

    setupSections() {
        // Ativar seções no scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    setupTypeWriter() {
        const slogan = document.querySelector('.slogan');
        if (slogan) {
            const text = slogan.textContent;
            slogan.textContent = '';
            
            let i = 0;
            function type() {
                if (i < text.length) {
                    slogan.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 50);
                }
            }
            setTimeout(type, 1000);
        }
    }

    setupScrollProgress() {
        const progressBar = document.getElementById('scrollProgress');
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = (window.scrollY / windowHeight) * 100;
                progressBar.style.width = `${scrolled}%`;
            });
        }
    }

    setupButtons() {
        // Loading state para botões
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                    const originalText = this.textContent;
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.disabled = false;
                        this.showNotification('Funcionalidade em desenvolvimento!', 'info');
                    }, 1500);
                }
            });
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 4000);
    }
}

// Inicializar quando DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    window.mainApp = new MainApp();
});
