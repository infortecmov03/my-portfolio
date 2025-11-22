// js/pwa-manager.js - Sistema PWA e Configurações
class PWAManager {
    constructor() {
        this.deferredPrompt = null;
        this.init();
    }

    init() {
        this.setupPWA();
        this.setupSettings();
        this.setupNotifications();
        this.setupServiceWorker();
    }

    setupPWA() {
        const installButton = document.getElementById('installButton');
        const pwaBadge = document.getElementById('pwaBadge');

        // Verificar se o PWA já está instalado
        this.checkPWAStatus();

        // Evento para capturar a instalação do PWA
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            
            if (installButton) {
                setTimeout(() => {
                    installButton.classList.add('show');
                }, 3000);
            }
        });

        // Instalação do PWA
        if (installButton) {
            installButton.addEventListener('click', () => this.installPWA());
        }
    }

    checkPWAStatus() {
        const installButton = document.getElementById('installButton');
        const pwaBadge = document.getElementById('pwaBadge');

        if (window.matchMedia('(display-mode: standalone)').matches) {
            if (pwaBadge) pwaBadge.classList.add('show');
            if (installButton) installButton.style.display = 'none';
        }
    }

    async installPWA() {
        if (!this.deferredPrompt) {
            this.showNotification('O app já está instalado ou não pode ser instalado neste dispositivo.', 'info');
            return;
        }

        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        
        const installButton = document.getElementById('installButton');
        const pwaBadge = document.getElementById('pwaBadge');
        
        if (outcome === 'accepted') {
            this.showNotification('App instalado com sucesso!', 'success');
            if (installButton) installButton.style.display = 'none';
            if (pwaBadge) pwaBadge.classList.add('show');
        } else {
            this.showNotification('Instalação cancelada.', 'info');
        }
        
        this.deferredPrompt = null;
    }

    setupSettings() {
        const settingsBtn = document.getElementById('settingsBtn');
        const mobileSettingsBtn = document.getElementById('mobileSettingsBtn');
        const settingsMenu = document.getElementById('settingsMenu');

        // Toggle do menu de configurações
        if (settingsBtn && settingsMenu) {
            settingsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                settingsMenu.classList.toggle('show');
            });
        }

        if (mobileSettingsBtn && settingsMenu) {
            mobileSettingsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                settingsMenu.classList.toggle('show');
                // Fechar menu mobile
                const hamburger = document.getElementById('hamburger');
                const mobileMenu = document.getElementById('mobileMenu');
                if (hamburger) hamburger.classList.remove('active');
                if (mobileMenu) mobileMenu.classList.remove('active');
            });
        }

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            const settingsBtn = document.getElementById('settingsBtn');
            const settingsMenu = document.getElementById('settingsMenu');
            
            if (settingsBtn && settingsMenu && 
                !settingsBtn.contains(e.target) && 
                !settingsMenu.contains(e.target)) {
                settingsMenu.classList.remove('show');
            }
        });

        // Configurar toggles
        this.setupToggles();
    }

    setupToggles() {
        // Toggle de Notificações
        const notificationToggle = document.getElementById('notificationToggle');
        if (notificationToggle) {
            // Verificar status atual
            if (Notification.permission === 'granted') {
                notificationToggle.classList.add('active');
            }

            notificationToggle.addEventListener('click', async () => {
                if (Notification.permission === 'granted') {
                    // Desativar notificações
                    notificationToggle.classList.remove('active');
                    this.showNotification('Notificações desativadas.', 'info');
                } else {
                    // Ativar notificações
                    await this.requestNotificationPermission();
                }
            });
        }

        // Toggle de Modo Offline
        const offlineToggle = document.getElementById('offlineToggle');
        if (offlineToggle) {
            // Verificar se Service Worker está ativo
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                offlineToggle.classList.add('active');
            }

            offlineToggle.addEventListener('click', () => {
                if (offlineToggle.classList.contains('active')) {
                    // Desativar offline
                    offlineToggle.classList.remove('active');
                    this.showNotification('Modo offline desativado.', 'info');
                } else {
                    // Ativar offline
                    offlineToggle.classList.add('active');
                    this.setupServiceWorker();
                    this.showNotification('Modo offline ativado!', 'success');
                }
            });
        }

        // Toggle de Segurança
        const securityToggle = document.getElementById('securityToggle');
        if (securityToggle) {
            // Sempre ativo por padrão
            securityToggle.classList.add('active');

            securityToggle.addEventListener('click', () => {
                if (securityToggle.classList.contains('active')) {
                    securityToggle.classList.remove('active');
                    this.showNotification('Proteções de segurança desativadas.', 'warning');
                } else {
                    securityToggle.classList.add('active');
                    this.showNotification('Proteções de segurança ativadas.', 'success');
                }
            });
        }
    }

    setupNotifications() {
        const notificationModal = document.getElementById('notificationModal');
        const allowNotificationsBtn = document.getElementById('allowNotifications');
        const denyNotificationsBtn = document.getElementById('denyNotifications');

        // Mostrar modal de notificações após algum tempo
        setTimeout(() => {
            if (Notification.permission === 'default' && 
                !localStorage.getItem('notifications_denied') &&
                notificationModal) {
                notificationModal.classList.add('active');
            }
        }, 10000);

        // Event listeners para notificações
        if (allowNotificationsBtn) {
            allowNotificationsBtn.addEventListener('click', async () => {
                if (notificationModal) notificationModal.classList.remove('active');
                await this.requestNotificationPermission();
            });
        }

        if (denyNotificationsBtn) {
            denyNotificationsBtn.addEventListener('click', () => {
                if (notificationModal) notificationModal.classList.remove('active');
                localStorage.setItem('notifications_denied', 'true');
                this.showNotification('Notificações não serão mostradas.', 'info');
            });
        }
    }

    async requestNotificationPermission() {
        try {
            const permission = await Notification.requestPermission();
            const notificationToggle = document.getElementById('notificationToggle');
            
            if (permission === 'granted') {
                this.showNotification('Notificações ativadas com sucesso!', 'success');
                if (notificationToggle) notificationToggle.classList.add('active');
                
                // Enviar notificação de boas-vindas
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.ready.then(registration => {
                        registration.showNotification('Bem-vindo ao ITM!', {
                            body: 'Agora você receberá atualizações sobre novos conteúdos.',
                            icon: '/icons/icon-192.png',
                            badge: '/icons/icon-72.png'
                        });
                    });
                }
            } else {
                this.showNotification('Notificações não permitidas.', 'info');
                if (notificationToggle) notificationToggle.classList.remove('active');
            }
        } catch (error) {
            console.error('Erro ao solicitar notificações:', error);
            this.showNotification('Erro ao ativar notificações.', 'error');
        }
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', async () => {
                try {
                    const registration = await navigator.serviceWorker.register('/sw.js');
                    console.log('Service Worker registrado com sucesso:', registration);
                    
                    // Verificar se está offline
                    this.setupOfflineDetection();
                } catch (error) {
                    console.log('Falha no registro do Service Worker:', error);
                }
            });
        }
    }

    setupOfflineDetection() {
        // Detectar status da conexão
        window.addEventListener('online', () => {
            this.showNotification('Conexão restaurada', 'success');
        });

        window.addEventListener('offline', () => {
            this.showNotification('Você está offline - Modo offline ativado', 'warning');
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

// Inicializar PWA Manager
document.addEventListener('DOMContentLoaded', () => {
    window.pwaManager = new PWAManager();
});
