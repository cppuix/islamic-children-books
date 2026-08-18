<!-- src/routes/+page.svelte -->
<script>
  import WaxSeal from '$lib/components/WaxSeal.svelte';
</script>

<main class="hero-layout">
  <!-- Left Side: Unframed Crest Anchor -->
  <aside class="seal-anchor">
    <WaxSeal size="10rem" />
    <span class="seal-label">ARCHIVAL LIBRARY</span>
  </aside>

  <!-- Right Side: Floating Editorial Hero -->
  <article class="hero-content">
    <span class="edition-tag">FOR PARENTS & TEACHERS</span>

    <h1 class="main-title">
      Islamic Children’s <br />
      <span class="title-accent">Books</span>
    </h1>

    <p class="tagline">
      A quiet, hand-picked collection of stories, faith, and wonder for growing minds.
    </p>

    <!-- Call to Action -->
    <div class="cta-group">
      <a class="cta-primary" href="/library">
        <span>Open the Book</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>

      <a class="cta-secondary" href="/about">
        Our Philosophy
      </a>
    </div>

    <!-- Minimalist Featured Item -->
    <div class="spotlight-link">
      <span class="spotlight-label">CURATOR’S PICK</span>
      <a href="/book/golden-lantern" class="spotlight-text">
        <span class="book-name">The Boy & The Golden Lantern</span>
        <span class="dot">•</span>
        <span class="book-meta">Bedtime Story, Ages 4–8</span>
        <span class="arrow">→</span>
      </a>
    </div>
  </article>
</main>

<style>
  /* Layout: Centered & Unboxed */
  .hero-layout {
    width: 100%;
    padding-top: 3rem;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
    color: #0f513d;
  }

  @media (min-width: 768px) {
    .hero-layout {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      gap: 2rem;
    }
  }

  /* Left Anchor */
  .seal-anchor {
    background-color: red;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    flex-shrink: 0;
  }

  @media (min-width: 768px) {
    .seal-anchor {
      position: sticky;
      top: 6rem;
      align-items: flex-start;
      display: flex;
      width: 38%;
    }
  }

  #seal
  {
    margin-left: 50%;
    margin-right: 50%;
  }

  .seal-label {
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    color: #b98a2e;
    text-transform: uppercase;
  }

  /* Right Content */
  .hero-content {
    max-width: 580px;
  }

  .edition-tag {
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    color: #b98a2e;
    display: block;
    margin-bottom: 1.25rem;
  }

  .main-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(2.4rem, 4.5vw, 3.8rem);
    font-weight: 600;
    line-height: 1.1;
    margin: 0 0 1.5rem 0;
    color: #0d382a;
    letter-spacing: -0.01em;
  }

  .title-accent {
    color: #b98a2e;
    font-style: italic;
  }

  .tagline {
    font-family: 'Playpen Sans', sans-serif;
    font-size: 1.15rem;
    line-height: 1.6;
    margin: 0 0 2.5rem 0;
    opacity: 0.85;
    max-width: 480px;
  }

  /* Buttons */
  .cta-group {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 3.5rem;
  }

  .cta-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.85rem 1.8rem;
    background: #0f513d;
    color: #f4ede0;
    font-family: 'Cinzel', serif;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 2px;
    box-shadow: 0 4px 14px rgba(15, 81, 61, 0.18);
    transition: transform 0.2s ease, background 0.2s ease;
  }

  .cta-primary:hover {
    background: #0a3a2b;
    transform: translateY(-2px);
  }

  .cta-secondary {
    color: #0f513d;
    font-family: 'Cinzel', serif;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-decoration: none;
    opacity: 0.75;
    transition: opacity 0.2s ease;
  }

  .cta-secondary:hover {
    opacity: 1;
  }

  /* Inline Spotlight Link */
  .spotlight-link {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .spotlight-label {
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    color: #b98a2e;
  }

  .spotlight-text {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: inherit;
    font-size: 0.92rem;
    transition: color 0.2s ease;
  }

  .spotlight-text:hover {
    color: #b98a2e;
  }

  .book-name {
    font-family: 'Cinzel', serif;
    font-weight: 600;
  }

  .dot {
    opacity: 0.4;
  }

  .book-meta {
    font-family: 'Playpen Sans', sans-serif;
    font-size: 0.85rem;
    opacity: 0.75;
  }

  .arrow {
    font-family: system-ui;
    transition: transform 0.2s ease;
  }

  .spotlight-text:hover .arrow {
    transform: translateX(4px);
  }
</style>