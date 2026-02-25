// Typewriter effect
const textElement = document.getElementById("typewriter");
const textToType = "Aspiring Cybersecurity Engineer | VAPT & Cloud Security Enthusiast";
let i = 0;

function typeWriter() {
    if (i < textToType.length) {
        textElement.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

// Start typewriter after a small delay
setTimeout(typeWriter, 1000);

// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links li a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Particles.js config
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 60,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#00ff41"
        },
        "shape": {
            "type": "circle",
        },
        "opacity": {
            "value": 0.3,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#00ff41",
            "opacity": 0.2,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 0.8
                }
            },
            "push": {
                "particles_nb": 4
            }
        }
    },
    "retina_detect": true
});

// Scroll Animations
const faders = document.querySelectorAll('.section-padding');

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    fader.classList.add('fade-in');
    appearOnScroll.observe(fader);
});

// Update active nav link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href') === `#${current}`) {
            li.classList.add('active');
        }
    });
});

// Contact Form submission (prevent default and send via Web3Forms)
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get the form elements
    const form = e.target;
    const btn = form.querySelector('.submit-btn');
    const originalText = btn.innerHTML;

    // UI Update during submission
    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    btn.style.opacity = '0.7';

    // Collect data
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Change to Web3Forms submission logic
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // Success logic
                btn.innerHTML = 'Transmission Sent <i class="fas fa-check"></i>';
                btn.style.background = 'var(--accent-green)';
                btn.style.color = 'var(--bg-dark)';
                btn.style.opacity = '1';
                form.reset();
            } else {
                console.log(response);
                btn.innerHTML = 'Failed <i class="fas fa-times"></i>';
                btn.style.background = '#ff5f56';
                btn.style.color = '#fff';
            }
        })
        .catch(error => {
            console.log(error);
            btn.innerHTML = 'Error <i class="fas fa-exclamation-triangle"></i>';
        })
        .finally(() => {
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.color = '';
                btn.style.opacity = '1';
            }, 3000);
        });
});
