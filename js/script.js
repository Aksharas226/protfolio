// Particle Animation
function createParticle() {
    const particles = document.querySelector('.bg-particles');
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random size
    const size = Math.random() * 100 + 50;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    particles.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 20000);
}

// Create particles periodically
setInterval(createParticle, 3000);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    // Smooth follower movement
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(updateCursor);
}

updateCursor();

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.7)';
    cursorFollower.style.transform = 'scale(0.7)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
});

// Hover effect for buttons and links
const hoverElements = document.querySelectorAll('a, button, .project-card, .achievement-card');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Typewriter Effect
const typewriterText = document.querySelector('.typewriter');
const phrases = ['Aspiring Software Developer', 'Problem Solver', 'Tech Enthusiast'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (!isDeleting && charIndex <= currentPhrase.length) {
        typewriterText.textContent = currentPhrase.substring(0, charIndex);
        charIndex++;
    }
    
    if (isDeleting && charIndex >= 0) {
        typewriterText.textContent = currentPhrase.substring(0, charIndex);
        charIndex--;
    }
    
    if (charIndex === currentPhrase.length + 1) {
        isWaiting = true;
        setTimeout(() => {
            isDeleting = true;
            isWaiting = false;
        }, 2000);
    }
    
    if (charIndex === 0 && isDeleting) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    const waitTime = isWaiting ? 0 : typingSpeed;
    
    setTimeout(typeWriter, waitTime);
}

typeWriter();

// Smooth Scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Skills Progress Animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progress = item.querySelector('.progress');
        const percentage = item.dataset.progress;
        progress.style.width = '0%';
        
        setTimeout(() => {
            progress.style.width = percentage + '%';
        }, 200);
    });
}

// Intersection Observer for Animations
const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.3,
    rootMargin: '-50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up, .fade-in').forEach(element => {
                element.classList.add('animate');
            });
            
            if (entry.target.id === 'skills') {
                animateSkills();
            }
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Tilt effect for project cards
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Form Submission (Frontend only)
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message (in real app, this would send data to a server)
    alert('Thank you for your message! This is a frontend-only form.');
    contactForm.reset();
}); 