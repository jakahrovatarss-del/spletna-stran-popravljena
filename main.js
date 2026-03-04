document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileBtn.classList.toggle('active');
    });
  }

  // Enhanced Dropdown with Hover Gap Tolerance & Keyboard Accessibility
  const dropdowns = document.querySelectorAll('.dropdown');
  let hoverTimeout = null;
  
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    const content = dropdown.querySelector('.dropdown-content');
    const items = content ? content.querySelectorAll('a') : [];
    
    if (link && content) {
      // Set ARIA attributes
      link.setAttribute('role', 'button');
      link.setAttribute('aria-expanded', 'false');
      link.setAttribute('aria-haspopup', 'true');
      link.setAttribute('tabindex', '0');
      
      // Make dropdown items focusable
      items.forEach(item => {
        item.setAttribute('tabindex', '0');
      });
      
      // Desktop: Hover with gap tolerance
      dropdown.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        if (window.innerWidth > 768) {
          dropdown.classList.add('active');
          link.setAttribute('aria-expanded', 'true');
        }
      });
      
      dropdown.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
          hoverTimeout = setTimeout(() => {
            dropdown.classList.remove('active');
            link.setAttribute('aria-expanded', 'false');
          }, 150);
        }
      });
      
      // Mobile: Click toggle
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
          const isExpanded = dropdown.classList.contains('active');
          link.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        }
      });
      
      // Keyboard: Escape to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dropdown.classList.contains('active')) {
          dropdown.classList.remove('active');
          link.setAttribute('aria-expanded', 'false');
          link.focus();
        }
      });
      
      // Keyboard: Arrow Down to focus first item
      link.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' && dropdown.classList.contains('active') && items.length > 0) {
          e.preventDefault();
          items[0].focus();
        }
        // Space or Enter to toggle on mobile
        if ((e.key === ' ' || e.key === 'Enter') && window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
          const isExpanded = dropdown.classList.contains('active');
          link.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        }
      });
      
      // Keyboard: Arrow navigation through items
      items.forEach((item, index) => {
        item.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextItem = items[index + 1];
            if (nextItem) nextItem.focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (index === 0) {
              link.focus();
            } else {
              items[index - 1].focus();
            }
          } else if (e.key === 'Escape') {
            e.preventDefault();
            dropdown.classList.remove('active');
            link.setAttribute('aria-expanded', 'false');
            link.focus();
          }
        });
      });
    }
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        navLinks.classList.remove('active');

        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Enhanced Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document.querySelectorAll('.glass-card, .section-title, .hero-content, .timeline-item, .pricing-card').forEach((el, index) => {
    el.classList.add('fade-in-element');
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Ripple Effect for Buttons
  function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple');

    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(ripple);
  }

  // Add ripple effect to all buttons
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', createRipple);
  });

  // Pricing Card Hover Enhancement
  document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-12px)';
    });

    card.addEventListener('mouseleave', function () {
      if (!this.classList.contains('popular')) {
        this.style.transform = 'translateY(0)';
      } else {
        this.style.transform = 'scale(1.05)';
      }
    });
  });

  // Table Row Highlight Enhancement
  document.querySelectorAll('.solutions-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.02)';
      this.style.transition = 'transform 0.2s ease, background-color 0.2s ease';
    });

    row.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
    });
  });

  // Form Input Floating Labels
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function () {
      this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });

  // Add visible class styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .fade-in-element {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                  transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .fade-in-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }

    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .fade-in-element {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      
      .ripple {
        display: none;
      }
    }
  `;
  document.head.appendChild(style);

  // FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});
