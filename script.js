var map = L.map('map').setView([6.9271, 79.8612], 14);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

var truckIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2641/2641460.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
});

var marker = L.marker([6.9271, 79.8612], {icon: truckIcon}).addTo(map);
marker.bindPopup("<b>EcoTruck #01</b><br>Collecting Waste...").openPopup();

let lat = 6.9271;
let lng = 79.8612;

setInterval(() => {
    lat += 0.0001;
    lng += 0.0001;
    marker.setLatLng([lat, lng]);
    map.panTo([lat, lng]);
}, 1000);

document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = this.querySelector('.btn');
    btn.innerHTML = '✓ Sent!';
    btn.style.background = '#27ae60';
    
    setTimeout(() => {
        btn.innerHTML = 'Send Message';
        btn.style.background = '';
    }, 2000);
    
    this.reset();
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .section-title, .contact-form, .hero-image, .tracking-wrapper, .tech-marquee').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
    
    document.querySelectorAll('.section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = 1 - (rect.top / window.innerHeight);
            section.style.setProperty('--scroll-progress', progress);
        }
    });
});

nav.style.transition = 'transform 0.3s ease';

document.querySelectorAll('.card').forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.style.opacity = '0';
    
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transition = 'opacity 0.5s ease';
    }, 100);
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: rgba(46, 204, 113, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        z-index: -1;
        animation: particleFloat ${Math.random() * 10 + 10}s linear forwards;
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 20000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% { transform: translateY(0) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-120vh) rotate(720deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

setInterval(createParticle, 2000);

for (let i = 0; i < 5; i++) {
    setTimeout(createParticle, i * 500);
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('input-focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('input-focused');
    });
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});