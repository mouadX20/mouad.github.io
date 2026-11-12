/* ==========================================================================
   PORTFOLIO - MOUAD ELKOUTAMI
   Master Cybersécurité & Développeur Web Full-Stack
   JavaScript Interactivity System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. THEME TOGGLE (DARK / LIGHT MODE)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  // Retrieve saved preference or default to dark
  const currentTheme = localStorage.getItem('mouad_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = activeTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('mouad_portfolio_theme', targetTheme);
      updateThemeIcon(targetTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggleBtn.setAttribute('title', 'Passer en mode sombre');
    } else {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggleBtn.setAttribute('title', 'Passer en mode clair');
    }
  }

  // --------------------------------------------------------------------------
  // 2. NAVBAR SCROLL EFFECT & ACTIVE LINK HIGHLIGHT
  // --------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Add glass background on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link spy
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksContainer = document.querySelector('.nav-links');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. TYPEWRITER EFFECT
  // --------------------------------------------------------------------------
  const typewriterTarget = document.getElementById('typewriterText');
  const roles = [
    "Étudiant en Master 1 Cybersécurité (SUPMTI)",
    "Développeur Web Full-Stack (Laravel, JS)",
    "Licencié en Systèmes Informatiques",
    "Spécialiste Bases de Données & Réseaux"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 90;

  function typeEffect() {
    if (!typewriterTarget) return;

    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typewriterTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 40;
    } else {
      typewriterTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingDelay = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 400; // Pause before new word
    }

    setTimeout(typeEffect, typingDelay);
  }
  typeEffect();

  // --------------------------------------------------------------------------
  // 4. SKILLS FILTERING TABS
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. CV MODAL HANDLERS
  // --------------------------------------------------------------------------
  const openCvBtn = document.getElementById('openCvModal');
  const heroCvBtn = document.getElementById('heroCvBtn');
  const cvModal = document.getElementById('cvModal');
  const closeCvBtn = document.getElementById('closeCvModal');
  const printCvBtn = document.getElementById('printCvBtn');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openCvBtn) openCvBtn.addEventListener('click', () => openModal(cvModal));
  if (heroCvBtn) heroCvBtn.addEventListener('click', () => openModal(cvModal));
  if (closeCvBtn) closeCvBtn.addEventListener('click', () => closeModal(cvModal));

  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Close modals when clicking backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Close modals with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        closeModal(modal);
      });
    }
  });

  // --------------------------------------------------------------------------
  // 6. CONTACT FORM INTERACTION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        alert('Veuillez renseigner tous les champs obligatoires.');
        return;
      }

      // Display visual confirmation
      if (formSuccessAlert) {
        formSuccessAlert.style.display = 'flex';
        formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Prepare mailto or WhatsApp quick link
      const encodedMsg = encodeURIComponent(
        `Bonjour Mouad,\n\nJe suis ${name} (${email}).\nSujet: ${subject}\n\nMessage:\n${message}`
      );
      
      const mailtoUrl = `mailto:mouadelkoutami2004@gmail.com?subject=${encodeURIComponent(subject || 'Contact via Portfolio')}&body=${encodedMsg}`;
      
      // Open default email client after brief notice
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      contactForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 7. SCROLL TO TOP BUTTON
  // --------------------------------------------------------------------------
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});

