<!-- src/lib/components/FontResizer.svelte -->
<script>
    // Scale steps in percentage: 90% (Small), 100% (Normal), 115% (Large), 130% (XL)
    let fontScale = $state(100);

    function setScale(newScale) {
        fontScale = newScale;
        // Update root font-size dynamically
        document.documentElement.style.setProperty('--text-scale', `${fontScale}%`);
    }
</script>

<div class="font-controls">
    <button 
        class:active={fontScale === 90} 
        onclick={() => setScale(90)} 
        aria-label="Small text"
    >
        A-
    </button>
    <button 
        class:active={fontScale === 100} 
        onclick={() => setScale(100)} 
        aria-label="Normal text"
    >
        A
    </button>
    <button 
        class:active={fontScale === 115} 
        onclick={() => setScale(115)} 
        aria-label="Large text"
    >
        A+
    </button>
</div>

<style>
    .font-controls {
        display: inline-flex;
        gap: 0.5rem;
        padding: 0.25rem;
        background-color: var(--paper-cover);
        border-radius: 8px;
    }

    button {
        background: transparent;
        border: none;
        color: var(--ink-faded);
        font-family: inherit;
        font-weight: bold;
        padding: 0.25rem 0.6rem;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.2s ease;
    }

    button:hover {
        color: var(--ink-black);
    }

    button.active {
        background-color: var(--paper-page);
        color: var(--leather-binding);
        box-shadow: 0 2px 4px rgb(from var(--ink-faded) r g b / 15%);
    }
</style>