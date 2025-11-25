// Esperar a que termine la intro antes de iniciar animaciones
setTimeout(() => {
    iniciarAnimaciones();
}, 3000); // 3 segundos de intro

function iniciarAnimaciones() {

// Mensaje Secreto después de X clics
// Mensaje Secreto después de X clics
let secretClicks = 0;
const CLICKS_NEEDED = 10;
let secretShown = false;
let envelopeOpen = false;

// Agregar el listener al documento, pero solo contar clics válidos
document.addEventListener('click', handleSecretClick);
document.addEventListener('touchend', handleSecretClick); // Para móviles

function handleSecretClick(e) {
    // No contar si ya apareció el sobre
    if (secretShown || document.getElementById('secretEnvelope')) {
        return;
    }
    
    // No contar clics en elementos específicos que no debemos contar
    if (e.target.closest('.intro-screen')) {
        return;
    }
    
    secretClicks++;
    console.log('Clics: ' + secretClicks + '/' + CLICKS_NEEDED);
    
    if (secretClicks === 5) {
        console.log('💕 Sigue haciendo clic... ya casi!');
    }
    
    if (secretClicks >= CLICKS_NEEDED) {
        secretShown = true;
        showSecretMessage();
    }
}

function showSecretMessage() {
    // Remover el listener para no seguir contando
    document.removeEventListener('click', handleSecretClick);
    document.removeEventListener('touchend', handleSecretClick);
    
    // Crear overlay oscuro
    const overlay = document.createElement('div');
    overlay.className = 'secret-overlay';
    overlay.id = 'secretOverlay';
    document.body.appendChild(overlay);
    
    // Crear sobre
    const envelope = document.createElement('div');
    envelope.className = 'secret-envelope';
    envelope.id = 'secretEnvelope';
    envelope.innerHTML = `
        <div class="envelope-wrapper">
            <div class="envelope-back-flap"></div>
            <div class="envelope-body">
                <div class="letter-paper">
                    <h2>✨ Para Esther ✨</h2>
                    <p>Eres la razón de mi felicidad</p>
                    <p>Cada momento contigo es mágico 🌟</p>
                    <p>Espero poder pasar muchos 💕</p>
                    <p>más momentos a tu lado mua 🌟</p>
                </div>
            </div>
            <div class="envelope-front-flap"></div>
            <div class="envelope-heart">❤️</div>
        </div>
        <div class="envelope-click-hint">Haz clic para abrir 💌</div>
    `;
    document.body.appendChild(envelope);
    
    // Crear explosión de corazones
    createSecretHeartExplosion();
    
    // Manejar clics en el sobre y overlay
    setTimeout(() => {
        envelope.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleEnvelope();
        });
        
        envelope.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleEnvelope();
        });
        
        overlay.addEventListener('click', () => {
            if (envelopeOpen) {
                closeSecretMessage();
            }
        });
        
        overlay.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (envelopeOpen) {
                closeSecretMessage();
            }
        });
    }, 1000);
}

function toggleEnvelope() {
    const envelope = document.getElementById('secretEnvelope');
    const hint = envelope.querySelector('.envelope-click-hint');
    
    if (!envelopeOpen) {
        // Abrir sobre
        envelope.classList.add('envelope-open');
        envelopeOpen = true;
        if (hint) hint.textContent = 'Haz clic para cerrar ✕';
    } else {
        // Cerrar sobre completamente
        closeSecretMessage();
    }
}

function closeSecretMessage() {
    const envelope = document.getElementById('secretEnvelope');
    const overlay = document.getElementById('secretOverlay');
    
    if (envelope && overlay) {
        envelope.style.animation = 'envelopeAppear 0.6s reverse';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.6s';
        
        setTimeout(() => {
            envelope.remove();
            overlay.remove();
            envelopeOpen = false;
            secretShown = false;
            secretClicks = 0;
            
            // Volver a agregar el listener
            document.addEventListener('click', handleSecretClick);
            document.addEventListener('touchend', handleSecretClick);
        }, 600);
    }
}

function createSecretHeartExplosion() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.fontSize = '30px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1998';
            
            const angle = (Math.PI * 2 * i) / 30;
            const distance = 300;
            const startX = centerX;
            const startY = centerY;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            heart.style.left = startX + 'px';
            heart.style.top = startY + 'px';
            heart.style.transition = 'all 1.5s ease-out';
            heart.style.opacity = '1';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.style.left = endX + 'px';
                heart.style.top = endY + 'px';
                heart.style.opacity = '0';
                heart.style.transform = `scale(1.5) rotate(${Math.random() * 360}deg)`;
            }, 50);
            
            setTimeout(() => heart.remove(), 1600);
        }, i * 50);
    }
}
   
const canvas = document.getElementById('heartsCanvas');
const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
let heartInterval;

// Crear corazones flotantes continuamente
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    
    // Posición aleatoria en X
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.bottom = '0px';
    
    // Tamaño aleatorio
    const size = Math.random() * 30 + 20;
    heart.style.fontSize = size + 'px';
    
    // Duración aleatoria
    const duration = Math.random() * 3 + 4;
    heart.style.animationDuration = duration + 's';
    
    canvas.appendChild(heart);
    
    // Eliminar después de la animación
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Iniciar generación de corazones
heartInterval = setInterval(createFloatingHeart, 300);

// Crear explosión de corazones al hacer clic o touch
// Crear explosión de corazones al hacer clic o touch
function handleInteraction(e) {
    e.preventDefault(); // Prevenir comportamiento por defecto
    
    // Obtener coordenadas correctas para touch y click
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Crear el nombre "Esther"
    const namePopup = document.createElement('div');
    namePopup.className = 'name-popup';
    namePopup.textContent = 'Esther';
    namePopup.style.left = x + 'px';
    namePopup.style.top = y + 'px';
    canvas.appendChild(namePopup);
    
    setTimeout(() => namePopup.remove(), 2000);
    
    // Ajustar cantidad de corazones según el tamaño de pantalla
    const heartCount = window.innerWidth < 768 ? 10 : 15;
    
    // Crear múltiples corazones inmediatamente
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'absolute';
        heart.style.pointerEvents = 'none';
        
        const angle = (Math.PI * 2 * i) / heartCount;
        const velocity = Math.random() * 100 + 50;
        const targetX = Math.cos(angle) * velocity;
        const targetY = Math.sin(angle) * velocity;
        
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        
        // Mismo tamaño que los corazones flotantes
        const size = Math.random() * 30 + 20;
        heart.style.fontSize = size + 'px';
        heart.style.color = '#ff4757';
        heart.style.filter = 'drop-shadow(0 0 10px rgba(255, 71, 87, 0.6))';
        heart.style.transition = 'all 1s ease-out';
        heart.style.opacity = '1';
        
        canvas.appendChild(heart);
        
        // Animar después de un pequeño delay
        setTimeout(() => {
            heart.style.transform = `translate(${targetX}px, ${targetY}px) rotate(${Math.random() * 360}deg)`;
            heart.style.opacity = '0';
        }, 10);
        
        setTimeout(() => heart.remove(), 1100);
    }

    // Ajustar cantidad de partículas según el dispositivo
    const particleCount = window.innerWidth < 768 ? 10 : 20;
    
    // Crear partículas brillantes
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        canvas.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Agregar eventos para click y touch
document.addEventListener('click', handleInteraction);
document.addEventListener('touchstart', handleInteraction, { passive: false });

// Efecto de corazones siguiendo el cursor (solo en desktop)
let mouseTimeout;

function handleMove(e) {
    // Solo en dispositivos con mouse (desktop)
    if (window.innerWidth > 768 && !e.touches) {
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            if (Math.random() > 0.7) {
                const heart = document.createElement('div');
                heart.textContent = '💕';
                heart.style.position = 'absolute';
                heart.style.left = e.clientX + 'px';
                heart.style.top = e.clientY + 'px';
                heart.style.fontSize = '15px';
                heart.style.pointerEvents = 'none';
                heart.style.animation = 'float-up 2s ease-out forwards';
                canvas.appendChild(heart);
                
                setTimeout(() => heart.remove(), 2000);
            }
        }, 50);
    }
}

document.addEventListener('mousemove', handleMove);

// Ajustar la cantidad de corazones iniciales según el dispositivo
const initialHeartCount = window.innerWidth < 480 ? 10 : window.innerWidth < 768 ? 15 : 30;

// Crear corazones iniciales para llenar la pantalla
for (let i = 0; i < initialHeartCount; i++) {
    setTimeout(createFloatingHeart, i * 100);
}

// Ajustar la velocidad de generación de corazones según el dispositivo
if (window.innerWidth < 768) {
    clearInterval(heartInterval);
    const interval = window.innerWidth < 480 ? 600 : 500;
    heartInterval = setInterval(createFloatingHeart, interval);
}

// Reajustar en cambio de orientación
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        clearInterval(heartInterval);
        const interval = window.innerWidth < 480 ? 600 : 500;
        heartInterval = setInterval(createFloatingHeart, interval);
    } else {
        clearInterval(heartInterval);
        heartInterval = setInterval(createFloatingHeart, 300);
    }
})};