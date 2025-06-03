
document.addEventListener('DOMContentLoaded', () => {
  // State variables (conceptual, as we modify classes directly)
  // let isMobileMenuOpen = false; // Managed by class 'active'
  // let isContactModalOpen = false; // Managed by class 'active'

  // DOM Element Selectors
  const mobileMenuElement = document.getElementById('simple-mobile-menu');
  const mobileMenuCloseButton = mobileMenuElement.querySelector('.simple-menu-close');
  const mobileMenuNavLinks = mobileMenuElement.querySelectorAll('.simple-menu-nav a');
  const mobileMenuActionButtons = mobileMenuElement.querySelectorAll('.simple-menu-actions .simple-action-btn, .simple-menu-actions a.simple-action-btn');
  
  const contactModalElement = document.getElementById('contact-modal');
  const contactModalCloseButton = contactModalElement.querySelector('.modal-close-btn');

  const fabMenuButton = document.getElementById('fab-menu-toggle');
  const fabContactButton = document.getElementById('fab-contact-toggle');

  const ctaSolicitarCitaButton = document.getElementById('cta-solicitar-cita');

  const faqItems = document.querySelectorAll('.faq-item');
  const contactForm = document.querySelector('form.contact-form');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav a');


  // --- Body Scroll Lock ---
  const setBodyScrollLock = (isLocked) => {
    document.body.style.overflow = isLocked ? 'hidden' : '';
  };

  const updateBodyScrollLock = () => {
    const menuOpen = mobileMenuElement.classList.contains('active');
    const modalOpen = contactModalElement.classList.contains('active');
    setBodyScrollLock(menuOpen || modalOpen);
  };

  // --- Mobile Menu ---
  const toggleMobileMenu = () => {
    const isActive = mobileMenuElement.classList.toggle('active');
    mobileMenuElement.setAttribute('aria-hidden', String(!isActive));
    fabMenuButton.setAttribute('aria-expanded', String(isActive));
    updateBodyScrollLock();
    if (isActive) {
        mobileMenuCloseButton.focus();
    } else {
        fabMenuButton.focus();
    }
  };

  if (fabMenuButton) fabMenuButton.addEventListener('click', toggleMobileMenu);
  if (mobileMenuCloseButton) mobileMenuCloseButton.addEventListener('click', toggleMobileMenu);
  
  mobileMenuNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenuElement.classList.contains('active')) {
          toggleMobileMenu();
      }
    });
  });

  mobileMenuActionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const modalToggle = button.dataset.modalToggle;
      if (modalToggle === 'contact-modal') {
        e.preventDefault(); 
        if (mobileMenuElement.classList.contains('active')) {
            toggleMobileMenu(); 
        }
        toggleContactModal(); 
      } else {
        if (mobileMenuElement.classList.contains('active')) {
            if (button.tagName === 'A' && button.getAttribute('href')) {
                setTimeout(toggleMobileMenu, 100);
            } else {
                 toggleMobileMenu();
            }
        }
      }
    });
  });


  // --- Contact Modal ---
  const toggleContactModal = () => {
    const isActive = contactModalElement.classList.toggle('active');
    contactModalElement.setAttribute('aria-hidden', String(!isActive));
    
    if (fabContactButton) fabContactButton.setAttribute('aria-expanded', String(isActive));
    if (ctaSolicitarCitaButton) ctaSolicitarCitaButton.setAttribute('aria-expanded', String(isActive));
    const mobileMenuEmailButton = mobileMenuElement.querySelector('[data-modal-toggle="contact-modal"]');
    if (mobileMenuEmailButton) mobileMenuEmailButton.setAttribute('aria-expanded', String(isActive));
    
    updateBodyScrollLock();
    if (isActive) {
        contactModalCloseButton.focus();
    }
  };

  if (fabContactButton) fabContactButton.addEventListener('click', toggleContactModal);
  if (ctaSolicitarCitaButton) ctaSolicitarCitaButton.addEventListener('click', toggleContactModal);
  if (contactModalCloseButton) contactModalCloseButton.addEventListener('click', toggleContactModal);
  
  if (contactModalElement) {
    contactModalElement.addEventListener('click', (event) => {
        if (event.target === contactModalElement) { 
            toggleContactModal();
        }
    });
  }

  // --- Escape key for modal/menu ---
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (contactModalElement.classList.contains('active')) {
        toggleContactModal();
      } else if (mobileMenuElement.classList.contains('active')) {
        toggleMobileMenu();
      }
    }
  });

  // --- FAQ Accordion ---
  faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      const questionId = `faq-question-${index}`;
      const answerId = `faq-answer-${index}`;

      question.setAttribute('id', questionId);
      question.setAttribute('aria-controls', answerId);
      question.setAttribute('aria-expanded', 'false');
      question.setAttribute('tabindex', '0'); 

      answer.setAttribute('id', answerId);
      answer.setAttribute('role', 'region');
      answer.setAttribute('aria-labelledby', questionId);
      answer.style.display = 'none'; 

      const handler = () => {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        answer.style.display = isExpanded ? 'none' : 'block';
        question.setAttribute('aria-expanded', String(!isExpanded));
      };

      question.addEventListener('click', handler);
      question.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handler();
        }
      });
    }
  });

  // --- Contact Form Submission ---
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      // Client-side validation
      const form = event.currentTarget;
      const name = form.elements.namedItem('name')?.value.trim();
      const email = form.elements.namedItem('email')?.value.trim();
      const phone = form.elements.namedItem('phone')?.value.trim();
      const message = form.elements.namedItem('message')?.value.trim();
      const privacy = form.elements.namedItem('privacy')?.checked;
      let isValid = true;

      if (!name || !email || !phone || !message) {
        alert('Por favor, completa todos los campos obligatorios: Nombre, Email, Teléfono y Mensaje.');
        isValid = false;
      } else if (!privacy) {
        alert('Por favor, acepta la política de privacidad.');
        isValid = false;
      }
      // Basic email format validation (you might want a more robust one)
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Por favor, introduce una dirección de email válida.');
        isValid = false;
      }


      if (!isValid) {
        event.preventDefault(); // Prevent submission ONLY if client-side validation fails
      }
      // If isValid is true, the form will submit naturally to the PHP script
      // specified in its 'action' attribute. The PHP script will handle success/error display.
    });
  }
  
  // --- Active Nav Link ---
  const currentPathname = window.location.pathname;
  // Ensure consistent trailing slash handling for comparison
  const normalizedCurrentPathname = currentPathname.endsWith('/') ? currentPathname : currentPathname + '/';
  const isAtRoot = currentPathname === '/' || currentPathname === '/index.html';


  desktopNavLinks.forEach(link => {
    let linkHref = link.getAttribute('href');
    // Normalize linkHref too, assuming relative links from root
    if (linkHref.startsWith('/')) {
        linkHref = linkHref.endsWith('/') ? linkHref : linkHref + '/';
    } else { // for relative links like 'contacto'
        linkHref = '/' + (linkHref.endsWith('/') ? linkHref : linkHref + '/');
    }
    
    // Special case for "Inicio" link when at root
    if ((link.getAttribute('href') === '/' || link.getAttribute('href') === '/index.html') && isAtRoot) {
        link.classList.add('active');
    } 
    // For the "Contacto" page specifically if it's index.html in a /contacto/ subfolder or similar
    else if ( (link.getAttribute('href') === '/contacto' || link.getAttribute('href') === 'contacto.html' || link.getAttribute('href') === '/contacto/') && (normalizedCurrentPathname.includes('/contacto/') || (isAtRoot && (window.location.href.includes('/contacto/') || window.location.pathname.includes('index.html'))) ) ) {
         link.classList.add('active');
    }
    // General case for other links
    else if (linkHref !== '/' && normalizedCurrentPathname.startsWith(linkHref)) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
  });
  
  // Make sure 'Contacto' is active on the main page, assuming index.html is the contact page.
  if (isAtRoot) {
      desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === '/contacto' || link.getAttribute('href') === 'contacto.html' || link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '/') {
              link.classList.add('active');
          }
      });
  }


  // Update footer year
  const yearSpan = document.querySelector('footer .footer-bottom p:nth-of-type(1)'); // Adjusted selector, copyright is usually first
  if (yearSpan && yearSpan.textContent.includes('©')) {
      yearSpan.innerHTML = `&copy; ${new Date().getFullYear()} InSight Psicología. Todos los derechos reservados.`;
  }

});
