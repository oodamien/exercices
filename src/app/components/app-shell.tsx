"use client";

import { useState } from "react";
import { Nav } from "@/app/components/nav";
import { LanguageProvider, LanguageSelector } from "@/app/components/language-context";
import { Rocket } from "@/app/components/icons/rocket";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen relative">
        {/* Starfield background */}
        <div className="starfield" />

        {/* Nav */}
        <nav className="relative z-10 border-b border-sc-cyan/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <a href="/" className="flex items-center gap-2 group">
                  <Rocket className="w-7 h-7 group-hover:animate-float" />
                  <span className="font-[family-name:var(--font-fredoka)] text-xl font-bold text-sc-gold text-glow-gold">
                    StarCalc
                  </span>
                </a>
                <div className="hidden md:block">
                  <Nav />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LanguageSelector />
                <div className="flex md:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="relative inline-flex items-center justify-center rounded-lg p-2 text-sc-text-dim hover:text-sc-cyan hover:bg-sc-bg-tertiary/50 transition-colors"
                    aria-controls="mobile-menu"
                    aria-expanded={mobileMenuOpen}
                    aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                  >
                    {!mobileMenuOpen ? (
                      <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                    ) : (
                      <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-sc-cyan/10 bg-sc-bg-primary/95 backdrop-blur-sm" id="mobile-menu">
              <div className="space-y-1 px-4 pt-3 pb-4" onClick={() => setMobileMenuOpen(false)}>
                <Nav mobile />
              </div>
            </div>
          )}
        </nav>

        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </LanguageProvider>
  );
}
