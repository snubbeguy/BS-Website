interface Bike {
  slug: string;
  page: string;
  title: string;
  heroLabel: string;
  productName: string;
  price: string;
  cardPrice: string;
  shortDescription: string;
  description: string;
  specs: [string, string][];
  image: string;
  alt: string;
  accentClass: string;
  buyMessage: string;
}

const catalog: Bike[] = [
  {
    slug: "mens",
    page: "mens.html",
    title: "Mens Bikes",
    heroLabel: "Mens collection",
    productName: "Signal One",
    price: "13 900 SEK",
    cardPrice: "From 13 900 SEK",
    shortDescription: "Light, direct and ready for everyday speed across town and beyond it.",
    description:
      "Signal One is a premium hybrid with a calm matte graphite frame, all-road comfort and enough pace for longer daily routes. It is the bike for riders who want one composed machine that feels quick without getting fussy.",
    specs: [
      ["Frame", "Matte graphite alloy"],
      ["Ride feel", "Fast urban hybrid"],
      ["Best for", "Commutes and weekend distance"],
      ["Setup", "Hydraulic discs and 11-speed drive"],
    ],
    image: "assets/mens-bike.png",
    alt: "Matte graphite men's city hybrid bicycle with tan sidewall tires in a bright Scandinavian studio.",
    accentClass: "large",
    buyMessage:
      "We will hold this bike for 48 hours, confirm sizing by email, and finish setup before collection.",
  },
  {
    slug: "womens",
    page: "womens.html",
    title: "Womens Bikes",
    heroLabel: "Womens collection",
    productName: "Mora Step",
    price: "12 400 SEK",
    cardPrice: "From 12 400 SEK",
    shortDescription: "An elegant commuter built for upright comfort, easy starts and calm daily miles.",
    description:
      "Mora Step pairs a gentle step-through silhouette with a practical rear rack, soft-touch contact points and a smooth upright ride. It is designed to feel welcoming on short errands and beautiful on longer city loops.",
    specs: [
      ["Frame", "Muted sage step-through steel"],
      ["Ride feel", "Comfort-led city commuter"],
      ["Best for", "Daily errands and upright riding"],
      ["Setup", "Integrated lights and rear rack"],
    ],
    image: "assets/womens-bike.png",
    alt: "Muted sage women's step-through commuter bicycle with rear rack in a pale studio.",
    accentClass: "small",
    buyMessage:
      "Reserve online and we will follow up with frame notes, pickup timing and optional basket fitting.",
  },
  {
    slug: "childrens",
    page: "childrens.html",
    title: "Childrens Bikes",
    heroLabel: "Childrens collection",
    productName: "Small Horizon",
    price: "6 200 SEK",
    cardPrice: "From 6 200 SEK",
    shortDescription: "A sturdy youth bike with simple gearing and proportions that still feel special.",
    description:
      "Small Horizon is sized for growing riders who want a real bike, not a toy. The geometry stays confidence-building, the components stay durable, and the whole thing still feels polished enough to become a favourite quickly.",
    specs: [
      ["Frame", "Soft coral youth alloy"],
      ["Ride feel", "Steady and confidence-building"],
      ["Best for", "School routes and weekend rides"],
      ["Setup", "Protective chain guard and lights"],
    ],
    image: "assets/childrens-bike.png",
    alt: "Coral children's bicycle with realistic youth proportions in a bright Scandinavian studio.",
    accentClass: "small",
    buyMessage:
      "We can help match rider height before pickup and adjust bars and saddle for the first ride home.",
  },
  {
    slug: "electric",
    page: "electric.html",
    title: "Electric Bikes",
    heroLabel: "Electric collection",
    productName: "North Current",
    price: "27 900 SEK",
    cardPrice: "From 27 900 SEK",
    shortDescription: "Effortless support, long-range commuting and a clean step-through silhouette.",
    description:
      "North Current is our quiet electric workhorse: integrated battery, smooth assistance and a shape that stays approachable even when fully loaded. It is designed for longer commutes, hilly routes and carrying a bit more life with you.",
    specs: [
      ["Frame", "Forest green electric step-through"],
      ["Ride feel", "Smooth assisted commuter"],
      ["Best for", "Longer urban routes and carrying loads"],
      ["Setup", "Integrated motor, lights and rack"],
    ],
    image: "assets/electric-bike.png",
    alt: "Forest green electric commuter bicycle with integrated battery and rear rack in a bright studio.",
    accentClass: "large",
    buyMessage:
      "Reserve your electric bike and we will confirm battery range guidance, charging care and pickup timing.",
  },
];

const page = document.body.dataset.page;

function currencySummary(): string[] {
  return ["Pickup ready in 48 hours", "30 day returns", "Free service check in 90 days"];
}

function renderHome(): void {
  const grid = document.getElementById("category-grid") as HTMLElement;
  const featuredImage = document.getElementById("featured-image") as HTMLImageElement;
  const featuredDescription = document.getElementById("featured-description") as HTMLElement;
  const featuredMeta = document.getElementById("featured-meta") as HTMLElement;
  const featuredLink = document.getElementById("featured-link") as HTMLAnchorElement;
  const featuredVisual = document.getElementById("featured-visual") as HTMLAnchorElement;
  const featured = catalog[0];

  grid.innerHTML = catalog
    .map(
      (bike) => `
        <a class="category-card ${bike.accentClass}" href="${bike.page}" aria-label="Shop ${bike.title}">
          <img src="${bike.image}" alt="${bike.alt}" />
          <div class="card-copy">
            <p class="mini-label">${bike.heroLabel}</p>
            <h3>${bike.title}</h3>
            <p>${bike.shortDescription}</p>
            <span class="card-price">${bike.cardPrice}</span>
            <span class="card-link">View bikes <span aria-hidden="true">→</span></span>
          </div>
        </a>
      `
    )
    .join("");

  featuredImage.src = featured.image;
  featuredImage.alt = featured.alt;
  featuredDescription.textContent = featured.description;
  featuredMeta.innerHTML = featured.specs
    .slice(0, 3)
    .map((item) => `<span>${item[1]}</span>`)
    .join("");
  featuredLink.href = featured.page;
  featuredVisual.href = featured.page;
}

function renderCategoryPage(): void {
  const slug = document.body.dataset.category as string;
  const bike = catalog.find((item) => item.slug === slug) as Bike;
  const others = catalog.filter((item) => item.slug !== slug);
  const root = document.getElementById("category-page-root") as HTMLElement;

  root.innerHTML = `
    <div class="category-page">
      <section class="category-hero reveal">
        <div class="breadcrumbs">
          <a href="index.html">Home</a>
          <span>/</span>
          <span>${bike.title}</span>
        </div>
        <p class="eyebrow">${bike.heroLabel}</p>
        <h1>${bike.productName}</h1>
      </section>

      <section class="detail-band reveal" aria-labelledby="detail-heading">
        <button class="detail-visual" id="detail-image-trigger" aria-label="Open larger image of ${bike.productName}">
          <img src="${bike.image}" alt="${bike.alt}" />
          <span class="zoom-chip">Open image</span>
        </button>
        <div class="detail-copy">
          <p class="eyebrow" id="detail-heading">${bike.title}</p>
          <h2>${bike.shortDescription}</h2>
          <p>${bike.description}</p>
          <p class="detail-price">${bike.price}</p>
          <div class="detail-actions">
            <button class="button button-dark" id="buy-trigger" type="button">Buy this bike</button>
            <a class="button button-ghost" href="index.html#categories">Back to categories</a>
          </div>
          <dl class="spec-list">
            ${bike.specs
              .map(
                ([label, value]) => `
                  <div>
                    <dt>${label}</dt>
                    <dd>${value}</dd>
                  </div>
                `
              )
              .join("")}
          </dl>
          <div class="buy-message">
            <p>${bike.buyMessage}</p>
          </div>
        </div>
      </section>

      <section class="category-switcher reveal" aria-labelledby="switcher-heading">
        <p class="eyebrow" id="switcher-heading">Explore other categories</p>
        <nav class="category-switcher-nav">
          ${catalog
            .map(
              (item) => `
                <a class="${item.slug === bike.slug ? "current" : ""}" href="${item.page}" ${
                  item.slug === bike.slug ? 'aria-current="page"' : ""
                }>${item.title}</a>
              `
            )
            .join("")}
        </nav>
      </section>

      <section class="related-band reveal" aria-labelledby="related-heading">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Continue browsing</p>
            <h2 id="related-heading">More from goffel.</h2>
          </div>
        </div>
        <div class="related-grid">
          ${others
            .map(
              (item) => `
                <article class="related-card">
                  <img src="${item.image}" alt="${item.alt}" />
                  <div class="related-copy">
                    <p class="mini-label">${item.title}</p>
                    <h3>${item.productName}</h3>
                    <p>${item.shortDescription}</p>
                    <a href="${item.page}">View category</a>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    </div>

    <div class="dialog-backdrop" id="buy-dialog" hidden>
      <div class="dialog-panel" role="dialog" aria-modal="true" aria-labelledby="buy-dialog-title">
        <p class="eyebrow">Reserve bike</p>
        <h3 id="buy-dialog-title">${bike.productName}</h3>
        <p>
          ${bike.buyMessage}
          We will also send sizing help and a short pickup checklist once your reservation is placed.
        </p>
        <div class="dialog-actions">
          <button class="button button-ghost" type="button" data-close-dialog>Close</button>
          <a class="button button-dark" href="mailto:hello@goffel.example?subject=Reserve%20${encodeURIComponent(
            bike.productName
          )}">Continue</a>
        </div>
      </div>
    </div>

    <div class="dialog-backdrop" id="lightbox-dialog" hidden>
      <div class="dialog-panel lightbox-panel" role="dialog" aria-modal="true" aria-label="Bike image preview">
        <img src="${bike.image}" alt="${bike.alt}" />
        <div class="dialog-actions">
          <button class="button button-ghost" type="button" data-close-lightbox>Close image</button>
        </div>
      </div>
    </div>
  `;

  wireDialogs();
}

function wireDialogs(): void {
  const buyDialog = document.getElementById("buy-dialog") as HTMLElement;
  const lightboxDialog = document.getElementById("lightbox-dialog") as HTMLElement;
  const buyTrigger = document.getElementById("buy-trigger") as HTMLButtonElement;
  const imageTrigger = document.getElementById("detail-image-trigger") as HTMLButtonElement;

  buyTrigger?.addEventListener("click", () => openDialog(buyDialog));
  imageTrigger?.addEventListener("click", () => openDialog(lightboxDialog));

  buyDialog?.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target === buyDialog || target.hasAttribute("data-close-dialog")) {
      closeDialog(buyDialog);
    }
  });

  lightboxDialog?.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target === lightboxDialog || target.hasAttribute("data-close-lightbox")) {
      closeDialog(lightboxDialog);
    }
  });

  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeDialog(buyDialog);
      closeDialog(lightboxDialog);
    }
  });
}

function openDialog(dialog: HTMLElement): void {
  if (!dialog) return;
  dialog.hidden = false;
  const interactive = dialog.querySelector("button, a") as HTMLElement;
  interactive?.focus();
}

function closeDialog(dialog: HTMLElement): void {
  if (!dialog) return;
  dialog.hidden = true;
}

function initReveal(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function primeFooterMeta(): void {
  const footer = document.querySelector(".site-footer") as HTMLElement;
  if (!footer) return;
  footer.dataset.meta = currencySummary().join(" | ");
}

if (page === "home") {
  renderHome();
}

if (page === "category") {
  renderCategoryPage();
}

primeFooterMeta();
initReveal();
