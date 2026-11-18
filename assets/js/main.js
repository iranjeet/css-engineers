// Main application logic

const SCROLL_REVEAL_THRESHOLD = 100; // pixels from bottom of viewport

// Fetch and render site
async function initSite() {
  try {
    const response = await fetch('content/data.json');
    if (!response.ok) throw new Error('Failed to fetch content');
    const data = await response.json();
    
    renderSite(data);
    setupFeatures();
    
    // Hide loading overlay
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
  } catch (error) {
    console.error('Error loading site:', error);
    document.getElementById('loading-overlay').innerHTML = '<p style="color: #e53e3e; text-align: center;">Error loading content. Please refresh the page.</p>';
  }
}

// Render all site sections
function renderSite(data) {
  setMeta(data.company);
  renderNavigation(data.navigation);
  renderHero(data.company);
  renderAbout(data.about, data.company);
  renderServices(data.services);
  renderProjects(data.projects);
  renderClients(data.clients);
  renderGallery(data.gallery);
  renderSampleReports(data.sampleReports);
  renderWhyUs(data.whyUs);
  renderContact(data.contact);
  renderFooter(data.company, data.footer);
}

// Set page meta data
function setMeta(company) {
  document.title = `${company.shortName} | ${company.tagline}`;
  const faviconLink = document.querySelector('link[rel="icon"]') || document.createElement('link');
  faviconLink.rel = 'icon';
  faviconLink.href = company.favicon;
  if (!document.querySelector('link[rel="icon"]')) document.head.appendChild(faviconLink);
  
  document.getElementById('header-logo-img').src = company.logo;
  document.getElementById('header-company-name').textContent = company.shortName;
}

// Render navigation
function renderNavigation(items) {
  const navList = document.getElementById('nav-list');
  navList.innerHTML = items.map(item => `
    <li><a href="#${item.id}" data-nav="${item.id}">${item.label}</a></li>
  `).join('');
}

// Render hero section
function renderHero(company) {
  document.getElementById('hero-eyebrow').textContent = 'Welcome to';
  document.getElementById('hero-title').textContent = company.name;
  document.getElementById('hero-tagline').textContent = company.tagline;
}

// Render about section
function renderAbout(about, company) {
  const contentDiv = document.getElementById('about-content');
  contentDiv.innerHTML = `
    <p>${about.paragraphs[0]}</p>
    <details class="about-details">
      <summary class="btn btn-primary">
        <span class="read-more-open">Read more about CSS Engineers</span>
        <span class="read-more-close">Show less</span>
      </summary>
      <div class="about-highlights">
        ${about.sections.map(section => `
          <div class="highlight-card">
            <h3>${section.title}</h3>
            ${(section.paragraphs || []).map(p => `<p>${p}</p>`).join('')}
            ${section.items ? `<ul>${section.items.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
          </div>
        `).join('')}
      </div>
    </details>
  `;
  
  const legalDiv = document.getElementById('about-legal');
  legalDiv.innerHTML = `
    <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem; color: #2ba4f0;">Company Information</h3>
    <div class="certification-card">ISO 9001:2015 CERTIFIED</div>
    ${[
      { label: 'Legal Name', value: company.name },
      { label: 'Phone', value: `<a href="tel:${company.phone.replace(/\D/g, '')}">${company.phone}</a>` },
      { label: 'Email', value: `<a href="mailto:${company.email}">${company.email}</a>` },
      { label: 'Registered Office', value: company.registeredOffice }
    ].map(item => `
      <div class="legal-item">
        <span class="legal-label">${item.label}</span>
        <span class="legal-value">${item.value}</span>
      </div>
    `).join('')}
  `;
}

// Render services with images
function renderServices(services) {
  const serviceIcons = {
    survey: '📐',
    geotech: '🔬',
    foundation: '🏗️',
    fieldwork: '🛰️',
    design: '🖥️',
    transmission: '⚡',
    substation: '🔌',
    epc: '🏭',
    stringing: '🔗',
    testing: '✅',
    civil: '🌉',
    'project-mgmt': '📊'
  };
  
  document.getElementById('services-subtitle').textContent = services.subtitle;
  
  const servicesGrid = document.getElementById('services-grid');
  servicesGrid.innerHTML = services.categories.map(cat => {
    const hasImage = cat.image && cat.alt;
    return `
      <div class="service-card scroll-reveal">
        ${hasImage ? `<img src="${cat.image}" alt="${cat.alt}" class="service-image" loading="lazy" onerror="this.style.display='none'">` : ''}
        <div class="service-icon">${serviceIcons[cat.id] || cat.icon}</div>
        <h3>${cat.title}</h3>
        <ul>
          ${cat.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;
  }).join('');
}

// Render projects
function renderProjects(projects) {
  document.getElementById('projects-subtitle').textContent = projects.subtitle;

  const totalProjects = projects.items.length;
  const totalKm = projects.items.reduce((sum, project) => sum + project.km, 0);
  const uniqueClients = new Set(projects.items.map(project => project.client)).size;
  document.getElementById('projects-summary').innerHTML = `
    <div class="project-stat scroll-reveal">
      <div class="project-stat-value">${totalProjects}+</div>
      <div class="project-stat-label">Completed Projects</div>
    </div>
    <div class="project-stat scroll-reveal">
      <div class="project-stat-value">${totalKm}+</div>
      <div class="project-stat-label">Km Surveyed</div>
    </div>
    <div class="project-stat scroll-reveal">
      <div class="project-stat-value">${uniqueClients}</div>
      <div class="project-stat-label">Client Partners</div>
    </div>
  `;

  document.querySelector('#projects-table tbody').innerHTML = projects.items.map(project => `
    <tr>
      <td>${project.no}</td>
      <td>${project.work}</td>
      <td>${project.km}</td>
      <td>${project.client}</td>
    </tr>
  `).join('');
}

// Render clients with logos
function renderClients(clients) {
  document.getElementById('clients-subtitle').textContent = clients.subtitle;
  document.getElementById('clients-grid').innerHTML = clients.items.map((client, index) => {
    if (typeof client === 'string') {
      return `
        <div class="client-card scroll-reveal" style="transition-delay: ${index * 50}ms;">
          <p>${client}</p>
        </div>
      `;
    }

    return `
      <div class="client-card scroll-reveal" style="transition-delay: ${index * 50}ms;">
        <a href="${client.url}" target="_blank" rel="noopener noreferrer" class="client-logo-link">
          <img src="${client.logo}" alt="${client.alt}" class="client-logo" loading="lazy" onerror="this.parentElement.innerHTML='<p>${client.name}</p>'">
        </a>
      </div>
    `;
  }).join('');
}

// Render gallery
function renderGallery(gallery) {
  document.getElementById('gallery-subtitle').textContent = gallery.subtitle;
  
  const galleryGrid = document.getElementById('gallery-grid');
  galleryGrid.innerHTML = gallery.items.map(item => `
    <div class="gallery-item scroll-reveal">
      <img src="${item.image}" alt="${item.alt}" class="gallery-image" loading="lazy" onerror="this.style.display='none'">
      <div class="gallery-title">${item.title}</div>
    </div>
  `).join('');
}

// Render sample reports
function renderSampleReports(reports) {
  document.getElementById('reports-title').textContent = reports.title;
  document.getElementById('reports-subtitle').textContent = reports.subtitle;
  
  const reportsGrid = document.getElementById('reports-grid');
  reportsGrid.innerHTML = reports.items.map(item => `
    <div class="report-card scroll-reveal">
      <img src="${item.image}" alt="${item.alt}" class="report-image" loading="lazy">
      <div class="report-content">
        <h3 class="report-title">${item.title}</h3>
        <p class="report-desc">${item.desc}</p>
      </div>
    </div>
  `).join('');
}

// Generate WhatsApp QR code URL
function generateWhatsAppQRCode(phoneNumber) {
  const whatsappURL = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(whatsappURL)}`;
}

// Render why us
function renderWhyUs(whyUs) {
  document.getElementById('why-us-headline').textContent = whyUs.headline;
  
  const strengthsDiv = document.getElementById('why-us-strengths');
  strengthsDiv.innerHTML = whyUs.strengths.map(strength => `
    <div class="strength-item scroll-reveal">
      <div class="strength-text">${strength}</div>
    </div>
  `).join('');

  document.getElementById('why-us-stats').innerHTML = (whyUs.stats || []).map(stat => `
    <div class="stat-card scroll-reveal">
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}

// Render contact
function renderContact(contact) {
  document.getElementById('contact-subtitle').textContent = contact.subtitle;
  
  const contactInfo = document.getElementById('contact-info');
  const whatsappQRCode = generateWhatsAppQRCode(contact.phone);
  
  contactInfo.innerHTML = `
    <div class="contact-item">
      <div class="contact-icon">📞</div>
      <div class="contact-details">
        <h3>Phone</h3>
        <p><a href="tel:${contact.phone.replace(/\D/g, '')}">${contact.phone}</a></p>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-icon">✉️</div>
      <div class="contact-details">
        <h3>Email</h3>
        <p><a href="mailto:${contact.email}">${contact.email}</a></p>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-icon">📍</div>
      <div class="contact-details">
        <h3>Address</h3>
        <p>${contact.address}</p>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-icon">💬</div>
      <div class="contact-details">
        <h3>WhatsApp</h3>
        <a href="https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer" class="whatsapp-link">Start a conversation</a>
        <div class="whatsapp-qr-container">
          <img src="${whatsappQRCode}" alt="WhatsApp QR Code" class="whatsapp-qr" title="Scan to start WhatsApp conversation" loading="lazy">
          <p class="qr-label">Scan to WhatsApp</p>
        </div>
      </div>
    </div>
  `;
  
  const mapDiv = document.getElementById('contact-map');
  const mapQuery = encodeURIComponent(contact.mapQuery);
  mapDiv.innerHTML = `<iframe src="https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed" allowfullscreen="" loading="lazy"></iframe>`;
  
  const formContainer = document.getElementById('contact-form-container');
  const isFormspree = contact.form && contact.form.type === 'formspree';
  
  if (isFormspree) {
    formContainer.innerHTML = `
      <form class="contact-form" action="${contact.form.action}" method="POST">
        <div class="form-group">
          <label for="name">Name *</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email *</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="message">Message *</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Send Message</button>
      </form>
    `;
  } else {
    formContainer.innerHTML = `
      <form class="contact-form" onsubmit="return handleMailtoForm(event, '${contact.email}')">
        <div class="form-group">
          <label for="name">Name *</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email *</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="message">Message *</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Send Message</button>
      </form>
    `;
  }
}

// Handle mailto form
function handleMailtoForm(e, email) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const userEmail = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  const subject = `New message from ${name}`;
  const body = `Name: ${name}\nEmail: ${userEmail}\n\nMessage:\n${message}`;
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  window.location.href = mailto;
  return false;
}

// Render footer
function renderFooter(company, footer) {
  document.getElementById('footer').innerHTML = `
    <p class="footer-certification">ISO 9001:2015 CERTIFIED</p>
    <p><a href="tel:${company.phone.replace(/\D/g, '')}">${company.phone}</a></p>
    <p>${footer.copyright}</p>
  `;
}

// Setup features
function setupFeatures() {
  setupNavigation();
  setupScrollReveal();
  setupHeaderScroll();
}

// Setup navigation
function setupNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  const navLinks = document.querySelectorAll('.nav-list a');
  
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
    });
  });
  
  // Update active nav on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-nav') === current) {
        link.classList.add('active');
      }
    });
  });
}

// Setup scroll reveal
function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: `0px 0px -${SCROLL_REVEAL_THRESHOLD}px 0px`
  });
  
  revealElements.forEach(el => observer.observe(el));
}

// Setup header scroll effect
function setupHeaderScroll() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSite);
} else {
  initSite();
}
