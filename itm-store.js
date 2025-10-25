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
        downloadUrl: "https://github.com/username/calculadora-itm/releases/latest/download/calculadora.apk"
    },
    tarefas: {
        title: "Gerenciador de Tarefas",
        images: 3,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        downloadUrl: "https://github.com/username/gerenciador-tarefas/releases/latest/download/tarefas.apk"
    },
    tempo: {
        title: "Previsão do Tempo",
        images: 5,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        downloadUrl: "https://github.com/username/previsao-tempo/releases/latest/download/tempo.apk"
    },
    financas: {
        title: "Controle Financeiro",
        images: 4,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        downloadUrl: "https://github.com/user/controle-financeiro/releases/latest/download/financas.apk"
    },
    ebook: {
        title: "Leitor de E-books",
        images: 3,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        downloadUrl: "https://github.com/user/leitor-ebook/releases/latest/download/ebook.apk"
    },
    musica: {
        title: "Player de Música",
        images: 4,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        downloadUrl: "https://github.com/user/player-musica/releases/latest/download/musica.apk"
    }
};

// Configurar botões de download
document.querySelectorAll('.download-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const appId = this.getAttribute('data-app');
        const downloadUrl = appData[appId].downloadUrl;
        
        // Criar link temporário para download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Feedback visual
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Baixando...';
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
});

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

// Iniciar efeitos quando a página carregar
window.addEventListener('load', function() {
    typeWriterEffect();
});
