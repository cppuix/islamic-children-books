<!-- src/lib/components/WaxSeal.svelte -->
<script>
  let {
    sealColor = 'var(--ribbon-green, #0f513d)',
    textColor = 'var(--paper-page, #f4ede0)',
    size = '2.8rem',
    href = '/',
    ...restProps
  } = $props();

  const filterId = `wax-drop-${Math.random().toString(36).substring(2, 9)}`;
  const goldGradId = `gold-grad-${Math.random().toString(36).substring(2, 9)}`;
</script>

<a 
  {href} 
  aria-label="Home" 
  class="wax-seal-link"
  style="display: inline-flex; height: {size}; width: auto;"
  {...restProps}
>
  <svg
    viewBox="28.6 56.3 160 160"
    style="height: 100%; width: auto; overflow: visible;"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id={filterId} x="-10%" y="-10%" width="125%" height="135%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="black" flood-opacity="0.25" />
      </filter>

      <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F3E5AB" />
        <stop offset="50%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#AA7C11" />
      </linearGradient>
    </defs>

    <path
      fill={sealColor}
      filter="url(#{filterId})"
      d="m 114.04,73.94 c -8.27,-0.03 -17.78,3.75 -23.12,6.56 -3.75,1.97 -16.91,9.85 -28.20,12.03 -14.56,2.81 -22.98,16.83 -14.44,23.85 14.20,11.66 14.69,26.78 4.19,37.88 -11.59,12.25 0.30,29.94 16.89,27.94 16.58,-1.99 23.57,0.14 32.02,8.58 10.95,10.94 34.78,6.55 40.63,-8.62 2.71,-7.04 6.43,-14.91 15.50,-18.14 10.66,-3.79 13.84,-15.70 6.93,-23.97 -5.12,-6.13 -5.71,-12.48 1.28,-25.25 5.75,-10.49 1.23,-22.17 -14.80,-21.28 -11.90,0.66 -17.04,-7.26 -25.70,-15.70 -2.87,-2.79 -6.86,-3.86 -11.19,-3.87 z"
    />

    <circle cx="108.6" cy="136.3" r="41" fill="#000000" fill-opacity="0.22" />

    <circle
      cx="108.6"
      cy="136.3"
      r="41"
      fill="none"
      stroke="url(#{goldGradId})"
      stroke-width="1.8"
      opacity="0.85"
    />

    <text
      x="108.6"
      y="140"
      text-anchor="middle"
      dominant-baseline="central"
      font-family="'Playpen Sans Arabic', 'Playpen Sans', cursive, sans-serif"
      font-weight="800"
      font-size="32"
      fill={textColor}
      letter-spacing="-1"
    >ICB</text>
  </svg>
</a>

<style>
  .wax-seal-link {
    transition: transform 0.2s ease, filter 0.2s ease;
    text-decoration: none;
  }
  .wax-seal-link:hover {
    transform: scale(1.05);
  }
  .wax-seal-link:active {
    transform: scale(0.97);
  }
</style>