// Script untuk mengatasi masalah zoom browser
(function() {
  function handleZoom() {
    const navItems = document.querySelectorAll('.nav-table td');
    if (window.devicePixelRatio > 1 && window.devicePixelRatio < 1.6) {
      // Menambahkan padding khusus untuk zoom 125-150%
      navItems.forEach(item => {
        if (!item.classList.contains('nav-fixed-width')) {
          item.style.padding = '0 4px';
        }
      });
    } else {
      // Kembali ke normal di zoom lain
      navItems.forEach(item => {
        if (!item.classList.contains('nav-fixed-width')) {
          item.style.padding = '0 10px';
        }
      });
    }
  }

  // Pantau perubahan zoom
  window.addEventListener('resize', handleZoom);
  
  // Jalankan saat load
  if (document.readyState === 'complete') {
    handleZoom();
  } else {
    window.addEventListener('load', handleZoom);
  }
})(); 