// ---------- Catalogue de base (clavier / souris) ----------
// Modifiez directement les prix ici : le changement s'applique aussitôt
// pour tout le monde, sans mise en cache dans le navigateur des visiteurs.
const DEFAULT_PRODUCTS = [
  { id: 1, slug: 'clavier', name: 'ClicNet Clavier', price: 0 },
  { id: 2, slug: 'souris',  name: 'ClicNet Souris',  price: 0 }
];

function getProducts() {
  return DEFAULT_PRODUCTS.slice();
}

// Combine les produits par défaut (nom, prix, photo) avec les fiches
// détaillées définies dans products-config.js. Un produit peut exister dans
// l'un, l'autre, ou les deux (même "slug" pour les relier).
function getAllProducts() {
  const stored = getProducts();
  const bySlug = new Map(stored.map(p => [p.slug, p]));
  if (typeof PRODUCT_CONFIG !== 'undefined') {
    PRODUCT_CONFIG.forEach(cfg => {
      if (!bySlug.has(cfg.slug)) {
        bySlug.set(cfg.slug, { id: 'cfg-' + cfg.slug, slug: cfg.slug, name: cfg.name, price: cfg.price, photo: cfg.heroPhoto || null, stripeLink: cfg.stripeLink || null });
      } else {
        const existing = bySlug.get(cfg.slug);
        if (!existing.photo && cfg.heroPhoto) existing.photo = cfg.heroPhoto;
        if (!existing.stripeLink && cfg.stripeLink) existing.stripeLink = cfg.stripeLink;
      }
    });
  }
  return Array.from(bySlug.values());
}

// Construit l'URL du lien de paiement Stripe d'un produit, avec la quantité
// choisie (nécessite que "Quantité modifiable" soit activé sur ce lien côté Stripe).
function stripeCheckoutUrl(product, qty) {
  if (!product || !product.stripeLink) return null;
  try {
    const url = new URL(product.stripeLink);
    if (qty && qty > 1) url.searchParams.set('quantity', qty);
    return url.toString();
  } catch (e) {
    return product.stripeLink;
  }
}

// Un produit a-t-il une fiche complète (définie dans products-config.js) ?
function hasDetailPage(slug) {
  return typeof PRODUCT_CONFIG !== 'undefined' && PRODUCT_CONFIG.some(p => p.slug === slug);
}

// Cherche un code promo (défini dans products-config.js) par son code, sans
// tenir compte des majuscules/minuscules ni des espaces autour.
function findPromoCode(code) {
  if (typeof PROMO_CODES === 'undefined' || !code) return null;
  const needle = code.trim().toLowerCase();
  return PROMO_CODES.find(p => p.code.toLowerCase() === needle) || null;
}

// Carte catalogue réutilisée sur l'accueil, la page "Autres produits" et le panier.
// mode "link"   : bouton qui renvoie vers le panier avec le produit pré-rempli
// mode "action" : bouton qui ajoute directement au panier (utilisé sur panier.html)
// Remplace une image cassée par l'emplacement "Photo à venir" (utilisé via onerror)
function handleImgError(imgEl) {
  const div = document.createElement('div');
  div.className = 'stage';
  div.style.aspectRatio = '4/3';
  div.innerHTML = '<span class="stage-tag">Photo à venir</span>';
  imgEl.replaceWith(div);
}

function catalogCardHTML(p, mode) {
  const photo = p.photo
    ? `<img src="${p.photo}" alt="${p.name}" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;" onerror="handleImgError(this)">`
    : `<div class="stage" style="aspect-ratio:4/3;"><span class="stage-tag">Photo à venir</span></div>`;
  const detailLink = hasDetailPage(p.slug)
    ? `<a href="produit.html?slug=${p.slug}" class="btn-text">Voir la fiche</a>`
    : '';
  const addButton = mode === 'action'
    ? `<button type="button" class="btn btn-ghost" onclick="addToCart('${p.slug}')">Ajouter au panier</button>`
    : `<a href="panier.html?add=${p.slug}" class="btn btn-ghost">Ajouter au panier</a>`;
  return `
    <div class="catalog-card">
      ${photo}
      <div>
        <p class="kicker" style="color:var(--accent); font-size:.88rem;">${p.name}</p>
        <p class="price">${p.price} €</p>
      </div>
      ${detailLink}
      ${addButton}
    </div>`;
}

// ---------- Recherche (barre de navigation) ----------
function buildSearchIndex() {
  return getAllProducts().map(p => {
    let href;
    if (p.slug === 'clavier') href = 'clavier.html';
    else if (p.slug === 'souris') href = 'souris.html';
    else if (hasDetailPage(p.slug)) href = `produit.html?slug=${p.slug}`;
    else href = `panier.html?add=${p.slug}`;
    return { name: p.name, price: p.price, href };
  });
}

function setupSearch() {
  const toggle = document.getElementById('searchToggle');
  const panel = document.getElementById('searchPanel');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!toggle || !panel || !input || !results) return;

  const index = buildSearchIndex();

  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) input.focus();
  });

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    const matches = index.filter(item => item.name.toLowerCase().includes(q)).slice(0, 6);
    results.innerHTML = matches.length
      ? matches.map(m => `<a href="${m.href}">${m.name}<span>${m.price} €</span></a>`).join('')
      : '<p class="search-empty">Aucun résultat.</p>';
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !toggle.contains(e.target)) panel.classList.remove('open');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') panel.classList.remove('open');
  });
}
setupSearch();

// Nav background on scroll
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Count-up numbers on scroll into view
const nums = document.querySelectorAll('.num[data-count]');
if (nums.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      if (reduceMotion) {
        el.textContent = target.toLocaleString('fr-FR', {minimumFractionDigits: decimals});
        countObserver.unobserve(el);
        return;
      }
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = value.toLocaleString('fr-FR', {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  nums.forEach(n => countObserver.observe(n));
}

// Subtle tilt on product stages, responds to the pointer
if (!reduceMotion) {
  document.querySelectorAll('[data-tilt]').forEach(stage => {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      stage.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    stage.addEventListener('mouseleave', () => {
      stage.style.transform = 'perspective(700px) rotateY(0) rotateX(0)';
    });
  });
}