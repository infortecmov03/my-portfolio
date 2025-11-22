// js/itm-store.js - Sistema específico da ITM Store
class ITMStore {
    constructor() {
        this.appData = {
            calculadora: {
                title: "Calculadora ITM",
                filename: "calculadora-itm.apk",
                size: "15 MB",
                version: "v2.1.3",
                downloadUrl: "https://github.com/infortecmov03/calculadora-listas/releases/latest/download/calculadora.apk",
                images: 4,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
            },
            tarefas: {
                title: "Gerenciador de Tarefas",
                filename: "gerenciador-tarefas.apk", 
                size: "22 MB",
                version: "v1.5.2",
                downloadUrl: "#",
                images: 3,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
            },
            tempo: {
                title: "Previsão do Tempo",
                filename: "previsao-tempo.apk",
                size: "18 MB", 
                version: "v3.0.1",
                downloadUrl: "#",
                images: 5,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
            },
            financas: {
                title: "Controle Financeiro",
                filename: "controle-financeiro.apk",
                size: "25 MB",
                version: "v2.4.0",
                downloadUrl: "#",
                images: 4,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
            },
            ebook: {
                title: "Leitor de E-books", 
                filename: "leitor-ebook.apk",
                size: "12 MB",
                version: "v1.8.5",
                downloadUrl: "#",
                images: 3,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
            },
            musica: {
                title: "Player de Música",
                filename: "player-musica.apk", 
                size: "20 MB",
                version: "v2.3.7",
                downloadUrl: "#",
                images: 4,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Download buttons
        document.addEventListener('click', (e) => {
            const downloadBtn = e.target.closest('.download-button');
            if (downloadBtn) {
                e.preventDefault();
                const appId = downloadBtn.getAttribute('data-app');
                this.handleDownload(appId, downloadBtn);
            }

            // Gallery buttons
            const galleryBtn = e.target.closest('.view-gallery');
            if (galleryBtn) {
                const appId = galleryBtn.getAttribute('data-app');
                this.showGallery(appId);
            }
        });

        // Modal close
        document.getElementById('closeModal')?.addEventListener('click', () => {
            this.hideGallery();
        });

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('galleryModal');
            if (e.target === modal) {
                this.hideGallery();
            }
        });
    }

    async handleDownload(appId, button) {
        const app = this.appData[appId];
        if (!app) return;

        // Verificar se é um link externo (como o GitHub)
        if (app.downloadUrl && !app.downloadUrl.startsWith('#')) {
            // Link externo - abrir em nova aba
            window.open(app.downloadUrl, '_blank');
            this.showNotification(`Abrindo página de download do ${app.title}`, 'info');
            return;
        }

        // Usar o sistema de download global
        if (window.downloadApp) {
            window.downloadApp(app, button);
        }
    }

    showGallery(appId) {
        const app = this.appData[appId];
        if (!app) return;

        const modal = document.getElementById('galleryModal');
        const modalTitle = document.getElementById('modalAppTitle');
        const appImages = document.getElementById('appImages');
        const demoVideo = document.getElementById('demoVideo');

        if (modalTitle) modalTitle.textContent = `Galeria - ${app.title}`;
        
        // Limpar e adicionar imagens
        if (appImages) {
            appImages.innerHTML = '';
            for (let i = 1; i <= app.images; i++) {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `<i class="fas fa-image"></i>`;
                appImages.appendChild(galleryItem);
            }
        }

        // Configurar vídeo
        if (demoVideo) {
            demoVideo.src = app.video;
        }

        // Mostrar modal
        if (modal) {
            modal.style.display = 'block';
        }
    }

    hideGallery() {
        const modal = document.getElementById('galleryModal');
        const demoVideo = document.getElementById('demoVideo');
        
        if (modal) modal.style.display = 'none';
        if (demoVideo) demoVideo.src = ''; // Parar o vídeo
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

// Inicializar ITM Store
document.addEventListener('DOMContentLoaded', () => {
    window.itmStore = new ITMStore();
});
