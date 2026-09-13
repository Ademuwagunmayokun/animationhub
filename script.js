/* ==========================================================================
   ANIMATION HUB - 3D ANIMATION ENGINE & INTERACTIVE CONTROLLER
   ========================================================================== */

import { initThreeScene, toggle3DWireframe, pulse3DShockwave } from './three-scene.js';

let conveyorPaused = false;
let currentSpeed = 1;

document.addEventListener('DOMContentLoaded', () => {
  console.log('Animation Hub 3D Creative Engine Initialized.');

  // Initialize Three.js 3D Viewport
  setTimeout(() => {
    initThreeScene('three-hero-canvas-container');
  }, 100);
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
 * @param {string} tabName - 'home' | 'services' | 'programs' | 'showcase' | 'about'
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
 * Apply Now / Request Service Modal Controller
 * @param {string} [presetTrack] - Optional track to pre-select in dropdown
 * @param {boolean} [precheckSponsorship] - Optional flag to pre-check sponsorship
 */
function openApplyModal(presetTrack, precheckSponsorship) {
  const modal = document.getElementById('application-modal');
  const step1 = document.getElementById('modal-step-1');
  const step2 = document.getElementById('modal-step-2');
  const trackSelect = document.getElementById('desired-track');

  if (modal) {
    // Reset steps
    step1.style.display = 'block';
    step2.style.display = 'none';

    // Pre-fill fields if requested
    if (presetTrack && trackSelect) {
      trackSelect.value = presetTrack;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
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

  // Populate Step 2 Confirmation Data
  document.getElementById('success-applicant-name').textContent = fullName || 'Client';
  document.getElementById('success-applicant-email').textContent = email || 'your email';
  document.getElementById('success-track-name').textContent = track || 'Selected Service';

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
 * Student Showcase Filtering
 */
function filterShowcase(category, btnElement) {
  const filterBtns = document.querySelectorAll('.showcase-filters .filter-pill');
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

  if (modal) {
    modalImg.src = imgSrc;
    modalImg.classList.remove('wireframe-active');
    modalTitle.textContent = title;
    modalAuthor.textContent = `Created by ${author} • Industry Student Showcase`;

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

/* ==========================================================================
   DRY CLEANING HANGING WIRE CONVEYOR ENGINE (20 Services)
   ========================================================================== */

/**
 * Filter Services on the Dry Cleaning Hanging Wire Carousel
 * @param {string} category - 'all' | 'ai' | 'dev' | 'creative' | 'growth' | 'operations'
 * @param {HTMLElement} [chipElement] - Clicked filter chip
 */
function filterServices(category, chipElement) {
  const chips = document.querySelectorAll('.service-filter-chip');
  chips.forEach(chip => chip.classList.remove('active'));
  if (chipElement) {
    chipElement.classList.add('active');
  }

  const searchInput = document.getElementById('services-search-input');
  if (searchInput && searchInput.value) {
    searchInput.value = '';
  }

  const assemblies = document.querySelectorAll('.dryclean-hanger-assembly');
  let matchCount = 0;

  assemblies.forEach(assembly => {
    const cardCat = assembly.getAttribute('data-category');
    const isMatch = (category === 'all' || cardCat === category);

    if (isMatch) {
      assembly.classList.remove('conveyor-dimmed');
      assembly.classList.add('conveyor-highlighted');
      matchCount++;
    } else {
      assembly.classList.add('conveyor-dimmed');
      assembly.classList.remove('conveyor-highlighted');
    }
  });

  // If filtered to a specific category, scroll conveyor into first match
  if (category !== 'all') {
    const firstMatch = document.querySelector(`.dryclean-hanger-assembly[data-category="${category}"]`);
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  updateServicesEmptyNotice(matchCount);
}

/**
 * Real-time Search Across Hanging Services
 */
function filterServicesBySearch() {
  const searchInput = document.getElementById('services-search-input');
  if (!searchInput) return;
  const query = searchInput.value.toLowerCase().trim();

  // Reset category chips
  const chips = document.querySelectorAll('.service-filter-chip');
  chips.forEach(chip => {
    if (chip.getAttribute('data-category') === 'all') {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  const assemblies = document.querySelectorAll('.dryclean-hanger-assembly');
  let matchCount = 0;

  assemblies.forEach(assembly => {
    const text = assembly.textContent.toLowerCase();
    const isMatch = !query || text.includes(query);

    if (isMatch) {
      assembly.classList.remove('conveyor-dimmed');
      assembly.classList.add('conveyor-highlighted');
      matchCount++;
    } else {
      assembly.classList.add('conveyor-dimmed');
      assembly.classList.remove('conveyor-highlighted');
    }
  });

  updateServicesEmptyNotice(matchCount);
}

function updateServicesEmptyNotice(count) {
  const emptyNotice = document.getElementById('services-empty-notice');
  if (emptyNotice) {
    emptyNotice.style.display = (count === 0) ? 'block' : 'none';
  }
}

/**
 * Toggle Conveyor Automated Scroll Play/Pause
 */
function toggleConveyorPause(btn) {
  conveyorPaused = !conveyorPaused;
  const conveyorTrack = document.getElementById('dryclean-conveyor-track');
  const statusIndicator = document.getElementById('conveyor-status-indicator');

  if (conveyorTrack) {
    conveyorTrack.style.animationPlayState = conveyorPaused ? 'paused' : 'running';
  }

  if (btn) {
    btn.innerHTML = conveyorPaused 
      ? '<span class="status-dot paused"></span> ▶ RESUME RACK' 
      : '<span class="status-dot active"></span> ⏸ PAUSE RACK';
  }

  if (statusIndicator) {
    statusIndicator.textContent = conveyorPaused ? 'CAROUSEL PAUSED' : 'CONVEYOR IN MOTION';
    statusIndicator.className = conveyorPaused ? 'status-pill paused' : 'status-pill active';
  }
}

/**
 * Conveyor Speed Adjuster
 * @param {number} speedMultiplier - 0.5 (slow) | 1 (normal) | 2 (fast)
 */
function setConveyorSpeed(speedMultiplier, btn) {
  currentSpeed = speedMultiplier;
  const conveyorTrack = document.getElementById('dryclean-conveyor-track');
  
  if (conveyorTrack) {
    const baseDuration = 65; // seconds
    conveyorTrack.style.animationDuration = (baseDuration / speedMultiplier) + 's';
  }

  const speedBtns = document.querySelectorAll('.speed-control-btn');
  speedBtns.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
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
  filterServicesBySearch,
  toggleConveyorPause,
  setConveyorSpeed,
  toggle3DWireframe,
  pulse3DShockwave
});
