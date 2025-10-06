(function(){
  const path = window.location.pathname;
  const isHome = /(^\/$|index\.html$)/.test(path);
  if(!isHome) return;
 
  const bd = document.createElement('div');
  bd.className = 'modal-backdrop';
  bd.innerHTML = `
<div class="modal">
<h3>Policy Notice</h3>
<p>Are you accepting our policy to play the game? This notice is informational and does not block access.</p>
<div style="display:flex;gap:10px;flex-wrap:wrap">
<button class="btn" id="age-yes">Yes, Accept</button>
<button class="btn ghost" id="age-no">Close</button>
</div>
</div>`;
  document.body.appendChild(bd);
  bd.style.display='flex';
 
  function closeGate(){ bd.style.display='none'; bd.remove(); }  
  // ✅ Redirect when "Yes" is clicked
  bd.querySelector('#age-yes').addEventListener('click', closeGate);
  // ✅ Just close modal when "No" is clicked
  bd.querySelector('#age-no').addEventListener('click', closeGate);
})();
 
(function(){
  const path = window.location.pathname;
  const isHome = /(^\/$|lander\.html$)/.test(path);
  if(!isHome) return;
 
  const bd = document.createElement('div');
  bd.className = 'modal-backdrop';
  bd.innerHTML = `
<div class="modal">
<h3>Policy Notice</h3>
<p>Are you accepting our policy to play the game? This notice is informational and does not block access.</p>
<div style="display:flex;gap:10px;flex-wrap:wrap">
<button class="btn" id="age-yes">Yes, Accept</button>
<button class="btn ghost" id="age-no">Close</button>
</div>
</div>`;
  document.body.appendChild(bd);
  bd.style.display='flex';
 
  function closeGate(){ bd.style.display='none'; bd.remove(); }  
  // ✅ Redirect when "Yes" is clicked
  bd.querySelector('#age-yes').addEventListener('click', closeGate);
//                                                         function(){
//     window.location.href = "https://p8r9.com/?utm_campaign=ttN5oc1jmM&v1=[v1]&v2=[v2]&v3=[v3]"; // change to your target page
//   });
 
  // ✅ Just close modal when "No" is clicked
  bd.querySelector('#age-no').addEventListener('click', closeGate);
})();
 