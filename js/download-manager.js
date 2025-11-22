// js/download-manager.js - Sistema de Download
class DownloadManager {
    constructor() {
        this.downloads = new Map();
        this.init();
    }

    init() {
        this.createDownloadModal();
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
            this.hideModal();
        });
    }

    async startDownload(appData, button) {
        // Atualizar botão
        if (button) {
            button.classList.add('downloading');
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Baixando...';
        }

        // Mostrar modal
        this.showModal(appData);

        try {
            // Download REAL do arquivo
            await this.downloadFile(appData);
            
            // Sucesso
            this.showSuccess(appData, button);
            
        } catch (error) {
            this.showError('Erro no download: ' + error.message, button);
        }
    }

    async downloadFile(appData) {
        return new Promise((resolve, reject) => {
            // Simular download (na prática, você usaria um arquivo real)
            this.simulateProgress(appData).then(() => {
                // Criar link de download REAL
                const link = document.createElement('a');
                link.href = appData.downloadUrl;
                link.download = appData.filename;
                
                // Disparar download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                resolve();
            }).catch(reject);
        });
    }

    simulateProgress(appData) {
        return new Promise((resolve) => {
            let progress = 0;
            const startTime = Date.now();
            
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    this.updateProgress(progress, appData, startTime);
                    setTimeout(resolve, 500);
                } else {
                    this.updateProgress(progress, appData, startTime);
                }
            }, 200);
        });
    }

    updateProgress(percent, appData, startTime) {
        const fill = document.getElementById('progressFill');
        const text = document.getElementById('progressText');
        const downloadedSize = document.getElementById('downloadedSize');
        const timeLeft = document.getElementById('timeLeft');
        const speed = document.getElementById('downloadSpeed');

        if (fill) fill.style.width = percent + '%';
        if (text) text.textContent = Math.round(percent) + '%';
        
        // Calcular tamanho baixado
        const totalSizeMB = parseFloat(appData.size);
        const downloadedMB = (totalSizeMB * percent / 100).toFixed(1);
        if (downloadedSize) downloadedSize.textContent = `${downloadedMB} MB de ${appData.size}`;
        
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

    showModal(appData) {
        const modal = document.getElementById('downloadModal');
        const title = document.getElementById('downloadTitle');
        if (title) title.textContent = `Baixando ${appData.title}`;
        if (modal) modal.style.display = 'flex';
    }

    hideModal() {
        const modal = document.getElementById('downloadModal');
        if (modal) modal.style.display = 'none';
    }

    showSuccess(appData, button) {
        this.hideModal();
        
        if (button) {
            button.classList.remove('downloading');
            button.classList.add('completed');
            button.innerHTML = '<i class="fas fa-check"></i> Concluído!';
            
            // Resetar botão após 3 segundos
            setTimeout(() => {
                button.classList.remove('completed');
                button.innerHTML = '<i class="fas fa-download"></i> Download';
            }, 3000);
        }
        
        this.showNotification(`${appData.title} baixado com sucesso!`, 'success');
    }

    showError(message, button) {
        this.hideModal();
        
        if (button) {
            button.classList.remove('downloading');
            button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erro';
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-download"></i> Download';
            }, 3000);
        }
        
        this.showNotification(message, 'error');
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

// Inicializar Download Manager
document.addEventListener('DOMContentLoaded', () => {
    window.downloadManager = new DownloadManager();
});

// Função global para download
window.downloadApp = function(appData, button) {
    if (window.downloadManager) {
        window.downloadManager.startDownload(appData, button);
    }
};
