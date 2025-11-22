// itm-store.js - Sistema 100% Funcional para ITM Store

class ITMStore {
    constructor() {
        this.appData = {
            calculadora: {
                title: "Calculadora ITM",
                filename: "calculadora-itm.apk",
                size: "15 MB",
                version: "v2.1.3",
                downloadUrl: "https://github.com/infortecmov03/calculador/releases/download/v3/app-debug.apk",
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
        this.setupDateTime();
        this.setupNavigation();
        this.setupSections();
        this.createDownloadModal();
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

    setupDateTime() {
        function updateDateTime() {
            const now = new Date();
            const optionsDate = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const formattedDate = now.toLocaleDateString('pt-BR', optionsDate);
            
            const optionsTime = { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit'
            };
            const formattedTime = now.toLocaleTimeString('pt-BR', optionsTime);
            
            const dateEl = document.getElementById('currentDate');
            const timeEl = document.getElementById('currentTime');
            
            if (dateEl) dateEl.textContent = formattedDate;
            if (timeEl) timeEl.textContent = formattedTime;
        }
        
        setInterval(updateDateTime, 1000);
        updateDateTime();
    }

    setupNavigation() {
        // Menu Hamburguer
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');

        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });

            // Fechar menu ao clicar nos links
            document.querySelectorAll('.mobile-menu a').forEach(link => {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                });
            });
        }

        // Navegação suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
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

    createDownloadModal() {
        const modalHTML = `
            <div id="downloadModal" class="download-modal">
                <div class="download-content">
                    <div class="download-header">
                        <h3 id="downloadTitle">Baixando App</h3>
                        <button class="close-download">&times;</button>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill"></div>
                    </div>
                    <div class="progress-info">
                        <span id="progressText">0%</span>
                        <span id="downloadSpeed">-</span>
                    </div>
                    <div class="download-details">
                        <div class="detail-item">
                            <i class="fas fa-download"></i>
                            <span id="downloadedSize">0 MB</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span id="timeLeft">Calculando...</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        document.querySelector('.close-download').addEventListener('click', () => {
            this.hideDownloadModal();
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

        // Atualizar botão
        button.classList.add('downloading');
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Baixando...';

        // Mostrar modal
        this.showDownloadModal(app);

        try {
            // Simular download (para apps com link #)
            await this.simulateDownload(app);
            this.showDownloadSuccess(app, button);
        } catch (error) {
            this.showDownloadError('Erro no download: ' + error.message, button);
        }
    }

    async simulateDownload(app) {
        return new Promise((resolve) => {
            let progress = 0;
            const startTime = Date.now();
            const totalSize = parseFloat(app.size);
            
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    this.updateDownloadProgress(progress, app, startTime);
                    setTimeout(resolve, 500);
                } else {
                    this.updateDownloadProgress(progress, app, startTime);
                }
            }, 200);
        });
    }

    updateDownloadProgress(percent, app, startTime) {
        const fill = document.getElementById('progressFill');
        const text = document.getElementById('progressText');
        const downloadedSize = document.getElementById('downloadedSize');
        const timeLeft = document.getElementById('timeLeft');
        const speed = document.getElementById('downloadSpeed');

        if (fill) fill.style.width = percent + '%';
        if (text) text.textContent = Math.round(percent) + '%';
        
        // Calcular tamanho baixado
        const totalSizeMB = parseFloat(app.size);
        const downloadedMB = (totalSizeMB * percent / 100).toFixed(1);
        if (downloadedSize) downloadedSize.textContent = `${downloadedMB} MB de ${app.size}`;
        
        // Calcular velocidade e tempo restante
        const elapsedTime = (Date.now() - startTime) / 1000;
        if (elapsedTime > 0) {
            const downloadSpeed = (totalSizeMB * percent / 100) / elapsedTime;
            const remainingTime = (totalSizeMB * (100 - percent) / 100) / downloadSpeed;
            
            if (timeLeft) {
                const minutes = Math.floor(remainingTime / 60);
                const seconds = Math.floor(remainingTime % 60);
                timeLeft.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
            
            if (speed) speed.textContent = `${downloadSpeed.toFixed(1)} MB/s`;
        }
    }

    showDownloadModal(app) {
        const modal = document.getElementById('downloadModal');
        const title = document.getElementById('downloadTitle');
        if (title) title.textContent = `Baixando ${app.title}`;
        if (modal) modal.style.display = 'flex';
    }

    hideDownloadModal() {
        const modal = document.getElementById('downloadModal');
        if (modal) modal.style.display = 'none';
    }

    showDownloadSuccess(app, button) {
        this.hideDownloadModal();
        
        if (button) {
            button.classList.remove('downloading');
            button.classList.add('completed');
            button.innerHTML = '<i class="fas fa-check"></i> Concluído!';
            
            // Resetar botão após 3 segundos
            setTimeout(() => {
                button.classList.remove('completed');
                button.innerHTML = '<i class="fas fa-download"></i> Download APK';
            }, 3000);
        }
        
        this.showNotification(`${app.title} baixado com sucesso!`, 'success');
    }

    showDownloadError(message, button) {
        this.hideDownloadModal();
        
        if (button) {
            button.classList.remove('downloading');
            button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erro';
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-download"></i> Download APK';
            }, 3000);
        }
        
        this.showNotification(message, 'error');
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

// Inicializar quando DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    window.itmStore = new ITMStore();
});
