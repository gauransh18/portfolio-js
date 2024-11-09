document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Skip only for artwork and resume buttons
      if (this.id === 'resume-btn' || this.id === 'artwork-btn') return;
      
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Update active state manually
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });

  // Active state for navigation
  function setActiveLink() {
    const scrollPosition = window.scrollY + 100; // Offset for better detection

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
  setActiveLink(); // Initial check

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
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
  const typingSpeed = 100; // Adjust typing speed (milliseconds)
  const deletingSpeed = 50; // Adjust deleting speed (milliseconds)
  const pauseTime = 1000; // Time to pause at full text

  function typeText() {
    const currentText = texts[textIndex];
    const changingText = document.getElementById('changing-text');
    
    if (!changingText) return;

    if (isDeleting) {
      // Deleting text
      changingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Typing text
      changingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    // Handle text completion or deletion
    if (!isDeleting && charIndex === currentText.length) {
      // Pause at full text
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

  // Start the typing animation
  typeText();

  // Timeline animation
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get all timeline items within this section
        const timelineItems = entry.target.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
          item.classList.add('animate');
        });
        // Unobserve after animation is triggered
        timelineObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe the timeline section
  const timelineSection = document.querySelector('.timeline');
  if (timelineSection) {
    timelineObserver.observe(timelineSection);
  }
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