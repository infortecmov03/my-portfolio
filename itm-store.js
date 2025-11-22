// Data e Hora em tempo real
function updateDateTime() {
    const now = new Date();
    
    // Formatar data
    const optionsDate = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const formattedDate = now.toLocaleDateString('pt-BR', optionsDate);
    
    // Formatar hora
    const optionsTime = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        timeZoneName: 'short'
    };
    const formattedTime = now.toLocaleTimeString('pt-BR', optionsTime);
    
    // Atualizar elementos
    document.getElementById('currentDate').textContent = formattedDate;
    document.getElementById('currentTime').textContent = formattedTime;
}

// Atualizar a cada segundo
setInterval(updateDateTime, 1000);
updateDateTime(); // Chamar imediatamente

// Menu Hamburguer
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

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

// Ativar seções conforme a rolagem
function activateSections() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY > sectionTop - windowHeight / 2 && 
            scrollY < sectionTop + sectionHeight - windowHeight / 3) {
            section.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activateSections);
window.addEventListener('load', activateSections);

// Efeito de digitação no slogan
function typeWriterEffect() {
    const slogan = document.querySelector('.slogan');
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

// Dados dos aplicativos (simulação)
const appData = {
    calculadora: {
        title: "Calculadora ITM",
        images: 4,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        downloadUrl: "https://github.com/infortecmov03/calculador/releases/download/v3/app-debug.apk",
        size: "8.2 MB",
        version: "1.0.0"
    },
    tarefas: {
        title: "Gerenciador de Tarefas",
        images: 3,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        downloadUrl: "https://github.com/username/gerenciador-tarefas/releases/latest/download/tarefas.apk",
        size: "12.5 MB",
        version: "2.1.3"
    },
    tempo: {
        title: "Previsão do Tempo",
        images: 5,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        downloadUrl: "https://github.com/username/previsao-tempo/releases/latest/download/tempo.apk",
        size: "15.8 MB",
        version: "1.5.2"
    },
    financas: {
        title: "Controle Financeiro",
        images: 4,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        downloadUrl: "https://github.com/user/controle-financeiro/releases/latest/download/financas.apk",
        size: "22.1 MB",
        version: "3.0.0"
    },
    ebook: {
        title: "Leitor de E-books",
        images: 3,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        downloadUrl: "https://github.com/user/leitor-ebook/releases/latest/download/ebook.apk",
        size: "18.7 MB",
        version: "2.3.1"
    },
    musica: {
        title: "Player de Música",
        images: 4,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        downloadUrl: "https://github.com/user/player-musica/releases/latest/download/musica.apk",
        size: "25.3 MB",
        version: "4.2.0"
    }
};

// Sistema de Download Avançado
class DownloadManager {
    constructor() {
        this.downloads = new Map();
        this.init();
    }

    init() {
        this.createDownloadModal();
        this.setupDownloadButtons();
    }

    createDownloadModal() {
        // Criar modal de download
        const modalHTML = `
            <div id="downloadModal" class="download-modal">
                <div class="download-content">
                    <div class="download-header">
                        <h3 id="downloadTitle">Baixando App</h3>
                        <button class="close-download">&times;</button>
                    </div>
                    <div class="download-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                        <div class="progress-info">
                            <span id="progressText">0%</span>
                            <span id="downloadSpeed">-</span>
                        </div>
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
                        <div class="detail-item">
                            <i class="fas fa-hdd"></i>
                            <span id="totalSize">-</span>
                        </div>
                    </div>
                    <div class="download-actions">
                        <button id="pauseDownload" class="action-btn pause">
                            <i class="fas fa-pause"></i> Pausar
                        </button>
                        <button id="cancelDownload" class="action-btn cancel">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Adicionar modal ao body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Event listeners do modal
        document.querySelector('.close-download').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('pauseDownload').addEventListener('click', () => {
            this.togglePause();
        });

        document.getElementById('cancelDownload').addEventListener('click', () => {
            this.cancelDownload();
        });
    }

    setupDownloadButtons() {
        document.querySelectorAll('.download-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const appId = button.getAttribute('data-app');
                this.startDownload(appId);
            });
        });
    }

    async startDownload(appId) {
        const app = appData[appId];
        
        // Mostrar modal de download
        this.showModal(app);
        
        try {
            // Simular download (na prática, você usaria fetch ou XMLHttpRequest)
            await this.simulateDownload(app);
            
            // Download concluído com sucesso
            this.showSuccess(app);
            
        } catch (error) {
            this.showError('Erro no download: ' + error.message);
        }
    }

    showModal(app) {
        const modal = document.getElementById('downloadModal');
        const title = document.getElementById('downloadTitle');
        const totalSize = document.getElementById('totalSize');

        title.textContent = `Baixando ${app.title}`;
        totalSize.textContent = app.size;
        
        modal.style.display = 'flex';
        
        // Resetar progresso
        this.updateProgress(0, app.size);
    }

    hideModal() {
        const modal = document.getElementById('downloadModal');
        modal.style.display = 'none';
    }

    updateProgress(percent, totalSize, downloaded = 0, speed = 0) {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const downloadedSize = document.getElementById('downloadedSize');
        const timeLeft = document.getElementById('timeLeft');
        const downloadSpeed = document.getElementById('downloadSpeed');

        progressFill.style.width = `${percent}%`;
        progressText.textContent = `${percent}%`;
        
        // Calcular tamanho baixado
        const downloadedMB = (parseFloat(totalSize) * percent / 100).toFixed(1);
        downloadedSize.textContent = `${downloadedMB} MB de ${totalSize}`;
        
        // Calcular velocidade e tempo restante
        if (speed > 0) {
            const remainingBytes = (parseFloat(totalSize) * (100 - percent) / 100) * 1024 * 1024;
            const secondsLeft = Math.ceil(remainingBytes / speed);
            const minutes = Math.floor(secondsLeft / 60);
            const seconds = secondsLeft % 60;
            
            timeLeft.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            downloadSpeed.textContent = `${(speed / 1024).toFixed(1)} KB/s`;
        }
    }

    async simulateDownload(app) {
        return new Promise((resolve, reject) => {
            let progress = 0;
            const totalSize = parseFloat(app.size);
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Simular velocidade de download aleatória
                    const speed = Math.random() * 500 + 100; // 100-600 KB/s
                    this.updateProgress(progress, app.size, totalSize, speed);
                    
                    setTimeout(resolve, 500);
                } else {
                    // Simular velocidade de download aleatória
                    const speed = Math.random() * 500 + 100;
                    this.updateProgress(progress, app.size, totalSize * progress / 100, speed);
                }
            }, 200);
        });
    }

    showSuccess(app) {
        const modal = document.getElementById('downloadModal');
        const content = modal.querySelector('.download-content');
        
        content.innerHTML = `
            <div class="download-success">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Download Concluído!</h3>
                <p>${app.title} foi baixado com sucesso para sua pasta de downloads.</p>
                <div class="success-details">
                    <div class="detail-item">
                        <i class="fas fa-check"></i>
                        <span>Arquivo salvo em: Downloads/${app.title}.apk</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-weight-hanging"></i>
                        <span>Tamanho: ${app.size}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-code-branch"></i>
                        <span>Versão: ${app.version}</span>
                    </div>
                </div>
                <div class="success-actions">
                    <button id="installApp" class="action-btn install">
                        <i class="fas fa-rocket"></i> Instalar Agora
                    </button>
                    <button id="openFolder" class="action-btn folder">
                        <i class="fas fa-folder-open"></i> Abrir Pasta
                    </button>
                    <button id="closeSuccess" class="action-btn close">
                        <i class="fas fa-times"></i> Fechar
                    </button>
                </div>
            </div>
        `;

        // Event listeners para os botões de sucesso
        document.getElementById('installApp').addEventListener('click', () => {
            this.initiateInstallation(app);
        });

        document.getElementById('openFolder').addEventListener('click', () => {
            this.openDownloadFolder();
        });

        document.getElementById('closeSuccess').addEventListener('click', () => {
            this.hideModal();
        });
    }

    showError(message) {
        const modal = document.getElementById('downloadModal');
        const content = modal.querySelector('.download-content');
        
        content.innerHTML = `
            <div class="download-error">
                <div class="error-icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <h3>Erro no Download</h3>
                <p>${message}</p>
                <div class="error-actions">
                    <button id="retryDownload" class="action-btn retry">
                        <i class="fas fa-redo"></i> Tentar Novamente
                    </button>
                    <button id="closeError" class="action-btn close">
                        <i class="fas fa-times"></i> Fechar
                    </button>
                </div>
            </div>
        `;
    }

    initiateInstallation(app) {
        // Em um ambiente real, isso iniciaria a instalação do APK
        // Como estamos no navegador, simularemos o processo
        
        this.hideModal();
        
        // Mostrar notificação de instalação
        this.showInstallationNotification(app);
    }

    showInstallationNotification(app) {
        // Criar notificação de instalação
        const notification = document.createElement('div');
        notification.className = 'installation-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas fa-rocket"></i>
                </div>
                <div class="notification-text">
                    <strong>Instalando ${app.title}</strong>
                    <span>Preparando aplicativo para instalação...</span>
                </div>
                <div class="notification-progress">
                    <div class="progress-bar">
                        <div class="progress-fill installing"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Simular progresso de instalação
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            const progressFill = notification.querySelector('.progress-fill');
            progressFill.style.width = `${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    notification.innerHTML = `
                        <div class="notification-content success">
                            <div class="notification-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="notification-text">
                                <strong>Instalação Concluída!</strong>
                                <span>${app.title} foi instalado com sucesso.</span>
                            </div>
                            <button class="notification-close">&times;</button>
                        </div>
                    `;

                    notification.querySelector('.notification-close').addEventListener('click', () => {
                        notification.remove();
                    });

                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 5000);
                }, 500);
            }
        }, 200);
    }

    openDownloadFolder() {
        // Em um ambiente real, isso abriria o explorador de arquivos
        // Como estamos no navegador, simularemos o comportamento
        alert(`Em um ambiente real, a pasta de downloads seria aberta.\nArquivo: ${app.title}.apk`);
    }

    togglePause() {
        const pauseBtn = document.getElementById('pauseDownload');
        const isPaused = pauseBtn.classList.contains('paused');
        
        if (isPaused) {
            pauseBtn.classList.remove('paused');
            pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
            // Continuar download
        } else {
            pauseBtn.classList.add('paused');
            pauseBtn.innerHTML = '<i class="fas fa-play"></i> Continuar';
            // Pausar download
        }
    }

    cancelDownload() {
        if (confirm('Tem certeza que deseja cancelar o download?')) {
            this.hideModal();
        }
    }
}

// Configurar botões de galeria
const modal = document.getElementById('galleryModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalAppTitle');
const appImages = document.getElementById('appImages');
const demoVideo = document.getElementById('demoVideo');

document.querySelectorAll('.view-gallery').forEach(button => {
    button.addEventListener('click', function() {
        const appId = this.getAttribute('data-app');
        const app = appData[appId];
        
        // Atualizar título do modal
        modalTitle.textContent = `Galeria - ${app.title}`;
        
        // Limpar imagens anteriores
        appImages.innerHTML = '';
        
        // Adicionar imagens (simulação)
        for (let i = 1; i <= app.images; i++) {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `<i class="fas fa-image"></i>`;
            appImages.appendChild(galleryItem);
        }
        
        // Configurar vídeo
        demoVideo.src = app.video;
        
        // Exibir modal
        modal.style.display = 'block';
    });
});

// Fechar modal
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    demoVideo.src = ''; // Parar o vídeo
});

// Fechar modal ao clicar fora
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        demoVideo.src = ''; // Parar o vídeo
    }
});

// Inicializar o gerenciador de downloads quando a página carregar
let downloadManager;

window.addEventListener('load', function() {
    typeWriterEffect();
    downloadManager = new DownloadManager();
});

// CSS adicional para o sistema de download
const additionalCSS = `
    /* Modal de Download */
    .download-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(5px);
    }

    .download-content {
        background: var(--card-bg);
        border-radius: 15px;
        padding: 2rem;
        width: 90%;
        max-width: 500px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .download-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .download-header h3 {
        color: var(--primary);
        margin: 0;
    }

    .close-download {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-download:hover {
        color: var(--text);
    }

    /* Barra de Progresso */
    .progress-bar {
        width: 100%;
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }

    .progress-fill {
        height: 100%;
        background: var(--primary);
        border-radius: 4px;
        transition: width 0.3s ease;
        width: 0%;
    }

    .progress-fill.installing {
        background: var(--accent);
        animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }

    .progress-info {
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-bottom: 1.5rem;
    }

    /* Detalhes do Download */
    .download-details {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .detail-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.8rem;
        color: var(--text-secondary);
    }

    .detail-item i {
        color: var(--primary);
        width: 16px;
    }

    /* Ações do Download */
    .download-actions {
        display: flex;
        gap: 1rem;
    }

    .action-btn {
        flex: 1;
        padding: 0.8rem 1rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .action-btn.pause {
        background: var(--primary);
        color: white;
    }

    .action-btn.pause:hover {
        background: var(--primary-dark);
    }

    .action-btn.pause.paused {
        background: var(--accent);
    }

    .action-btn.cancel {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.3);
    }

    .action-btn.cancel:hover {
        background: rgba(239, 68, 68, 0.3);
    }

    /* Tela de Sucesso */
    .download-success {
        text-align: center;
    }

    .success-icon {
        font-size: 4rem;
        color: var(--accent);
        margin-bottom: 1rem;
    }

    .download-success h3 {
        color: var(--accent);
        margin-bottom: 1rem;
    }

    .success-details {
        margin: 1.5rem 0;
        text-align: left;
    }

    .success-details .detail-item {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }

    .success-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .action-btn.install {
        background: var(--accent);
        color: var(--secondary);
        flex: 2;
    }

    .action-btn.folder {
        background: var(--primary);
        color: white;
        flex: 1;
    }

    .action-btn.close {
        background: rgba(255, 255, 255, 0.1);
        color: var(--text);
        flex: 1;
    }

    /* Notificação de Instalação */
    .installation-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        border-radius: 10px;
        padding: 1rem;
        border-left: 4px solid var(--primary);
        box-shadow: var(--shadow);
        z-index: 10001;
        max-width: 350px;
        animation: slideInRight 0.3s ease;
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .notification-content.success {
        border-left-color: var(--accent);
    }

    .notification-icon {
        font-size: 1.5rem;
        color: var(--primary);
    }

    .notification-content.success .notification-icon {
        color: var(--accent);
    }

    .notification-text {
        flex: 1;
    }

    .notification-text strong {
        display: block;
        margin-bottom: 0.2rem;
    }

    .notification-text span {
        font-size: 0.9rem;
        color: var(--text-secondary);
    }

    .notification-progress {
        width: 100%;
        margin-top: 0.5rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

// Adicionar CSS ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);
