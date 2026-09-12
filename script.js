/* ==========================================================================
   ANIMATION HUB - 3D ANIMATION ACADEMY
   Interactive Application Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Animation Hub Engine Initialized.');
});

/**
 * Scroll Roadmap Track Left/Right
 * @param {number} direction - -1 (left) | 1 (right)
 */
function scrollRoadmap(direction) {
  const track = document.getElementById('roadmap-scroll-track');
  if (track) {
    const scrollAmount = 360 * direction;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

/**
 * Single Page View Switcher & Navigation Handling
 * @param {string} tabName - 'home' | 'programs' | 'showcase' | 'about'
 * @param {string} [scrollTargetId] - Optional section ID to scroll to after switching
 */
function switchTab(tabName, scrollTargetId) {
  // Hide all page views
  const views = document.querySelectorAll('.page-view');
  views.forEach(view => view.classList.remove('active'));

  // Show target page view
  const targetView = document.getElementById(`${tabName}-view`);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Update active state in header navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('data-tab') === tabName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Scroll to top or target section
  if (scrollTargetId) {
    setTimeout(() => {
      const element = document.getElementById(scrollTargetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * Mobile Drawer Menu Toggle
 */
function toggleMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.toggle('open');
    overlay.classList.toggle('open');
  }
}

/**
 * Apply Now Modal Controller
 * @param {string} [presetTrack] - Optional track to pre-select in dropdown
 * @param {boolean} [precheckSponsorship] - Optional flag to pre-check sponsorship
 */
function openApplyModal(presetTrack, precheckSponsorship) {
  const modal = document.getElementById('application-modal');
  const step1 = document.getElementById('modal-step-1');
  const step2 = document.getElementById('modal-step-2');
  const trackSelect = document.getElementById('desired-track');
  const sponsorshipCheck = document.getElementById('sponsorship-request');

  if (modal) {
    // Reset steps
    step1.style.display = 'block';
    step2.style.display = 'none';

    // Pre-fill fields if requested
    if (presetTrack && trackSelect) {
      trackSelect.value = presetTrack;
    }
    if (precheckSponsorship !== undefined && sponsorshipCheck) {
      sponsorshipCheck.checked = precheckSponsorship;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }
}

/**
 * Close Application Modal
 */
function closeApplyModal() {
  const modal = document.getElementById('application-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

/**
 * Backdrop click close handler
 */
function handleBackdropClick(event) {
  if (event.target.id === 'application-modal') {
    closeApplyModal();
  }
}

/**
 * Form Submission & Step 2 Transition Handler
 */
function handleFormSubmit(event) {
  event.preventDefault();

  const fullName = document.getElementById('full-name').value.trim();
  const email = document.getElementById('email-address').value.trim();
  const track = document.getElementById('desired-track').value;
  const sponsorshipChecked = document.getElementById('sponsorship-request').checked;

  // Populate Step 2 Confirmation Data
  document.getElementById('success-applicant-name').textContent = fullName || 'Applicant';
  document.getElementById('success-applicant-email').textContent = email || 'your email';
  document.getElementById('success-track-name').textContent = track || 'Selected Program';

  // Toggle sponsorship evaluation timeline item
  const sponsorshipTimelineItem = document.getElementById('sponsorship-timeline-item');
  if (sponsorshipTimelineItem) {
    sponsorshipTimelineItem.style.display = sponsorshipChecked ? 'flex' : 'none';
  }

  // Smooth Step Transition
  const step1 = document.getElementById('modal-step-1');
  const step2 = document.getElementById('modal-step-2');

  step1.style.opacity = '0';
  setTimeout(() => {
    step1.style.display = 'none';
    step1.style.opacity = '1';
    
    step2.style.display = 'block';
  }, 200);
}

/**
 * Sign In Mock Modal Trigger
 */
function openSignInModal() {
  alert('Portal Sign In feature coming soon for enrolled students!');
}

/**
 * Student Showcase Filtering
 */
function filterShowcase(category, btnElement) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  }

  const items = document.querySelectorAll('.showcase-item');
  items.forEach(item => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

/**
 * Student Asset Detail Modal
 */
function openAssetModal(title, author, track, imgSrc) {
  const modal = document.getElementById('asset-modal');
  const modalImg = document.getElementById('asset-modal-img');
  const modalTitle = document.getElementById('asset-modal-title');
  const modalAuthor = document.getElementById('asset-modal-author');
  const modalTrack = document.getElementById('asset-modal-track');

  if (modal) {
    modalImg.src = imgSrc;
    modalImg.classList.remove('wireframe-active');
    modalTitle.textContent = title;
    modalAuthor.textContent = `Created by ${author} • Industry Student Showcase`;
    modalTrack.textContent = track;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAssetModal() {
  const modal = document.getElementById('asset-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function handleAssetBackdropClick(event) {
  if (event.target.id === 'asset-modal') {
    closeAssetModal();
  }
}

function toggleWireframeMode() {
  const modalImg = document.getElementById('asset-modal-img');
  if (modalImg) {
    modalImg.classList.toggle('wireframe-active');
  }
}

/**
 * Filter 20 Services by Category
 * @param {string} category - 'all' | 'ai' | 'dev' | 'creative' | 'growth' | 'operations'
 * @param {HTMLElement} [chipElement] - Clicked filter chip
 */
function filterServices(category, chipElement) {
  const chips = document.querySelectorAll('.service-filter-chip');
  chips.forEach(chip => chip.classList.remove('active'));
  if (chipElement) {
    chipElement.classList.add('active');
  }

  // Clear search input if category is clicked
  const searchInput = document.getElementById('services-search-input');
  if (searchInput && searchInput.value) {
    searchInput.value = '';
  }

  const cards = document.querySelectorAll('.service-card-item');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  updateServicesEmptyNotice();
}

/**
 * Filter 20 Services by Search Text
 */
function filterServicesBySearch() {
  const searchInput = document.getElementById('services-search-input');
  if (!searchInput) return;
  const query = searchInput.value.toLowerCase().trim();

  // Reset category chips active state to 'all' if typing
  const chips = document.querySelectorAll('.service-filter-chip');
  chips.forEach(chip => {
    if (chip.getAttribute('data-category') === 'all') {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  const cards = document.querySelectorAll('.service-card-item');
  cards.forEach(card => {
    const textContent = card.textContent.toLowerCase();
    if (!query || textContent.includes(query)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  updateServicesEmptyNotice();
}

function updateServicesEmptyNotice() {
  let emptyNotice = document.getElementById('services-empty-notice');
  const cards = document.querySelectorAll('.service-card-item');
  let visibleCount = 0;
  cards.forEach(c => {
    if (c.style.display !== 'none') visibleCount++;
  });

  if (emptyNotice) {
    emptyNotice.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

// Expose functions globally for inline HTML event handlers (ES Module compatibility)
Object.assign(window, {
  scrollRoadmap,
  switchTab,
  toggleMobileDrawer,
  openApplyModal,
  closeApplyModal,
  handleBackdropClick,
  handleFormSubmit,
  filterShowcase,
  openAssetModal,
  closeAssetModal,
  handleAssetBackdropClick,
  toggleWireframeMode,
  filterServices,
  filterServicesBySearch
});
