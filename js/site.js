/**
 * Merlin Life Care — Modern Vanilla Frontend Script
 * Zero dependencies, high performance, accessible
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Scrim & Shadow
  const navbar = document.querySelector('[data-nav]');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('shadow-sm', 'border-b', 'border-slate-200/60');
      } else {
        navbar.classList.remove('shadow-sm', 'border-b', 'border-slate-200/60');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden', !isExpanded);
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  }

  // 3. Products Catalog Instant Search & Category Filter
  const catalogGrid = document.querySelector('[data-catalog-grid]');
  const searchInput = document.querySelector('[data-catalog-search]');
  const filterButtons = document.querySelectorAll('[data-catalog-filter]');
  const emptyState = document.querySelector('[data-catalog-empty]');
  const resultsCount = document.querySelector('[data-catalog-count]');

  if (catalogGrid) {
    const productCards = Array.from(catalogGrid.querySelectorAll('[data-product-card]'));
    let activeCategory = 'all';
    let searchQuery = '';

    const applyFilters = () => {
      let visibleCount = 0;

      productCards.forEach((card) => {
        const name = (card.getAttribute('data-name') || '').toLowerCase();
        const category = (card.getAttribute('data-category') || '').toLowerCase();
        const role = (card.getAttribute('data-role') || '').toLowerCase();
        const text = `${name} ${category} ${role}`;

        const matchesCategory = activeCategory === 'all' || category.includes(activeCategory);
        const matchesSearch = !searchQuery || text.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.classList.remove('hidden');
        } else {
          emptyState.classList.add('hidden');
        }
      }

      if (resultsCount) {
        resultsCount.textContent = `${visibleCount} product${visibleCount === 1 ? '' : 's'}`;
      }
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyFilters();
      });
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => {
          b.classList.remove('bg-merlin', 'text-white', 'border-merlin');
          b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
        });
        btn.classList.add('bg-merlin', 'text-white', 'border-merlin');
        btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

        activeCategory = btn.getAttribute('data-catalog-filter').toLowerCase();
        applyFilters();
      });
    });
  }

  // 4. Back to Top Button
  const backToTopBtn = document.querySelector('[data-back-to-top]');
  if (backToTopBtn) {
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 400) {
          backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
          backToTopBtn.classList.add('opacity-100');
        } else {
          backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
          backToTopBtn.classList.remove('opacity-100');
        }
      },
      { passive: true }
    );

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
