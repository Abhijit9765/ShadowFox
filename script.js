// Mark JS as enabled for CSS gating
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for on-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetSelector = this.getAttribute('href');
      if (!targetSelector || targetSelector === '#') return; // ignore empty hashes
      const target = document.querySelector(targetSelector);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Handle the "Download Resume" button click (guarded)
  const resumeBtn = document.getElementById('download-resume-button');
  if (resumeBtn) {
    const resumeUrl = 'https://drive.google.com/file/d/1CLOwuBWdR_Usm6OsjmyJRtekTGdBsUV-/view?usp=drivesdk';
    resumeBtn.addEventListener('click', () => {
      window.open(resumeUrl, '_blank');
    });
  }

  // Simple form submission handler (safe if #form-message is missing)
  const contactForm = document.getElementById('contact-form');
  let formMessage = document.getElementById('form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!formMessage) {
        // create a message box if it doesn't exist in the HTML
        formMessage = document.createElement('div');
        formMessage.id = 'form-message';
        formMessage.className = 'mt-4 text-center';
        contactForm.insertAdjacentElement('afterend', formMessage);
      }

      formMessage.classList.remove('hidden');
      formMessage.innerHTML = `
        <div class="bg-green-500 text-white p-4 rounded-lg">
          Thank you! Your message has been sent.
        </div>
      `;
      contactForm.reset();
    });
  }

  // Scroll-based fade-in animation (with fallback)
  const sections = document.querySelectorAll('.fade-in-section');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
  } else {
    // Fallback for older browsers: show all sections immediately
    sections.forEach(section => section.classList.add('is-visible'));
  }
});
