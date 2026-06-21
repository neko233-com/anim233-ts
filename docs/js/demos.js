(function() {
  const CDN = 'https://unpkg.com/anim233-ts@latest/dist/index.min.js';

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (window.Anim233) { resolve(window.Anim233); return; }
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => resolve(window.Anim233);
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  let ready = loadScript(CDN);
  function whenReady(cb) { ready.then(cb).catch(e => console.error('Anim233 load failed', e)); }

  // Copy buttons
  document.querySelectorAll('pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.onclick = () => {
      const code = pre.querySelector('code');
      navigator.clipboard.writeText(code.textContent).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500);
      });
    };
    pre.appendChild(btn);
  });

  // Sidebar active link
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Mobile menu
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (hamburger) {
    hamburger.onclick = () => { sidebar.classList.toggle('open'); overlay.classList.toggle('open'); };
    if (overlay) overlay.onclick = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
  }

  // Expose ready helper for demos
  window.animReady = whenReady;
})();
