// js/popup.js
// Minimal, namespaced popup that shows on index and lander without breaking Bootstrap
(function () {
  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const path = (location.pathname || '').toLowerCase();
    const last = path.split('/').filter(Boolean).pop() || ''; // last segment ('' for folder index)

    // Show only on home ("/" or index.html) and lander.html
    const isHome   = last === '' || last === 'index.html';
    const isLander = /lander\.html$/.test(last);

    if (!isHome && !isLander) return;

    // Build namespaced popup (no Bootstrap conflict)
    const bd = document.createElement('div');
    bd.className = 'ttf-backdrop';
    bd.innerHTML = `
      <div class="ttf-modal" role="dialog" aria-modal="true" aria-live="assertive">
        <button class="close-btn" aria-label="Close">×</button>
        <h3 style="margin:0 28px 8px 0">Policy Notice</h3>
        <p>Are you accepting our policy to play the game? This notice is informational and does not block access.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">
          <button class="btn" id="ttf-yes">Yes, Accept</button>
          <button class="btn ghost" id="ttf-no">Close</button>
        </div>
      </div>
    `;

    document.body.appendChild(bd);

    // Close behavior (just close — same as your current code)
    function closeGate() {
      try { bd.remove(); } catch {}
    }

    // Wire events
    bd.querySelector('#ttf-yes').addEventListener('click', closeGate);
    bd.querySelector('#ttf-no').addEventListener('click', closeGate);
    bd.querySelector('.close-btn').addEventListener('click', closeGate);
    // close when clicking outside
    bd.addEventListener('click', (e) => { if (e.target === bd) closeGate(); });
    // close on ESC
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeGate(); });
  }
})();
