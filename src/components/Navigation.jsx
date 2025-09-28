import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper untuk menentukan apakah link aktif
  const isActive = (path) => location.pathname === path;
  
  // Untuk close menu saat navigasi
  const handleNavClick = () => setMobileOpen(false);

  const navMenus = [
    { to: '/konversi-ip', label: 'Konversi IP' },
    { to: '/deteksi-kelas', label: 'Deteksi Kelas' },
    { to: '/network-calculator', label: 'Network Calculator' },
    { to: '/subnet-calculator', label: 'Subnet Calculator' },
    { to: '/vlsm-calculator', label: 'VLSM Calculator' },
    { to: '/visualisasi', label: 'Visualisasi' },
  ];

  // Sidebar mobile pakai portal
  const mobileSidebar = (
    <div className="links-container show">
      {/* Tombol close di drawer */}
      <button
        className="drawer-close-btn"
        aria-label="Tutup menu"
        onClick={() => setMobileOpen(false)}
      >
        {/* SVG X modern */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="15" fill="none" stroke="#fff" strokeWidth="2.2" />
          <line x1="10" y1="10" x2="22" y2="22" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="22" y1="10" x2="10" y2="22" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>
      <div className="nav-links">
        {navMenus.map((menu, idx) => (
          <React.Fragment key={menu.to}>
            <NavLink
              to={menu.to}
              className={`nav-link ${isActive(menu.to) ? 'nav-link-active' : ''}`}
              onClick={handleNavClick}
            >
              {menu.label}
            </NavLink>
            {isMobile && idx !== navMenus.length - 1 && (
              <hr className="sidebar-divider" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <nav id="main-navigation">
      <div className="nav-container">
        {/* Overlay untuk drawer mobile */}
        <div
          className={`drawer-overlay${mobileOpen ? ' show' : ''}`}
          onClick={() => setMobileOpen(false)}
          aria-hidden={!mobileOpen}
        />
        {/* Hamburger untuk mobile (hanya saat drawer tertutup) */}
        {!mobileOpen && (
          <button
            className={`hamburger-btn responsive-only${mobileOpen ? ' open' : ''}`}
            aria-label="Buka menu"
            onClick={() => setMobileOpen(true)}
          >
            {/* SVG Hamburger Icon */}
            <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0" width="28" height="4" rx="2" fill="#fff" />
              <rect y="6" width="28" height="4" rx="2" fill="#fff" />
              <rect y="12" width="28" height="4" rx="2" fill="#fff" />
            </svg>
          </button>
        )}
        {/* Drawer menu pakai portal */}
        {mobileOpen && isMobile
          ? createPortal(mobileSidebar, document.body)
          : (
            <div className="links-container" style={mobileOpen && isMobile ? { display: 'none' } : {}}>
              <div className="nav-links">
                {navMenus.map((menu, idx) => (
                  <React.Fragment key={menu.to}>
                    <NavLink
                      to={menu.to}
                      className={`nav-link ${isActive(menu.to) ? 'nav-link-active' : ''}`}
                      onClick={handleNavClick}
                    >
                      {menu.label}
                    </NavLink>
                    {isMobile && idx !== navMenus.length - 1 && (
                      <hr className="sidebar-divider" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        {/* Theme Toggle */}
        <div className="theme-container">
          <button className="theme-button">
            ☀️
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 