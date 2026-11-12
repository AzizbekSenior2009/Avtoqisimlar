import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopStrip from './TopStrip';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';
import MobileDrawer from './MobileDrawer';
import SearchOverlay from './SearchOverlay';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Top Banner Strip */}
      <TopStrip onOpenMenu={() => setMenuOpen(true)} />

      {/* Main Sticky Header */}
      <Header onOpenSearch={() => setSearchOpen(true)} />

      {/* Page Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile/Tablet Fixed Bottom Navigation */}
      <BottomNav onOpenSearch={() => setSearchOpen(true)} />

      {/* Slide-in Mobile Drawer */}
      <MobileDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Mobile Fullscreen Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
