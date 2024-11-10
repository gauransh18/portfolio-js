document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {

      if (this.id === 'resume-btn' || this.id === 'artwork-btn') return;
      
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
        

        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });


  function setActiveLink() {
    const scrollPosition = window.scrollY + 100; 

    const sections = document.querySelectorAll('section[id], div[id="skills"]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink(); 


  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });


  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger?.classList.remove('active');
    });
  });

  const texts = [
    'build mobile apps with Flutter',
    'design cloud architectures',
    'develop microservices',
    'create stunning UI/UX',
    'build web apps with React',
    'work with AI/ML technologies',
    'manage DevOps pipelines',
    'develop in Swift and Go',
    'create digital artwork',
    'lead technical teams'
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100; 
  const deletingSpeed = 50; 
  const pauseTime = 1000; 

  function typeText() {
    const currentText = texts[textIndex];
    const changingText = document.getElementById('changing-text');
    
    if (!changingText) return;

    if (isDeleting) {

      changingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {

      changingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }


    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeText, pauseTime);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeText, typingSpeed);
      return;
    }

    setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
  }

  typeText();


  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        const timelineItems = entry.target.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
          item.classList.add('animate');
        });

        timelineObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);


  const timelineSection = document.querySelector('.timeline');
  if (timelineSection) {
    timelineObserver.observe(timelineSection);
  }


  particlesJS('particles-js',
    {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 700
          }
        },
        "color": {
          "value": "#ff5733" 
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ff5733",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "repulse": {
            "distance": 100,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    }
  );

  const form = document.getElementById('contact-form');
  const result = document.getElementById('result');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait...";

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
        result.innerHTML = json.message;
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch(error => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function() {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
  });
});

window.onload = function() {
    window.scrollTo(0, 0);
    history.replaceState(null, null, ' ');
}

function scrollToContact(event) {
    event.preventDefault();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

scrollToTop();